// ─── Types ────────────────────────────────────────────────────────────────────

type StaffStatus = 'Active' | 'On Leave' | 'Inactive';

interface StaffMember {
  id: string;
  name: string;
  initials: string;
  avatarClass: string;
  email: string;
  role: string;
  department: string;
  status: StaffStatus;
  lastLogin: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const staff: StaffMember[] = [
  {
    id: 'S-001', name: 'Alexandra Rivera', initials: 'AR', avatarClass: 'bg-blue-600',
    email: 'a.rivera@muvisa.com', role: 'Senior Registrar', department: 'Admissions',
    status: 'Active', lastLogin: '2 hours ago',
  },
  {
    id: 'S-002', name: 'Marcus Chen',  initials: 'MC', avatarClass: 'bg-purple-600',
    email: 'm.chen@muvisa.com', role: 'Visa Consultant', department: 'Visa',
    status: 'On Leave', lastLogin: '3 days ago',
  },
  {
    id: 'S-003', name: 'Sarah Jenkins', initials: 'SJ', avatarClass: 'bg-emerald-600',
    email: 's.jenkins@muvisa.com', role: 'Admin', department: 'Management',
    status: 'Active', lastLogin: '10 mins ago',
  },
  {
    id: 'S-004', name: 'David Miller',  initials: 'DM', avatarClass: 'bg-orange-600',
    email: 'd.miller@muvisa.com', role: 'Support', department: 'Management',
    status: 'Inactive', lastLogin: '1 month ago',
  },
];

// ─── Status badge styles ───────────────────────────────────────────────────────

const statusStyle: Record<StaffStatus, string> = {
  'Active':   'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20',
  'On Leave': 'bg-primary/10 text-primary border border-primary/20',
  'Inactive': 'bg-slate-500/10 text-slate-500 border border-slate-500/20',
};

// ─── Filter/select shared class ───────────────────────────────────────────────

const selectCls =
  'bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 py-2 pl-3 pr-8 focus:ring-1 focus:ring-primary';

// ─── Component ────────────────────────────────────────────────────────────────

export default function StaffTable() {
  return (
    <div className="space-y-4">
      {/* ── Filter bar ── */}
      <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex flex-wrap gap-4 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
          <input
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-1 focus:ring-primary"
            placeholder="Search staff by name or email"
            type="text"
          />
        </div>

        {/* Dropdowns + Clear */}
        <div className="flex flex-wrap gap-2 items-center">
          <select className={selectCls}>
            <option value="">All Roles</option>
            <option value="registrar">Senior Registrar</option>
            <option value="consultant">Visa Consultant</option>
            <option value="admin">Admin</option>
            <option value="support">Support</option>
          </select>

          <select className={selectCls}>
            <option value="">All Departments</option>
            <option value="admissions">Admissions</option>
            <option value="visa">Visa</option>
            <option value="management">Management</option>
          </select>

          <select className={selectCls}>
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="leave">On Leave</option>
            <option value="inactive">Inactive</option>
          </select>

          <button className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
            Clear Filters
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                {['Staff Member', 'Email', 'Role', 'Department', 'Status', 'Last Login', ''].map((col) => (
                  <th
                    key={col}
                    className={`px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider ${col === '' ? 'text-right' : ''}`}
                  >
                    {col || 'Actions'}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {staff.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">

                  {/* Staff member */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`size-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${s.avatarClass}`}>
                        {s.initials}
                      </div>
                      <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">{s.name}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{s.email}</td>

                  {/* Role */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">{s.role}</td>

                  {/* Department */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{s.department}</td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${statusStyle[s.status]}`}>
                      {s.status}
                    </span>
                  </td>

                  {/* Last Login */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{s.lastLogin}</td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-1">
                    {[
                      { icon: 'visibility', title: 'View Profile' },
                      { icon: 'edit',       title: 'Edit Staff' },
                      { icon: 'key',        title: 'Manage Access' },
                    ].map(({ icon, title }) => (
                      <button
                        key={icon}
                        title={title}
                        className="p-2 text-slate-400 hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">{icon}</span>
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">
            Showing 1 to {staff.length} of 124 entries
          </p>
          <div className="flex gap-2">
            <button
              disabled
              className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-400 disabled:opacity-50"
            >
              Previous
            </button>
            {[1, 2].map((n) => (
              <button
                key={n}
                className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                  n === 1
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {n}
              </button>
            ))}
            <button className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
