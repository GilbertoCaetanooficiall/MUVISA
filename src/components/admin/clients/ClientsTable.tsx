import { Eye } from 'lucide-react';

// ─── Component ────────────────────────────────────────────────────────────────

export default function ClientsTable({ processos = [] }: { processos?: any[] }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const estadoStyles: Record<string, string> = {
    pendente: 'bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20',
    em_andamento: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
    concluido: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-500 dark:border-emerald-500/20',
    emitido: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-500 dark:border-emerald-500/20',
    rejeitado: 'bg-red-50 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
  };

  return (
    <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20">
              {['Estudante', 'Contacto', 'Universidade', 'Plano', 'Estado do Visto', ''].map(
                (col) => (
                  <th
                    key={col}
                    className={`px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ${
                      col === '' ? 'text-right' : ''
                    }`}
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {processos.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                  Nenhum cliente encontrado.
                </td>
              </tr>
            ) : (
              processos.map((p) => {
                const estudanteId = p.estudante?.[0]?.id ?? p.estudante?.id ?? '—';
                const utilizador = p.estudante?.[0]?.utilizador?.[0] ?? p.estudante?.utilizador ?? {};
                const nome = utilizador.nome_completo ?? 'Sem Nome';
                const email = utilizador.email ?? '—';
                const telefone = utilizador.telefone ?? '—';
                const iniciais = nome.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toUpperCase();
                
                const universidadeNome = p.universidade?.[0]?.nome ?? p.universidade?.nome ?? 'Não definida';
                const planoNome = p.plano?.[0]?.nome ?? p.plano?.nome ?? 'Sem plano';
                const estado = p.estado ?? 'pendente';

                return (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    {/* Student */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                          {iniciais}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{nome}</p>
                          <p className="text-xs text-slate-500">ID: {estudanteId.slice(0,8)}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-slate-700 dark:text-slate-300 truncate max-w-[150px]">{email}</p>
                        <p className="text-slate-500 text-xs">{telefone}</p>
                      </div>
                    </td>

                    {/* University */}
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-slate-900 dark:text-slate-300 font-medium">{universidadeNome}</p>
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700/40 dark:text-slate-300 dark:border-slate-600/30">
                        {planoNome}
                      </span>
                    </td>

                    {/* Visa Process Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border uppercase tracking-wider ${estadoStyles[estado] ?? estadoStyles.pendente}`}>
                        {estado.replace('_', ' ')}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <button
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-all flex items-center justify-center ml-auto"
                        title="View Profile"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      {processos.length > 0 && (
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/10">
          <p className="text-xs text-slate-500">A mostrar {processos.length} clientes</p>
        </div>
      )}
    </div>
  );
}
