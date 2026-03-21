'use client';

import { Check, CheckCircle, Circle, Hourglass } from 'lucide-react';
import { defaultProcessStages, ProcessStep, ProcessType } from '@/lib/constants/visa-process';

interface ProcessStagesProps {
    processType?: ProcessType;
}

export default function ProcessStages({ processType = 'ensino_superior' }: ProcessStagesProps) {
    // Get the stages for the relevant process type
    const baseStages = defaultProcessStages[processType] || defaultProcessStages.ensino_superior;

    // Mocking progress logic based on the number of stages
    const stages: (ProcessStep & { status: 'completed' | 'active' | 'pending', statusText: string })[] = baseStages.map((stage, index) => {
        // Simple mock: first two are completed, third is active, rest are pending
        if (index < 2) return { ...stage, status: 'completed', statusText: 'Concluído' };
        if (index === 2) return { ...stage, status: 'active', statusText: 'Em Análise' };
        return { ...stage, status: 'pending', statusText: 'Pendente' };
    });

    return (
        <div className="lg:col-span-2 flex flex-col gap-6">
            {stages.map((stage) => {
                const isCompleted = stage.status === 'completed';
                const isActive = stage.status === 'active';
                const isPending = stage.status === 'pending';

                return (
                    <div 
                        key={stage.id}
                        className={`bg-white dark:bg-slate-800 rounded-xl overflow-hidden transition-all duration-300 ${
                            isActive 
                                ? 'shadow-md border border-primary/30 ring-1 ring-primary/10 relative' 
                                : 'shadow-sm border border-slate-200 dark:border-slate-700'
                        } ${isPending ? 'opacity-80' : ''}`}
                    >
                        {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
                        
                        <div className={`p-5 flex gap-4 ${!isPending ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50' : ''} transition-colors`}>
                            <div className="flex flex-col items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                                    isCompleted 
                                        ? 'bg-green-500 text-white' 
                                        : isActive 
                                            ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                                            : 'bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-400 font-bold text-xs'
                                }`}>
                                    {isCompleted ? <Check size={16} /> : isActive ? <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div> : stage.number}
                                </div>
                                {stage.number < stages.length && (
                                    <div className={`w-0.5 h-full ${isCompleted ? 'bg-green-500/20' : 'bg-slate-100 dark:bg-slate-700'}`}></div>
                                )}
                            </div>

                            <div className="flex-1 pb-4">
                                <div className="flex items-center justify-between">
                                    <h3 className={`text-base font-bold ${isActive ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
                                        {stage.number}. {stage.title}
                                    </h3>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                        isCompleted 
                                            ? 'text-green-600 bg-green-50 dark:bg-green-900/20' 
                                            : isActive 
                                                ? 'text-primary bg-primary/10' 
                                                : 'text-slate-500 bg-slate-100 dark:bg-slate-800'
                                    }`}>
                                        {stage.statusText}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 mt-1">{stage.description}</p>

                                <div className={`mt-4 ${isActive ? 'bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 space-y-4' : 'pl-4 border-l-2 border-slate-100 dark:border-slate-700 space-y-3'} ${isPending ? 'opacity-60' : ''}`}>
                                    {stage.subSteps.map((subStep, idx) => {
                                        const subIsCompleted = isCompleted || (isActive && idx === 0);
                                        const subIsActive = isActive && idx === 1;
                                        const subIsPending = isPending || (isActive && idx > 1);

                                        return (
                                            <div key={subStep.id} className="flex items-start gap-3 text-sm">
                                                {subIsCompleted ? (
                                                    <CheckCircle className="text-green-500 text-[18px] shrink-0 mt-0.5" />
                                                ) : subIsActive ? (
                                                    <Hourglass className="text-primary text-[18px] shrink-0 mt-0.5" />
                                                ) : (
                                                    <Circle className="text-slate-400 text-[18px] shrink-0 mt-0.5" />
                                                )}
                                                
                                                <div className="flex-1">
                                                    <span className={`font-medium ${subIsPending ? 'text-slate-600 dark:text-slate-300' : 'text-slate-700 dark:text-slate-200'}`}>
                                                        {subStep.title}
                                                    </span>
                                                    {subIsCompleted && isActive && (
                                                        <p className="text-xs text-slate-500">Realizado há pouco</p>
                                                    )}
                                                    {subIsActive && (
                                                        <>
                                                            <p className="text-xs text-slate-500">Em andamento - Previsão: 2 dias úteis</p>
                                                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-2 overflow-hidden">
                                                                <div className="bg-primary h-1.5 rounded-full" style={{ width: "70%" }}></div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
