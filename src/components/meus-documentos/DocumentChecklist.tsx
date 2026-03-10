const categories = [
    { label: "Identificação Pessoal", color: "bg-green-500", value: "2/2" },
    { label: "Acadêmico", color: "bg-green-500", value: "3/3" },
    { label: "Financeiro", color: "bg-blue-500", value: "1/3" },
    { label: "Vínculos", color: "bg-orange-400", value: "2/4" },
];

export default function DocumentChecklist() {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
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
                            strokeDashoffset="85"
                            strokeLinecap="round"
                            strokeWidth="8"
                            transform="rotate(-90 50 50)"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">66%</span>
                    </div>
                </div>
                <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300">
                    8 de 12 documentos enviados
                </p>
            </div>
            <div className="space-y-3">
                {categories.map((cat) => (
                    <div key={cat.label} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${cat.color}`}></div>
                        <span className="text-xs text-slate-500 flex-1">{cat.label}</span>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{cat.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
