import { BookOpen, CalendarDays, GraduationCap, MapPin } from 'lucide-react';

interface ProcessoProps {
  processo: {
    universidade?: { nome?: string; cidade?: string; pais?: string } | null;
    estudante?: { universidade_destino?: string; tipo_visto?: string; pais_destino?: string } | null;
    data_inicio_prevista?: string | null;
  } | null;
}

function formatData(dateStr: string | null | undefined): string {
  if (!dateStr) return '—';
  try {
    return new Intl.DateTimeFormat('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(dateStr));
  } catch { return dateStr; }
}

export default function DestinationDetails({ processo }: ProcessoProps) {
  const universidade = processo?.universidade;
  const estudante = processo?.estudante;
  const nomeUniversidade = universidade?.nome ?? estudante?.universidade_destino ?? '—';
  const cidade = universidade?.cidade ?? '—';
  const pais = universidade?.pais ?? estudante?.pais_destino ?? 'Portugal';

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Detalhes do Destino</h3>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-8 rounded shadow-sm overflow-hidden bg-slate-100 relative flex items-center justify-center">
          <span className="text-xl">🇵🇹</span>
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">{pais}</h4>
          <p className="text-xs text-slate-500">{cidade}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase">Instituição</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{nomeUniversidade}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center shrink-0">
            <CalendarDays className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase">Início Previsto</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {formatData(processo?.data_inicio_prevista)}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase">Cidade</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{cidade}</p>
          </div>
        </div>
        {estudante?.tipo_visto && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase">Tipo de Visto</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{estudante.tipo_visto}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
