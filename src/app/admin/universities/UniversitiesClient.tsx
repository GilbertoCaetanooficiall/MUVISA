'use client';

import { useState } from 'react';
import UniversitiesStats from '@/components/admin/universities/UniversitiesStats';
import UniversitiesTable from '@/components/admin/universities/UniversitiesTable';
import { GraduationCap, Landmark, TowerControl, DraftingCompass, X } from 'lucide-react';

export type AppStatus = 'Candidaturas Abertas' | 'A terminar' | 'Candidaturas Fechadas';

export interface University {
  id: string;
  name: string;
  icon: React.ElementType;
  city: string;
  courses: number;
  status: AppStatus;
  deadline: string;
  website: string;
}

const initialUniversities: University[] = [
  { id: 'U-001', name: 'Universidade de Lisboa', icon: GraduationCap, city: 'Lisboa', courses: 156, status: 'Candidaturas Abertas', deadline: '15 Ago, 2024', website: 'ulisboa.pt' },
  { id: 'U-002', name: 'Universidade do Porto', icon: Landmark, city: 'Porto', courses: 142, status: 'A terminar', deadline: '30 Mai, 2024', website: 'up.pt' },
  { id: 'U-003', name: 'Universidade de Coimbra', icon: TowerControl, city: 'Coimbra', courses: 98, status: 'Candidaturas Fechadas', deadline: '15 Mar, 2024', website: 'uc.pt' },
  { id: 'U-004', name: 'Universidade Nova de Lisboa', icon: GraduationCap, city: 'Lisboa', courses: 115, status: 'Candidaturas Abertas', deadline: '20 Jul, 2024', website: 'unl.pt' },
  { id: 'U-005', name: 'Universidade do Minho', icon: DraftingCompass, city: 'Braga', courses: 88, status: 'Candidaturas Abertas', deadline: '01 Ago, 2024', website: 'uminho.pt' },
  { id: 'U-006', name: 'Universidade de Aveiro', icon: Landmark, city: 'Aveiro', courses: 76, status: 'Candidaturas Abertas', deadline: '10 Ago, 2024', website: 'ua.pt' },
];

export default function UniversitiesClient() {
  const [universities, setUniversities] = useState<University[]>(initialUniversities);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUni: University = {
      id: `U-00${universities.length + 1}`,
      name: formData.get('name') as string,
      icon: GraduationCap,
      city: formData.get('city') as string,
      courses: Number(formData.get('courses')),
      status: formData.get('status') as AppStatus,
      deadline: formData.get('deadline') as string,
      website: formData.get('website') as string,
    };
    setUniversities([...universities, newUni]);
    setIsAddModalOpen(false);
    alert('Universidade adicionada com sucesso!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem a certeza que deseja eliminar esta universidade?')) {
      setUniversities(universities.filter(u => u.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: AppStatus) => {
    setUniversities(universities.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100">Universidades</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gira todas as universidades em Portugal disponíveis para candidaturas de estudantes.
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20 self-start sm:self-auto"
        >
          Adicionar Nova Universidade
        </button>
      </div>

      {/* Stats */}
      <UniversitiesStats universities={universities} />

      {/* Filter + Table */}
      <UniversitiesTable 
        universities={universities}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-md w-full p-6 relative">
            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Adicionar Nova Universidade</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome</label>
                <input name="name" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cidade</label>
                <input name="city" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cursos</label>
                  <input name="courses" type="number" min="0" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Prazo</label>
                  <input name="deadline" type="text" placeholder="Ex: 30 Mai, 2024" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Estado da Candidatura</label>
                <select name="status" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required>
                  <option value="Candidaturas Abertas">Candidaturas Abertas</option>
                  <option value="A terminar">A terminar</option>
                  <option value="Candidaturas Fechadas">Candidaturas Fechadas</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Website</label>
                <input name="website" type="text" placeholder="exemplo.pt" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required />
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
