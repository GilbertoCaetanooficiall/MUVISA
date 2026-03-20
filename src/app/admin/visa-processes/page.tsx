'use client';

import React, { useState, useMemo } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import VisaStats from '@/components/admin/visa-processes/VisaStats';
import VisaFilters, { VisaFilterState } from '@/components/admin/visa-processes/VisaFilters';
import VisaProcessesTable, { VisaProcess } from '@/components/admin/visa-processes/VisaProcessesTable';
import { Plus } from 'lucide-react';

// ─── Sample data ──────────────────────────────────────────────────────────────
const initialProcesses: VisaProcess[] = [
  {
    id: 'VP-001', studentName: 'Anna Smith',      initials: 'AS',
    university: 'U. Porto',   course: 'Mestrado em Ciência de Computadores',
    visaType: 'Visto de Estudante D7',    date: '12 Out, 2023',
    stage: 'Agendamento na Embaixada', status: 'Aprovado',   staff: 'Ricardo Silva',
  },
  {
    id: 'VP-002', studentName: 'David Miller',    initials: 'DM',
    university: 'U. Lisboa',  course: 'MBA Negócios Globais',
    visaType: 'Visto de Estudante',  date: '15 Out, 2023',
    stage: 'Revisão de Documentos',    status: 'Em Revisão',  staff: 'Maria Garcia',
  },
  {
    id: 'VP-003', studentName: 'Elena Rodriguez', initials: 'ER',
    university: 'NOVA',       course: 'Arquitetura',
    visaType: 'Visto de Curta Duração', date: '20 Out, 2023',
    stage: 'Aceitação da Universidade', status: 'Pendente',  staff: 'Ricardo Silva',
  },
  {
    id: 'VP-004', studentName: 'James Wilson',    initials: 'JW',
    university: 'U. Coimbra', course: 'Licenciatura em Engenharia',
    visaType: 'Visto de Estudante D7',    date: '22 Out, 2023',
    stage: 'Recolha de Documentos',  status: 'Pendente',   staff: 'Maria Garcia',
  },
  {
    id: 'VP-005', studentName: 'Maria Garcia',    initials: 'MG',
    university: 'U. Minho',   course: 'Mestrado em Biotecnologia',
    visaType: 'Visto de Estudante',  date: '30 Set, 2023',
    stage: 'Visto Emitido',          status: 'Aprovado',  staff: 'Ricardo Silva',
  },
  {
    id: 'VP-006', studentName: 'Lucas Pereira',   initials: 'LP',
    university: 'U. Porto',   course: 'Mestrado em Engenharia Civil',
    visaType: 'Visto de Estudante D7',    date: '05 Out, 2023',
    stage: 'Candidatura Rejeitada', status: 'Rejeitado',  staff: 'Maria Garcia',
  },
];

function VisaProcessesContent() {
  const [filters, setFilters] = useState<VisaFilterState>({
    search: '',
    visaStatus: '',
    university: '',
    staff: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleFilterChange = (newFilters: VisaFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // reset to first page on filter change
  };

  const filteredProcesses = useMemo(() => {
    return initialProcesses.filter((process) => {
      if (filters.search) {
        const query = filters.search.toLowerCase();
        if (
          !process.studentName.toLowerCase().includes(query) &&
          !process.id.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      if (filters.visaStatus && process.status !== filters.visaStatus) return false;
      if (filters.university && process.university !== filters.university) return false;
      if (filters.staff && process.staff !== filters.staff) return false;

      return true;
    });
  }, [filters]);

  const totalFilteredCount = filteredProcesses.length;
  const totalPages = Math.max(1, Math.ceil(totalFilteredCount / itemsPerPage));
  const paginatedProcesses = filteredProcesses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateNew = () => {
    alert('Modal para criar novo processo virá em breve!');
  };

  const handleActionClick = (actionType: string, id: string) => {
    switch (actionType) {
      case 'edit':
        alert(`A editar processo: ${id}`);
        break;
      case 'update':
        alert(`A atualizar estado do processo: ${id}`);
        break;
      case 'upload':
        alert(`A abrir diálogo de carregamento de documentos para: ${id}`);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Processos de Visto</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gira todos os pedidos de visto de estudante e acompanhe o seu progresso.
          </p>
        </div>
        <button 
          onClick={handleCreateNew}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-lg shadow-primary/20 self-start md:self-auto"
        >
          <Plus size={18} />
          Adicionar Novo Processo de Visto
        </button>
      </div>

      {/* Stats */}
      <VisaStats />

      {/* Filters */}
      <VisaFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Table */}
      <VisaProcessesTable 
        processes={paginatedProcesses}
        currentPage={currentPage}
        totalPages={totalPages}
        totalFilteredCount={totalFilteredCount}
        onPageChange={setCurrentPage}
        onActionClick={handleActionClick}
      />
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
