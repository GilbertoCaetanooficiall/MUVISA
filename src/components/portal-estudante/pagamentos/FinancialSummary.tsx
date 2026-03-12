import { Landmark, CreditCard, Clock, TrendingUp, LucideIcon } from 'lucide-react';

type Stat = {
    label: string;
    value: string;
    sub: string;
    subColor: string;
    icon: LucideIcon;
    iconBg: string;
    subIcon?: LucideIcon;
};

const stats: Stat[] = [
    {
        label: "Total do Plano",
        value: "Kz 12.500.000,00",
        sub: "Valor contratado",
        subColor: "text-slate-400",
        icon: Landmark,
        iconBg: "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
    },
    {
        label: "Valor Pago",
        value: "Kz 4.500.000,00",
        sub: "36% quitado",
        subColor: "text-green-500",
        subIcon: TrendingUp,
        icon: CreditCard,
        iconBg: "bg-green-50 dark:bg-green-900/20 text-green-600",
    },
    {
        label: "Saldo Devedor",
        value: "Kz 8.000.000,00",
        sub: "Restante a pagar",
        subColor: "text-slate-400",
        icon: Clock,
        iconBg: "bg-orange-50 dark:bg-orange-900/20 text-orange-600",
    },
];

export default function FinancialSummary() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat) => (
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
