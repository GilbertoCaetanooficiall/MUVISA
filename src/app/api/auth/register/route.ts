import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { apiLimiter } from '@/lib/rate-limit';
import { supabaseAdmin } from '@/lib/db';
import { registerSchema } from '@/lib/validations';
import { registarAuditoria } from '@/lib/audit';

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for') ??
    request.headers.get('x-real-ip') ??
    '127.0.0.1';
  const userAgent = request.headers.get('user-agent') ?? 'unknown';

  // Rate limiting
  const { success: rateLimitOk } = apiLimiter.check(ip);
  if (!rateLimitOk) {
    return NextResponse.json(
      { error: 'Demasiados pedidos. Tente novamente mais tarde.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', detalhes: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const {
      nome_completo,
      email,
      telefone,
      universidade_destino,
      tipo_visto,
      pais_destino,
      password,
    } = parsed.data;

    // Verificar email duplicado
    const { data: existente } = await supabaseAdmin
      .from('utilizador')
      .select('id')
      .eq('email', email)
      .single();

    if (existente) {
      return NextResponse.json(
        { error: 'Este email já está registado.' },
        { status: 409 }
      );
    }

    // Hash da password
    const password_hash = await bcrypt.hash(password, 12);

    // Criar utilizador
    const { data: novoUtilizador, error: errUtilizador } = await supabaseAdmin
      .from('utilizador')
      .insert({
        nome_completo,
        email,
        telefone,
        password_hash,
        role: 'estudante',
        ativo: true,
      })
      .select('id')
      .single();

    if (errUtilizador || !novoUtilizador) {
      console.error('[register] Erro ao criar utilizador:', errUtilizador);
      return NextResponse.json(
        { error: 'Erro interno ao criar conta. Tente novamente.' },
        { status: 500 }
      );
    }

    // Criar perfil de estudante
    const { error: errEstudante } = await supabaseAdmin.from('estudante').insert({
      utilizador_id: novoUtilizador.id,
      universidade_destino,
      tipo_visto,
      pais_destino: pais_destino ?? 'Portugal',
    });

    if (errEstudante) {
      console.error('[register] Erro ao criar estudante:', errEstudante);
      // Rollback — apagar o utilizador criado
      await supabaseAdmin.from('utilizador').delete().eq('id', novoUtilizador.id);
      return NextResponse.json(
        { error: 'Erro interno ao criar perfil. Tente novamente.' },
        { status: 500 }
      );
    }

    // Auditoria
    await registarAuditoria({
      utilizadorId: novoUtilizador.id,
      acao: 'registo',
      detalhes: { email, tipo_visto, pais_destino },
      ip,
      userAgent,
    });

    return NextResponse.json(
      { message: 'Conta criada com sucesso.', id: novoUtilizador.id },
      { status: 201 }
    );
  } catch (err) {
    console.error('[register] Erro inesperado:', err);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
