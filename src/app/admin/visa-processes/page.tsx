import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import VisaStats from '@/components/admin/visa-processes/VisaStats';
import VisaFilters from '@/components/admin/visa-processes/VisaFilters';
import VisaProcessesTable from '@/components/admin/visa-processes/VisaProcessesTable';

export const metadata: Metadata = {
  title: 'Visa Processes – MUVISA Admin',
  description: 'Manage all student visa applications, track current stages and update process statuses.',
};

function VisaProcessesContent() {
  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Visa Processes</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage all student visa applications and track their progress.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-lg shadow-primary/20 self-start md:self-auto">
          <span className="material-symbols-outlined text-lg">add</span>
          Add New Visa Process
        </button>
      </div>

      {/* Stats */}
      <VisaStats />

      {/* Filters */}
      <VisaFilters />

      {/* Table */}
      <VisaProcessesTable />
    </div>
  );
}

export default function AdminVisaProcessesPage() {
  return (
    <AdminLayout>
      <VisaProcessesContent />
    </AdminLayout>
  );
}
