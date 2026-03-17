
import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import ClientStats from '@/components/admin/clients/ClientStats';
import ClientFilters from '@/components/admin/clients/ClientFilters';
import ClientsTable from '@/components/admin/clients/ClientsTable';
import { FileDown, Plus } from 'lucide-react';
import { supabaseAdmin } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Clients – MUVISA Admin',
  description: 'Manage all student clients, their visa processes, university placements and application statuses.',
};

export default async function AdminClientsPage() {
  // Fetch data
  const { data: processos } = await supabaseAdmin
    .from('processo')
    .select(`
      id,
      estado,
      iniciado_em,
      plano:plano_id ( nome ),
      universidade:universidade_id ( nome ),
      estudante:estudante_id (
        id,
        utilizador:utilizador_id ( nome_completo, email, telefone )
      )
    `)
    .order('iniciado_em', { ascending: false });

  return (
    <AdminLayout>
      <div>
        {/* Page header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Clientes</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Gerir todos os estudantes e os seus processos.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              <Plus size={18} />
              Novo Cliente
            </button>
          </div>
        </div>

        {/* Filters */}
        <ClientFilters />

        {/* Table */}
        <ClientsTable processos={processos as any} />
      </div>
    </AdminLayout>
  );
}
