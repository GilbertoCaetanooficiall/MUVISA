// ─── Types ────────────────────────────────────────────────────────────────────

type VisaStatus = 'Approved' | 'In Review' | 'Pending' | 'Rejected';

interface VisaProcess {
  id: string;
  studentName: string;
  initials: string;
  university: string;
  course: string;
  visaType: string;
  date: string;
  stage: string;
  status: VisaStatus;
  staff: string;
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const processes: VisaProcess[] = [
  {
    id: 'VP-001', studentName: 'Anna Smith',      initials: 'AS',
    university: 'U. Porto',   course: 'MSc Computer Science',
    visaType: 'Student D7',    date: 'Oct 12, 2023',
    stage: 'Embassy Appointment', status: 'Approved',   staff: 'Ricardo Silva',
  },
  {
    id: 'VP-002', studentName: 'David Miller',    initials: 'DM',
    university: 'U. Lisboa',  course: 'MBA Global Business',
    visaType: 'Student Visa',  date: 'Oct 15, 2023',
    stage: 'Documents Review',    status: 'In Review',  staff: 'Maria Garcia',
  },
  {
    id: 'VP-003', studentName: 'Elena Rodriguez', initials: 'ER',
    university: 'NOVA',       course: 'Architecture',
    visaType: 'Short-stay Visa', date: 'Oct 20, 2023',
    stage: 'University Acceptance', status: 'Pending',  staff: 'Ricardo Silva',
  },
  {
    id: 'VP-004', studentName: 'James Wilson',    initials: 'JW',
    university: 'U. Coimbra', course: 'BSc Engineering',
    visaType: 'Student D7',    date: 'Oct 22, 2023',
    stage: 'Document Collection',  status: 'Pending',   staff: 'Maria Garcia',
  },
  {
    id: 'VP-005', studentName: 'Maria Garcia',    initials: 'MG',
    university: 'U. Minho',   course: 'MSc Biotechnology',
    visaType: 'Student Visa',  date: 'Sep 30, 2023',
    stage: 'Visa Issued',          status: 'Approved',  staff: 'Ricardo Silva',
  },
  {
    id: 'VP-006', studentName: 'Lucas Pereira',   initials: 'LP',
    university: 'U. Porto',   course: 'MEng Civil Engineering',
    visaType: 'Student D7',    date: 'Oct 5, 2023',
    stage: 'Application Rejected', status: 'Rejected',  staff: 'Maria Garcia',
  },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

const statusStyle: Record<VisaStatus, string> = {
  Approved:   'bg-accent-success/10 text-accent-success',
  'In Review': 'bg-primary/10 text-primary',
  Pending:    'bg-accent-warning/10 text-accent-warning',
  Rejected:   'bg-red-500/10 text-red-500',
};

// ─── Component ────────────────────────────────────────────────────────────────

const ActionBtn = ({ icon, title }: { icon: string; title: string }) => (
  <button
    className="p-1 text-slate-400 hover:text-primary transition-colors"
    title={title}
  >
    <span className="material-symbols-outlined text-lg">{icon}</span>
  </button>
);

export default function VisaProcessesTable() {
  return (
    <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              {['Student', 'University & Course', 'Type & Date', 'Current Stage', 'Status', 'Staff', ''].map(
                (col) => (
                  <th
                    key={col}
                    className={`px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 ${
                      col === '' ? 'text-right' : ''
                    }`}
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {processes.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">

                {/* Student */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                      {p.initials}
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {p.studentName}
                    </span>
                  </div>
                </td>

                {/* University & Course */}
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{p.university}</p>
                  <p className="text-xs text-slate-500">{p.course}</p>
                </td>

                {/* Type & Date */}
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-900 dark:text-slate-100">{p.visaType}</p>
                  <p className="text-xs text-slate-500">{p.date}</p>
                </td>

                {/* Current Stage */}
                <td className="px-6 py-4">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {p.stage}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${statusStyle[p.status]}`}>
                    {p.status}
                  </span>
                </td>

                {/* Staff */}
                <td className="px-6 py-4">
                  <p className="text-xs text-slate-600 dark:text-slate-400">{p.staff}</p>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <ActionBtn icon="visibility"   title="View Process"      />
                    <ActionBtn icon="edit"         title="Edit Process"      />
                    <ActionBtn icon="sync"         title="Update Status"     />
                    <ActionBtn icon="upload_file"  title="Upload Documents"  />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <p className="text-xs text-slate-500">Showing {processes.length} of 842 processes</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-slate-200 dark:border-slate-800 rounded text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 border border-slate-200 dark:border-slate-800 rounded text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
