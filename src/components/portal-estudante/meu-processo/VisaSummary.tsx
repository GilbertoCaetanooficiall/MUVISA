import { BadgeCheck } from 'lucide-react';

interface VisaSummaryProps {
    type?: 'superior' | 'formacao';
}

const visaConfig = {
    superior: {
        title: "Visto de Residência",
        subtitle: "Ensino Superior (Visto D4)",
        time: "2 Semanas",
        progress: 85,
        label: "Após entrega no Consulado"
    },
    formacao: {
        title: "Visto de Residência",
        subtitle: "Formação Profissional",
        time: "Média 40 Dias",
        progress: 45,
        label: "Após entrega no Consulado"
    }
};

export default function VisaSummary({ type = 'superior' }: VisaSummaryProps) {
    const config = visaConfig[type];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Resumo do Visto</h3>
            
            <div className="bg-primary/5 rounded-lg p-4 mb-4 border border-primary/10">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-tight">Tipo de Visto</span>
                    <BadgeCheck className="text-primary w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-primary">{config.title}</h4>
                <p className="text-xs text-primary/70 mt-1">{config.subtitle}</p>
            </div>

            <div className="space-y-4 pt-2">
                <div>
                    <div className="flex justify-between items-end mb-1">
                        <div>
                            <p className="text-xs text-slate-500 font-medium">Tempo Médio Atual</p>
                            <p className="text-[10px] text-slate-400 font-medium">{config.label}</p>
                        </div>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{config.time}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                        <div 
                            className="bg-primary h-2 rounded-full transition-all duration-1000" 
                            style={{ width: `${config.progress}%` }} 
                        />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 text-right italic font-medium">
                        Atualizado pelo Consulado de Portugal em Angola
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-lg border border-slate-100 dark:border-slate-800 transition-colors">
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Validade</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">2 Anos</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-lg border border-slate-100 dark:border-slate-800 transition-colors">
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Entradas</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Múltiplas</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
