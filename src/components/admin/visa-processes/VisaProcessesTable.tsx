import React from 'react';
import { Eye, Pencil, RefreshCw, FileUp } from 'lucide-react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

export type VisaStatus = 'Aprovado' | 'Em Revisão' | 'Pendente' | 'Rejeitado';

export interface VisaProcess {
  id: string;
  studentName: string;
  initials: string;
  university: string;
  course: string;
  visaType: string;
  date: string;
  stage: string;
  status: VisaStatus;
  staff: string;
}

// ─── Status badge ─────────────────────────────────────────────────────────────

const statusStyle: Record<VisaStatus, string> = {
  Aprovado:   'bg-accent-success/10 text-accent-success',
  'Em Revisão': 'bg-primary/10 text-primary',
  Pendente:    'bg-accent-warning/10 text-accent-warning',
  Rejeitado:   'bg-red-500/10 text-red-500',
};

// ─── Component ────────────────────────────────────────────────────────────────

interface ActionBtnProps {
  icon: React.ElementType;
  title: string;
  onClick: () => void;
}

const ActionBtn = ({ icon: Icon, title, onClick }: ActionBtnProps) => (
  <button
    onClick={onClick}
    className="p-1 text-slate-400 hover:text-primary transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center size-8"
    title={title}
  >
    <Icon size={18} />
  </button>
);

interface VisaProcessesTableProps {
  processes: VisaProcess[];
  currentPage: number;
  totalPages: number;
  totalFilteredCount: number;
  onPageChange: (page: number) => void;
  onActionClick: (actionType: string, id: string) => void;
}

export default function VisaProcessesTable({
  processes,
  currentPage,
  totalPages,
  totalFilteredCount,
  onPageChange,
  onActionClick
}: VisaProcessesTableProps) {

  const startItem = totalFilteredCount === 0 ? 0 : ((currentPage - 1) * 6) + 1;
  const endItem = Math.min(currentPage * 6, totalFilteredCount);

  return (
    <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              {['Estudante', 'Universidade e Curso', 'Tipo e Data', 'Etapa Atual', 'Estado', 'Staff', ''].map(
                (col, idx) => (
                  <th
                    key={idx}
                    className={`px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 ${
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
            {processes.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                  Nenhum processo referenciado.
                </td>
              </tr>
            ) : (
              processes.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  {/* Student */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        {p.initials}
                      </div>
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                        {p.studentName}
                      </span>
                    </div>
                  </td>

                  {/* University & Course */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{p.university}</p>
                    <p className="text-xs text-slate-500">{p.course}</p>
                  </td>

                  {/* Type & Date */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-900 dark:text-slate-100">{p.visaType}</p>
                    <p className="text-xs text-slate-500">{p.date}</p>
                  </td>

                  {/* Current Stage */}
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50">
                      {p.stage}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${statusStyle[p.status]}`}>
                      {p.status}
                    </span>
                  </td>

                  {/* Staff */}
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-600 dark:text-slate-400">{p.staff}</p>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Link href={`/admin/clients?id=${p.id}`} passHref>
                        <button
                          className="p-1 text-slate-400 hover:text-primary transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center size-8"
                          title="Ver Processo/Cliente"
                        >
                          <Eye size={18} />
                        </button>
                      </Link>
                      <ActionBtn icon={Pencil}    title="Editar Processo"     onClick={() => onActionClick('edit', p.id)} />
                      <ActionBtn icon={RefreshCw} title="Atualizar Estado"    onClick={() => onActionClick('update', p.id)} />
                      <ActionBtn icon={FileUp}    title="Carregar Documentos" onClick={() => onActionClick('upload', p.id)} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      {totalFilteredCount > 0 && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/10">
          <p className="text-xs text-slate-500">A mostrar {startItem} a {endItem} de {totalFilteredCount} processos</p>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3 py-1 border border-slate-200 dark:border-slate-800 rounded text-xs font-medium transition-colors bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Anterior
            </button>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3 py-1 border border-slate-200 dark:border-slate-800 rounded text-xs font-medium transition-colors bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Seguinte
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
