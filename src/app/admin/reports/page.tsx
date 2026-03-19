import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import ReportsStats from '@/components/admin/reports/ReportsStats';
import ReportsCharts from '@/components/admin/reports/ReportsCharts';
import { FileText, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Relatórios e Análises – Admin MUVISA',
  description: 'Monitorize KPIs, tendências de estudantes e crescimento do negócio.',
};

function ReportsContent() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Relatórios e Análises
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Monitorize KPIs, tendências de estudantes e crescimento do negócio.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="flex items-center gap-2 bg-slate-100 dark:bg-card-dark hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-4 py-2 rounded-lg text-sm border border-slate-200 dark:border-slate-700 transition-all">
            <FileText size={18} />
            Descarregar PDF
          </button>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-4 py-2 rounded-lg text-sm transition-all shadow-lg shadow-primary/20">
            <Download size={18} />
            Exportar CSV
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
