'use client';

import { useState, useMemo } from 'react';
import ApplicationsStats from '@/components/admin/applications/ApplicationsStats';
import ApplicationsTable from '@/components/admin/applications/ApplicationsTable';
import { Plus, X } from 'lucide-react';
import Modal from '@/components/ui/Modal';

export type AppStatus = 'Aceite' | 'Em Revisão' | 'Submetido' | 'Docs Pendentes' | 'Rascunho';

export interface Application {
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

const initialApplications: Application[] = [
  {
    id: 'A-001', appId: 'APP-2024-001', studentName: 'Sarah Jenkins', initials: 'SJ',
    university: 'Universidade de Oxford', course: 'MSc Ciência da Computação',
    intake: 'Outono 2024', deadline: '15 Mar, 2024', deadlineClass: 'text-rose-500',
    status: 'Aceite', staffInitials: 'MK', staffName: 'Michael King', staffAvatarClass: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
  },
  {
    id: 'A-002', appId: 'APP-2024-042', studentName: 'David Miller', initials: 'DM',
    university: 'Universidade de Stanford', course: 'MBA Gestão de Empresas',
    intake: 'Outono 2024', deadline: '30 Abr, 2024', deadlineClass: 'text-slate-700 dark:text-slate-300',
    status: 'Em Revisão', staffInitials: 'LW', staffName: 'Lisa Wong', staffAvatarClass: 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400',
  },
  {
    id: 'A-003', appId: 'APP-2024-089', studentName: 'James Wilson', initials: 'JW',
    university: 'MIT', course: 'BSc Engenharia Robótica',
    intake: 'Primavera 2025', deadline: '12 Maio, 2024', deadlineClass: 'text-slate-700 dark:text-slate-300',
    status: 'Submetido', staffInitials: 'TC', staffName: 'Tom Chen', staffAvatarClass: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'A-004', appId: 'APP-2024-112', studentName: 'Elena Rodriguez', initials: 'ER',
    university: 'Universidade de Toronto', course: 'MA Relações Internacionais',
    intake: 'Outono 2024', deadline: '05 Abr, 2024', deadlineClass: 'text-slate-700 dark:text-slate-300',
    status: 'Docs Pendentes', staffInitials: 'MK', staffName: 'Michael King', staffAvatarClass: 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400',
  },
  {
    id: 'A-005', appId: 'APP-2024-205', studentName: 'Liam Wilson', initials: 'LW',
    university: 'UCLA', course: 'BFA Artes Visuais',
    intake: 'Outono 2024', deadline: '10 Jun, 2024', deadlineClass: 'text-slate-700 dark:text-slate-300',
    status: 'Rascunho', staffInitials: 'Un', staffName: 'Não Atribuído', staffAvatarClass: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
  },
];

export default function ApplicationsClient() {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [universityFilter, setUniversityFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredApplications = useMemo(() => {
    return applications.filter(a => {
      const searchMatch = a.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || a.appId.toLowerCase().includes(searchQuery.toLowerCase());
      const uniMatch = universityFilter ? a.university === universityFilter : true;
      const courseMatch = courseFilter ? a.course === courseFilter : true;
      const statusMatch = statusFilter ? a.status === statusFilter : true;
      return searchMatch && uniMatch && courseMatch && statusMatch;
    });
  }, [applications, searchQuery, universityFilter, courseFilter, statusFilter]);

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newName = formData.get('studentName') as string;
    
    // Quick initials generator
    const parts = newName.trim().split(' ');
    const newInitials = parts.length > 1 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : newName.substring(0, 2).toUpperCase();
    
    const newApp: Application = {
      id: `A-00${applications.length + 1}`,
      appId: `APP-2024-${applications.length + 300}`,
      studentName: newName,
      initials: newInitials,
      university: formData.get('university') as string,
      course: formData.get('course') as string,
      intake: formData.get('intake') as string,
      deadline: formData.get('deadline') as string,
      deadlineClass: 'text-slate-700 dark:text-slate-300',
      status: 'Submetido',
      staffInitials: 'Un',
      staffName: 'Não Atribuído',
      staffAvatarClass: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
    };
    setApplications([newApp, ...applications]);
    setIsAddModalOpen(false);
    alert('Nova candidatura submetida com sucesso!');
  };

  const handleToggleStatus = (id: string, newStatus: AppStatus) => {
    setApplications(apps => apps.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Tem a certeza que deseja eliminar esta candidatura?')) {
      setApplications(apps => apps.filter(a => a.id !== id));
    }
  };

  const handleView = (id: string) => {
    alert(`A visualizar detalhes da candidatura ${id}`);
  };

  const handleUploadDocs = (id: string) => {
    alert(`Abrindo portal de submissão de documentos para a candidatura ${id}`);
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Candidaturas
          </h1>
          <p className="text-slate-500 mt-1">
            Gira todas as candidaturas universitárias submetidas pelos estudantes.
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-primary/20 self-start md:self-auto"
        >
          <Plus size={18} />
          Criar Nova Candidatura
        </button>
      </div>

      {/* Stats */}
      <ApplicationsStats applications={applications} />

      {/* Filters + Table */}
      <ApplicationsTable 
        applications={filteredApplications}
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        universityFilter={universityFilter} setUniversityFilter={setUniversityFilter}
        courseFilter={courseFilter} setCourseFilter={setCourseFilter}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
        onView={handleView}
        onUploadDocs={handleUploadDocs}
      />

      {/* Add Modal */}
      <Modal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <div className="p-6">
          <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
            <X size={20} />
          </button>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Nova Candidatura</h2>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome do Estudante</label>
              <input name="studentName" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Universidade</label>
              <input name="university" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Curso</label>
              <input name="course" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Ingresso (Intake)</label>
                <input name="intake" type="text" placeholder="Ex: Outono 2024" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Prazo</label>
                <input name="deadline" type="text" placeholder="Ex: 15 Mar, 2024" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required />
              </div>
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium">Cancelar</button>
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">Criar</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
