// ─── Types ────────────────────────────────────────────────────────────────────

interface MetricCard {
  label: string;
  value: string;
  badge: string;
  badgeClass: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const metrics: MetricCard[] = [
  {
    label: 'Total de Planos',
    value: '14',
    badge: 'Toda as Categorias',
    badgeClass: 'bg-primary/10 text-primary',
  },
  {
    label: 'Subscrições Ativas',
    value: '1.240',
    badge: '+12% vs mês ant.',
    badgeClass: 'bg-green-500/10 text-green-500',
  },
  {
    label: 'Preço Médio do Plano',
    value: '150.000 Kz',
    badge: 'Mensal',
    badgeClass: 'bg-blue-500/10 text-blue-500',
  },
  {
    label: 'Planos em Rascunho',
    value: '3',
    badge: 'Em progresso',
    badgeClass: 'bg-amber-500/10 text-amber-500',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PlansStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{m.label}</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white leading-none">{m.value}</h3>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${m.badgeClass}`}>
              {m.badge}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
