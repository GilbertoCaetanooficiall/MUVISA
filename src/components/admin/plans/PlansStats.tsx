import type { Plan } from '@/app/admin/plans/PlansClient';

interface MetricCard {
  label: string;
  value: string | number;
  badge: string;
  badgeClass: string;
}

export default function PlansStats({ plans }: { plans: Plan[] }) {
  const totalPlanos = plans.length;
  // Subscrições reais seriam puxadas do backend - aqui usamos mock estático
  const subscricoesAtivas = '1.240'; 
  
  // Calcular preço médio dos publicados
  const publicados = plans.filter(p => p.status === 'Publicado');
  let avgPriceKz = 0;
  if (publicados.length > 0) {
    const totalSoma = publicados.reduce((acc, p) => {
      // Simplificado: extrai números e converte. Assumimos Kz no formato 150.000 / 150000
      const valor = parseInt(p.price.replace(/\D/g, '')) || 0;
      return acc + valor;
    }, 0);
    avgPriceKz = Math.round(totalSoma / publicados.length);
  }
  
  const formattedAvg = avgPriceKz.toLocaleString('pt-PT') + ' Kz';

  const rascunhos = plans.filter(p => p.status === 'Rascunho').length;

  const metrics: MetricCard[] = [
    {
      label: 'Total de Planos',
      value: totalPlanos,
      badge: 'Todas as Categorias',
      badgeClass: 'bg-primary/10 text-primary',
    },
    {
      label: 'Subscrições Ativas',
      value: subscricoesAtivas,
      badge: '+12% vs mês ant.',
      badgeClass: 'bg-green-500/10 text-green-500',
    },
    {
      label: 'Preço Médio do Plano',
      value: formattedAvg,
      badge: 'Publicados',
      badgeClass: 'bg-blue-500/10 text-blue-500',
    },
    {
      label: 'Planos em Rascunho',
      value: rascunhos,
      badge: 'Em progresso',
      badgeClass: 'bg-amber-500/10 text-amber-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{m.label}</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="font-serif text-3xl font-bold text-slate-900 dark:text-white leading-none">{m.value}</h3>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${m.badgeClass}`}>
              {m.badge}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
