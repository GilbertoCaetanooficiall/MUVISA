'use client';

import { useState } from 'react';
import { Eye, CheckCircle2, XCircle, MoreVertical, Download, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Document, DocStatus } from '@/app/admin/documents/DocumentsClient';

interface DocumentsTableProps {
  documents: Document[];
  onAprovar: (id: string) => void;
  onRejeitar: (id: string) => void;
  onView: (doc: Document) => void;
  onDownload: (doc: Document) => void;
  onSolicitar: (id: string) => void;
}

// ─── Status badge ─────────────────────────────────────────────────────────────

const statusStyle: Record<DocStatus, string> = {
  'Pendente de Revisão': 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400',
  'Aprovado':       'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400',
  'Rejeitado':       'bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-400',
  'Em Falta':        'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700',
};

// ─── Action buttons per status ────────────────────────────────────────────────

interface RowActionsProps {
  doc: Document;
  onAprovar: (id: string) => void;
  onRejeitar: (id: string) => void;
  onView: (doc: Document) => void;
  onDownload: (doc: Document) => void;
  onSolicitar: (id: string) => void;
}

function RowActions({ doc, onAprovar, onRejeitar, onView, onDownload, onSolicitar }: RowActionsProps) {
  const btnBase = 'p-1.5 rounded-lg transition-colors';
  const status = doc.status;
  
  const handleMore = () => alert(`Mais opções para o documento ${doc.id}`);

  if (status === 'Pendente de Revisão') {
    return (
      <>
        <button onClick={() => onView(doc)} className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500`} title="Ver Documento"><Eye size={18} /></button>
        <button onClick={() => onAprovar(doc.id)} className={`${btnBase} hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-emerald-600`} title="Aprovar"><CheckCircle2 size={18} /></button>
        <button onClick={() => onRejeitar(doc.id)} className={`${btnBase} hover:bg-rose-100 dark:hover:bg-rose-900/30 text-rose-600`} title="Rejeitar"><XCircle size={18} /></button>
        <button onClick={handleMore} className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400`} title="Mais"><MoreVertical size={18} /></button>
      </>
    );
  }
  if (status === 'Aprovado') {
    return (
      <>
        <button onClick={() => onView(doc)} className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500`} title="Ver Documento"><Eye size={18} /></button>
        <button onClick={() => onDownload(doc)} className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500`} title="Descarregar"><Download size={18} /></button>
        <button onClick={handleMore} className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400`} title="Mais"><MoreVertical size={18} /></button>
      </>
    );
  }
  if (status === 'Rejeitado') {
    return (
      <>
        <button onClick={() => onView(doc)} className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500`} title="Ver Documento"><Eye size={18} /></button>
        <button onClick={() => onSolicitar(doc.id)} className={`${btnBase} hover:bg-primary/10 text-primary`} title="Solicitar Reenvio"><RefreshCw size={18} /></button>
        <button onClick={handleMore} className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400`} title="Mais"><MoreVertical size={18} /></button>
      </>
    );
  }
  // Em Falta
  return (
    <>
      <button onClick={() => onSolicitar(doc.id)} className="inline-flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
        Solicitar
      </button>
      <button onClick={handleMore} className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400`} title="Mais"><MoreVertical size={18} /></button>
    </>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DocumentsTable({ documents, onAprovar, onRejeitar, onView, onDownload, onSolicitar }: DocumentsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(documents.length / itemsPerPage) || 1;

  const currentDocs = documents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              {['Estudante', 'Tipo de Documento', 'Data de Carregamento', 'Estado', 'Verificado por', 'Última Atualização', ''].map((col) => (
                <th
                  key={col}
                  className={`px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ${col === '' ? 'text-right' : ''}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {currentDocs.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                  Nenhum documento encontrado.
                </td>
              </tr>
            ) : currentDocs.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">

                {/* Student */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                      {doc.initials}
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {doc.studentName}
                    </span>
                  </div>
                </td>

                {/* Document Type */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <doc.docIcon className="text-slate-400" size={18} />
                    <span className="text-sm text-slate-600 dark:text-slate-300">{doc.docType}</span>
                  </div>
                </td>

                {/* Upload Date */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {doc.uploadDate}
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle[doc.status]}`}>
                    {doc.status}
                  </span>
                </td>

                {/* Verified By */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {doc.verifiedBy}
                </td>

                {/* Last Update */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {doc.lastUpdate}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <div className="flex items-center justify-end gap-2">
                    <RowActions 
                      doc={doc}
                      onAprovar={onAprovar}
                      onRejeitar={onRejeitar}
                      onView={onView}
                      onDownload={onDownload}
                      onSolicitar={onSolicitar}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          A mostrar{' '}
          <span className="font-medium text-slate-900 dark:text-white">{documents.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> a{' '}
          <span className="font-medium text-slate-900 dark:text-white">{Math.min(currentPage * itemsPerPage, documents.length)}</span> de{' '}
          <span className="font-medium text-slate-900 dark:text-white">{documents.length}</span> resultados
        </p>
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setCurrentPage(n)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                n === currentPage
                  ? 'bg-primary text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {n}
            </button>
          ))}

          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
