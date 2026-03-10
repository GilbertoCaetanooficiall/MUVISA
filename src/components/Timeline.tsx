export default function Timeline() {
    return (
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Linha do Tempo</h3>
            <div className="space-y-6 pl-2">
                {/* Timeline Item */}
                <div className="flex gap-4 relative">
                    <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-primary rounded-full z-10 ring-4 ring-white dark:ring-slate-900"></div>
                        <div className="w-0.5 bg-slate-200 dark:bg-slate-700 h-full absolute top-3"></div>
                    </div>
                    <div className="pb-6">
                        <p className="text-xs text-slate-400 font-medium mb-1">15 Outubro, 2023 - 14:30</p>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Pagamento Confirmado</h4>
                        <p className="text-sm text-slate-500 mt-1">A taxa de assessoria foi processada com sucesso.</p>
                    </div>
                </div>
                {/* Timeline Item */}
                <div className="flex gap-4 relative">
                    <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-full z-10 ring-4 ring-white dark:ring-slate-900"></div>
                        <div className="w-0.5 bg-slate-200 dark:bg-slate-700 h-full absolute top-3"></div>
                    </div>
                    <div className="pb-6">
                        <p className="text-xs text-slate-400 font-medium mb-1">12 Outubro, 2023 - 09:15</p>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Perfil Criado</h4>
                        <p className="text-sm text-slate-500 mt-1">Bem-vinda ao portal do estudante!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
