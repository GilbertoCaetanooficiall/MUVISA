'use client';

import React from 'react';
import { Search } from 'lucide-react';

export interface VisaFilterState {
  search: string;
  visaStatus: string;
  university: string;
  staff: string;
}

interface VisaFiltersProps {
  filters: VisaFilterState;
  onFilterChange: (filters: VisaFilterState) => void;
}

const selectClass =
  'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none min-w-[140px] transition-all cursor-pointer';

export default function VisaFilters({ filters, onFilterChange }: VisaFiltersProps) {
  const handleChange = (key: keyof VisaFilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6 flex flex-wrap items-center gap-4 transition-all">
      {/* Search */}
      <div className="relative flex-1 min-w-[240px] group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
        <input
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all"
          placeholder="Pesquisar por nome do estudante..."
          type="text"
        />
      </div>

      {/* Visa Status */}
      <select 
        value={filters.visaStatus}
        onChange={(e) => handleChange('visaStatus', e.target.value)}
        className={selectClass}
      >
        <option value="">Estado do Visto (Todos)</option>
        <option value="Pendente">Pendente</option>
        <option value="Em Revisão">Em Revisão</option>
        <option value="Aprovado">Aprovado</option>
        <option value="Rejeitado">Rejeitado</option>
      </select>

      {/* University */}
      <select 
        value={filters.university}
        onChange={(e) => handleChange('university', e.target.value)}
        className={selectClass}
      >
        <option value="">Universidade (Todas)</option>
        <option value="U. Porto">U. Porto</option>
        <option value="U. Lisboa">U. Lisboa</option>
        <option value="NOVA">NOVA</option>
        <option value="U. Coimbra">U. Coimbra</option>
        <option value="U. Minho">U. Minho</option>
      </select>

      {/* Assigned Staff */}
      <select 
        value={filters.staff}
        onChange={(e) => handleChange('staff', e.target.value)}
        className={selectClass}
      >
        <option value="">Staff Atribuído (Todos)</option>
        <option value="Ricardo Silva">Ricardo Silva</option>
        <option value="Maria Garcia">Maria Garcia</option>
      </select>
    </div>
  );
}
