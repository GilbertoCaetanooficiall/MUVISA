'use client';

import React, { useState, useMemo } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ClientStats from '@/components/admin/clients/ClientStats';
import ClientFilters, { FilterState } from '@/components/admin/clients/ClientFilters';
import ClientsTable, { Client } from '@/components/admin/clients/ClientsTable';
import { FileDown, Plus } from 'lucide-react';

// ─── Sample data ──────────────────────────────────────────────────────────────
const initialClients: Client[] = [
  {
    id: 'ST-9921', name: 'Anna Smith',      initials: 'AS',
    email: 'anna.s@example.com',     phone: '+1 (555) 123-4567',
    university: 'UCL Londres',        course: 'Mestrado em Ciência de Dados',
    plan: 'Premium', visaStatus: 'Aprovado',  appStatus: 'Aceite',
  },
  {
    id: 'ST-8834', name: 'David Miller',    initials: 'DM',
    email: 'david.m@example.com',    phone: '+44 (20) 7946-0958',
    university: 'Universidade do Porto', course: 'MBA em Gestão',
    plan: 'Standard', visaStatus: 'Pendente',   appStatus: 'Submetido',
  },
  {
    id: 'ST-7613', name: 'Elena Rodriguez', initials: 'ER',
    email: 'elena.r@example.com',    phone: '+34 (91) 555-0182',
    university: 'NOVA',              course: 'LLM em Direito Internacional',
    plan: 'VIP',     visaStatus: 'Em Revisão', appStatus: 'Lista de Espera',
  },
  {
    id: 'ST-6502', name: 'James Wilson',    initials: 'JW',
    email: 'james.w@example.com',    phone: '+1 (617) 555-0134',
    university: 'Universidade de Lisboa', course: 'Licenciatura em Engenharia Informática',
    plan: 'Standard', visaStatus: 'Pendente',   appStatus: 'Submetido',
  },
  {
    id: 'ST-5481', name: 'Maria Garcia',    initials: 'MG',
    email: 'maria.g@example.com',    phone: '+55 (11) 9999-1234',
    university: 'Universidade de Coimbra', course: 'Mestrado em Biotecnologia',
    plan: 'Premium', visaStatus: 'Aprovado',  appStatus: 'Aceite',
  },
  {
    id: 'ST-4390', name: 'Lucas Pereira',   initials: 'LP',
    email: 'lucas.p@example.com',    phone: '+55 (21) 8888-5678',
    university: 'Universidade do Porto', course: 'Mestrado em Engenharia Civil',
    plan: 'Standard', visaStatus: 'Rejeitado',  appStatus: 'Rejeitado',
  },
];

function ClientsContent() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    university: '',
    visaStatus: '',
    plan: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset page when filters change
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const filteredClients = useMemo(() => {
    return initialClients.filter((client) => {
      // Search match (name or email)
      if (filters.search) {
        const query = filters.search.toLowerCase();
        if (
          !client.name.toLowerCase().includes(query) &&
          !client.email.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // Exact matches
      if (filters.university && client.university !== filters.university) return false;
      if (filters.visaStatus && client.visaStatus !== filters.visaStatus) return false;
      if (filters.plan && client.plan !== filters.plan) return false;

      return true;
    });
  }, [filters]);

  const totalFilteredCount = filteredClients.length;
  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(totalFilteredCount / itemsPerPage));
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExportar = () => {
    alert('Relatório de clientes exportado para CSV com sucesso!');
  };

  const handleAdicionar = () => {
    alert('Funcionalidade de Adicionar Cliente (modal) em breve!');
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Clientes</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gira todos os clientes estudantes e os seus processos de visto.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportar}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-white font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <FileDown size={18} />
            Exportar
          </button>
          <button 
            onClick={handleAdicionar}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            Adicionar Novo Cliente
          </button>
        </div>
      </div>

      {/* Stats */}
      <ClientStats />

      {/* Filters */}
      <ClientFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Table */}
      <ClientsTable 
        clients={paginatedClients}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalFilteredCount={totalFilteredCount}
      />
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
