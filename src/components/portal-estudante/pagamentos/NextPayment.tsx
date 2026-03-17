import { ArrowRight, CalendarDays } from 'lucide-react';

interface Pagamento {
  id: string;
  descricao: string;
  valor: number;
  estado: string;
  data_vencimento?: string | null;
  criado_em: string;
}

interface NextPaymentProps {
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

export default function NextPayment({ pagamentos }: NextPaymentProps) {
  const pendentes = pagamentos
    .filter((p) => p.estado === 'pendente')
    .sort((a, b) => new Date(a.data_vencimento ?? a.criado_em).getTime() - new Date(b.data_vencimento ?? b.criado_em).getTime());

  const proximo = pendentes[0] ?? null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Próximo Vencimento</h3>
      {proximo ? (
        <>
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <CalendarDays className="text-red-500 w-5 h-5" />
              <span className="text-sm font-bold text-red-700 dark:text-red-400">
                {formatData(proximo.data_vencimento ?? proximo.criado_em)}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-1">{proximo.descricao}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatEUR(proximo.valor)}</p>
          </div>
          <button className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-lg shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2 mb-6">
            <span>Efectuar Pagamento</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          {pendentes.length > 1 && (
            <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
              <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase">Próximas Parcelas</h4>
              <div className="space-y-3">
                {pendentes.slice(1, 4).map((p) => (
                  <div key={p.id} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 dark:text-slate-400">{formatData(p.data_vencimento ?? p.criado_em)}</span>
                    <span className="font-medium text-slate-900 dark:text-white">{formatEUR(p.valor)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-4">
          <p className="text-sm text-green-600 font-medium">✅ Sem pagamentos pendentes!</p>
        </div>
      )}
    </div>
  );
}
