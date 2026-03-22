'use client';
import { useEffect, useState } from 'react';
import { Landmark as LandmarkIcon, CreditCard as CreditCardIcon, Clock as ClockIcon, TrendingUp as TrendingUpIcon } from 'lucide-react';

export default function FinancialSummary() {
    const [stats, setStats] = useState({
        total: "Kz 12.500.000,00",
        pago: "Kz 4.500.000,00",
        saldo: "Kz 8.000.000,00",
        percent: "36% quitado"
    });

    useEffect(() => {
        const handler = (e: Event) => {
            const data = (e as CustomEvent).detail;
            if (data) {
                setStats(data);
            }
        };
        window.addEventListener('atualizarResumoFinanceiro', handler);
        return () => window.removeEventListener('atualizarResumoFinanceiro', handler);
    }, []);

    const cards = [
        {
            label: "Total do Plano",
            value: stats.total,
            sub: "Valor contratado",
            subColor: "text-slate-400",
            icon: LandmarkIcon,
            iconBg: "bg-primary/10 dark:bg-primary/20 text-primary",
        },
        {
            label: "Valor Pago",
            value: stats.pago,
            sub: stats.percent,
            subColor: "text-green-500",
            subIcon: TrendingUpIcon,
            icon: CreditCardIcon,
            iconBg: "bg-green-50 dark:bg-green-900/20 text-green-600",
        },
        {
            label: "Saldo Devedor",
            value: stats.saldo,
            sub: "Restante a pagar",
            subColor: "text-slate-400",
            icon: ClockIcon,
            iconBg: "bg-orange-50 dark:bg-orange-900/20 text-orange-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((stat) => (
                <div
                    key={stat.label}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
                        <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    <p className={`text-xs mt-1 flex items-center gap-1 ${stat.subColor}`}>
                        {stat.subIcon && (
                            <stat.subIcon className="w-4 h-4" />
                        )}
                        {stat.sub}
                    </p>
                </div>
            ))}
        </div>
    );
}
