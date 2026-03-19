import { Search, Eye, Pencil, Key } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type StaffStatus = 'Ativo' | 'De Licença' | 'Inativo';

interface StaffMember {
  id: string;
  name: string;
  initials: string;
  avatarClass: string;
  email: string;
  role: string;
  department: string;
  status: StaffStatus;
  lastLogin: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const staff: StaffMember[] = [
  {
    id: 'S-001', name: 'Alexandra Rivera', initials: 'AR', avatarClass: 'bg-blue-600',
    email: 'a.rivera@muvisa.com', role: 'Registadora Sénior', department: 'Admissões',
    status: 'Ativo', lastLogin: 'há 2 horas',
  },
  {
    id: 'S-002', name: 'Marcus Chen',  initials: 'MC', avatarClass: 'bg-purple-600',
    email: 'm.chen@muvisa.com', role: 'Consultor de Vistos', department: 'Vistos',
    status: 'De Licença', lastLogin: 'há 3 dias',
  },
  {
    id: 'S-003', name: 'Sarah Jenkins', initials: 'SJ', avatarClass: 'bg-emerald-600',
    email: 's.jenkins@muvisa.com', role: 'Administrador', department: 'Gestão',
    status: 'Ativo', lastLogin: 'há 10 minutos',
  },
  {
    id: 'S-004', name: 'David Miller',  initials: 'DM', avatarClass: 'bg-orange-600',
    email: 'd.miller@muvisa.com', role: 'Suporte', department: 'Gestão',
    status: 'Inativo', lastLogin: 'há 1 mês',
  },
];

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

export default function StaffTable() {
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
          />
        </div>

        {/* Dropdowns + Clear */}
        <div className="flex flex-wrap gap-2 items-center">
          <select className={selectCls}>
            <option value="">Todos os Cargos</option>
            <option value="registrar">Registadora Sénior</option>
            <option value="consultant">Consultor de Vistos</option>
            <option value="admin">Administrador</option>
            <option value="support">Suporte</option>
          </select>

          <select className={selectCls}>
            <option value="">Todos os Departamentos</option>
            <option value="admissions">Admissões</option>
            <option value="visa">Vistos</option>
            <option value="management">Gestão</option>
          </select>

          <select className={selectCls}>
            <option value="">Todos os Estados</option>
            <option value="active">Ativo</option>
            <option value="leave">De Licença</option>
            <option value="inactive">Inativo</option>
          </select>

          <button className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                {['Membro do Staff', 'Email', 'Cargo', 'Departamento', 'Estado', 'Último Acesso', ''].map((col) => (
                  <th
                    key={col}
                    className={`px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider ${col === '' ? 'text-right' : ''}`}
                  >
                    {col || 'Ações'}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {staff.map((s) => (
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
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${statusStyle[s.status]}`}>
                      {s.status}
                    </span>
                  </td>

                  {/* Last Login */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{s.lastLogin}</td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-1">
                    {[
                      { icon: Eye, title: 'Ver Perfil' },
                      { icon: Pencil,       title: 'Editar Funcionário' },
                      { icon: Key,        title: 'Gerir Acesso' },
                    ].map(({ icon: Icon, title }) => (
                      <button
                        key={title}
                        title={title}
                        className="p-2 text-slate-400 hover:text-primary transition-colors"
                      >
                        <Icon size={18} />
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">
            A mostrar 1 a {staff.length} de 124 entradas
          </p>
          <div className="flex gap-2">
            <button
              disabled
              className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-400 disabled:opacity-50"
            >
              Anterior
            </button>
            {[1, 2].map((n) => (
              <button
                key={n}
                className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                  n === 1
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {n}
              </button>
            ))}
            <button className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              Seguinte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
