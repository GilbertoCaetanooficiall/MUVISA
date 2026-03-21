'use client';

import { useState } from 'react';
import UniversitiesStats from '@/components/admin/universities/UniversitiesStats';
import UniversitiesTable from '@/components/admin/universities/UniversitiesTable';
import { GraduationCap, Landmark, TowerControl, DraftingCompass, X, Calendar, ChevronDown, BookOpen, Plus, UploadCloud } from 'lucide-react';

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
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsAddModalOpen(false)}
          />

          {/* Modal Panel */}
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-300 transition-all custom-scrollbar">
            {/* Close Button */}
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors z-20 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
              aria-label="Fechar modal"
            >
              <X size={22} strokeWidth={2.5} />
            </button>

            <div className="p-8 sm:p-10">
              {/* Header */}
              <div className="text-center mb-10">
                <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4 font-display">
                  Gestão Académica
                </span>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 font-display tracking-tight">
                  Adicionar Universidade
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-display">
                  Cadastre uma nova instituição de ensino em nossa base de dados.
                </p>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-8">
                {/* Contextual Banner */}
                <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary p-5 rounded-r-2xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Novo Registro</p>
                  <p className="text-slate-900 dark:text-white font-bold font-display text-lg">Informações da Instituição</p>
                </div>

                <div className="space-y-6">
                  {/* Form Row 1 */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Nome da Universidade</label>
                    <input name="name" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-5 py-4 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="Ex: Universidade de Coimbra" type="text" required />
                  </div>
                  
                  {/* Form Row 2 */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Cidade</label>
                    <input name="city" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-5 py-4 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="Ex: Coimbra, Portugal" type="text" required />
                  </div>

                  {/* Form Row 3 (Two Columns) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Nº Cursos (Opcional)</label>
                      <input name="courses" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-5 py-4 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="Automático" type="number" min="0" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Prazo de Candidatura</label>
                      <div className="relative">
                        <input name="deadline" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-5 py-4 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="Ex: 30 Mai, 2024" type="text" required />
                        <Calendar className="absolute right-4 top-4 text-slate-400" size={20} />
                      </div>
                    </div>
                  </div>

                  {/* Form Row 4 (Dropdown) */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Estado da Candidatura</label>
                    <div className="relative">
                      <select name="status" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-5 py-4 text-slate-900 dark:text-white appearance-none focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium" required>
                        <option value="Candidaturas Abertas">Candidaturas Abertas</option>
                        <option value="A terminar">A terminar</option>
                        <option value="Candidaturas Fechadas">Candidaturas Fechadas</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-4 text-slate-400 pointer-events-none" size={20} />
                    </div>
                  </div>

                  {/* Form Row 5 (Website) */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Website Oficial</label>
                    <input name="website" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-5 py-4 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="exemplo.pt" type="text" required />
                  </div>

                  {/* Courses Section */}
                  <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen size={18} className="text-primary" />
                      <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Cursos e Níveis</h3>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative sm:w-1/3">
                        <select 
                          value={currentCourseLevel}
                          onChange={(e) => setCurrentCourseLevel(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-5 py-4 text-slate-900 dark:text-white appearance-none focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium"
                        >
                          <option value="Licenciatura">Licenciatura</option>
                          <option value="Mestrado">Mestrado</option>
                          <option value="Cetsp">Cetsp</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-4 text-slate-400 pointer-events-none" size={18} />
                      </div>
                      
                      <div className="flex-1">
                        <input 
                          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-5 py-4 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium" 
                          placeholder="Nome do curso" 
                          type="text" 
                          value={currentCourseName}
                          onChange={(e) => setCurrentCourseName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddCourse();
                            }
                          }}
                        />
                      </div>
                      <button 
                        type="button" 
                        onClick={handleAddCourse} 
                        className="bg-primary hover:bg-primary-hover text-white px-6 py-4 rounded-xl font-bold transition-all whitespace-nowrap shadow-lg shadow-primary/20 active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Plus size={18} />
                        Adicionar
                      </button>
                    </div>

                    {addedCourses.length > 0 ? (
                      <div className="grid grid-cols-1 gap-2 mt-4">
                        {addedCourses.map((course, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 p-4 rounded-xl animate-in slide-in-from-right-2 duration-300">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                              <span className="font-bold text-slate-800 dark:text-slate-200">{course.name}</span>
                              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-primary/10 text-primary w-fit">{course.level}</span>
                            </div>
                            <button type="button" onClick={() => handleRemoveCourse(idx)} className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                              <X size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="w-full py-8 border-2 border-dashed border-slate-200 dark:border-slate-700/50 rounded-2xl flex flex-col items-center justify-center gap-2 bg-slate-50/50 dark:bg-slate-800/20">
                        <span className="text-sm font-medium text-slate-400">Nenhum curso associado a esta universidade</span>
                      </div>
                    )}
                  </div>

                  {/* Image Upload Section */}
                  <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                       <UploadCloud size={18} className="text-primary" />
                       <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Fotografia de Capa</h3>
                    </div>
                    <label className="w-full aspect-video bg-slate-50 dark:bg-slate-800/30 border-2 border-dashed border-slate-200 dark:border-slate-700/50 rounded-[1.5rem] flex flex-col items-center justify-center group hover:border-primary transition-all cursor-pointer overflow-hidden relative">
                      <div className="z-10 flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <UploadCloud className="text-primary" size={28} />
                        </div>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Arraste a foto ou <span className="text-primary">clique aqui</span></p>
                        <p className="text-[10px] font-black uppercase tracking-tighter text-slate-400 mt-2">PNG, JPG (Máx. 10MB)</p>
                      </div>
                      <input type="file" name="photo" className="hidden" accept="image/*" />
                    </label>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="pt-8 flex flex-col sm:flex-row gap-4">
                  <button 
                    type="button" 
                    onClick={() => setIsAddModalOpen(false)} 
                    className="flex-1 h-14 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-display"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="flex-[2] h-14 bg-primary hover:bg-primary-hover text-white rounded-xl font-black shadow-[0_10px_25px_-5px_rgba(25,120,229,0.4)] hover:scale-[1.02] active:scale-95 transition-all font-display tracking-wide uppercase text-sm"
                  >
                    Adicionar Universidade
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
