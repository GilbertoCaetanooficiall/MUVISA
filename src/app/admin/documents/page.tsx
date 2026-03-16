import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import DocumentsStats from '@/components/admin/documents/DocumentsStats';
import DocumentsFilters from '@/components/admin/documents/DocumentsFilters';
import DocumentsTable from '@/components/admin/documents/DocumentsTable';

export const metadata: Metadata = {
  title: 'Documents – MUVISA Admin',
  description: 'Manage and review all student documents required for university applications and visa processes.',
};

function DocumentsContent() {
  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Documents</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage and review all student documents required for university applications and visa processes.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-lg shadow-primary/20 self-start md:self-auto">
          <span className="material-symbols-outlined text-[18px]">upload</span>
          Upload Document
        </button>
      </div>

      {/* Stats */}
      <DocumentsStats />

      {/* Filters */}
      <DocumentsFilters />

      {/* Table */}
      <DocumentsTable />
    </div>
  );
}

export default function AdminDocumentsPage() {
  return (
    <AdminLayout>
      <DocumentsContent />
    </AdminLayout>
  );
}
