'use server';

import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/db';
import { registarAuditoria } from '@/lib/audit';

/** Busca o processo completo e todas as suas etapas para o utilizador dado */
export async function getProcessoByEstudante(utilizadorId: string) {
  const { data: estudante } = await supabaseAdmin
    .from('estudante')
    .select('id')
    .eq('utilizador_id', utilizadorId)
    .single();

  if (!estudante) return null;

  const { data: processo } = await supabaseAdmin
    .from('processo')
    .select(`
      *,
      universidade:universidade_id(*),
      plano:plano_id(*),
      staff:staff_id(
        *,
        utilizador:utilizador_id(nome_completo, email)
      ),
      etapa_processo(*),
      evento_timeline(*)
    `)
    .eq('estudante_id', estudante.id)
    .order('iniciado_em', { ascending: false })
    .limit(1)
    .single();

  if (!processo) return null;

  // Ordenar no lado do servidor
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = processo as any;
  if (p.evento_timeline) {
    p.evento_timeline = p.evento_timeline
      .sort((a: { ocorrido_em: string }, b: { ocorrido_em: string }) =>
        new Date(b.ocorrido_em).getTime() - new Date(a.ocorrido_em).getTime()
      )
      .slice(0, 10);
  }
  if (p.etapa_processo) {
    p.etapa_processo = p.etapa_processo.sort(
      (a: { ordem: number }, b: { ordem: number }) => a.ordem - b.ordem
    );
  }

  return p;

}

/** Avança a etapa actual do processo, cria evento_timeline e notificação */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function avancarEtapa(processoId: string, _staffId: string) {
  const session = await auth();
  if (!session || !['admin', 'senior_admin'].includes((session.user as { role?: string })?.role ?? '')) {
    throw new Error('Não autorizado.');
  }

  const { data: processo, error } = await supabaseAdmin
    .from('processo')
    .select('id, etapa_atual, estudante_id')
    .eq('id', processoId)
    .single();

  if (error || !processo) throw new Error('Processo não encontrado.');

  const novaEtapa = (processo.etapa_atual ?? 0) + 1;

  // Actualizar etapa
  await supabaseAdmin
    .from('processo')
    .update({ etapa_atual: novaEtapa, atualizado_em: new Date().toISOString() })
    .eq('id', processoId);

  // Marcar etapa como concluída
  await supabaseAdmin
    .from('etapa_processo')
    .update({ estado: 'concluida', concluida_em: new Date().toISOString() })
    .eq('processo_id', processoId)
    .eq('ordem', processo.etapa_atual);

  // Criar evento na timeline
  await supabaseAdmin.from('evento_timeline').insert({
    processo_id: processoId,
    tipo: 'etapa_avancada',
    titulo: `Etapa ${novaEtapa} iniciada`,
    descricao: `A tua candidatura avançou para a etapa ${novaEtapa}.`,
    ocorrido_em: new Date().toISOString(),
  });

  // Buscar utilizador_id do estudante para notificação
  const { data: estudante } = await supabaseAdmin
    .from('estudante')
    .select('utilizador_id')
    .eq('id', processo.estudante_id)
    .single();

  if (estudante) {
    await supabaseAdmin.from('notificacao').insert({
      utilizador_id: estudante.utilizador_id,
      titulo: 'Processo avançou de etapa!',
      mensagem: `A tua candidatura avançou para a etapa ${novaEtapa}. Verifica o teu portal para mais detalhes.`,
      tipo: 'info',
      categoria: 'processo',
      lida: false,
    });
  }

  await registarAuditoria({
    utilizadorId: session.user?.id,
    acao: 'processo_etapa_avancada',
    detalhes: { processo_id: processoId, nova_etapa: novaEtapa },
  });

  return { sucesso: true, novaEtapa };
}

/** Actualiza o estado global do processo */
export async function updateEstadoProcesso(
  processoId: string,
  estado: string
) {
  const session = await auth();
  if (!session || !['admin', 'senior_admin'].includes((session.user as { role?: string })?.role ?? '')) {
    throw new Error('Não autorizado.');
  }

  const { error } = await supabaseAdmin
    .from('processo')
    .update({ estado, atualizado_em: new Date().toISOString() })
    .eq('id', processoId);

  if (error) throw new Error('Erro ao actualizar estado.');
  return { sucesso: true };
}
