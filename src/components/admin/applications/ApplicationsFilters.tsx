'use client';

import { Search, Filter } from 'lucide-react';

const selectClass =
  'bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary focus:outline-none w-full sm:w-auto flex-1 sm:flex-none';

interface ApplicationsFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  universityFilter: string;
  setUniversityFilter: (val: string) => void;
  courseFilter: string;
  setCourseFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
}

export default function ApplicationsFilters({
  searchQuery, setSearchQuery,
  universityFilter, setUniversityFilter,
  courseFilter, setCourseFilter,
  statusFilter, setStatusFilter
}: ApplicationsFiltersProps) {
  return (
    <div className="p-6 border-b border-slate-200 dark:border-slate-800">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Pesquisar por estudante ou ID..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3">
          <select className={selectClass} value={universityFilter} onChange={(e) => setUniversityFilter(e.target.value)}>
            <option value="">Todas as Universidades</option>
            <option value="Universidade de Oxford">Universidade de Oxford</option>
            <option value="Universidade de Stanford">Universidade de Stanford</option>
            <option value="MIT">MIT</option>
            <option value="Universidade de Toronto">Universidade de Toronto</option>
            <option value="UCLA">UCLA</option>
          </select>

          <select className={selectClass} value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
            <option value="">Todos os Cursos</option>
            <option value="MSc Ciência da Computação">MSc Ciência da Computação</option>
            <option value="MBA Gestão de Empresas">MBA Gestão de Empresas</option>
            <option value="BSc Engenharia Robótica">BSc Engenharia Robótica</option>
            <option value="MA Relações Internacionais">MA Relações Internacionais</option>
            <option value="BFA Artes Visuais">BFA Artes Visuais</option>
          </select>

          <select className={selectClass} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Todos os Estados</option>
            <option value="Aceite">Aceite</option>
            <option value="Em Revisão">Em Revisão</option>
            <option value="Submetido">Submetido</option>
            <option value="Docs Pendentes">Docs Pendentes</option>
            <option value="Rascunho">Rascunho</option>
          </select>

          <button 
            type="button" 
            title="Limpar Filtros"
            onClick={() => { setSearchQuery(''); setUniversityFilter(''); setCourseFilter(''); setStatusFilter(''); }}
            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 flex items-center justify-center"
          >
            <Filter size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
