import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import ApplicationsStats from '@/components/admin/applications/ApplicationsStats';
import ApplicationsTable from '@/components/admin/applications/ApplicationsTable';
import { Plus } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Applications – MUVISA Admin',
  description: 'Manage all university applications submitted by students.',
};

function ApplicationsContent() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Applications
          </h1>
          <p className="text-slate-500 mt-1">
            Manage all university applications submitted by students.
          </p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-primary/20 self-start md:self-auto">
          <Plus size={18} />
          Create New Application
        </button>
      </div>

      {/* Stats */}
      <ApplicationsStats />

      {/* Filters + Table combined card */}
      <ApplicationsTable />
    </div>
  );
}

export default function AdminApplicationsPage() {
  return (
    <AdminLayout>
      <ApplicationsContent />
    </AdminLayout>
  );
}
