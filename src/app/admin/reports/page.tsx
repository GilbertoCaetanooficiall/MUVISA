import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import ReportsStats from '@/components/admin/reports/ReportsStats';
import ReportsCharts from '@/components/admin/reports/ReportsCharts';
import { FileText, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reports & Analytics – MUVISA Admin',
  description: 'Monitor key performance indicators, student trends, and business growth.',
};

function ReportsContent() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Reports &amp; Analytics
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Monitor key performance indicators, student trends, and business growth.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="flex items-center gap-2 bg-slate-100 dark:bg-card-dark hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-4 py-2 rounded-lg text-sm border border-slate-200 dark:border-slate-700 transition-all">
            <FileText size={18} />
            Download PDF
          </button>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-4 py-2 rounded-lg text-sm transition-all shadow-lg shadow-primary/20">
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <ReportsStats />

      {/* Charts */}
      <ReportsCharts />
    </div>
  );
}

export default function AdminReportsPage() {
  return (
    <AdminLayout>
      <ReportsContent />
    </AdminLayout>
  );
}
