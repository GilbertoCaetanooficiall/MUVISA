import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import UniversitiesStats from '@/components/admin/universities/UniversitiesStats';
import UniversitiesTable from '@/components/admin/universities/UniversitiesTable';

export const metadata: Metadata = {
  title: 'Universities – MUVISA Admin',
  description: 'Manage all universities in Portugal available for student applications.',
};

function UniversitiesContent() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100">Universities</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage all universities in Portugal available for student applications.
          </p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20 self-start sm:self-auto">
          Add New University
        </button>
      </div>

      {/* Stats */}
      <UniversitiesStats />

      {/* Filter + Table (combined card, as per Stitch design) */}
      <UniversitiesTable />
    </div>
  );
}

export default function AdminUniversitiesPage() {
  return (
    <AdminLayout>
      <UniversitiesContent />
    </AdminLayout>
  );
}
