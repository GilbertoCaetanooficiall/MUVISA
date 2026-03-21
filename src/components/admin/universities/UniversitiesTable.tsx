'use client';

import { useState, useMemo } from 'react';
import { Search, Edit, Trash2, PowerOff, Filter } from 'lucide-react';
import type { University, AppStatus } from '@/app/admin/universities/UniversitiesClient';

interface UniversitiesTableProps {
  universities: University[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: AppStatus) => void;
}

const statusStyle: Record<AppStatus, string> = {
  'Candidaturas Abertas':   'bg-green-500/10 text-green-600 dark:text-green-500 border-green-500/20',
  'A terminar':        'bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20',
  'Candidaturas Fechadas': 'bg-slate-500/10 text-slate-500 border-slate-500/20',
};

const selectClass =
  'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-primary focus:outline-none';

export default function UniversitiesTable({ universities, onDelete, onStatusChange }: UniversitiesTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [studyLevelFilter, setStudyLevelFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredUniversities = useMemo(() => {
    return universities.filter(u => {
      const matchSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.website.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCity = cityFilter ? u.city === cityFilter : true;
      let matchStatus = true;
      if (statusFilter === 'Abertas') matchStatus = u.status === 'Candidaturas Abertas';
      else if (statusFilter === 'A terminar') matchStatus = u.status === 'A terminar';
      else if (statusFilter === 'Fechadas') matchStatus = u.status === 'Candidaturas Fechadas';

      // Study level filter
      const matchStudyLevel = studyLevelFilter 
        ? u.studyLevels && u.studyLevels.includes(studyLevelFilter)
        : true;

      return matchSearch && matchCity && matchStatus && matchStudyLevel;
    });
  }, [universities, searchQuery, cityFilter, statusFilter, studyLevelFilter]);

  const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage) || 1;
  const currentDocs = filteredUniversities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const handleToggleStatus = (u: University) => {
    const nextStatus: Record<AppStatus, AppStatus> = {
      'Candidaturas Abertas': 'A terminar',
      'A terminar': 'Candidaturas Fechadas',
      'Candidaturas Fechadas': 'Candidaturas Abertas'
    };
    onStatusChange(u.id, nextStatus[u.status]);
  };

  // Get unique cities for filter
  const uniqueCities = Array.from(new Set(universities.map(u => u.city)));

  return (
    <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">

      {/* Filters Section */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="md:col-span-1">
            <label className="relative block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-1 focus:ring-primary focus:outline-none"
                placeholder="Pesquisar..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </div>

          {/* City */}
          <select className={selectClass} value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
            <option value="">Filtrar por cidade</option>
            {uniqueCities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>

          {/* Application status */}
          <select className={selectClass} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Estado da candidatura</option>
            <option value="Abertas">Abertas</option>
            <option value="A terminar">A terminar</option>
            <option value="Fechadas">Fechadas</option>
          </select>

          {/* Study Level */}
          <select className={selectClass} value={studyLevelFilter} onChange={(e) => setStudyLevelFilter(e.target.value)}>
            <option value="">Nível de Estudo</option>
            <option value="Licenciatura">Licenciatura</option>
            <option value="Mestrado">Mestrado</option>
            <option value="Cetsp">Cetsp</option>
          </select>

          <button 
            type="button" 
            title="Limpar Filtros"
            onClick={() => { setSearchQuery(''); setCityFilter(''); setStatusFilter(''); setStudyLevelFilter(''); setCurrentPage(1); }}
            className="flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 py-2 px-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm"
          >
            <Filter size={18} />
            <span className="md:hidden lg:inline">Limpar</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              {['Universidade', 'Cidade', 'Cursos Disponíveis', 'Estado', 'Prazo', 'Website', 'Ações'].map((col) => (
                <th key={col} className={`px-6 py-4 ${col === 'Ações' ? 'text-right' : ''}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {currentDocs.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                  Nenhuma universidade encontrada.
                </td>
              </tr>
            ) : currentDocs.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">

                {/* University name + icon */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                      <u.icon className="text-slate-500 dark:text-slate-400" size={20} />
                    </div>
                    <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">{u.name}</span>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{u.city}</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{u.courses}</td>

                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-tight rounded-full border ${statusStyle[u.status]}`}>
                    {u.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{u.deadline}</td>

                <td className="px-6 py-4 text-sm text-primary hover:underline cursor-pointer">
                  <a href={`https://${u.website}`} target="_blank" rel="noopener noreferrer">{u.website}</a>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 items-center">
                    <button onClick={() => alert(`A abrir edição para: ${u.name}`)} className="p-1.5 text-slate-400 hover:text-blue-500 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Editar">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleToggleStatus(u)} className="p-1.5 text-slate-400 hover:text-amber-500 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Alternar Estado de Candidatura">
                      <PowerOff size={18} />
                    </button>
                    <button onClick={() => onDelete(u.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Eliminar">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          A mostrar <span className="font-semibold">{filteredUniversities.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> a <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredUniversities.length)}</span> de <span className="font-semibold">{filteredUniversities.length}</span> resultados
        </p>
        <div className="flex gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Seguinte
          </button>
        </div>
      </div>
    </div>
  );
}
