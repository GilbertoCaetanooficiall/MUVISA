'use client';

import { TrendingUp, Info, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';
import type { Timeframe } from '@/app/admin/reports/ReportsClient';

// ─── Key insights (static mock logic depending on timeframe could be added, but keeping static for simplicity) ──────────────────────────────────────────────────────────────
const insights = [
  {
    icon: TrendingUp, iconClass: 'text-emerald-500',
    title: 'Mercado de Alto Crescimento', titleClass: 'text-emerald-500',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    body: 'As candidaturas do Brasil aumentaram <strong>30%</strong> neste trimestre, principalmente para programas de Engenharia.',
  },
  {
    icon: Info, iconClass: 'text-primary',
    title: 'Aumento de Eficiência', titleClass: 'text-primary',
    bg: 'bg-primary/10 border-primary/20',
    body: 'O tempo médio de processamento de vistos diminuiu <strong>4 dias</strong> após o novo sistema automático de verificação.',
  },
  {
    icon: AlertTriangle, iconClass: 'text-amber-500',
    title: 'Alerta de Capacidade', titleClass: 'text-amber-500',
    bg: 'bg-amber-500/10 border-amber-500/20',
    body: 'O "Mestrado em Gestão" da Universidade de Lisboa atingiu <strong>95% da capacidade</strong>. Sugira alternativas.',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ReportsCharts({ data, timeframe, setTimeframe }: { data: Record<string, unknown>, timeframe: Timeframe, setTimeframe: (t: Timeframe) => void }) {
  const chartData = data.chart as Record<string, string[]>;
  const barHeights = chartData.barHeights;
  const months = chartData.months;
  const plans = data.plans as { label: string; pct: string }[];
  const universities = data.universities as { name: string; apps: string; width: string }[];

  // Add dots mapping for donuts
  const getDotColors = (pctLabel: string) => {
    if (pctLabel === 'Premium') return 'bg-primary';
    if (pctLabel === 'Standard') return 'bg-emerald-500';
    return 'bg-slate-300 dark:bg-slate-700';
  };

  const getBarColor = (index: number) => {
    if (index === 0) return 'bg-primary';
    if (index === 1) return 'bg-primary/70';
    if (index === 2) return 'bg-primary/50';
    return 'bg-primary/30';
  };

  return (
    <div className="space-y-6">
      {/* ── Row 1: Area chart (col-span-2) + Donut ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area / column chart */}
        <div className="lg:col-span-2 bg-white dark:bg-card-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-slate-900 dark:text-white">Estudantes Enviados para Portugal</h4>
            <select 
              value={timeframe} 
              onChange={(e) => setTimeframe(e.target.value as Timeframe)}
              className="bg-slate-100 dark:bg-background-dark border-none rounded-lg text-xs font-bold py-1 px-2 focus:ring-1 focus:ring-primary text-slate-700 dark:text-slate-300"
            >
              <option value="12M">Últimos 12 Meses</option>
              <option value="YTD">Ano Inteiro (YTD)</option>
            </select>
          </div>

          {/* Chart bars */}
          <div className="h-64 flex items-end gap-2 px-2 relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between py-2 border-l border-slate-100 dark:border-slate-800">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-full border-t border-slate-100 dark:border-slate-800" />
              ))}
            </div>
            {/* Bars */}
            {barHeights.map((h: string, i: number) => (
              <div
                key={i}
                style={{ height: h }}
                className={`flex-1 rounded-t-sm relative group transition-all ${
                  i >= barHeights.length - 3 ? 'bg-primary/40' : 'bg-primary/20'
                } ${i === barHeights.length - 1 ? 'border-t-2 border-primary' : ''}`}
              >
                <div
                  className={`absolute -top-1 left-1/2 -translate-x-1/2 rounded-full bg-primary transition-all group-hover:scale-125 ${
                    i === barHeights.length - 1 ? 'w-3 h-3 ring-4 ring-primary/20' : 'w-2 h-2 ring-2 ring-white dark:ring-background-dark'
                  }`}
                />
              </div>
            ))}
          </div>
          {/* X axis labels */}
          <div className="flex justify-between mt-4 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            {months.map((m: string) => <span key={m}>{m}</span>)}
          </div>
        </div>

        {/* Donut chart */}
        <div className="bg-white dark:bg-card-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <h4 className="font-bold text-slate-900 dark:text-white mb-6">Planos de Serviço</h4>
          <div className="relative flex items-center justify-center py-4">
            <div className="size-48 rounded-full border-[18px] border-slate-100 dark:border-background-dark relative flex items-center justify-center">
              <div className="absolute inset-[-18px] rounded-full border-[18px] border-primary border-r-transparent border-b-transparent rotate-45 transition-all duration-500" />
              <div className="absolute inset-[-18px] rounded-full border-[18px] border-emerald-500 border-l-transparent border-t-transparent border-b-transparent -rotate-12 transition-all duration-500" />
              <div className="flex flex-col items-center">
                <span className="font-serif text-3xl font-black text-slate-900 dark:text-white">100%</span>
                <span className="text-[10px] uppercase text-slate-500 tracking-widest font-bold">Quota Total</span>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {plans.map((p: { label: string; pct: string }) => (
              <div key={p.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`size-3 rounded-full ${getDotColors(p.label)}`} />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{p.label}</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{p.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 2: Universities bars + Key Insights ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Universities horizontal bars */}
        <div className="bg-white dark:bg-card-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <h4 className="font-bold text-slate-900 dark:text-white mb-6">Universidades Mais Populares</h4>
          <div className="space-y-5">
            {universities.map((u: { name: string; apps: string; width: string }, i: number) => (
              <div key={u.name} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-tight text-slate-700 dark:text-slate-300">
                  <span>{u.name}</span>
                  <span>{u.apps}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-background-dark h-3 rounded-full overflow-hidden">
                  <div className={`${getBarColor(i)} h-full rounded-full transition-all duration-700 ease-out`} style={{ width: u.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-white dark:bg-card-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="text-primary" size={20} />
            <h4 className="font-bold text-slate-900 dark:text-white">Principais Insights</h4>
          </div>
          <div className="flex-1 space-y-4">
            {insights.map((ins) => (
              <div key={ins.title} className={`p-4 ${ins.bg} border rounded-lg flex gap-4`}>
                <ins.icon className={`${ins.iconClass} mt-1 flex-shrink-0`} size={20} />
                <div>
                  <p className={`text-sm font-bold ${ins.titleClass}`}>{ins.title}</p>
                  <p
                    className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: ins.body }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 text-primary text-sm font-bold hover:underline flex items-center gap-1 self-start">
            Ver Auditoria Completa
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
