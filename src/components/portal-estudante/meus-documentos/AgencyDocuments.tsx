const agencyDocs = [
    { title: "Letter of Acceptance (LOA)", icon: "description", date: "20 Out" },
    { title: "Cópia da Aplicação de Visto", icon: "verified_user", date: "15 Out" },
    { title: "Guia de Chegada", icon: "map", date: "01 Out" },
];

export default function AgencyDocuments() {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Documentos da Agência</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agencyDocs.map((doc) => (
                    <div
                        key={doc.title}
                        className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2.5 rounded-lg text-indigo-600">
                            <span className="material-symbols-outlined">{doc.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{doc.title}</h4>
                            <p className="text-xs text-slate-500 mt-0.5">Disponibilizado: {doc.date}</p>
                        </div>
                        <button className="text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[20px]">download</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
