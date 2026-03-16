import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import StaffStats from '@/components/admin/staff/StaffStats';
import StaffTable from '@/components/admin/staff/StaffTable';

export const metadata: Metadata = {
  title: 'Staff – MUVISA Admin',
  description: 'Manage internal employees, roles, and access permissions for the MUVISA portal.',
};

function StaffContent() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Staff</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage internal employees, roles, and access permissions for the MUVISA portal.
          </p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-primary/20 self-start md:self-auto">
          <span className="material-symbols-outlined text-xl">person_add</span>
          Add New Staff
        </button>
      </div>

      {/* Stat cards */}
      <StaffStats />

      {/* Filter bar + Table */}
      <StaffTable />
    </div>
  );
}

export default function AdminStaffPage() {
  return (
    <AdminLayout>
      <StaffContent />
    </AdminLayout>
  );
}
