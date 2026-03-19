import React from 'react';
import { Eye } from 'lucide-react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

export type VisaStatus  = 'Aprovado' | 'Pendente' | 'Em Revisão' | 'Rejeitado';
export type AppStatus   = 'Aceite' | 'Submetido' | 'Lista de Espera' | 'Rejeitado';
export type PlanType    = 'Premium' | 'Standard' | 'VIP';

export interface Client {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  university: string;
  course: string;
  plan: PlanType;
  visaStatus: VisaStatus;
  appStatus: AppStatus;
}

// ─── Badge helpers ────────────────────────────────────────────────────────────

const visaStyle: Record<VisaStatus, string> = {
  Aprovado:  'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-500 dark:border-emerald-500/20',
  Pendente:   'bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20',
  'Em Revisão': 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
  Rejeitado:  'bg-red-50 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
};

const visaDot: Record<VisaStatus, string> = {
  Aprovado:  'bg-emerald-500',
  Pendente:   'bg-yellow-500 dark:bg-yellow-400',
  'Em Revisão': 'bg-blue-500 dark:bg-blue-400',
  Rejeitado:  'bg-red-500 dark:bg-red-400',
};

const appStyle: Record<AppStatus, string> = {
  Aceite:   'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
  Submetido:  'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20',
  'Lista de Espera': 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20',
  Rejeitado:   'bg-red-50 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
};

const planStyle: Record<PlanType, string> = {
  Premium:  'bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:border-primary/30',
  Standard: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700/40 dark:text-slate-300 dark:border-slate-600/30',
  VIP:      'bg-purple-100 text-purple-600 border-purple-200 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30',
};

// ─── Component ────────────────────────────────────────────────────────────────

interface ClientsTableProps {
  clients: Client[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalFilteredCount: number;
}

export default function ClientsTable({ 
  clients, 
  currentPage, 
  totalPages, 
  onPageChange,
  totalFilteredCount
}: ClientsTableProps) {
  
  // Create pagination array dynamically
  const getPaginationArray = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    
    if (currentPage <= 3) return [1, 2, 3, '...', totalPages];
    if (currentPage >= totalPages - 2) return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    
    return [1, '...', currentPage, '...', totalPages];
  };

  const startItem = totalFilteredCount === 0 ? 0 : ((currentPage - 1) * 6) + 1;
  const endItem = Math.min(currentPage * 6, totalFilteredCount);

  return (
    <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20">
              {['Estudante', 'Contacto', 'Universidade e Curso', 'Plano', 'Processo de Visto', 'Estado Candidatura', ''].map(
                (col, idx) => (
                  <th
                    key={idx}
                    className={`px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ${
                      col === '' ? 'text-right' : ''
                    }`}
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {clients.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                  Nenhum cliente encontrado com os filtros atuais.
                </td>
              </tr>
            ) : (
              clients.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                  {/* Estudante */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        {c.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{c.name}</p>
                        <p className="text-xs text-slate-500">ID: {c.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Contacto */}
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-slate-700 dark:text-slate-300">{c.email}</p>
                      <p className="text-slate-500 text-xs">{c.phone}</p>
                    </div>
                  </td>

                  {/* Universidade e Curso */}
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-slate-900 dark:text-slate-300 font-medium">{c.university}</p>
                      <p className="text-slate-500 text-xs">{c.course}</p>
                    </div>
                  </td>

                  {/* Plano */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${planStyle[c.plan]}`}
                    >
                      {c.plan}
                    </span>
                  </td>

                  {/* Processo de Visto */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border ${visaStyle[c.visaStatus]}`}
                    >
                      <span className={`size-1.5 rounded-full ${visaDot[c.visaStatus]}`} />
                      {c.visaStatus}
                    </span>
                  </td>

                  {/* Estado Candidatura */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border ${appStyle[c.appStatus]}`}
                    >
                      {c.appStatus}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/clients?id=${c.id}`} passHref>
                      <button
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-all flex items-center justify-center ml-auto"
                        title="Ver Perfil"
                      >
                        <Eye size={18} />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      {totalFilteredCount > 0 && (
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/10">
          <p className="text-xs text-slate-500">A mostrar {startItem} a {endItem} de {totalFilteredCount} clientes</p>
          <div className="flex gap-2">
            {getPaginationArray().map((page, i) => (
              <button
                key={`${page}-${i}`}
                onClick={() => typeof page === 'number' && onPageChange(page)}
                disabled={page === '...'}
                className={`size-8 flex items-center justify-center rounded border text-xs font-medium transition-colors ${
                  page === currentPage
                    ? 'bg-primary text-white border-primary'
                    : page === '...'
                    ? 'bg-transparent border-transparent text-slate-400 cursor-default'
                    : 'bg-white dark:bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
