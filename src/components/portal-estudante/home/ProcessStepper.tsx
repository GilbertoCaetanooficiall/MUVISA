'use client';

import { Check } from 'lucide-react';
import { defaultProcessStages, ProcessType } from '@/lib/constants/visa-process';

interface ProcessStepperProps {
    processType?: ProcessType;
}

export default function ProcessStepper({ processType = 'ensino_superior' }: ProcessStepperProps) {
    // Get the stages for the relevant process type
    const baseStages = defaultProcessStages[processType] || defaultProcessStages.ensino_superior;

    // Mocking progress for the stepper
    const stages = baseStages.map((stage, index) => {
        let status: 'completed' | 'active' | 'pending' = 'pending';
        let statusText = 'Pendente';
        
        if (index < 2) {
            status = 'completed';
            statusText = index === 1 ? 'Enviados' : 'Concluído';
        } else if (index === 2) {
            status = 'active';
            statusText = 'Em Análise';
        } else {
            statusText = index === 4 ? 'Aguardando' : 'Pendente';
        }
        
        return { ...stage, status, statusText };
    });

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Status da Candidatura</h3>
                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mt-2 md:mt-0">Em Andamento</span>
            </div>
            <div className="relative">
                <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 -z-0 rounded-full hidden md:block"></div>
                <div className="flex flex-col md:flex-row justify-between relative z-10 gap-6 md:gap-0">
                    {stages.map((stage) => {
                        const isCompleted = stage.status === 'completed';
                        const isActive = stage.status === 'active';
                        const isPending = stage.status === 'pending';

                        return (
                            <div key={stage.id} className={`flex md:flex-col items-center gap-4 md:gap-2 group flex-1 ${isPending ? 'opacity-50' : ''}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                                    isCompleted 
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                                        : isActive 
                                            ? 'bg-white border-4 border-primary text-primary' 
                                            : 'bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-400'
                                }`}>
                                    {isCompleted ? (
                                        <Check className="text-xl" />
                                    ) : isActive ? (
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
                                    ) : (
                                        <span className="text-sm font-bold">{stage.number}</span>
                                    )}
                                </div>
                                <div className="flex flex-col md:items-center">
                                    <span className={`text-sm font-bold ${isActive ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
                                        {stage.title}
                                    </span>
                                    <span className={`text-xs ${isActive ? 'text-primary font-medium' : 'text-slate-500'}`}>
                                        {stage.statusText}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                    {/* Vertical line for mobile view */}
                    <div className="md:hidden absolute left-[19px] top-8 bottom-8 w-0.5 bg-slate-200 -z-10"></div>
                </div>
            </div>
        </div>
    );
}
