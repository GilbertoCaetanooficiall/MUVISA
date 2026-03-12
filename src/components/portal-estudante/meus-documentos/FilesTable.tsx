import { Download, Eye, Trash2, FileText, Image as ImageIcon, LucideIcon } from 'lucide-react';
type StatusBadge = "Aprovado" | "Em Revisão" | "Pendente";

const statusStyles: Record<StatusBadge, string> = {
    Aprovado: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    "Em Revisão": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    Pendente: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
};

interface Doc {
    name: string;
    icon: LucideIcon;
    iconColor: string;
    status: StatusBadge;
    date: string;
    canDelete?: boolean;
}

const documents: Doc[] = [
    { name: "Cópia do Passaporte.pdf", icon: FileText, iconColor: "text-red-500", status: "Aprovado", date: "12 Out 2023" },
    { name: "Foto 3x4.jpg", icon: ImageIcon, iconColor: "text-blue-500", status: "Em Revisão", date: "15 Out 2023" },
    { name: "Extrato Bancário.pdf", icon: FileText, iconColor: "text-red-500", status: "Pendente", date: "Ontem", canDelete: true },
    { name: "Diploma Traduzido.pdf", icon: FileText, iconColor: "text-red-500", status: "Aprovado", date: "10 Out 2023" },
];

export default function FilesTable() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Meus Arquivos</h3>
                <button className="text-sm text-primary font-medium hover:underline">Ver todos</button>
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
                        {documents.map((doc) => (
                            <tr key={doc.name} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
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
                                        <button className="p-1 hover:text-primary transition-colors">
                                            <Eye className="text-[18px]" />
                                        </button>
                                        <button className="p-1 hover:text-primary transition-colors">
                                            <Download className="text-[18px]" />
                                        </button>
                                        {doc.canDelete && (
                                            <button className="p-1 hover:text-red-600 transition-colors">
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
