import ApplicationsFilters from './ApplicationsFilters';

// ─── Types ────────────────────────────────────────────────────────────────────

type AppStatus = 'Accepted' | 'Under Review' | 'Submitted' | 'Docs Pending' | 'Draft';

interface Application {
  id: string;
  appId: string;
  studentName: string;
  initials: string;
  university: string;
  course: string;
  intake: string;
  deadline: string;
  deadlineClass: string;
  status: AppStatus;
  staffInitials: string;
  staffName: string;
  staffAvatarClass: string;
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const applications: Application[] = [
  {
    id: 'A-001', appId: 'APP-2024-001', studentName: 'Sarah Jenkins',   initials: 'SJ',
    university: 'Oxford University',       course: 'MSc Computer Science',
    intake: 'Fall 2024',   deadline: '15 Mar, 2024', deadlineClass: 'text-rose-500',
    status: 'Accepted',
    staffInitials: 'MK', staffName: 'Michael King',   staffAvatarClass: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
  },
  {
    id: 'A-002', appId: 'APP-2024-042', studentName: 'David Miller',    initials: 'DM',
    university: 'Stanford University',     course: 'MBA Business Administration',
    intake: 'Fall 2024',   deadline: '30 Apr, 2024', deadlineClass: 'text-slate-700 dark:text-slate-300',
    status: 'Under Review',
    staffInitials: 'LW', staffName: 'Lisa Wong',      staffAvatarClass: 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400',
  },
  {
    id: 'A-003', appId: 'APP-2024-089', studentName: 'James Wilson',    initials: 'JW',
    university: 'MIT',                    course: 'BSc Robotics Engineering',
    intake: 'Spring 2025', deadline: '12 May, 2024', deadlineClass: 'text-slate-700 dark:text-slate-300',
    status: 'Submitted',
    staffInitials: 'TC', staffName: 'Tom Chen',       staffAvatarClass: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'A-004', appId: 'APP-2024-112', studentName: 'Elena Rodriguez', initials: 'ER',
    university: 'University of Toronto',  course: 'MA International Relations',
    intake: 'Fall 2024',   deadline: '05 Apr, 2024', deadlineClass: 'text-slate-700 dark:text-slate-300',
    status: 'Docs Pending',
    staffInitials: 'MK', staffName: 'Michael King',   staffAvatarClass: 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400',
  },
  {
    id: 'A-005', appId: 'APP-2024-205', studentName: 'Liam Wilson',     initials: 'LW',
    university: 'UCLA',                   course: 'BFA Visual Arts',
    intake: 'Fall 2024',   deadline: '10 Jun, 2024', deadlineClass: 'text-slate-700 dark:text-slate-300',
    status: 'Draft',
    staffInitials: 'Un', staffName: 'Unassigned',     staffAvatarClass: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
  },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

const statusStyle: Record<AppStatus, string> = {
  'Accepted':     'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400',
  'Under Review': 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400',
  'Submitted':    'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400',
  'Docs Pending': 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400',
  'Draft':        'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ApplicationsTable() {
  return (
    <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Inline filters */}
      <ApplicationsFilters />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              {['Student Name', 'University & Course', 'Intake', 'Deadline', 'Status', 'Assigned Staff', ''].map(
                (col) => (
                  <th key={col} className={`px-6 py-4 ${col === '' ? 'text-right' : ''}`}>
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {applications.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">

                {/* Student */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary text-sm font-bold flex-shrink-0">
                      {a.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{a.studentName}</p>
                      <p className="text-xs text-slate-500">{a.appId}</p>
                    </div>
                  </div>
                </td>

                {/* University & Course */}
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{a.university}</p>
                  <p className="text-xs text-slate-500">{a.course}</p>
                </td>

                {/* Intake */}
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-700 dark:text-slate-300">{a.intake}</p>
                </td>

                {/* Deadline */}
                <td className="px-6 py-4">
                  <p className={`text-sm font-medium ${a.deadlineClass}`}>{a.deadline}</p>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle[a.status]}`}>
                    {a.status}
                  </span>
                </td>

                {/* Assigned Staff */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${a.staffAvatarClass}`}>
                      {a.staffInitials}
                    </div>
                    <p className={`text-sm ${a.staffName === 'Unassigned' ? 'italic text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                      {a.staffName}
                    </p>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors" title="View Application">
                      <span className="material-symbols-outlined text-lg">visibility</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-emerald-500 transition-colors" title="Upload Documents">
                      <span className="material-symbols-outlined text-lg">upload_file</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-100 transition-colors">
                      <span className="material-symbols-outlined text-lg">more_vert</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <p className="text-sm text-slate-500">Showing 1 to {applications.length} of 1,284 results</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500">
            Previous
          </button>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={`px-3 py-1 text-sm rounded-lg font-medium transition-colors ${
                n === 1
                  ? 'bg-primary text-white'
                  : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {n}
            </button>
          ))}
          <button className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
