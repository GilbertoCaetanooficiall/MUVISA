import { TrendingUp, TrendingDown } from 'lucide-react';

// ─── Component ────────────────────────────────────────────────────────────────

export default function ReportsStats({ data }: { data: Record<string, { value: string; trend: string; isUp: boolean }> }) {
  const metrics = [
    { 
      label: 'Receita Total', 
      value: data.receita.value, 
      trend: data.receita.trend, 
      trendClass: data.receita.isUp ? 'text-emerald-500' : 'text-rose-500', 
      trendIcon: data.receita.isUp ? TrendingUp : TrendingDown 
    },
    { 
      label: 'Novos Estudantes (Mensal)', 
      value: data.novosEstudantes.value, 
      trend: data.novosEstudantes.trend, 
      trendClass: data.novosEstudantes.isUp ? 'text-emerald-500' : 'text-rose-500', 
      trendIcon: data.novosEstudantes.isUp ? TrendingUp : TrendingDown 
    },
    { 
      label: 'Taxa de Aprovação de Visto (%)', 
      value: data.taxaVisto.value, 
      trend: data.taxaVisto.trend, 
      trendClass: data.taxaVisto.isUp ? 'text-emerald-500' : 'text-rose-500', 
      trendIcon: data.taxaVisto.isUp ? TrendingUp : TrendingDown 
    },
    { 
      label: 'Candidaturas Ativas', 
      value: data.candidaturasAtivas.value, 
      trend: data.candidaturasAtivas.trend, 
      trendClass: data.candidaturasAtivas.isUp ? 'text-emerald-500' : 'text-rose-500', 
      trendIcon: data.candidaturasAtivas.isUp ? TrendingUp : TrendingDown 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="bg-white dark:bg-card-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{m.label}</p>
          <div className="mt-2 flex items-end justify-between">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{m.value}</h3>
            <span className={`text-xs font-bold flex items-center gap-0.5 ${m.trendClass}`}>
              <m.trendIcon size={12} />
              {m.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
