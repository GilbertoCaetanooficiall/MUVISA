'use client';

const selectClass =
  'bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary focus:outline-none';

export default function ApplicationsFilters() {
  return (
    <div className="p-6 border-b border-slate-200 dark:border-slate-800">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Search by student or ID..."
            type="text"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3">
          <select className={selectClass}>
            <option>All Universities</option>
            <option>Oxford University</option>
            <option>Stanford University</option>
            <option>MIT</option>
            <option>University of Toronto</option>
            <option>UCLA</option>
          </select>

          <select className={selectClass}>
            <option>All Courses</option>
            <option>Computer Science</option>
            <option>Business Admin</option>
            <option>Engineering</option>
            <option>Visual Arts</option>
            <option>International Relations</option>
          </select>

          <select className={selectClass}>
            <option>All Statuses</option>
            <option>Accepted</option>
            <option>Under Review</option>
            <option>Submitted</option>
            <option>Docs Pending</option>
            <option>Draft</option>
          </select>

          <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
      </div>
    </div>
  );
}
