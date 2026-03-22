'use client';
import { Download, FileText, ShieldCheck, Map, Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const agencyDocs = [
    { id: 'loa', title: "Letter of Acceptance (LOA)", icon: FileText, date: "20 Out" },
    { id: 'visto', title: "Cópia da Candidatura de Visto", icon: ShieldCheck, date: "15 Out" },
    { id: 'guia', title: "Guia de Chegada", icon: Map, date: "01 Out" },
];

export default function AgencyDocuments() {
    const [downloading, setDownloading] = useState<string | null>(null);
    const [downloaded, setDownloaded] = useState<string[]>([]);

    const handleDownload = (id: string, title: string) => {
        setDownloading(id);
        
        // Simulação de download
        setTimeout(() => {
            setDownloading(null);
            setDownloaded(prev => [...prev, id]);
            
            // Aqui seria a lógica real de download, ex:
            // window.open(`/api/docs/${id}.pdf`, '_blank');
            
            // Limpa o estado de "baixado" após alguns segundos para voltar ao ícone normal
            setTimeout(() => {
                setDownloaded(prev => prev.filter(item => item !== id));
            }, 3000);
        }, 1500);
    };

    return (
        <div className="flex flex-col gap-4 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Documentos da Agência</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agencyDocs.map((doc) => {
                    const isDownloading = downloading === doc.id;
                    const isDownloaded = downloaded.includes(doc.id);
                    
                    return (
                        <div
                            key={doc.id}
                            onClick={() => !isDownloading && handleDownload(doc.id, doc.title)}
                            className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-4 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
                        >
                            <div className="bg-primary/5 dark:bg-primary/10 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                                <doc.icon className="w-6 h-6" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h4 className="text-[13px] font-bold text-slate-900 dark:text-white truncate leading-tight">
                                    {doc.title}
                                </h4>
                                <p className="text-[11px] text-slate-500 mt-1 font-medium">
                                    Disponibilizado: {doc.date}
                                </p>
                            </div>

                            <div className="shrink-0 ml-2">
                                {isDownloading ? (
                                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                                ) : isDownloaded ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-500 animate-in zoom-in" />
                                ) : (
                                    <button className="text-slate-400 group-hover:text-primary transition-colors">
                                        <Download className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
