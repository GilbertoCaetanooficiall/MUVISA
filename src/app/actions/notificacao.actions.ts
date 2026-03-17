'use server';

import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/db';

/** Cria uma notificação para um utilizador */
export async function criarNotificacao(
  utilizadorId: string,
  titulo: string,
  mensagem: string,
  tipo: 'info' | 'sucesso' | 'erro' | 'aviso',
  categoria: string
) {
  const { error } = await supabaseAdmin.from('notificacao').insert({
    utilizador_id: utilizadorId,
    titulo,
    mensagem,
    tipo,
    categoria,
    lida: false,
  });
  if (error) throw new Error('Erro ao criar notificação.');
}

/** Marca uma notificação como lida — verifica ownership */
export async function marcarComoLida(notificacaoId: string, utilizadorId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autenticado.');

  // Verificar que a notificação pertence ao utilizador
  const { data: notif } = await supabaseAdmin
    .from('notificacao')
    .select('utilizador_id')
    .eq('id', notificacaoId)
    .single();

  if (!notif || notif.utilizador_id !== utilizadorId) {
    throw new Error('Não autorizado.');
  }

  const { error } = await supabaseAdmin
    .from('notificacao')
    .update({ lida: true, lida_em: new Date().toISOString() })
    .eq('id', notificacaoId);

  if (error) throw new Error('Erro ao marcar notificação.');
}

/** Lista notificações — não lidas primeiro */
export async function getNotificacoesByUtilizador(utilizadorId: string) {
  const session = await auth();
  if (!session?.user?.id || session.user.id !== utilizadorId) {
    // Admin pode ver notificações de qualquer utilizador
    const role = (session?.user as { role?: string })?.role;
    if (!role || !['admin', 'senior_admin'].includes(role)) {
      throw new Error('Não autorizado.');
    }
  }

  const { data, error } = await supabaseAdmin
    .from('notificacao')
    .select('*')
    .eq('utilizador_id', utilizadorId)
    .order('lida', { ascending: true })
    .order('criada_em', { ascending: false })
    .limit(50);

  if (error) throw new Error('Erro ao buscar notificações.');
  return data ?? [];
}
