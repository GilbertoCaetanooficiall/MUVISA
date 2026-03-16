// ─── Types ────────────────────────────────────────────────────────────────────

type DocStatus = 'Pending Review' | 'Approved' | 'Rejected' | 'Missing';

interface Document {
  id: string;
  studentName: string;
  initials: string;
  docType: string;
  docIcon: string;
  uploadDate: string;
  status: DocStatus;
  verifiedBy: string;
  lastUpdate: string;
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const documents: Document[] = [
  {
    id: 'DOC-001', studentName: 'Sarah Jenkins',   initials: 'SJ',
    docType: 'Passport Copy',       docIcon: 'contact_page',
    uploadDate: 'Oct 24, 2023', status: 'Pending Review', verifiedBy: '--',        lastUpdate: '2 hours ago',
  },
  {
    id: 'DOC-002', studentName: 'Michael Chen',    initials: 'MC',
    docType: 'Bank Statement',      docIcon: 'account_balance',
    uploadDate: 'Oct 22, 2023', status: 'Approved',       verifiedBy: 'Alex Rivera', lastUpdate: 'Yesterday',
  },
  {
    id: 'DOC-003', studentName: 'Marcus Thorne',   initials: 'MT',
    docType: 'English Proficiency', docIcon: 'history_edu',
    uploadDate: 'Oct 21, 2023', status: 'Rejected',       verifiedBy: 'Sarah Smith', lastUpdate: 'Oct 22, 2023',
  },
  {
    id: 'DOC-004', studentName: 'Elena Rodriguez', initials: 'ER',
    docType: 'Official Transcript', docIcon: 'school',
    uploadDate: '--',           status: 'Missing',        verifiedBy: '--',         lastUpdate: 'Oct 20, 2023',
  },
  {
    id: 'DOC-005', studentName: 'Anna Smith',       initials: 'AS',
    docType: 'Letter of Recommendation', docIcon: 'description',
    uploadDate: 'Oct 19, 2023', status: 'Approved',       verifiedBy: 'Alex Rivera', lastUpdate: 'Oct 20, 2023',
  },
  {
    id: 'DOC-006', studentName: 'David Miller',     initials: 'DM',
    docType: 'Transcripts',         docIcon: 'menu_book',
    uploadDate: 'Oct 18, 2023', status: 'Pending Review', verifiedBy: '--',         lastUpdate: '3 days ago',
  },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

const statusStyle: Record<DocStatus, string> = {
  'Pending Review': 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400',
  'Approved':       'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400',
  'Rejected':       'bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-400',
  'Missing':        'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700',
};

// ─── Action buttons per status ────────────────────────────────────────────────

function RowActions({ status }: { status: DocStatus }) {
  const btnBase = 'p-1.5 rounded-lg transition-colors';
  if (status === 'Pending Review') {
    return (
      <>
        <button className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500`} title="View Document"><span className="material-symbols-outlined text-lg">visibility</span></button>
        <button className={`${btnBase} hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-emerald-600`} title="Approve"><span className="material-symbols-outlined text-lg">check_circle</span></button>
        <button className={`${btnBase} hover:bg-rose-100 dark:hover:bg-rose-900/30 text-rose-600`} title="Reject"><span className="material-symbols-outlined text-lg">cancel</span></button>
        <button className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400`} title="More"><span className="material-symbols-outlined text-lg">more_vert</span></button>
      </>
    );
  }
  if (status === 'Approved') {
    return (
      <>
        <button className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500`} title="View Document"><span className="material-symbols-outlined text-lg">visibility</span></button>
        <button className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500`} title="Download"><span className="material-symbols-outlined text-lg">download</span></button>
        <button className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400`} title="More"><span className="material-symbols-outlined text-lg">more_vert</span></button>
      </>
    );
  }
  if (status === 'Rejected') {
    return (
      <>
        <button className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500`} title="View Document"><span className="material-symbols-outlined text-lg">visibility</span></button>
        <button className={`${btnBase} hover:bg-primary/10 text-primary`} title="Request Resubmission"><span className="material-symbols-outlined text-lg">refresh</span></button>
        <button className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400`} title="More"><span className="material-symbols-outlined text-lg">more_vert</span></button>
      </>
    );
  }
  // Missing
  return (
    <>
      <button className="inline-flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
        Request
      </button>
      <button className={`${btnBase} hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400`} title="More"><span className="material-symbols-outlined text-lg">more_vert</span></button>
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
              {['Student', 'Document Type', 'Upload Date', 'Status', 'Verified By', 'Last Update', ''].map((col) => (
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
                    <span className="material-symbols-outlined text-slate-400 text-lg">{doc.docIcon}</span>
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
          Showing{' '}
          <span className="font-medium text-slate-900 dark:text-white">1</span> to{' '}
          <span className="font-medium text-slate-900 dark:text-white">{documents.length}</span> of{' '}
          <span className="font-medium text-slate-900 dark:text-white">156</span> results
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50" disabled>
            <span className="material-symbols-outlined text-sm">chevron_left</span>
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
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
