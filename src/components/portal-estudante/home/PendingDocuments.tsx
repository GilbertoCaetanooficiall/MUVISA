import { AlertCircle, FileText, Landmark, Upload } from 'lucide-react';
export default function PendingDocuments() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-500">
                        <AlertCircle />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pendências</h3>
                </div>
                <span className="text-xs font-medium bg-red-100 text-red-600 px-2 py-1 rounded">2 Ações</span>
            </div>
            <div className="flex flex-col gap-4 flex-1">
                {/* Doc Item 1 */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
                            <FileText />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">Passaporte (Cópia)</p>
                            <p className="text-xs text-slate-500">Página de identificação</p>
                        </div>
                    </div>
                    <button className="px-3 py-1.5 text-xs font-bold bg-primary text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1">
                        <Upload className="text-[14px]" /> Enviar
                    </button>
                </div>
                {/* Doc Item 2 */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
                            <Landmark />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">Extrato Bancário</p>
                            <p className="text-xs text-slate-500">Últimos 3 meses</p>
                        </div>
                    </div>
                    <button className="px-3 py-1.5 text-xs font-bold bg-white border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1">
                        <Upload className="text-[14px]" /> Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}
