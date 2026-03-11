export default function NextSteps() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-600 dark:text-yellow-400">
                    <span className="material-symbols-outlined">lightbulb</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Próximos Passos</h3>
            </div>
            <div className="flex flex-col gap-4 flex-1">
                <div className="flex gap-4 items-start p-4 rounded-lg bg-background-light dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                    <div className="mt-0.5">
                        <span className="material-symbols-outlined text-primary">radio_button_unchecked</span>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Assinar Formulário 123</h4>
                        <p className="text-xs text-slate-500 mt-1">O formulário de aplicação precisa da sua assinatura digital.</p>
                        <button className="mt-3 text-xs font-bold text-primary hover:text-blue-700 flex items-center gap-1">
                            Assinar Agora <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </button>
                    </div>
                </div>
                <div className="flex gap-4 items-start p-4 rounded-lg bg-background-light dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 opacity-60">
                    <div className="mt-0.5">
                        <span className="material-symbols-outlined text-slate-400">lock</span>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Agendar Biometria</h4>
                        <p className="text-xs text-slate-500 mt-1">Disponível após aprovação dos documentos.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
