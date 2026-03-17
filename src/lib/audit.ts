import { supabaseAdmin } from './db';

export type AuditAction =
  | 'login_sucesso'
  | 'login_falhado'
  | 'logout'
  | 'registo'
  | 'password_alterada'
  | '2fa_ativado'
  | '2fa_desativado'
  | 'documento_enviado'
  | 'documento_aprovado'
  | 'documento_rejeitado'
  | 'processo_etapa_avancada'
  | 'staff_criado'
  | 'perfil_atualizado'
  | 'upload_ficheiro';

interface AuditParams {
  utilizadorId?: string | null;
  acao: AuditAction;
  detalhes?: Record<string, unknown>;
  ip?: string | null;
  userAgent?: string | null;
}

/**
 * Regista uma acção de auditoria na tabela log_auditoria.
 * Nunca lança erros — falhas são silenciadas para não afectar o fluxo principal.
 */
export async function registarAuditoria({
  utilizadorId,
  acao,
  detalhes = {},
  ip,
  userAgent,
}: AuditParams): Promise<void> {
  try {
    await supabaseAdmin.from('log_auditoria').insert({
      utilizador_id: utilizadorId ?? null,
      acao,
      detalhes,
      ip_address: ip ?? null,
      user_agent: userAgent ?? null,
    });
  } catch {
    // Nunca expõe erros de auditoria ao cliente
    console.error('[audit] Erro ao registar auditoria:', acao);
  }
}
