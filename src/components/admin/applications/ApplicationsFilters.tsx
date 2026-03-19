'use client';

import { Search, Filter } from 'lucide-react';

const selectClass =
  'bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm px-4 py-2 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary focus:outline-none';

export default function ApplicationsFilters() {
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
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3">
          <select className={selectClass}>
            <option>Todas as Universidades</option>
            <option>Universidade de Oxford</option>
            <option>Universidade de Stanford</option>
            <option>MIT</option>
            <option>Universidade de Toronto</option>
            <option>UCLA</option>
          </select>

          <select className={selectClass}>
            <option>Todos os Cursos</option>
            <option>Ciência da Computação</option>
            <option>Gestão de Empresas</option>
            <option>Engenharia</option>
            <option>Artes Visuais</option>
            <option>Relações Internacionais</option>
          </select>

          <select className={selectClass}>
            <option>Todos os Estados</option>
            <option>Aceite</option>
            <option>Em Revisão</option>
            <option>Submetido</option>
            <option>Docs Pendentes</option>
            <option>Rascunho</option>
          </select>

          <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 flex items-center justify-center">
            <Filter size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
