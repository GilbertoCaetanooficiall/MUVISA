'use server';

import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/db';
import { registarAuditoria } from '@/lib/audit';

/** Lista todos os documentos de um processo, ordenados por data */
export async function getDocumentosByProcesso(processoId: string) {
  const { data, error } = await supabaseAdmin
    .from('documento')
    .select('*')
    .eq('processo_id', processoId)
    .order('enviado_em', { ascending: false });

  if (error) throw new Error('Erro ao buscar documentos.');
  return data ?? [];
}

/** Aprova um documento — só staff/admin */
export async function aprovarDocumento(documentoId: string, staffId: string) {
  const session = await auth();
  if (!session || !['admin', 'senior_admin'].includes((session.user as { role?: string })?.role ?? '')) {
    throw new Error('Não autorizado.');
  }

  const ip = null;
  const userAgent = null;

  const { data: documento, error } = await supabaseAdmin
    .from('documento')
    .select('id, processo_id, nome')
    .eq('id', documentoId)
    .single();

  if (error || !documento) throw new Error('Documento não encontrado.');

  await supabaseAdmin
    .from('documento')
    .update({
      estado: 'aprovado',
      revisto_por: staffId,
      revisto_em: new Date().toISOString(),
    })
    .eq('id', documentoId);

  // Evento na timeline
  await supabaseAdmin.from('evento_timeline').insert({
    processo_id: documento.processo_id,
    tipo: 'documento_aprovado',
    titulo: `Documento aprovado: ${documento.nome}`,
    descricao: `O documento "${documento.nome}" foi aprovado pela equipa MUVISA.`,
    ocorrido_em: new Date().toISOString(),
  });

  // Buscar utilizador do estudante para notificação
  const { data: processo } = await supabaseAdmin
    .from('processo')
    .select('estudante_id')
    .eq('id', documento.processo_id)
    .single();

  if (processo) {
    const { data: estudante } = await supabaseAdmin
      .from('estudante')
      .select('utilizador_id')
      .eq('id', processo.estudante_id)
      .single();

    if (estudante) {
      await supabaseAdmin.from('notificacao').insert({
        utilizador_id: estudante.utilizador_id,
        titulo: 'Documento aprovado!',
        mensagem: `O documento "${documento.nome}" foi aprovado. Continua com os restantes passos.`,
        tipo: 'sucesso',
        categoria: 'documento',
        lida: false,
      });
    }
  }

  await registarAuditoria({
    utilizadorId: session.user?.id,
    acao: 'documento_aprovado',
    detalhes: { documento_id: documentoId, nome: documento.nome },
    ip,
    userAgent,
  });

  return { sucesso: true };
}

/** Rejeita um documento com motivo — só staff/admin */
export async function rejeitarDocumento(
  documentoId: string,
  staffId: string,
  motivo: string
) {
  const session = await auth();
  if (!session || !['admin', 'senior_admin'].includes((session.user as { role?: string })?.role ?? '')) {
    throw new Error('Não autorizado.');
  }

  const { data: documento, error } = await supabaseAdmin
    .from('documento')
    .select('id, processo_id, nome')
    .eq('id', documentoId)
    .single();

  if (error || !documento) throw new Error('Documento não encontrado.');

  await supabaseAdmin
    .from('documento')
    .update({
      estado: 'rejeitado',
      motivo_rejeicao: motivo,
      revisto_por: staffId,
      revisto_em: new Date().toISOString(),
    })
    .eq('id', documentoId);

  // Evento na timeline
  await supabaseAdmin.from('evento_timeline').insert({
    processo_id: documento.processo_id,
    tipo: 'documento_rejeitado',
    titulo: `Documento rejeitado: ${documento.nome}`,
    descricao: `Motivo: ${motivo}`,
    ocorrido_em: new Date().toISOString(),
  });

  // Notificação ao estudante
  const { data: processo } = await supabaseAdmin
    .from('processo')
    .select('estudante_id')
    .eq('id', documento.processo_id)
    .single();

  if (processo) {
    const { data: estudante } = await supabaseAdmin
      .from('estudante')
      .select('utilizador_id')
      .eq('id', processo.estudante_id)
      .single();

    if (estudante) {
      await supabaseAdmin.from('notificacao').insert({
        utilizador_id: estudante.utilizador_id,
        titulo: 'Documento rejeitado',
        mensagem: `O documento "${documento.nome}" foi rejeitado. Motivo: ${motivo}. Por favor, envia uma nova versão.`,
        tipo: 'erro',
        categoria: 'documento',
        lida: false,
      });
    }
  }

  await registarAuditoria({
    utilizadorId: session.user?.id,
    acao: 'documento_rejeitado',
    detalhes: { documento_id: documentoId, nome: documento.nome, motivo },
  });

  return { sucesso: true };
}
