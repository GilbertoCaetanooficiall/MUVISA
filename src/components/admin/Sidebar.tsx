'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { href: '/admin/clients', icon: 'group', label: 'Clients' },
  { href: '/admin/visa-processes', icon: 'travel_explore', label: 'Visa Processes' },
  { href: '/admin/documents', icon: 'description', label: 'Documents' },
  { href: '/admin/universities', icon: 'school', label: 'Universities' },
  { href: '/admin/applications', icon: 'assignment', label: 'Applications' },
  { href: '/admin/plans', icon: 'inventory_2', label: 'Plans/Packages' },
  { href: '/admin/messages', icon: 'mail', label: 'Messages' },
  { href: '/admin/staff', icon: 'manage_accounts', label: 'Staff' },
  { href: '/admin/reports', icon: 'bar_chart', label: 'Reports' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
          <span className="material-symbols-outlined">flight_takeoff</span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            MUVISA
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
            Admin Portal
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* Settings separator */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/admin/settings"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              pathname === '/admin/settings'
                ? 'bg-primary text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </div>
      </nav>

      {/* Admin Profile Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 px-2 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50">
          <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            RS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Ricardo Silva</p>
            <p className="text-xs text-slate-500 truncate">Senior Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
