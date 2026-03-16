'use client';

const selectClass =
  'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-primary focus:outline-none';

export default function DocumentsFilters() {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6 flex flex-wrap items-center gap-4">
      {/* Search */}
      <div className="flex-1 min-w-[240px]">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
            search
          </span>
          <input
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-1 focus:ring-primary focus:outline-none"
            placeholder="Search documents..."
            type="text"
          />
        </div>
      </div>

      {/* Document Type */}
      <select className={`${selectClass} min-w-[160px]`}>
        <option value="">Document Type</option>
        <option>Passport</option>
        <option>Bank Statement</option>
        <option>Transcripts</option>
        <option>English Test</option>
        <option>Letter of Recommendation</option>
      </select>

      {/* Status */}
      <select className={`${selectClass} min-w-[160px]`}>
        <option value="">Status</option>
        <option>Pending Review</option>
        <option>Approved</option>
        <option>Rejected</option>
        <option>Missing</option>
      </select>

      {/* Filter by Student */}
      <select className={`${selectClass} min-w-[160px]`}>
        <option value="">Filter by Student</option>
        <option>Recent Uploads</option>
        <option>Needs Urgent Action</option>
      </select>

      {/* Filter icon button */}
      <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
        <span className="material-symbols-outlined">filter_list</span>
      </button>
    </div>
  );
}
