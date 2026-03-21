import { Payment } from '@/app/admin/payments/PaymentsClient';
import { CreditCard, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

interface PaymentsStatsProps {
  payments: Payment[];
}

export default function PaymentsStats({ payments }: PaymentsStatsProps) {
  // Mock logic to calculate stats based on the payments
  const totalPagos = payments.filter(p => p.status === 'Pago').length;
  // This is a naive calculation just for visual purposes. In a real app we would sum the amounts properly.
  
  const stats = [
    {
      title: 'Total Recebido (Mês)',
      value: '2.400.000 Kz',
      icon: TrendingUp,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      title: 'Pagamentos Pendentes',
      value: '700.000 Kz',
      icon: CreditCard,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Atrasados',
      value: '1.000.000 Kz',
      icon: AlertCircle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      title: 'Reembolsos',
      value: '350.000 Kz',
      icon: RefreshCw,
      color: 'text-slate-500',
      bgColor: 'bg-slate-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white dark:bg-card-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className={`p-3 rounded-lg ${stat.bgColor}`}>
            <stat.icon className={`h-6 w-6 ${stat.color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
