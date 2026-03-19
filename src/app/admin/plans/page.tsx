import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import PlansStats from '@/components/admin/plans/PlansStats';
import PlansGrid from '@/components/admin/plans/PlansGrid';
import { PlusCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Planos e Pacotes – Admin MUVISA',
  description: 'Gira os planos de serviço e benefícios oferecidos aos estudantes.',
};

function PlansContent() {
  return (
    <div>
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Planos e Pacotes
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gira os planos de serviço e benefícios oferecidos aos estudantes.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-primary/20">
          <PlusCircle size={20} />
          <span>Criar Novo Plano</span>
        </button>
      </div>

      {/* Stats */}
      <PlansStats />

      {/* Plan cards grid */}
      <PlansGrid />
    </div>
  );
}

export default function AdminPlansPage() {
  return (
    <AdminLayout>
      <PlansContent />
    </AdminLayout>
  );
}
