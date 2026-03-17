interface EventoTimeline {
  id: string;
  titulo: string;
  descricao?: string | null;
  ocorrido_em: string;
  tipo: string;
}

interface TimelineProps {
  eventos: EventoTimeline[];
}

function formatData(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat('pt-PT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export default function Timeline({ eventos }: TimelineProps) {
  const lista = eventos.slice(0, 10);

  return (
    <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Linha do Tempo</h3>
      {lista.length === 0 ? (
        <p className="text-sm text-slate-500">Ainda não há eventos registados.</p>
      ) : (
        <div className="space-y-6 pl-2">
          {lista.map((evento, idx) => (
            <div key={evento.id} className="flex gap-4 relative">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full z-10 ring-4 ring-white dark:ring-slate-900 ${
                    idx === 0 ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                />
                {idx < lista.length - 1 && (
                  <div className="w-0.5 bg-slate-200 dark:bg-slate-700 h-full absolute top-3" />
                )}
              </div>
              <div className="pb-6">
                <p className="text-xs text-slate-400 font-medium mb-1">
                  {formatData(evento.ocorrido_em)}
                </p>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{evento.titulo}</h4>
                {evento.descricao && (
                  <p className="text-sm text-slate-500 mt-1">{evento.descricao}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
