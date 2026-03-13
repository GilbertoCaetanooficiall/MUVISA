import { FileText, CreditCard, Clock, Info } from 'lucide-react';

import { LucideIcon } from 'lucide-react';

type Category = {
    icon: LucideIcon;
    label: string;
    sub: string;
    iconBg: string;
};

const categories: Category[] = [
    {
        icon: FileText,
        label: "Documentação",
        sub: "Traduções e envios",
        iconBg: "bg-primary/10 dark:bg-primary/20 text-primary group-hover:bg-primary/20 dark:group-hover:bg-primary/30",
    },
    {
        icon: CreditCard,
        label: "Pagamentos",
        sub: "Faturas e recibos",
        iconBg: "bg-green-50 dark:bg-green-900/20 text-green-600 group-hover:bg-green-100 dark:group-hover:bg-green-900/30",
    },
    {
        icon: Clock,
        label: "Prazos",
        sub: "Cronograma do visto",
        iconBg: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30",
    },
    {
        icon: Info,
        label: "Sobre o Visto",
        sub: "Regras e tipos",
        iconBg: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30",
    },
];

export default function SupportCategories() {
    return (
        <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Categorias Frequentes</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((cat) => (
                    <button
                        key={cat.label}
                        className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-md transition-all group text-left"
                    >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${cat.iconBg}`}>
                            {(() => {
                                const Icon = cat.icon;
                                return <Icon className="w-5 h-5" />;
                            })()}
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{cat.label}</h3>
                        <p className="text-xs text-slate-500 mt-1">{cat.sub}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
