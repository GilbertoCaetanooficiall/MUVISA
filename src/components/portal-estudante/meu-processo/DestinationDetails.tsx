import { BookOpen, CalendarDays, GraduationCap } from 'lucide-react';
export default function DestinationDetails() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Detalhes do Destino</h3>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-8 rounded shadow-sm overflow-hidden bg-slate-100 relative">
                    <div className="absolute inset-0 flex">
                        <div className="w-1/4 bg-[#FF0000]"></div>
                        <div className="w-1/2 bg-white flex items-center justify-center">
                            <span className="text-[#FF0000] text-lg font-bold">🍁</span>
                        </div>
                        <div className="w-1/4 bg-[#FF0000]"></div>
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Canadá</h4>
                    <p className="text-xs text-slate-500">Toronto, ON</p>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center shrink-0">
                        <GraduationCap className="text-[18px]" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium uppercase">Instituição</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Seneca College</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center shrink-0">
                        <CalendarDays className="text-[18px]" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium uppercase">Início das Aulas</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">08 de Janeiro, 2024</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center shrink-0">
                        <BookOpen className="text-[18px]" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium uppercase">Programa</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Business Marketing</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
