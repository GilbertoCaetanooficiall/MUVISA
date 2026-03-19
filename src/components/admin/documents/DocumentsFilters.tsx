'use client';

import { Search, Filter } from 'lucide-react';

const selectClass =
  'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-primary focus:outline-none';

export default function DocumentsFilters() {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6 flex flex-wrap items-center gap-4">
      {/* Search */}
      <div className="flex-1 min-w-[240px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-1 focus:ring-primary focus:outline-none"
            placeholder="Pesquisar documentos..."
            type="text"
          />
        </div>
      </div>

      {/* Document Type */}
      <select className={`${selectClass} min-w-[160px]`}>
        <option value="">Tipo de Documento</option>
        <option>Passaporte</option>
        <option>Extrato Bancário</option>
        <option>Certificados Académicos</option>
        <option>Teste de Inglês</option>
        <option>Carta de Recomendação</option>
      </select>

      {/* Status */}
      <select className={`${selectClass} min-w-[160px]`}>
        <option value="">Estado</option>
        <option>Pendente de Revisão</option>
        <option>Aprovado</option>
        <option>Rejeitado</option>
        <option>Em Falta</option>
      </select>

      {/* Filter by Student */}
      <select className={`${selectClass} min-w-[160px]`}>
        <option value="">Filtrar por Estudante</option>
        <option>Carregamentos Recentes</option>
        <option>Ação Urgente Necessária</option>
      </select>

      {/* Filter icon button */}
      <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
        <Filter size={20} />
      </button>
    </div>
  );
}
