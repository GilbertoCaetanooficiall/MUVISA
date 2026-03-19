import { BookOpen, CalendarDays, GraduationCap } from 'lucide-react';
export default function DestinationDetails() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Detalhes do Destino</h3>
            <div className="flex items-center gap-3 mb-6">
                <span className="fi fi-pt text-4xl shadow-sm rounded-sm"></span>
                <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Portugal</h4>
                    <p className="text-xs text-slate-500">Lisboa</p>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center shrink-0">
                        <GraduationCap className="text-[18px]" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium uppercase">Instituição</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Universidade de Lisboa</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center shrink-0">
                        <CalendarDays className="text-[18px]" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium uppercase">Início das Aulas</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">15 de Setembro, 2024</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center shrink-0">
                        <BookOpen className="text-[18px]" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium uppercase">Programa</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Gestão de Negócios Internacionais</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
