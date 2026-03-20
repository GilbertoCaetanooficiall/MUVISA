'use client';

import { useState, useMemo } from 'react';
import StaffStats from '@/components/admin/staff/StaffStats';
import StaffTable from '@/components/admin/staff/StaffTable';
import { UserPlus, X } from 'lucide-react';

export type StaffStatus = 'Ativo' | 'De Licença' | 'Inativo';

export interface StaffMember {
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

const initialStaff: StaffMember[] = [
  { id: 'S-001', name: 'Alexandra Rivera', initials: 'AR', avatarClass: 'bg-blue-600', email: 'a.rivera@muvisa.com', role: 'Registadora Sénior', department: 'Admissões', status: 'Ativo', lastLogin: 'há 2 horas' },
  { id: 'S-002', name: 'Marcus Chen', initials: 'MC', avatarClass: 'bg-purple-600', email: 'm.chen@muvisa.com', role: 'Consultor de Vistos', department: 'Vistos', status: 'De Licença', lastLogin: 'há 3 dias' },
  { id: 'S-003', name: 'Sarah Jenkins', initials: 'SJ', avatarClass: 'bg-emerald-600', email: 's.jenkins@muvisa.com', role: 'Administrador', department: 'Gestão', status: 'Ativo', lastLogin: 'há 10 minutos' },
  { id: 'S-004', name: 'David Miller', initials: 'DM', avatarClass: 'bg-orange-600', email: 'd.miller@muvisa.com', role: 'Suporte', department: 'Gestão', status: 'Inativo', lastLogin: 'há 1 mês' },
];

export default function StaffClient() {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredStaff = useMemo(() => {
    return staff.filter((s) => {
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRole = roleFilter ? s.role === roleFilter : true;
      const matchDept = departmentFilter ? s.department === departmentFilter : true;
      let matchStatus = true;
      if (statusFilter === 'active') matchStatus = s.status === 'Ativo';
      else if (statusFilter === 'leave') matchStatus = s.status === 'De Licença';
      else if (statusFilter === 'inactive') matchStatus = s.status === 'Inativo';

      return matchSearch && matchRole && matchDept && matchStatus;
    });
  }, [staff, searchQuery, roleFilter, departmentFilter, statusFilter]);

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newName = formData.get('name') as string;
    const parts = newName.trim().split(' ');
    const newInitials = parts.length > 1 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : newName.substring(0, 2).toUpperCase();
    
    // Pick a random colour for the avatar
    const colors = ['bg-blue-600', 'bg-purple-600', 'bg-emerald-600', 'bg-orange-600', 'bg-rose-600', 'bg-indigo-600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newStaff: StaffMember = {
      id: `S-00${staff.length + 1}`,
      name: newName,
      initials: newInitials,
      avatarClass: randomColor,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
      department: formData.get('department') as string,
      status: formData.get('status') as StaffStatus,
      lastLogin: 'Nunca',
    };

    setStaff([newStaff, ...staff]);
    setIsAddModalOpen(false);
    alert('Funcionário adicionado com sucesso!');
  };

  const handleToggleStatus = (id: string, newStatus: StaffStatus) => {
    setStaff(list => list.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem a certeza que deseja eliminar este funcionário?')) {
      setStaff(list => list.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Funcionários</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Gira os funcionários internos, funções e permissões de acesso para o portal MUVISA.
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-primary/20 self-start md:self-auto"
        >
          <UserPlus size={20} />
          Adicionar Novo Funcionário
        </button>
      </div>

      {/* Stat cards */}
      <StaffStats staff={staff} />

      {/* Filter bar + Table */}
      <StaffTable 
        staff={filteredStaff}
        totalStaffOriginal={staff.length}
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        roleFilter={roleFilter} setRoleFilter={setRoleFilter}
        departmentFilter={departmentFilter} setDepartmentFilter={setDepartmentFilter}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
      />

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-md w-full p-6 relative">
            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Adicionar Novo Funcionário</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome Completo</label>
                <input name="name" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Profissional</label>
                <input name="email" type="email" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cargo</label>
                  <input name="role" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Departamento</label>
                  <select name="department" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required>
                    <option value="Admissões">Admissões</option>
                    <option value="Vistos">Vistos</option>
                    <option value="Gestão">Gestão</option>
                    <option value="Suporte">Suporte</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Estado</label>
                <select name="status" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required>
                  <option value="Ativo">Ativo</option>
                  <option value="De Licença">De Licença</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">Adicionar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
