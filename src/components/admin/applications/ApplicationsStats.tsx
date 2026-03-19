import { FileText, RefreshCw, CheckCircle2, XCircle, TrendingUp, TrendingDown } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatItem {
  icon: React.ElementType;
  iconClass: string;
  label: string;
  value: string;
  trend: string;
  trendClass: string;
  trendIcon: React.ElementType;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats: StatItem[] = [
  {
    icon: FileText,   iconClass: 'bg-primary/10 text-primary',
    label: 'Total de Candidaturas', value: '1.284',
    trend: '+12%', trendClass: 'text-emerald-500', trendIcon: TrendingUp,
  },
  {
    icon: RefreshCw,          iconClass: 'bg-blue-500/10 text-blue-500',
    label: 'Em Processamento',        value: '456',
    trend: '+5%',  trendClass: 'text-emerald-500', trendIcon: TrendingUp,
  },
  {
    icon: CheckCircle2,  iconClass: 'bg-emerald-500/10 text-emerald-500',
    label: 'Aceites',           value: '612',
    trend: '-2%',  trendClass: 'text-rose-500',    trendIcon: TrendingDown,
  },
  {
    icon: XCircle,        iconClass: 'bg-rose-500/10 text-rose-500',
    label: 'Rejeitadas',           value: '216',
    trend: '+8%',  trendClass: 'text-emerald-500', trendIcon: TrendingUp,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ApplicationsStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white dark:bg-card-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${s.iconClass}`}>
              <s.icon size={20} />
            </div>
            <span className={`text-xs font-bold flex items-center gap-0.5 ${s.trendClass}`}>
              {s.trend}
              <s.trendIcon size={12} />
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium">{s.label}</p>
          <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{s.value}</h3>
        </div>
      ))}
    </div>
  );
}
