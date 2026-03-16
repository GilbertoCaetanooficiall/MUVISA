'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Search, Bell, Sun, Moon } from 'lucide-react';

export default function Topbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render theme-dependent content after hydration to avoid SSR mismatch
  useEffect(() => { setMounted(true); }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="h-16 flex-shrink-0 flex items-center justify-between px-8 bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search clients, visas, documents..."
            className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 size-2 bg-accent-warning rounded-full border-2 border-white dark:border-background-dark" />
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {mounted ? (
            theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2" />

        {/* User avatar */}
        <button className="flex items-center gap-2 p-1 pl-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <span className="text-sm font-medium hidden sm:block">Admin Portal</span>
          <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
            AP
          </div>
        </button>
      </div>
    </header>
  );
}
