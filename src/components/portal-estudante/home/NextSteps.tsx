import { ArrowRight, Circle, Lightbulb, Lock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface ProcessoProps {
  processo: {
    etapa_processo?: Array<{ estado: string; nome: string }>;
    id?: string;
  } | null;
}

export default function NextSteps({ processo }: ProcessoProps) {
  if (!processo) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-600 dark:text-yellow-400">
            <Lightbulb />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Próximos Passos</h3>
        </div>
        <p className="text-sm text-slate-500">
          Ainda não tens um processo activo. Contacta a equipa MUVISA para iniciar a tua candidatura.
        </p>
      </div>
    );
  }

  const etapasPendentes = (processo.etapa_processo ?? []).filter(
    (e) => e.estado === 'pendente' || e.estado === 'em_andamento'
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-600 dark:text-yellow-400">
          <Lightbulb />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Próximos Passos</h3>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        {etapasPendentes.length === 0 ? (
          <div className="flex gap-3 items-center p-4 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20">
            <CheckCircle className="text-green-500 shrink-0" />
            <p className="text-sm text-green-700 dark:text-green-400 font-medium">
              Todos os passos concluídos! O processo está em análise.
            </p>
          </div>
        ) : (
          etapasPendentes.slice(0, 3).map((etapa, idx) => (
            <div
              key={idx}
              className={`flex gap-4 items-start p-4 rounded-lg border ${
                etapa.estado === 'em_andamento'
                  ? 'bg-primary/5 dark:bg-primary/10 border-primary/20'
                  : 'bg-background-light dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 opacity-60'
              }`}
            >
              <div className="mt-0.5">
                {etapa.estado === 'em_andamento' ? (
                  <Circle className="text-primary" />
                ) : (
                  <Lock className="text-slate-400" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{etapa.nome}</h4>
                <p className="text-xs text-slate-500 mt-1">
                  {etapa.estado === 'em_andamento'
                    ? 'Etapa actual — toma acção agora.'
                    : 'Disponível após a etapa anterior.'}
                </p>
                {etapa.estado === 'em_andamento' && (
                  <Link
                    href="/portal-estudante/meu-processo"
                    className="mt-3 text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1"
                  >
                    Ver Detalhes <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
