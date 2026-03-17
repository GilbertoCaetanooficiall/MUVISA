import { Landmark, CreditCard, Clock, TrendingUp } from 'lucide-react';

interface FinancialSummaryProps {
  totalPago: number;
  totalPendente: number;
}

function formatEUR(value: number): string {
  return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(value);
}

export default function FinancialSummary({ totalPago, totalPendente }: FinancialSummaryProps) {
  const totalContratado = totalPago + totalPendente;
  const percPago = totalContratado > 0 ? Math.round((totalPago / totalContratado) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-500 text-sm font-medium">Total do Plano</h3>
          <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary">
            <Landmark className="w-5 h-5" />
          </div>
        </div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatEUR(totalContratado)}</p>
        <p className="text-xs mt-1 text-slate-400">Valor contratado</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-500 text-sm font-medium">Valor Pago</h3>
          <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatEUR(totalPago)}</p>
        <p className="text-xs mt-1 text-green-500 flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          {percPago}% quitado
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-500 text-sm font-medium">Saldo Devedor</h3>
          <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatEUR(totalPendente)}</p>
        <p className="text-xs mt-1 text-slate-400">Restante a pagar</p>
      </div>
    </div>
  );
}
