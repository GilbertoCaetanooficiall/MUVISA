export default function ProcessStepper() {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Status da Aplicação</h3>
                <span className="bg-blue-50 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mt-2 md:mt-0">Em Andamento</span>
            </div>
            <div className="relative">
                <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 -z-0 rounded-full hidden md:block"></div>
                <div className="flex flex-col md:flex-row justify-between relative z-10 gap-6 md:gap-0">
                    <div className="flex md:flex-col items-center gap-4 md:gap-2 group flex-1">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 shrink-0">
                            <span className="material-symbols-outlined text-xl">check</span>
                        </div>
                        <div className="flex flex-col md:items-center">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">Coleta de Dados</span>
                            <span className="text-xs text-slate-500">Concluído</span>
                        </div>
                    </div>
                    <div className="md:hidden absolute left-[19px] top-8 bottom-8 w-0.5 bg-slate-200 -z-10"></div>
                    <div className="flex md:flex-col items-center gap-4 md:gap-2 group flex-1">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 shrink-0">
                            <span className="material-symbols-outlined text-xl">check</span>
                        </div>
                        <div className="flex flex-col md:items-center">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">Documentos</span>
                            <span className="text-xs text-slate-500">Enviados</span>
                        </div>
                    </div>
                    <div className="flex md:flex-col items-center gap-4 md:gap-2 group flex-1">
                        <div className="w-10 h-10 rounded-full bg-white border-4 border-primary flex items-center justify-center text-primary shrink-0 relative">
                            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
                        </div>
                        <div className="flex flex-col md:items-center">
                            <span className="text-sm font-bold text-primary">Aplicação</span>
                            <span className="text-xs text-primary font-medium">Em Análise</span>
                        </div>
                    </div>
                    <div className="flex md:flex-col items-center gap-4 md:gap-2 group flex-1 opacity-50">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                            <span className="text-sm font-bold">4</span>
                        </div>
                        <div className="flex flex-col md:items-center">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">Biometria</span>
                            <span className="text-xs text-slate-500">Pendente</span>
                        </div>
                    </div>
                    <div className="flex md:flex-col items-center gap-4 md:gap-2 group flex-1 opacity-50">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                            <span className="text-sm font-bold">5</span>
                        </div>
                        <div className="flex flex-col md:items-center">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">Visto Emitido</span>
                            <span className="text-xs text-slate-500">Aguardando</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
