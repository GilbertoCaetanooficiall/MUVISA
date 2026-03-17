import { Check } from 'lucide-react';

interface Etapa {
  id: string;
  nome: string;
  estado: 'pendente' | 'em_andamento' | 'concluida';
  ordem: number;
}

interface ProcessStepperProps {
  etapas: Etapa[];
  etapaAtual: number;
  totalEtapas: number;
  estadoGlobal: string;
}

const estadoLabel: Record<string, string> = {
  pendente: 'Pendente',
  em_andamento: 'Em Andamento',
  em_analise: 'Em Análise',
  aprovado: 'Aprovado',
  emitido: 'Visto Emitido',
};

// Etapas padrão se a BD ainda não tiver etapas configuradas
const ETAPAS_DEFAULT: Etapa[] = [
  { id: '1', nome: 'Recolha de Dados', estado: 'pendente', ordem: 1 },
  { id: '2', nome: 'Documentos', estado: 'pendente', ordem: 2 },
  { id: '3', nome: 'Aplicação', estado: 'pendente', ordem: 3 },
  { id: '4', nome: 'Biometria', estado: 'pendente', ordem: 4 },
  { id: '5', nome: 'Visto Emitido', estado: 'pendente', ordem: 5 },
];

export default function ProcessStepper({ etapas, etapaAtual, estadoGlobal }: ProcessStepperProps) {
  const lista = etapas.length > 0 ? etapas : ETAPAS_DEFAULT;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Status da Aplicação</h3>
        <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mt-2 md:mt-0">
          {estadoLabel[estadoGlobal] ?? estadoGlobal}
        </span>
      </div>
      <div className="relative">
        <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 -z-0 rounded-full hidden md:block" />
        <div className="flex flex-col md:flex-row justify-between relative z-10 gap-6 md:gap-0">
          {lista
            .sort((a, b) => a.ordem - b.ordem)
            .map((etapa, idx) => {
              const concluida = etapa.estado === 'concluida' || idx < etapaAtual - 1;
              const ativa = etapa.estado === 'em_andamento' || idx === etapaAtual - 1;
              const inativa = !concluida && !ativa;

              return (
                <div
                  key={etapa.id}
                  className={`flex md:flex-col items-center gap-4 md:gap-2 group flex-1 ${inativa ? 'opacity-50' : ''}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      concluida
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : ativa
                        ? 'bg-white dark:bg-slate-800 border-4 border-primary text-primary'
                        : 'bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-400'
                    }`}
                  >
                    {concluida ? (
                      <Check className="text-xl" />
                    ) : ativa ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    ) : (
                      <span className="text-sm font-bold">{etapa.ordem}</span>
                    )}
                  </div>
                  <div className="flex flex-col md:items-center">
                    <span
                      className={`text-sm font-bold ${
                        ativa ? 'text-primary' : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {etapa.nome}
                    </span>
                    <span
                      className={`text-xs ${
                        concluida
                          ? 'text-slate-500'
                          : ativa
                          ? 'text-primary font-medium'
                          : 'text-slate-500'
                      }`}
                    >
                      {concluida ? 'Concluído' : ativa ? 'Em Andamento' : 'Pendente'}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
