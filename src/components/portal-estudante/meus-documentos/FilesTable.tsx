'use client';
import { useState } from 'react';
import { Download, Eye, Trash2, FileText, Image as ImageIcon, LucideIcon, X } from 'lucide-react';

type StatusBadge = "Aprovado" | "Em Revisão" | "Pendente";

const statusStyles: Record<StatusBadge, string> = {
    Aprovado: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    "Em Revisão": "bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary",
    Pendente: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
};

interface Doc {
    id: string;
    name: string;
    icon: LucideIcon;
    iconColor: string;
    status: StatusBadge;
    date: string;
    canDelete?: boolean;
}

const initialDocuments: Doc[] = [
    { id: '1', name: "Cópia do Passaporte.pdf", icon: FileText, iconColor: "text-red-500", status: "Aprovado", date: "12 Out 2023" },
    { id: '2', name: "Foto 3x4.jpg", icon: ImageIcon, iconColor: "text-primary", status: "Em Revisão", date: "15 Out 2023" },
    { id: '3', name: "Extrato Bancário.pdf", icon: FileText, iconColor: "text-red-500", status: "Pendente", date: "Ontem", canDelete: true },
    { id: '4', name: "Diploma Traduzido.pdf", icon: FileText, iconColor: "text-red-500", status: "Aprovado", date: "10 Out 2023" },
];

type ToastType = { message: string; type: 'success' | 'info' | 'error' };

export default function FilesTable() {
    const [docs, setDocs] = useState<Doc[]>(initialDocuments);
    const [toast, setToast] = useState<ToastType | null>(null);
    const [showAll, setShowAll] = useState(false);

    const showToast = (message: string, type: ToastType['type'] = 'info') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleView = (doc: Doc) => {
        showToast(`A abrir pré-visualização de "${doc.name}"...`, 'info');
    };

    const handleDownload = (doc: Doc) => {
        showToast(`A descarregar "${doc.name}"...`, 'success');
    };

    const handleDelete = (doc: Doc) => {
        if (confirm(`Tem a certeza que quer remover "${doc.name}"?`)) {
            setDocs(prev => prev.filter(d => d.id !== doc.id));
            showToast(`"${doc.name}" removido.`, 'error');
        }
    };

    const displayed = showAll ? docs : docs.slice(0, 4);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden relative">
            {/* Toast */}
            {toast && (
                <div className={`absolute top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg text-sm font-medium transition-all animate-fade-in ${
                    toast.type === 'success' ? 'bg-green-500 text-white' :
                    toast.type === 'error' ? 'bg-red-500 text-white' :
                    'bg-slate-900 text-white'
                }`}>
                    {toast.message}
                    <button onClick={() => setToast(null)}><X size={14} /></button>
                </div>
            )}

            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Meus Arquivos</h3>
                <button
                    onClick={() => setShowAll(v => !v)}
                    className="text-sm text-primary font-medium hover:underline"
                >
                    {showAll ? 'Ver menos' : 'Ver todos'}
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase font-semibold text-slate-500">
                        <tr>
                            <th className="px-6 py-4">Nome do Documento</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Data de Envio</th>
                            <th className="px-6 py-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {displayed.map((doc) => (
                            <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                    <div className="flex items-center gap-3">
                                        <doc.icon className={`w-5 h-5 ${doc.iconColor}`} />
                                        {doc.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[doc.status]}`}>
                                        {doc.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{doc.date}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => handleView(doc)}
                                            className="p-1 hover:text-primary transition-colors"
                                            title="Visualizar"
                                        >
                                            <Eye className="text-[18px]" />
                                        </button>
                                        <button
                                            onClick={() => handleDownload(doc)}
                                            className="p-1 hover:text-primary transition-colors"
                                            title="Descarregar"
                                        >
                                            <Download className="text-[18px]" />
                                        </button>
                                        {doc.canDelete && (
                                            <button
                                                onClick={() => handleDelete(doc)}
                                                className="p-1 hover:text-red-600 transition-colors"
                                                title="Remover"
                                            >
                                                <Trash2 className="text-[18px]" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
