export default function VisaSummary() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Resumo do Visto</h3>
            <div className="bg-primary/5 rounded-lg p-4 mb-4 border border-primary/10">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-primary uppercase">Tipo de Visto</span>
                    <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                </div>
                <h4 className="text-xl font-bold text-primary">Study Permit</h4>
                <p className="text-xs text-primary/70 mt-1">Permissão de Estudos + Trabalho (20h)</p>
            </div>
            <div className="space-y-4 pt-2">
                <div>
                    <div className="flex justify-between items-end mb-1">
                        <p className="text-xs text-slate-500 font-medium">Tempo Médio Atual</p>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">12 Semanas</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 text-right">Atualizado hoje pelo IRCC</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                        <p className="text-[10px] text-slate-500 uppercase">Validade</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">2 Anos</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                        <p className="text-[10px] text-slate-500 uppercase">Entradas</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Múltiplas</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
