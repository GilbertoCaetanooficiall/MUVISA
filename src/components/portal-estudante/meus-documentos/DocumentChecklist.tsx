const categories = [
    { label: "Documentos", color: "bg-primary", value: "2/3" },
];

export default function DocumentChecklist({ documentos = [] }: { documentos?: any[] }) {
    const totalRequired = 10;
    const count = documentos.length;
    const progress = Math.min(100, Math.round((count / totalRequired) * 100));
    const dashoffset = 251.2 - ((251.2 * progress) / 100);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">
                Checklist de Documentação
            </h3>
            <div className="flex flex-col items-center justify-center mb-6 relative">
                <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                            className="text-slate-100 dark:text-slate-800 stroke-current"
                            cx="50" cy="50" fill="transparent" r="40" strokeWidth="8"
                        />
                        <circle
                            className="text-primary stroke-current"
                            cx="50" cy="50" fill="transparent" r="40"
                            strokeDasharray="251.2"
                            strokeDashoffset={dashoffset}
                            strokeLinecap="round"
                            strokeWidth="8"
                            transform="rotate(-90 50 50)"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">{progress}%</span>
                    </div>
                </div>
                <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300">
                    {count} de {totalRequired} documentos enviados
                </p>
            </div>
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-xs text-slate-500 flex-1">Enviados</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{count}/{count || totalRequired}</span>
                </div>
            </div>
        </div>
    );
}
