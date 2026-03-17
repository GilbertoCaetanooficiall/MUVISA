import type { Metadata } from 'next';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabaseAdmin } from '@/lib/db';
import { Users, ClipboardList, ShieldCheck, FolderOpen, Landmark, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard – MUVISA Admin',
  description: 'MUVISA admin dashboard overview: clients, visa processes, documents and deadlines.',
};

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number | string;
}

function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="p-2 bg-primary/10 rounded-lg text-primary">
          <Icon size={20} />
        </span>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

// ─── Página (Server Component com queries reais) ──────────────────────────────

export default async function AdminDashboardPage() {
  // Queries paralelas para melhor performance
  const [
    { count: totalClientes },
    { count: emAndamento },
    { count: emitidos },
    { count: docsPendentes },
    { count: universidades },
    { data: processosMensais },
    { data: distribUniversidades },
    { data: clientesRecentes },
    { data: documentosParaRever },
    { data: prazos },
  ] = await Promise.all([
    supabaseAdmin.from('estudante').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('processo').select('*', { count: 'exact', head: true }).neq('estado', 'emitido'),
    supabaseAdmin.from('processo').select('*', { count: 'exact', head: true }).eq('estado', 'emitido'),
    supabaseAdmin.from('documento').select('*', { count: 'exact', head: true }).eq('estado', 'enviado'),
    supabaseAdmin.from('universidade').select('*', { count: 'exact', head: true }).eq('ativa', true),
    // Processos por mês (últimos 6) — usa RPC se existir, senão retorna vazio
    Promise.resolve(supabaseAdmin.rpc('processos_por_mes')).then((r) => r).catch(() => ({ data: [] })) as Promise<{ data: Array<{ mes: string; total: number }> | null }>,
    // Distribuição por universidade
    supabaseAdmin
      .from('processo')
      .select('universidade:universidade_id(nome)')
      .not('universidade_id', 'is', null)
      .limit(5),
    // Clientes recentes
    supabaseAdmin
      .from('processo')
      .select('id, estado, iniciado_em, estudante:estudante_id(utilizador:utilizador_id(nome_completo, email)), universidade:universidade_id(nome)')
      .order('iniciado_em', { ascending: false })
      .limit(5),
    // Documentos a rever
    supabaseAdmin
      .from('documento')
      .select('id, nome, enviado_em, processo:processo_id(estudante:estudante_id(utilizador:utilizador_id(nome_completo)))')
      .eq('estado', 'enviado')
      .order('enviado_em', { ascending: true })
      .limit(3),
    // Prazos
    supabaseAdmin
      .from('prazo')
      .select('id, titulo, descricao, data_limite')
      .eq('concluido', false)
      .order('data_limite', { ascending: true })
      .limit(5),
  ]);

  const estadoStyles: Record<string, string> = {
    em_andamento: 'bg-primary/10 text-primary',
    aprovado: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    pendente: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    emitido: 'bg-green-600 text-white',
    rejeitado: 'bg-red-100 text-red-700',
  };

  function formatData(dateStr: string | null | undefined): string {
    if (!dateStr) return '—';
    try {
      return new Intl.DateTimeFormat('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(dateStr));
    } catch { return dateStr; }
  }

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-500 dark:text-slate-400">Bem-vindo. Aqui está o que está a acontecer hoje.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard icon={Users}         label="Total de Clientes"   value={totalClientes ?? 0} />
          <StatCard icon={ClipboardList} label="Em Andamento"        value={emAndamento ?? 0} />
          <StatCard icon={ShieldCheck}   label="Vistos Emitidos"     value={emitidos ?? 0} />
          <StatCard icon={FolderOpen}    label="Docs. Pendentes"     value={docsPendentes ?? 0} />
          <StatCard icon={Landmark}      label="Universidades"       value={universidades ?? 0} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Processos mensais */}
          <div className="bg-white dark:bg-slate-900/40 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold">Processos por Mês</h3>
                <p className="text-sm text-slate-500">Tendência dos últimos 6 meses</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{emAndamento ?? 0}</p>
                <p className="text-sm text-slate-500">Activos agora</p>
              </div>
            </div>
            <div className="h-48 flex items-end gap-2">
              {(processosMensais ?? []).length > 0
                ? (processosMensais ?? []).map((m: { mes: string; total: number }, i: number) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-primary/30 hover:bg-primary/60 transition-colors rounded-t"
                        style={{ height: `${Math.min(100, (m.total / Math.max(...(processosMensais ?? []).map((x: { total: number }) => x.total), 1)) * 100)}%` }}
                      />
                      <span className="text-[9px] text-slate-500 font-bold">{m.mes}</span>
                    </div>
                  ))
                : ['Jan','Fev','Mar','Abr','Mai','Jun'].map((m) => (
                    <div key={m} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t" style={{ height: '20%' }} />
                      <span className="text-[9px] text-slate-400 font-bold">{m}</span>
                    </div>
                  ))}
            </div>
          </div>

          {/* Distribuição por universidade */}
          <div className="bg-white dark:bg-slate-900/40 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold">Distribuição Universidades</h3>
                <p className="text-sm text-slate-500">Top destinos por candidaturas</p>
              </div>
              <p className="text-xl font-bold">{totalClientes ?? 0} clientes</p>
            </div>
            <div className="space-y-3">
              {(distribUniversidades ?? []).length === 0 ? (
                <p className="text-sm text-slate-400">Sem dados ainda.</p>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ((distribUniversidades ?? []) as any[]).slice(0, 5).map((item: any, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 w-5">{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{item.universidade?.nome ?? '—'}</span>
                        <span className="text-xs text-slate-500">{item.count}</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${Math.min(100, (parseInt(item.count) / Math.max(totalClientes ?? 1, 1)) * 100)}%` }} />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Bottom Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Clientes Recentes */}
          <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold">Clientes Recentes</h3>
              <Link href="/admin/clients" className="text-primary text-sm font-semibold hover:underline">Ver Todos</Link>
            </div>
            <div className="p-4 space-y-4">
              {(clientesRecentes ?? []).length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-4">Sem clientes ainda.</p>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ((clientesRecentes ?? []) as any[]).map((c) => {
                  const nome = c.estudante?.[0]?.utilizador?.[0]?.nome_completo ?? c.estudante?.utilizador?.nome_completo ?? '—';
                  const iniciais = nome.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toUpperCase();
                  return (
                    <div key={c.id} className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                        {iniciais}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{nome}</p>
                        <p className="text-xs text-slate-500 truncate">{c.universidade?.[0]?.nome ?? c.universidade?.nome ?? '—'}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase flex-shrink-0 ${estadoStyles[c.estado] ?? 'bg-slate-100 text-slate-500'}`}>
                        {c.estado?.replace('_', ' ')}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Documentos para Rever */}
          <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold">Documentos para Rever</h3>
              <Link href="/admin/documents" className="text-primary text-sm font-semibold hover:underline">Ver Todos</Link>
            </div>
            <div className="p-4 space-y-4">
              {(documentosParaRever ?? []).length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-4">Sem documentos pendentes. ✅</p>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ((documentosParaRever ?? []) as any[]).map((doc) => (
                  <div key={doc.id} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 flex-shrink-0">
                      <FileText size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{doc.nome}</p>
                      <p className="text-xs text-slate-500">
                        Por: {doc.processo?.estudante?.utilizador?.nome_completo ?? '—'}
                      </p>
                      <div className="mt-2 flex gap-2">
                        <Link
                          href={`/admin/documents`}
                          className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded hover:bg-primary-hover transition-colors"
                        >
                          Aprovar
                        </Link>
                        <Link
                          href={`/admin/documents`}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                          Rejeitar
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Prazos */}
          <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold">Prazos Próximos</h3>
              <span className="text-xs font-bold px-2 py-1 bg-accent-warning/20 text-accent-warning rounded-lg">
                {(prazos ?? []).length} Activos
              </span>
            </div>
            <div className="p-4 space-y-4">
              {(prazos ?? []).length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-4">Sem prazos próximos. ✅</p>
              ) : (
                (prazos ?? []).map((prazo: { id: string; titulo: string; descricao?: string; data_limite: string }, i: number) => {
                  const urgency = i === 0 ? 'border-accent-warning' : i === 1 ? 'border-primary' : 'border-slate-300 dark:border-slate-700';
                  return (
                    <div key={prazo.id} className={`border-l-4 pl-4 ${urgency}`}>
                      <p className="text-sm font-semibold">{prazo.titulo}</p>
                      <p className="text-xs text-slate-500">{formatData(prazo.data_limite)}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
