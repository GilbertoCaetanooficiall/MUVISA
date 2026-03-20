'use client';

import { useState } from 'react';
import ApplicationsFilters from './ApplicationsFilters';
import { Eye, FileUp, MoreVertical } from 'lucide-react';
import type { Application, AppStatus } from '@/app/admin/applications/ApplicationsClient';

// ─── Component Props ──────────────────────────────────────────────────────────

interface ApplicationsTableProps {
  applications: Application[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  universityFilter: string;
  setUniversityFilter: (val: string) => void;
  courseFilter: string;
  setCourseFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  onToggleStatus: (id: string, newStatus: AppStatus) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onUploadDocs: (id: string) => void;
}

// ─── Status badge ─────────────────────────────────────────────────────────────

const statusStyle: Record<AppStatus, string> = {
  'Aceite':     'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400',
  'Em Revisão': 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400',
  'Submetido':    'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400',
  'Docs Pendentes': 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400',
  'Rascunho':        'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ApplicationsTable(props: ApplicationsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { applications } = props;
  const totalPages = Math.ceil(applications.length / itemsPerPage) || 1;
  const currentDocs = applications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const handleActionMore = (id: string) => {
    const action = prompt('O que deseja fazer? Digite "editar" ou "eliminar":');
    if (action?.toLowerCase() === 'eliminar') {
      props.onDelete(id);
    } else if (action?.toLowerCase() === 'editar') {
      alert(`Abrir formulário de edição da candidatura ${id}`);
    }
  };

  return (
    <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Inline filters */}
      <ApplicationsFilters 
        searchQuery={props.searchQuery} setSearchQuery={(v) => { props.setSearchQuery(v); setCurrentPage(1); }}
        universityFilter={props.universityFilter} setUniversityFilter={(v) => { props.setUniversityFilter(v); setCurrentPage(1); }}
        courseFilter={props.courseFilter} setCourseFilter={(v) => { props.setCourseFilter(v); setCurrentPage(1); }}
        statusFilter={props.statusFilter} setStatusFilter={(v) => { props.setStatusFilter(v); setCurrentPage(1); }}
      />

      {/* Table */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              {['Nome do Estudante', 'Universidade e Curso', 'Ingresso', 'Prazo', 'Estado', 'Funcionário Atribuído', 'Ações'].map(
                (col) => (
                  <th key={col} className={`px-6 py-4 ${col === 'Ações' ? 'text-right' : ''}`}>
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {currentDocs.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                  Nenhuma candidatura encontrada com os filtros selecionados.
                </td>
              </tr>
            ) : currentDocs.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">

                {/* Student */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary text-sm font-bold flex-shrink-0">
                      {a.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{a.studentName}</p>
                      <p className="text-xs text-slate-500 cursor-pointer hover:text-primary transition-colors" onClick={() => props.onView(a.id)}>{a.appId}</p>
                    </div>
                  </div>
                </td>

                {/* University & Course */}
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{a.university}</p>
                  <p className="text-xs text-slate-500">{a.course}</p>
                </td>

                {/* Intake */}
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-700 dark:text-slate-300">{a.intake}</p>
                </td>

                {/* Deadline */}
                <td className="px-6 py-4">
                  <p className={`text-sm font-medium ${a.deadlineClass}`}>{a.deadline}</p>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span 
                    onClick={() => {
                        // Quick toggle status for mock capabilities
                        const cycle: Record<AppStatus, AppStatus> = {
                          'Rascunho': 'Docs Pendentes', 'Docs Pendentes': 'Submetido', 'Submetido': 'Em Revisão', 'Em Revisão': 'Aceite', 'Aceite': 'Rascunho'
                        };
                        props.onToggleStatus(a.id, cycle[a.status]);
                    }}
                    className={`cursor-pointer inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle[a.status]} hover:opacity-80 transition-opacity`}
                    title="Clique para avançar o estado"
                  >
                    {a.status}
                  </span>
                </td>

                {/* Assigned Staff */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${a.staffAvatarClass}`}>
                      {a.staffInitials}
                    </div>
                    <p className={`text-sm ${a.staffName === 'Não Atribuído' ? 'italic text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                      {a.staffName}
                    </p>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => props.onView(a.id)} className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" title="Ver Candidatura">
                      <Eye size={18} />
                    </button>
                    <button onClick={() => props.onUploadDocs(a.id)} className="p-2 text-slate-400 hover:text-emerald-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" title="Submeter Documentos">
                      <FileUp size={18} />
                    </button>
                    <button onClick={() => handleActionMore(a.id)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-100 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" title="Mais opções (Editar / Eliminar)">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <p className="text-sm text-slate-500">A mostrar <span className="font-medium">{applications.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> a <span className="font-medium">{Math.min(currentPage * itemsPerPage, applications.length)}</span> de <span className="font-medium">{applications.length}</span> resultados filtrados (Total Global: 1284)</p>
        <div className="flex items-center gap-2">
          <button 
            disabled={currentPage === 1}
            onClick={handlePrevPage}
            className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setCurrentPage(n)}
              className={`w-8 h-8 flex items-center justify-center text-sm rounded-lg font-medium transition-colors ${
                n === currentPage
                  ? 'bg-primary text-white'
                  : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {n}
            </button>
          ))}
          <button 
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Seguinte
          </button>
        </div>
      </div>
    </div>
  );
}
