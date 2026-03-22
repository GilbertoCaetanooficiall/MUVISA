'use client';

import { useState } from 'react';
import UniversitiesStats from '@/components/admin/universities/UniversitiesStats';
import UniversitiesTable from '@/components/admin/universities/UniversitiesTable';
import { GraduationCap, Landmark, TowerControl, DraftingCompass, X, Calendar, Plus, UploadCloud } from 'lucide-react';
import Modal from '@/components/ui/Modal';

export type AppStatus = 'Candidaturas Abertas' | 'A terminar' | 'Candidaturas Fechadas';
export type StudyLevel = 'Licenciatura' | 'Mestrado' | 'Cetsp';

export interface University {
  id: string;
  name: string;
  icon: React.ElementType;
  city: string;
  courses: number;
  status: AppStatus;
  deadline: string;
  website: string;
  studyLevels?: string[];
  courseList?: { name: string; level: string }[];
}

const initialUniversities: University[] = [
  { id: 'U-001', name: 'Universidade de Lisboa', icon: GraduationCap, city: 'Lisboa', courses: 156, status: 'Candidaturas Abertas', deadline: '15 Ago, 2024', website: 'ulisboa.pt', studyLevels: ['Licenciatura', 'Mestrado'] },
  { id: 'U-002', name: 'Universidade do Porto', icon: Landmark, city: 'Porto', courses: 142, status: 'A terminar', deadline: '30 Mai, 2024', website: 'up.pt', studyLevels: ['Mestrado', 'Cetsp'] },
  { id: 'U-003', name: 'Universidade de Coimbra', icon: TowerControl, city: 'Coimbra', courses: 98, status: 'Candidaturas Fechadas', deadline: '15 Mar, 2024', website: 'uc.pt', studyLevels: ['Licenciatura', 'Cetsp'] },
  { id: 'U-004', name: 'Universidade Nova de Lisboa', icon: GraduationCap, city: 'Lisboa', courses: 115, status: 'Candidaturas Abertas', deadline: '20 Jul, 2024', website: 'unl.pt', studyLevels: ['Licenciatura', 'Mestrado', 'Cetsp'] },
  { id: 'U-005', name: 'Universidade do Minho', icon: DraftingCompass, city: 'Braga', courses: 88, status: 'Candidaturas Abertas', deadline: '01 Ago, 2024', website: 'uminho.pt', studyLevels: ['Mestrado'] },
  { id: 'U-006', name: 'Universidade de Aveiro', icon: Landmark, city: 'Aveiro', courses: 76, status: 'Candidaturas Abertas', deadline: '10 Ago, 2024', website: 'ua.pt', studyLevels: ['Licenciatura'] },
];

export default function UniversitiesClient() {
  const [universities, setUniversities] = useState<University[]>(initialUniversities);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addedCourses, setAddedCourses] = useState<{name: string, level: string}[]>([]);
  const [currentCourseName, setCurrentCourseName] = useState('');
  const [currentCourseLevel, setCurrentCourseLevel] = useState('Licenciatura');

  const handleAddCourse = () => {
    if (!currentCourseName.trim()) return;
    setAddedCourses([...addedCourses, { name: currentCourseName, level: currentCourseLevel }]);
    setCurrentCourseName('');
  };

  const handleRemoveCourse = (index: number) => {
    setAddedCourses(addedCourses.filter((_, i) => i !== index));
  };

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const uniqueStudyLevels = Array.from(new Set(addedCourses.map(c => c.level)));
    
    // Determine number of courses: fallback to added courses if user didn't fill the regular courses field
    let coursesCount = Number(formData.get('courses'));
    if (!coursesCount || coursesCount < addedCourses.length) {
      coursesCount = addedCourses.length > 0 ? addedCourses.length : 0;
    }

    const newUni: University = {
      id: `U-00${universities.length + 1}`,
      name: formData.get('name') as string,
      icon: GraduationCap,
      city: formData.get('city') as string,
      courses: coursesCount,
      status: formData.get('status') as AppStatus,
      deadline: formData.get('deadline') as string,
      website: formData.get('website') as string,
      studyLevels: uniqueStudyLevels,
      courseList: addedCourses
    };
    setUniversities([...universities, newUni]);
    setIsAddModalOpen(false);
    setAddedCourses([]);
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
          <h1 className="font-serif text-3xl font-black text-slate-900 dark:text-slate-100">Universidades</h1>
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
      <Modal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} maxWidth="max-w-xl">
        <div className="p-6 relative max-h-[85vh] overflow-y-auto custom-scrollbar">
          <button 
            onClick={() => setIsAddModalOpen(false)} 
            className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
          
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Adicionar Universidade</h2>
          
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nome da Universidade
                </label>
                <input name="name" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Cidade
                </label>
                <input name="city" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nº Cursos (Opcional)
                </label>
                <input name="courses" type="number" min="0" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Prazo de Candidatura
                </label>
                <div className="relative">
                  <input name="deadline" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" required />
                  <Calendar className="absolute right-3 top-2.5 text-slate-400" size={16} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Estado da Candidatura
                </label>
                <select name="status" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" required>
                  <option value="Candidaturas Abertas">Candidaturas Abertas</option>
                  <option value="A terminar">A terminar</option>
                  <option value="Candidaturas Fechadas">Candidaturas Fechadas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Website Oficial
                </label>
                <input name="website" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Cursos e Níveis
              </label>
              <div className="flex flex-col sm:flex-row gap-2 mb-2">
                <select 
                  value={currentCourseLevel}
                  onChange={(e) => setCurrentCourseLevel(e.target.value)}
                  className="sm:w-1/3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                >
                  <option value="Licenciatura">Licenciatura</option>
                  <option value="Mestrado">Mestrado</option>
                  <option value="Cetsp">Cetsp</option>
                </select>
                
                <input 
                  type="text" 
                  value={currentCourseName}
                  onChange={(e) => setCurrentCourseName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCourse();
                    }
                  }}
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" 
                  placeholder="Nome do curso" 
                />
                
                <button 
                  type="button" 
                  onClick={handleAddCourse} 
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <Plus size={16} /> Adicionar
                </button>
              </div>
              
              {addedCourses.length > 0 ? (
                <div className="grid grid-cols-1 gap-2 mt-2 max-h-32 overflow-y-auto">
                  {addedCourses.map((course, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{course.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">{course.level}</span>
                      </div>
                      <button type="button" onClick={() => handleRemoveCourse(idx)} className="text-slate-400 hover:text-red-500 transition-colors flex items-center justify-center">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full py-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg flex justify-center bg-slate-50/50 dark:bg-slate-800/20">
                  <span className="text-xs font-medium text-slate-400">Nenhum curso adicionado</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Fotografia de Capa
              </label>
              <label className="w-full h-24 bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
                <UploadCloud className="text-slate-400 mb-1" size={20} />
                <span className="text-xs text-slate-500 font-medium">Clique para fazer upload</span>
                <input type="file" name="photo" className="hidden" accept="image/*" />
              </label>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button 
                type="button" 
                onClick={() => setIsAddModalOpen(false)} 
                className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 shadow-sm transition-colors"
              >
                Adicionar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
