const nextInstallments = [
    { month: "Dezembro", amount: "Kz 3.000.000,00" },
    { month: "Janeiro '24", amount: "Kz 3.000.000,00" },
    { month: "Fevereiro '24", amount: "Kz 1.150.000,00" },
];

export default function NextPayment() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Próximo Vencimento</h3>
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-red-500">calendar_month</span>
                    <span className="text-sm font-bold text-red-700 dark:text-red-400">10 Nov 2023</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-1">Taxa Consular</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">Kz 850.000,00</p>
            </div>
            <button className="w-full py-3 bg-primary hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2 mb-6">
                <span>Efetuar Pagamento</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
                <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase">Próximas Parcelas</h4>
                <div className="space-y-3">
                    {nextInstallments.map((inst) => (
                        <div key={inst.month} className="flex justify-between items-center text-sm">
                            <span className="text-slate-600 dark:text-slate-400">{inst.month}</span>
                            <span className="font-medium text-slate-900 dark:text-white">{inst.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
