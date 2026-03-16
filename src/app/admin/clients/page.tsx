import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import ClientStats from '@/components/admin/clients/ClientStats';
import ClientFilters from '@/components/admin/clients/ClientFilters';
import ClientsTable from '@/components/admin/clients/ClientsTable';
import { FileDown, Plus } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Clients – MUVISA Admin',
  description: 'Manage all student clients, their visa processes, university placements and application statuses.',
};

function ClientsContent() {
  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Clients</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage all student clients and their visa processes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-white font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700">
            <FileDown size={18} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Plus size={18} />
            Add New Client
          </button>
        </div>
      </div>

      {/* Stats */}
      <ClientStats />

      {/* Filters */}
      <ClientFilters />

      {/* Table */}
      <ClientsTable />
    </div>
  );
}

export default function AdminClientsPage() {
  return (
    <AdminLayout>
      <ClientsContent />
    </AdminLayout>
  );
}
