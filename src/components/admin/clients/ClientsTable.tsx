// ─── Types ────────────────────────────────────────────────────────────────────

type VisaStatus  = 'Approved' | 'Pending' | 'In Review' | 'Rejected';
type AppStatus   = 'Accepted' | 'Submitted' | 'Waitlisted' | 'Rejected';
type PlanType    = 'Premium' | 'Standard' | 'VIP';

interface Client {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  university: string;
  course: string;
  plan: PlanType;
  visaStatus: VisaStatus;
  appStatus: AppStatus;
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const clients: Client[] = [
  {
    id: 'ST-9921', name: 'Anna Smith',      initials: 'AS',
    email: 'anna.s@example.com',     phone: '+1 (555) 123-4567',
    university: 'UCL London',        course: 'MSc Data Science',
    plan: 'Premium', visaStatus: 'Approved',  appStatus: 'Accepted',
  },
  {
    id: 'ST-8834', name: 'David Miller',    initials: 'DM',
    email: 'david.m@example.com',    phone: '+44 (20) 7946-0958',
    university: 'University of Porto', course: 'MBA Management',
    plan: 'Standard', visaStatus: 'Pending',   appStatus: 'Submitted',
  },
  {
    id: 'ST-7613', name: 'Elena Rodriguez', initials: 'ER',
    email: 'elena.r@example.com',    phone: '+34 (91) 555-0182',
    university: 'NOVA',              course: 'LLM International Law',
    plan: 'VIP',     visaStatus: 'In Review', appStatus: 'Waitlisted',
  },
  {
    id: 'ST-6502', name: 'James Wilson',    initials: 'JW',
    email: 'james.w@example.com',    phone: '+1 (617) 555-0134',
    university: 'University of Lisbon', course: 'BSc Computer Science',
    plan: 'Standard', visaStatus: 'Pending',   appStatus: 'Submitted',
  },
  {
    id: 'ST-5481', name: 'Maria Garcia',    initials: 'MG',
    email: 'maria.g@example.com',    phone: '+55 (11) 9999-1234',
    university: 'University of Coimbra', course: 'MSc Biotechnology',
    plan: 'Premium', visaStatus: 'Approved',  appStatus: 'Accepted',
  },
  {
    id: 'ST-4390', name: 'Lucas Pereira',   initials: 'LP',
    email: 'lucas.p@example.com',    phone: '+55 (21) 8888-5678',
    university: 'University of Porto', course: 'MEng Civil Engineering',
    plan: 'Standard', visaStatus: 'Rejected',  appStatus: 'Rejected',
  },
];

// ─── Badge helpers ────────────────────────────────────────────────────────────

const visaStyle: Record<VisaStatus, string> = {
  Approved:  'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-500 dark:border-emerald-500/20',
  Pending:   'bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20',
  'In Review': 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
  Rejected:  'bg-red-50 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
};

const visaDot: Record<VisaStatus, string> = {
  Approved:  'bg-emerald-500',
  Pending:   'bg-yellow-500 dark:bg-yellow-400',
  'In Review': 'bg-blue-500 dark:bg-blue-400',
  Rejected:  'bg-red-500 dark:bg-red-400',
};

const appStyle: Record<AppStatus, string> = {
  Accepted:   'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
  Submitted:  'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20',
  Waitlisted: 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20',
  Rejected:   'bg-red-50 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
};

const planStyle: Record<PlanType, string> = {
  Premium:  'bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:border-primary/30',
  Standard: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700/40 dark:text-slate-300 dark:border-slate-600/30',
  VIP:      'bg-purple-100 text-purple-600 border-purple-200 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ClientsTable() {
  return (
    <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20">
              {['Student', 'Contact', 'University & Course', 'Plan', 'Visa Process', 'App Status', ''].map(
                (col) => (
                  <th
                    key={col}
                    className={`px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ${
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
            {clients.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                {/* Student */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                      {c.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{c.name}</p>
                      <p className="text-xs text-slate-500">ID: {c.id}</p>
                    </div>
                  </div>
                </td>

                {/* Contact */}
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="text-slate-700 dark:text-slate-300">{c.email}</p>
                    <p className="text-slate-500 text-xs">{c.phone}</p>
                  </div>
                </td>

                {/* University & Course */}
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="text-slate-900 dark:text-slate-300 font-medium">{c.university}</p>
                    <p className="text-slate-500 text-xs">{c.course}</p>
                  </div>
                </td>

                {/* Plan */}
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${planStyle[c.plan]}`}
                  >
                    {c.plan}
                  </span>
                </td>

                {/* Visa Process */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border ${visaStyle[c.visaStatus]}`}
                  >
                    <span className={`size-1.5 rounded-full ${visaDot[c.visaStatus]}`} />
                    {c.visaStatus}
                  </span>
                </td>

                {/* App Status */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border ${appStyle[c.appStatus]}`}
                  >
                    {c.appStatus}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <button
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-all"
                    title="View Profile"
                  >
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/10">
        <p className="text-xs text-slate-500">Showing 1 to {clients.length} of 1,284 clients</p>
        <div className="flex gap-2">
          {[1, 2, 3, '...', 214].map((page, i) => (
            <button
              key={i}
              className={`size-8 flex items-center justify-center rounded border text-xs font-medium transition-colors ${
                page === 1
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white dark:bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
