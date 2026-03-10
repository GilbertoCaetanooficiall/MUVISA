const methods = [
    {
        icon: "credit_card",
        iconColor: "text-slate-400",
        badge: "PRINCIPAL",
        badgeStyle: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        title: null,
        subtitle: "Mastercard terminado em",
        info: "•••• 8834",
        extra: "Expira em 12/28",
        mono: true,
    },
    {
        icon: "qr_code_2",
        iconColor: "text-teal-500",
        badge: null,
        title: "Pix",
        subtitle: "Pagamento instantâneo",
        extra: "5% de desconto à vista",
        extraColor: "text-green-600",
        mono: false,
    },
    {
        icon: "barcode",
        iconColor: "text-slate-400",
        badge: null,
        title: "Boleto Bancário",
        subtitle: "Processamento em até 3 dias úteis",
        mono: false,
    },
];

export default function PaymentMethods() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Métodos de Pagamento</h3>
                <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Adicionar Novo
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {methods.map((m, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between h-40 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors cursor-pointer"
                    >
                        <div className="flex justify-between items-start z-10 relative">
                            <span className={`material-symbols-outlined text-3xl ${m.iconColor}`}>{m.icon}</span>
                            {m.badge && (
                                <span className={`text-[10px] font-bold px-2 py-1 rounded ${m.badgeStyle}`}>{m.badge}</span>
                            )}
                        </div>
                        <div className="z-10 relative">
                            {m.title && <h4 className="text-slate-900 dark:text-white font-bold">{m.title}</h4>}
                            {m.subtitle && <p className="text-slate-500 text-xs mt-1">{m.subtitle}</p>}
                            {m.info && (
                                <p className={`text-slate-900 dark:text-white text-lg font-semibold ${m.mono ? "font-mono" : ""}`}>
                                    {m.info}
                                </p>
                            )}
                            {m.extra && (
                                <p className={`text-xs mt-1 ${m.extraColor ?? "text-slate-400"}`}>{m.extra}</p>
                            )}
                        </div>
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-slate-50 dark:bg-slate-800 rounded-full opacity-50 group-hover:bg-primary/5 transition-colors"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
