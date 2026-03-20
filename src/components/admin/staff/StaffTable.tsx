'use client';

import { useState } from 'react';
import { Search, Eye, Pencil, Key, Trash2 } from 'lucide-react';
import type { StaffMember, StaffStatus } from '@/app/admin/staff/StaffClient';

// ─── Component Props ──────────────────────────────────────────────────────────

interface StaffTableProps {
  staff: StaffMember[];
  totalStaffOriginal: number;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  roleFilter: string;
  setRoleFilter: (val: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  onToggleStatus: (id: string, newStatus: StaffStatus) => void;
  onDelete: (id: string) => void;
}

// ─── Status badge styles ───────────────────────────────────────────────────────

const statusStyle: Record<StaffStatus, string> = {
  'Ativo':   'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20',
  'De Licença': 'bg-primary/10 text-primary border border-primary/20',
  'Inativo': 'bg-slate-500/10 text-slate-500 border border-slate-500/20',
};

// ─── Filter/select shared class ───────────────────────────────────────────────

const selectCls =
  'bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 py-2 pl-3 pr-8 focus:ring-1 focus:ring-primary';

// ─── Component ────────────────────────────────────────────────────────────────

export default function StaffTable(props: StaffTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { staff } = props;
  const totalPages = Math.ceil(staff.length / itemsPerPage) || 1;
  const currentDocs = staff.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const clearFilters = () => {
    props.setSearchQuery('');
    props.setRoleFilter('');
    props.setDepartmentFilter('');
    props.setStatusFilter('');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* ── Filter bar ── */}
      <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex flex-wrap gap-4 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-1 focus:ring-primary"
            placeholder="Pesquisar funcionário por nome ou email"
            type="text"
            value={props.searchQuery}
            onChange={(e) => { props.setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>

        {/* Dropdowns + Clear */}
        <div className="flex flex-wrap gap-2 items-center">
          <select className={selectCls} value={props.roleFilter} onChange={(e) => { props.setRoleFilter(e.target.value); setCurrentPage(1); }}>
            <option value="">Todos os Cargos</option>
            <option value="Registadora Sénior">Registadora Sénior</option>
            <option value="Consultor de Vistos">Consultor de Vistos</option>
            <option value="Administrador">Administrador</option>
            <option value="Suporte">Suporte</option>
          </select>

          <select className={selectCls} value={props.departmentFilter} onChange={(e) => { props.setDepartmentFilter(e.target.value); setCurrentPage(1); }}>
            <option value="">Todos os Departamentos</option>
            <option value="Admissões">Admissões</option>
            <option value="Vistos">Vistos</option>
            <option value="Gestão">Gestão</option>
            <option value="Suporte">Suporte</option>
          </select>

          <select className={selectCls} value={props.statusFilter} onChange={(e) => { props.setStatusFilter(e.target.value); setCurrentPage(1); }}>
            <option value="">Todos os Estados</option>
            <option value="active">Ativo</option>
            <option value="leave">De Licença</option>
            <option value="inactive">Inativo</option>
          </select>

          <button onClick={clearFilters} className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                {['Membro do Staff', 'Email', 'Cargo', 'Departamento', 'Estado', 'Último Acesso', 'Ações'].map((col) => (
                  <th
                    key={col}
                    className={`px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider ${col === 'Ações' ? 'text-right' : ''}`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {currentDocs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    Nenhum funcionário encontrado.
                  </td>
                </tr>
              ) : currentDocs.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">

                  {/* Staff member */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`size-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${s.avatarClass}`}>
                        {s.initials}
                      </div>
                      <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">{s.name}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{s.email}</td>

                  {/* Role */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">{s.role}</td>

                  {/* Department */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{s.department}</td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      onClick={() => {
                        const cycle: Record<StaffStatus, StaffStatus> = {
                          'Inativo': 'Ativo',
                          'Ativo': 'De Licença',
                          'De Licença': 'Inativo'
                        };
                        props.onToggleStatus(s.id, cycle[s.status]);
                      }}
                      className={`cursor-pointer px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${statusStyle[s.status]} hover:opacity-80 transition-opacity`}
                      title="Clique para mudar o estado"
                    >
                      {s.status}
                    </span>
                  </td>

                  {/* Last Login */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{s.lastLogin}</td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-1">
                    <button onClick={() => alert('Ver perfil de ' + s.name)} title="Ver Perfil" className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                      <Eye size={18} />
                    </button>
                    <button onClick={() => alert('Editar funcionário ' + s.name)} title="Editar Funcionário" className="p-2 text-slate-400 hover:text-emerald-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => alert('Gerir permissões de acesso de ' + s.name)} title="Gerir Acesso" className="p-2 text-slate-400 hover:text-amber-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                      <Key size={18} />
                    </button>
                    <button onClick={() => props.onDelete(s.id)} title="Remover" className="p-2 text-slate-400 hover:text-red-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">
            A mostrar <span className="font-bold">{staff.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> a <span className="font-bold">{Math.min(currentPage * itemsPerPage, staff.length)}</span> de <span className="font-bold">{staff.length}</span> entradas (+ {props.totalStaffOriginal} globais)
          </p>
          <div className="flex gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`w-8 h-8 rounded-lg text-xs font-bold border transition-colors ${
                  n === currentPage
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {n}
              </button>
            ))}
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Seguinte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
