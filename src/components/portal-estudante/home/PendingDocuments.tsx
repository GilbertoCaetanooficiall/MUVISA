'use client';
import { AlertCircle, FileText, Landmark, Upload, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';

const initialDocs = [
    {
        id: 'passport',
        icon: FileText,
        label: 'Passaporte (Cópia)',
        sublabel: 'Página de identificação',
        primary: true,
    },
    {
        id: 'bank',
        icon: Landmark,
        label: 'Extrato Bancário',
        sublabel: 'Últimos 3 meses',
        primary: false,
    },
];

export default function PendingDocuments() {
    const [uploadedIds, setUploadedIds] = useState<string[]>([]);
    const [uploadingId, setUploadingId] = useState<string | null>(null);

    const handleUpload = (id: string) => {
        setUploadingId(id);
        setTimeout(() => {
            setUploadedIds(prev => [...prev, id]);
            setUploadingId(null);
        }, 1200);
    };

    const remaining = initialDocs.filter(d => !uploadedIds.includes(d.id));
    const uploaded = initialDocs.filter(d => uploadedIds.includes(d.id));

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-500">
                        <AlertCircle />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pendências</h3>
                </div>
                {remaining.length > 0 ? (
                    <span className="text-xs font-medium bg-red-100 text-red-600 px-2 py-1 rounded">
                        {remaining.length} {remaining.length === 1 ? 'Ação' : 'Ações'}
                    </span>
                ) : (
                    <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1">
                        <CheckCircle size={12} /> Tudo enviado!
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-4 flex-1">
                {remaining.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary rounded-lg flex items-center justify-center">
                                <doc.icon />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">{doc.label}</p>
                                <p className="text-xs text-slate-500">{doc.sublabel}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleUpload(doc.id)}
                            disabled={uploadingId === doc.id}
                            className={`px-3 py-1.5 text-xs font-bold rounded flex items-center gap-1 transition-all ${
                                doc.primary
                                    ? 'bg-primary text-white hover:bg-primary-hover disabled:opacity-60'
                                    : 'bg-white border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-60'
                            }`}
                        >
                            <Upload className="text-[14px]" />
                            {uploadingId === doc.id ? 'A enviar...' : 'Enviar'}
                        </button>
                    </div>
                ))}
                {uploaded.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-lg flex items-center justify-center">
                                <CheckCircle size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">{doc.label}</p>
                                <p className="text-xs text-green-600 dark:text-green-400">Enviado com sucesso</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setUploadedIds(prev => prev.filter(id => id !== doc.id))}
                            className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                            title="Remover"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
