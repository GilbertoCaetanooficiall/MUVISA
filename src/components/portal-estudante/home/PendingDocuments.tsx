import { AlertCircle, FileText, Upload } from 'lucide-react';
import Link from 'next/link';

interface Documento {
  id: string;
  nome: string;
  estado: string;
  motivo_rejeicao?: string | null;
}

interface PendingDocumentsProps {
  documentos: Documento[];
  processoId: string | null;
}

export default function PendingDocuments({ documentos, processoId }: PendingDocumentsProps) {
  if (!processoId || documentos.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-500">
            <AlertCircle />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pendências</h3>
        </div>
        <p className="text-sm text-slate-500 mt-2">
          {!processoId
            ? 'Nenhum processo activo. Contacta o teu consultor.'
            : 'Sem pendências de documentos. Continua assim! ✅'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-500">
            <AlertCircle />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pendências</h3>
        </div>
        <span className="text-xs font-medium bg-red-100 text-red-600 px-2 py-1 rounded">
          {documentos.length} {documentos.length === 1 ? 'Acção' : 'Acções'}
        </span>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        {documentos.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                doc.estado === 'rejeitado'
                  ? 'bg-red-100 dark:bg-red-900/20 text-red-500'
                  : 'bg-primary/10 dark:bg-primary/20 text-primary'
              }`}>
                <FileText />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{doc.nome}</p>
                <p className={`text-xs ${doc.estado === 'rejeitado' ? 'text-red-500' : 'text-slate-500'}`}>
                  {doc.estado === 'rejeitado' && doc.motivo_rejeicao
                    ? `Rejeitado: ${doc.motivo_rejeicao}`
                    : 'Aguarda envio'}
                </p>
              </div>
            </div>
            <Link
              href="/portal-estudante/meus-documentos"
              className="px-3 py-1.5 text-xs font-bold bg-primary text-white rounded hover:bg-primary-hover transition-colors flex items-center gap-1"
            >
              <Upload className="w-3 h-3" /> Enviar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
