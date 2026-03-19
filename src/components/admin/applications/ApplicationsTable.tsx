import ApplicationsFilters from './ApplicationsFilters';
import { Eye, FileUp, MoreVertical } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type AppStatus = 'Aceite' | 'Em Revisão' | 'Submetido' | 'Docs Pendentes' | 'Rascunho';

interface Application {
  id: string;
  appId: string;
  studentName: string;
  initials: string;
  university: string;
  course: string;
  intake: string;
  deadline: string;
  deadlineClass: string;
  status: AppStatus;
  staffInitials: string;
  staffName: string;
  staffAvatarClass: string;
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const applications: Application[] = [
  {
    id: 'A-001', appId: 'APP-2024-001', studentName: 'Sarah Jenkins',   initials: 'SJ',
    university: 'Universidade de Oxford',       course: 'MSc Ciência da Computação',
    intake: 'Outono 2024',   deadline: '15 Mar, 2024', deadlineClass: 'text-rose-500',
    status: 'Aceite',
    staffInitials: 'MK', staffName: 'Michael King',   staffAvatarClass: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
  },
  {
    id: 'A-002', appId: 'APP-2024-042', studentName: 'David Miller',    initials: 'DM',
    university: 'Universidade de Stanford',     course: 'MBA Gestão de Empresas',
    intake: 'Outono 2024',   deadline: '30 Abr, 2024', deadlineClass: 'text-slate-700 dark:text-slate-300',
    status: 'Em Revisão',
    staffInitials: 'LW', staffName: 'Lisa Wong',      staffAvatarClass: 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400',
  },
  {
    id: 'A-003', appId: 'APP-2024-089', studentName: 'James Wilson',    initials: 'JW',
    university: 'MIT',                    course: 'BSc Engenharia Robótica',
    intake: 'Primavera 2025', deadline: '12 Maio, 2024', deadlineClass: 'text-slate-700 dark:text-slate-300',
    status: 'Submetido',
    staffInitials: 'TC', staffName: 'Tom Chen',       staffAvatarClass: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'A-004', appId: 'APP-2024-112', studentName: 'Elena Rodriguez', initials: 'ER',
    university: 'Universidade de Toronto',  course: 'MA Relações Internacionais',
    intake: 'Outono 2024',   deadline: '05 Abr, 2024', deadlineClass: 'text-slate-700 dark:text-slate-300',
    status: 'Docs Pendentes',
    staffInitials: 'MK', staffName: 'Michael King',   staffAvatarClass: 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400',
  },
  {
    id: 'A-005', appId: 'APP-2024-205', studentName: 'Liam Wilson',     initials: 'LW',
    university: 'UCLA',                   course: 'BFA Artes Visuais',
    intake: 'Outono 2024',   deadline: '10 Jun, 2024', deadlineClass: 'text-slate-700 dark:text-slate-300',
    status: 'Rascunho',
    staffInitials: 'Un', staffName: 'Não Atribuído',     staffAvatarClass: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
  },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

const statusStyle: Record<AppStatus, string> = {
  'Aceite':     'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400',
  'Em Revisão': 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400',
  'Submetido':    'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400',
  'Docs Pendentes': 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400',
  'Rascunho':        'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ApplicationsTable() {
  return (
    <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Inline filters */}
      <ApplicationsFilters />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              {['Nome do Estudante', 'Universidade e Curso', 'Ingresso', 'Prazo', 'Estado', 'Funcionário Atribuído', ''].map(
                (col) => (
                  <th key={col} className={`px-6 py-4 ${col === '' ? 'text-right' : ''}`}>
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {applications.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">

                {/* Student */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary text-sm font-bold flex-shrink-0">
                      {a.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{a.studentName}</p>
                      <p className="text-xs text-slate-500">{a.appId}</p>
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
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle[a.status]}`}>
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
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors" title="Ver Candidatura">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-emerald-500 transition-colors" title="Submeter Documentos">
                      <FileUp size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-100 transition-colors">
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
        <p className="text-sm text-slate-500">A mostrar 1 a {applications.length} de 1.284 resultados</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500">
            Anterior
          </button>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={`px-3 py-1 text-sm rounded-lg font-medium transition-colors ${
                n === 1
                  ? 'bg-primary text-white'
                  : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {n}
            </button>
          ))}
          <button className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500">
            Seguinte
          </button>
        </div>
      </div>
    </div>
  );
}
