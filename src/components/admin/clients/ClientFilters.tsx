'use client';

import { Search } from 'lucide-react';

export default function ClientFilters() {
  return (
    <div className="bg-slate-50 dark:bg-card-dark/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-6 flex flex-wrap items-center gap-4">
      {/* Search */}
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      {/* University filter */}
      <select className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 pl-4 pr-10 text-sm text-slate-900 dark:text-white focus:ring-1 focus:ring-primary focus:outline-none min-w-[150px]">
        <option>University</option>
        <option>UCL London</option>
        <option>MIT</option>
        <option>University of Porto</option>
        <option>University of Lisbon</option>
        <option>NOVA</option>
      </select>

      {/* Visa status filter */}
      <select className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 pl-4 pr-10 text-sm text-slate-900 dark:text-white focus:ring-1 focus:ring-primary focus:outline-none min-w-[150px]">
        <option>Visa Status</option>
        <option>Approved</option>
        <option>Pending</option>
        <option>Rejected</option>
        <option>In Review</option>
      </select>

      {/* Plan filter */}
      <select className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 pl-4 pr-10 text-sm text-slate-900 dark:text-white focus:ring-1 focus:ring-primary focus:outline-none min-w-[150px]">
        <option>Plan</option>
        <option>Standard</option>
        <option>Premium</option>
        <option>VIP</option>
      </select>
    </div>
  );
}
