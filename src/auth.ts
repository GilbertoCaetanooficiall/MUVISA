import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import * as speakeasy from 'speakeasy';
import { supabaseAdmin } from '@/lib/db';
import { registarAuditoria } from '@/lib/audit';
import { loginSchema } from '@/lib/validations';

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        token2fa: { label: '2FA Token', type: 'text' },
      },
      async authorize(credentials, request) {
        const ip =
          request?.headers?.get('x-forwarded-for') ??
          request?.headers?.get('x-real-ip') ??
          'unknown';
        const userAgent = request?.headers?.get('user-agent') ?? 'unknown';

        try {
          const parsed = loginSchema.safeParse(credentials);
          if (!parsed.success) {
            await registarAuditoria({
              acao: 'login_falhado',
              detalhes: { motivo: 'validacao_falhada', email: credentials?.email },
              ip,
              userAgent,
            });
            return null;
          }

          const { email, password } = parsed.data;

          // Buscar utilizador na BD
          const { data: utilizador, error } = await supabaseAdmin
            .from('utilizador')
            .select('id, nome_completo, email, password_hash, role, ativo, two_factor_ativo, two_factor_secret')
            .eq('email', email)
            .single();

          if (error || !utilizador) {
            await registarAuditoria({
              acao: 'login_falhado',
              detalhes: { motivo: 'utilizador_nao_encontrado', email },
              ip,
              userAgent,
            });
            return null;
          }

          if (!utilizador.ativo) {
            await registarAuditoria({
              utilizadorId: utilizador.id,
              acao: 'login_falhado',
              detalhes: { motivo: 'conta_inativa' },
              ip,
              userAgent,
            });
            return null;
          }

          // Verificar password
          const passwordOk = await bcrypt.compare(password, utilizador.password_hash);
          if (!passwordOk) {
            await registarAuditoria({
              utilizadorId: utilizador.id,
              acao: 'login_falhado',
              detalhes: { motivo: 'password_incorreta' },
              ip,
              userAgent,
            });
            return null;
          }

          // Verificar 2FA se activo
          let twoFactorOk = !utilizador.two_factor_ativo;
          if (utilizador.two_factor_ativo && utilizador.two_factor_secret) {
            const token = credentials?.token2fa as string | undefined;
            if (!token) return null; // Exige o token 2FA

            twoFactorOk = speakeasy.totp.verify({
              secret: utilizador.two_factor_secret,
              encoding: 'base32',
              token,
              window: 1,
            });

            if (!twoFactorOk) {
              await registarAuditoria({
                utilizadorId: utilizador.id,
                acao: 'login_falhado',
                detalhes: { motivo: '2fa_invalido' },
                ip,
                userAgent,
              });
              return null;
            }
          }

          // Actualiza ultimo_login
          await supabaseAdmin
            .from('utilizador')
            .update({ ultimo_login: new Date().toISOString() })
            .eq('id', utilizador.id);

          await registarAuditoria({
            utilizadorId: utilizador.id,
            acao: 'login_sucesso',
            detalhes: { role: utilizador.role },
            ip,
            userAgent,
          });

          return {
            id: utilizador.id,
            name: utilizador.nome_completo,
            email: utilizador.email,
            role: utilizador.role,
            twoFactorOk,
          };
        } catch (err) {
          console.error('[auth] Erro inesperado no authorize:', err);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 horas
    updateAge: 60 * 60,  // renovar a cada 1 hora
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role: string }).role;
        token.twoFactorOk = (user as { twoFactorOk: boolean }).twoFactorOk;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user = session.user as any;
        user.id = token.id as string;
        user.role = token.role as string;
        user.twoFactorOk = token.twoFactorOk as boolean;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
