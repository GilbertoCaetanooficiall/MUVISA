'use client';

import React from 'react';
import { Search } from 'lucide-react';

export interface FilterState {
  search: string;
  university: string;
  visaStatus: string;
  plan: string;
}

interface ClientFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function ClientFilters({ filters, onFilterChange }: ClientFiltersProps) {
  
  const handleChange = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-slate-50 dark:bg-card-dark/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-6 flex flex-wrap items-center gap-4 transition-all">
      {/* Search */}
      <div className="flex-1 min-w-[200px]">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Pesquisar por nome ou e-mail..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* University filter */}
      <select 
        value={filters.university}
        onChange={(e) => handleChange('university', e.target.value)}
        className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 pl-4 pr-10 text-sm text-slate-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none min-w-[150px] transition-all cursor-pointer"
      >
        <option value="">Universidade (Todas)</option>
        <option value="UCL Londres">UCL Londres</option>
        <option value="MIT">MIT</option>
        <option value="Universidade do Porto">Universidade do Porto</option>
        <option value="Universidade de Lisboa">Universidade de Lisboa</option>
        <option value="Universidade de Coimbra">Universidade de Coimbra</option>
        <option value="NOVA">NOVA</option>
      </select>

      {/* Visa status filter */}
      <select 
        value={filters.visaStatus}
        onChange={(e) => handleChange('visaStatus', e.target.value)}
        className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 pl-4 pr-10 text-sm text-slate-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none min-w-[150px] transition-all cursor-pointer"
      >
        <option value="">Estado do Visto (Todos)</option>
        <option value="Aprovado">Aprovado</option>
        <option value="Pendente">Pendente</option>
        <option value="Rejeitado">Rejeitado</option>
        <option value="Em Revisão">Em Revisão</option>
      </select>

      {/* Plan filter */}
      <select 
        value={filters.plan}
        onChange={(e) => handleChange('plan', e.target.value)}
        className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 pl-4 pr-10 text-sm text-slate-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none min-w-[150px] transition-all cursor-pointer"
      >
        <option value="">Plano (Todos)</option>
        <option value="Standard">Standard</option>
        <option value="Premium">Premium</option>
        <option value="VIP">VIP</option>
      </select>
    </div>
  );
}
