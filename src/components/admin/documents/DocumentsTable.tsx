import { Eye, CheckCircle2, XCircle, MoreVertical, Download, RefreshCw, ChevronLeft, ChevronRight, Contact, Landmark, FileText, GraduationCap, BookOpen } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type DocStatus = 'Pendente de Revisão' | 'Aprovado' | 'Rejeitado' | 'Em Falta';

interface Document {
  id: string;
  studentName: string;
  initials: string;
  docType: string;
  docIcon: React.ElementType;
  uploadDate: string;
  status: DocStatus;
  verifiedBy: string;
  lastUpdate: string;
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const documents: Document[] = [
  {
    id: 'DOC-001', studentName: 'Sarah Jenkins',   initials: 'SJ',
    docType: 'Cópia do Passaporte',       docIcon: Contact,
    uploadDate: '24 Out, 2023', status: 'Pendente de Revisão', verifiedBy: '--',        lastUpdate: 'há 2 horas',
  },
  {
    id: 'DOC-002', studentName: 'Michael Chen',    initials: 'MC',
    docType: 'Extrato Bancário',      docIcon: Landmark,
    uploadDate: '22 Out, 2023', status: 'Aprovado',       verifiedBy: 'Alex Rivera', lastUpdate: 'Ontem',
  },
  {
    id: 'DOC-003', studentName: 'Marcus Thorne',   initials: 'MT',
    docType: 'Proficiência em Inglês', docIcon: FileText,
    uploadDate: '21 Out, 2023', status: 'Rejeitado',       verifiedBy: 'Sarah Smith', lastUpdate: '22 Out, 2023',
  },
  {
    id: 'DOC-004', studentName: 'Elena Rodriguez', initials: 'ER',
    docType: 'Certificado Oficial', docIcon: GraduationCap,
    uploadDate: '--',           status: 'Em Falta',        verifiedBy: '--',         lastUpdate: '20 Out, 2023',
  },
  {
    id: 'DOC-005', studentName: 'Anna Smith',       initials: 'AS',
    docType: 'Carta de Recomendação', docIcon: FileText,
    uploadDate: '19 Out, 2023', status: 'Aprovado',       verifiedBy: 'Alex Rivera', lastUpdate: '20 Out, 2023',
  },
  {
    id: 'DOC-006', studentName: 'David Miller',     initials: 'DM',
    docType: 'Certificados Académicos',         docIcon: BookOpen,
    uploadDate: '18 Out, 2023', status: 'Pendente de Revisão', verifiedBy: '--',         lastUpdate: 'há 3 dias',
  },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

const statusStyle: Record<DocStatus, string> = {
  'Pendente de Revisão': 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400',
  'Aprovado':       'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400',
  'Rejeitado':       'bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-400',
  'Em Falta':        'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700',
};

// ─── Action buttons per status ────────────────────────────────────────────────

function RowActions({ status }: { status: DocStatus }) {
  const btnBase = 'p-1.5 rounded-lg transition-colors';
  if (status === 'Pendente de Revisão') {
    return (
      <>
        <button className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500`} title="Ver Documento"><Eye size={18} /></button>
        <button className={`${btnBase} hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-emerald-600`} title="Aprovar"><CheckCircle2 size={18} /></button>
        <button className={`${btnBase} hover:bg-rose-100 dark:hover:bg-rose-900/30 text-rose-600`} title="Rejeitar"><XCircle size={18} /></button>
        <button className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400`} title="Mais"><MoreVertical size={18} /></button>
      </>
    );
  }
  if (status === 'Aprovado') {
    return (
      <>
        <button className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500`} title="Ver Documento"><Eye size={18} /></button>
        <button className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500`} title="Descarregar"><Download size={18} /></button>
        <button className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400`} title="Mais"><MoreVertical size={18} /></button>
      </>
    );
  }
  if (status === 'Rejeitado') {
    return (
      <>
        <button className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500`} title="Ver Documento"><Eye size={18} /></button>
        <button className={`${btnBase} hover:bg-primary/10 text-primary`} title="Solicitar Reenvio"><RefreshCw size={18} /></button>
        <button className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400`} title="Mais"><MoreVertical size={18} /></button>
      </>
    );
  }
  // Em Falta
  return (
    <>
      <button className="inline-flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
        Solicitar
      </button>
      <button className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400`} title="Mais"><MoreVertical size={18} /></button>
    </>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DocumentsTable() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
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
            {documents.map((doc) => (
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
                    <RowActions status={doc.status} />
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
          <span className="font-medium text-slate-900 dark:text-white">1</span> a{' '}
          <span className="font-medium text-slate-900 dark:text-white">{documents.length}</span> de{' '}
          <span className="font-medium text-slate-900 dark:text-white">156</span> resultados
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50" disabled>
            <ChevronLeft size={16} />
          </button>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                n === 1
                  ? 'bg-primary text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {n}
            </button>
          ))}
          <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:bg-white dark:hover:bg-slate-800">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
