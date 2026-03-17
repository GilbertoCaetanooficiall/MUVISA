export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Simple Sidebar Placeholder */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            MUVISA Admin
          </h2>
        </div>
        <nav className="p-4 flex flex-col gap-2 flex-1">
          <a href="/admin/dashboard" className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">Dashboard</a>
          <a href="/admin/clients" className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium">Clientes</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-6">
          <span className="font-medium text-slate-700 dark:text-slate-200 ml-auto">Olá, Admin</span>
        </header>
        <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
