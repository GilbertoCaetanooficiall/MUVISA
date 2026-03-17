'use server';

import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/db';
import DOMPurify from 'isomorphic-dompurify';

/** Verifica se o utilizador tem acesso ao processo */
async function verificarAcessoProcesso(processoId: string, utilizadorId: string): Promise<boolean> {

  // Verificar se é estudante dono do processo
  const { data: estudante } = await supabaseAdmin
    .from('estudante')
    .select('id')
    .eq('utilizador_id', utilizadorId)
    .single();

  if (estudante) {
    const { data: processo } = await supabaseAdmin
      .from('processo')
      .select('id')
      .eq('id', processoId)
      .eq('estudante_id', estudante.id)
      .single();
    if (processo) return true;
  }

  // Verificar se é staff atribuído ao processo
  const { data: staff } = await supabaseAdmin
    .from('staff')
    .select('id')
    .eq('utilizador_id', utilizadorId)
    .single();

  if (staff) {
    const { data: processoStaff } = await supabaseAdmin
      .from('processo')
      .select('id')
      .eq('id', processoId)
      .eq('staff_id', staff.id)
      .single();
    if (processoStaff) return true;
  }

  return false;
}

/** Lista mensagens de um processo — verifica acesso */
export async function getMensagensByProcesso(processoId: string, utilizadorId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autenticado.');

  const role = (session.user as { role?: string })?.role;
  const isAdmin = ['admin', 'senior_admin'].includes(role ?? '');

  if (!isAdmin) {
    const temAcesso = await verificarAcessoProcesso(processoId, utilizadorId);
    if (!temAcesso) throw new Error('Acesso negado.');
  }

  const { data, error } = await supabaseAdmin
    .from('mensagem')
    .select(`
      *,
      remetente:remetente_id(nome_completo, role),
      destinatario:destinatario_id(nome_completo, role)
    `)
    .eq('processo_id', processoId)
    .order('criado_em', { ascending: true });

  if (error) throw new Error('Erro ao buscar mensagens.');
  return data ?? [];
}

/** Envia uma mensagem — sanitiza o conteúdo com DOMPurify */
export async function enviarMensagem(
  processoId: string,
  remetenteId: string,
  destinatarioId: string,
  conteudo: string
) {
  const session = await auth();
  if (!session?.user?.id || session.user.id !== remetenteId) {
    throw new Error('Não autorizado.');
  }

  if (!conteudo.trim()) throw new Error('Mensagem não pode ser vazia.');

  // Sanitizar conteúdo para prevenir XSS
  const conteudoSanitizado = DOMPurify.sanitize(conteudo.trim(), {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });

  if (!conteudoSanitizado) throw new Error('Conteúdo inválido.');

  const { data, error } = await supabaseAdmin
    .from('mensagem')
    .insert({
      processo_id: processoId,
      remetente_id: remetenteId,
      destinatario_id: destinatarioId,
      conteudo: conteudoSanitizado,
      lida: false,
    })
    .select()
    .single();

  if (error) throw new Error('Erro ao enviar mensagem.');
  return data;
}

/** Marca todas as mensagens de um processo para um utilizador como lidas */
export async function marcarMensagensComoLidas(processoId: string, utilizadorId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autenticado.');

  await supabaseAdmin
    .from('mensagem')
    .update({ lida: true })
    .eq('processo_id', processoId)
    .eq('destinatario_id', utilizadorId)
    .eq('lida', false);
}
