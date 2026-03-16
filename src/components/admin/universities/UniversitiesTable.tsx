import { Search, MoreVertical, GraduationCap, Landmark, TowerControl, DraftingCompass } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type AppStatus = 'Applications Open' | 'Closing Soon' | 'Applications Closed';

interface University {
  id: string;
  name: string;
  icon: any;
  city: string;
  courses: number;
  status: AppStatus;
  deadline: string;
  website: string;
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const universities: University[] = [
  { id: 'U-001', name: 'University of Lisbon',    icon: GraduationCap,           city: 'Lisbon',  courses: 156, status: 'Applications Open',   deadline: 'Aug 15, 2024', website: 'ulisboa.pt'  },
  { id: 'U-002', name: 'University of Porto',     icon: Landmark,  city: 'Porto',   courses: 142, status: 'Closing Soon',         deadline: 'May 30, 2024', website: 'up.pt'       },
  { id: 'U-003', name: 'University of Coimbra',   icon: TowerControl,  city: 'Coimbra', courses: 98,  status: 'Applications Closed',  deadline: 'Mar 15, 2024', website: 'uc.pt'       },
  { id: 'U-004', name: 'Nova University Lisbon',  icon: GraduationCap,           city: 'Lisbon',  courses: 115, status: 'Applications Open',    deadline: 'Jul 20, 2024', website: 'unl.pt'      },
  { id: 'U-005', name: 'University of Minho',     icon: DraftingCompass,     city: 'Braga',   courses: 88,  status: 'Applications Open',    deadline: 'Aug 01, 2024', website: 'uminho.pt'   },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

const statusStyle: Record<AppStatus, string> = {
  'Applications Open':   'bg-green-500/10 text-green-600 dark:text-green-500 border-green-500/20',
  'Closing Soon':        'bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20',
  'Applications Closed': 'bg-slate-500/10 text-slate-500 border-slate-500/20',
};

// ─── Filter + Table card combined (matches Stitch structure) ──────────────────

const selectClass =
  'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-primary focus:outline-none';

export default function UniversitiesTable() {
  return (
    <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">

      {/* Filters Section */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-1">
            <label className="relative block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-1 focus:ring-primary focus:outline-none"
                placeholder="Search universities..."
                type="text"
              />
            </label>
          </div>

          {/* City */}
          <select className={selectClass}>
            <option>Filter by city</option>
            <option>Lisbon</option>
            <option>Porto</option>
            <option>Coimbra</option>
            <option>Braga</option>
          </select>

          {/* Application status */}
          <select className={selectClass}>
            <option>Application status</option>
            <option>Open</option>
            <option>Closing Soon</option>
            <option>Closed</option>
          </select>

          {/* Course availability */}
          <select className={selectClass}>
            <option>Course availability</option>
            <option>Engineering</option>
            <option>Medicine</option>
            <option>Arts</option>
            <option>Business</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              {['University', 'City', 'Available Courses', 'Status', 'Deadline', 'Website', ''].map((col) => (
                <th key={col} className={`px-6 py-4 ${col === '' ? 'text-right' : ''}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {universities.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">

                {/* University name + icon */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                      <u.icon className="text-slate-500 dark:text-slate-400" size={20} />
                    </div>
                    <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">{u.name}</span>
                  </div>
                </td>

                {/* City */}
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{u.city}</td>

                {/* Available Courses */}
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{u.courses}</td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-tight rounded-full border ${statusStyle[u.status]}`}>
                    {u.status}
                  </span>
                </td>

                {/* Deadline */}
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{u.deadline}</td>

                {/* Website */}
                <td className="px-6 py-4 text-sm text-primary hover:underline cursor-pointer">{u.website}</td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing 1 to {universities.length} of 120 results
        </p>
        <div className="flex gap-2">
          <button
            disabled
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
