import { auth } from '@/auth';
import { getProcessoByEstudante } from '@/app/actions/processo.actions';
import { Download, Eye } from 'lucide-react';
import ProcessStages from '@/components/portal-estudante/meu-processo/ProcessStages';
import DestinationDetails from '@/components/portal-estudante/meu-processo/DestinationDetails';
import VisaSummary from '@/components/portal-estudante/meu-processo/VisaSummary';
import ChatCTA from '@/components/portal-estudante/meu-processo/ChatCTA';
import Footer from '@/components/portal-estudante/Footer';

export default async function MeuProcessoPage() {
  const session = await auth();
  const utilizadorId = session?.user?.id ?? '';

  let processo = null;
  try {
    processo = await getProcessoByEstudante(utilizadorId);
  } catch {
    // sem processo
  }

  const etapas = processo?.etapa_processo ?? [];
  const totalEtapas = etapas.length || 1;
  const progresso = processo ? Math.round((processo.etapa_atual / totalEtapas) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Acompanhamento Detalhado
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Visualize cada etapa da sua jornada rumo ao intercâmbio.
          </p>
        </div>
        {processo && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-slate-500">Progresso geral</p>
              <p className="text-lg font-bold text-primary">{progresso}%</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-2">
                <Download className="w-4 h-4" /> Baixar Guia
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition flex items-center gap-2 shadow-lg shadow-primary/20">
                <Eye className="w-4 h-4" /> Ver Protocolo
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <ProcessStages etapas={etapas} etapaAtual={processo?.etapa_atual ?? 0} />
        <div className="flex flex-col gap-6">
          <DestinationDetails processo={processo} />
          <VisaSummary processo={processo} />
          <ChatCTA />
        </div>
      </div>

      <Footer />
    </div>
  );
}
