import { Download, Eye, FileText, Image as ImageIcon } from 'lucide-react';

const statusStyles: Record<string, string> = {
    aprovado: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    enviado: "bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary",
    pendente: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    rejeitado: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const statusLabels: Record<string, string> = {
    aprovado: "Aprovado",
    enviado: "Em Revisão",
    pendente: "Pendente",
    rejeitado: "Rejeitado",
};

export default function FilesTable({ documentos = [] }: { documentos?: any[] }) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Meus Arquivos</h3>
                <button className="text-sm text-primary font-medium hover:underline">Ver todos</button>
            </div>
            {documentos.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                    Nenhum documento enviado ainda.
                </div>
            ) : (
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
                            {documentos.map((doc) => {
                                const isImage = doc.ficheiro_url?.match(/\.(jpg|jpeg|png|webp)$/i);
                                const Icon = isImage ? ImageIcon : FileText;
                                const iconColor = isImage ? "text-primary" : "text-red-500";
                                const statusClass = statusStyles[doc.estado] || statusStyles.pendente;
                                const statusLabel = statusLabels[doc.estado] || "Pendente";
                                const dateFormatted = doc.enviado_em ? new Date(doc.enviado_em).toLocaleDateString('pt-PT') : '-';

                                return (
                                    <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                            <div className="flex items-center gap-3">
                                                <Icon className={`w-5 h-5 ${iconColor}`} />
                                                <span className="truncate max-w-[200px]" title={doc.nome}>{doc.nome}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
                                                {statusLabel}
                                            </span>
                                            {doc.estado === 'rejeitado' && doc.motivo_rejeicao && (
                                                <p className="text-xs text-red-500 mt-1 max-w-xs">{doc.motivo_rejeicao}</p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">{dateFormatted}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {doc.ficheiro_url && (
                                                    <>
                                                        <a href={doc.ficheiro_url} target="_blank" rel="noopener noreferrer" className="p-1 hover:text-primary transition-colors inline-block">
                                                            <Eye className="text-[18px]" />
                                                        </a>
                                                        <a href={doc.ficheiro_url} download className="p-1 hover:text-primary transition-colors inline-block">
                                                            <Download className="text-[18px]" />
                                                        </a>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
