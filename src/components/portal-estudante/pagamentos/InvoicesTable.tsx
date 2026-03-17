import { Filter, Lock, Receipt } from 'lucide-react';

interface Pagamento {
  id: string;
  descricao: string;
  valor: number;
  estado: string;
  criado_em: string;
  data_vencimento?: string | null;
}

interface InvoicesTableProps {
  pagamentos: Pagamento[];
}

function formatEUR(value: number): string {
  return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(value);
}

function formatData(dateStr: string | null | undefined): string {
  if (!dateStr) return '—';
  try {
    return new Intl.DateTimeFormat('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(dateStr));
  } catch { return dateStr; }
}

const statusLabel: Record<string, string> = {
  confirmado: 'Pago',
  pendente: 'Pendente',
  cancelado: 'Cancelado',
};

const statusStyles: Record<string, string> = {
  confirmado: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  pendente: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  cancelado: 'bg-slate-100 text-slate-500',
};

export default function InvoicesTable({ pagamentos }: InvoicesTableProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">As Minhas Facturas</h3>
        <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
          <Filter className="w-4 h-4" /> Filtrar
        </button>
      </div>
      {pagamentos.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-sm text-slate-500">Ainda não existem pagamentos registados.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase font-semibold text-slate-500">
              <tr>
                <th className="px-6 py-4">Descrição</th>
                <th className="px-6 py-4">Vencimento</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Acções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {pagamentos.map((pag) => (
                <tr
                  key={pag.id}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                    pag.estado === 'pendente' ? 'bg-orange-50/50 dark:bg-orange-900/5' : ''
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{pag.descricao}</td>
                  <td className={`px-6 py-4 ${pag.estado === 'pendente' ? 'text-orange-600 dark:text-orange-400 font-medium' : ''}`}>
                    {formatData(pag.data_vencimento ?? pag.criado_em)}
                  </td>
                  <td className="px-6 py-4 font-semibold">{formatEUR(pag.valor)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[pag.estado] ?? ''}`}>
                      {statusLabel[pag.estado] ?? pag.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {pag.estado === 'confirmado' ? (
                      <button className="text-slate-500 hover:text-primary transition-colors flex items-center justify-end gap-1 ml-auto text-xs">
                        <Receipt className="w-4 h-4" /> Recibo
                      </button>
                    ) : pag.estado === 'pendente' ? (
                      <button className="bg-primary text-white hover:bg-primary-hover px-3 py-1.5 rounded text-xs font-medium transition-colors">
                        Pagar Agora
                      </button>
                    ) : (
                      <button className="text-slate-400 cursor-not-allowed flex items-center justify-end gap-1 ml-auto text-xs" disabled>
                        <Lock className="w-4 h-4" /> Aguardando
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
