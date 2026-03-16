import { TrendingUp, TrendingDown } from 'lucide-react';

// ─── Types────────────────────────────────────────────────────────────────────

interface Metric {
  label: string;
  value: string;
  trend: string;
  trendClass: string;
  trendIcon: React.ElementType;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const metrics: Metric[] = [
  { label: 'Total Revenue',          value: '$428,500', trend: '+12.5%', trendClass: 'text-emerald-500', trendIcon: TrendingUp },
  { label: 'New Students (Monthly)', value: '124',      trend: '+8.2%',  trendClass: 'text-emerald-500', trendIcon: TrendingUp },
  { label: 'Visa Approval Rate (%)', value: '92%',      trend: '+1.5%',  trendClass: 'text-emerald-500', trendIcon: TrendingUp },
  { label: 'Active Applications',    value: '1,840',    trend: '-2.1%',  trendClass: 'text-rose-500',    trendIcon: TrendingDown },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ReportsStats() {
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
