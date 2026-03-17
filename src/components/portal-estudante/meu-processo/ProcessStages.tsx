import { Check, CheckCircle, Circle, Hourglass } from 'lucide-react';

interface Etapa {
  id: string;
  nome: string;
  estado: 'pendente' | 'em_andamento' | 'concluida';
  ordem: number;
  descricao?: string | null;
}

interface ProcessStagesProps {
  etapas: Etapa[];
  etapaAtual: number;
}

const ETAPAS_DEFAULT: Etapa[] = [
  { id: '1', nome: 'Recolha de Dados', estado: 'pendente', ordem: 1, descricao: 'Formulário inicial e entrevista de perfil.' },
  { id: '2', nome: 'Documentos', estado: 'pendente', ordem: 2, descricao: 'Reunião e validação de documentos.' },
  { id: '3', nome: 'Aplicação', estado: 'pendente', ordem: 3, descricao: 'Submissão no portal do governo e processamento.' },
  { id: '4', nome: 'Biometria', estado: 'pendente', ordem: 4, descricao: 'Agendamento e recolha de dados biométricos.' },
  { id: '5', nome: 'Visto Emitido', estado: 'pendente', ordem: 5, descricao: 'Envio do passaporte para carimbo e recebimento.' },
];

export default function ProcessStages({ etapas, etapaAtual }: ProcessStagesProps) {
  const lista = (etapas.length > 0 ? etapas : ETAPAS_DEFAULT).sort((a, b) => a.ordem - b.ordem);

  return (
    <div className="lg:col-span-2 flex flex-col gap-6">
      {lista.map((etapa) => {
        const concluida = etapa.estado === 'concluida' || etapa.ordem < etapaAtual;
        const ativa = etapa.estado === 'em_andamento' || etapa.ordem === etapaAtual;

        if (concluida) {
          return (
            <div key={etapa.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-5 flex gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="w-0.5 h-full bg-green-500/20" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {etapa.ordem}. {etapa.nome}
                    </h3>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">Concluído</span>
                  </div>
                  {etapa.descricao && <p className="text-sm text-slate-500 mt-1">{etapa.descricao}</p>}
                  <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Etapa concluída com sucesso</span>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if (ativa) {
          return (
            <div key={etapa.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-primary/30 ring-1 ring-primary/10 overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
              <div className="p-5 flex gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/30">
                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                  </div>
                  <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-primary">{etapa.ordem}. {etapa.nome}</h3>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">Em Andamento</span>
                  </div>
                  {etapa.descricao && <p className="text-sm text-slate-500 mt-1">{etapa.descricao}</p>}
                  <div className="mt-3 flex items-center gap-2 text-sm text-primary">
                    <Hourglass className="w-4 h-4" />
                    <span>A ser processada pela equipa MUVISA</span>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        // Pendente
        return (
          <div key={etapa.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden opacity-70">
            <div className="p-5 flex gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-400 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold">{etapa.ordem}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">{etapa.ordem}. {etapa.nome}</h3>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Pendente</span>
                </div>
                {etapa.descricao && <p className="text-sm text-slate-400 mt-1">{etapa.descricao}</p>}
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                  <Circle className="w-4 h-4" />
                  <span>Aguarda etapas anteriores</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
