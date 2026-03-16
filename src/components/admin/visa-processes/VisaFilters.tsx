'use client';

const selectClass =
  'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-slate-100 focus:ring-1 focus:ring-primary focus:outline-none min-w-[140px]';

export default function VisaFilters() {
  return (
    <div className="bg-white dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6 flex flex-wrap items-center gap-4">
      {/* Search */}
      <div className="relative flex-1 min-w-[240px]">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
          search
        </span>
        <input
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-1 focus:ring-primary focus:outline-none"
          placeholder="Search by student name or ID..."
          type="text"
        />
      </div>

      {/* Visa Status */}
      <select className={selectClass}>
        <option value="">Visa Status</option>
        <option>Pending</option>
        <option>In Review</option>
        <option>Approved</option>
        <option>Rejected</option>
      </select>

      {/* University */}
      <select className={selectClass}>
        <option value="">University</option>
        <option>U. Porto</option>
        <option>U. Lisboa</option>
        <option>NOVA</option>
        <option>U. Coimbra</option>
        <option>U. Minho</option>
      </select>

      {/* Assigned Staff */}
      <select className={selectClass}>
        <option value="">Assigned Staff</option>
        <option>Ricardo Silva</option>
        <option>Maria Garcia</option>
      </select>
    </div>
  );
}
