import { auth } from '@/auth';
import { getProcessoByEstudante } from '@/app/actions/processo.actions';
import Footer from '@/components/portal-estudante/Footer';
import WelcomeSection from '@/components/portal-estudante/home/WelcomeSection';
import ProcessStepper from '@/components/portal-estudante/home/ProcessStepper';
import NextSteps from '@/components/portal-estudante/home/NextSteps';
import PendingDocuments from '@/components/portal-estudante/home/PendingDocuments';
import Timeline from '@/components/portal-estudante/home/Timeline';
import ConsultantWidget from '@/components/portal-estudante/home/ConsultantWidget';

export default async function Home() {
  const session = await auth();
  const utilizadorId = session?.user?.id ?? '';

  // Busca processo completo da BD
  let processo = null;
  try {
    processo = await getProcessoByEstudante(utilizadorId);
  } catch {
    // Utilizador ainda sem processo — mostra dados vazios
  }

  const etapas = processo?.etapa_processo ?? [];
  const totalEtapas = etapas.length || 1;
  const etapaAtual = processo?.etapa_atual ?? 0;

  const documentosPendentes = (processo ? [] : []).filter(
    (d: { estado: string }) => ['pendente', 'rejeitado'].includes(d.estado)
  );

  const eventos = processo?.evento_timeline ?? [];
  const staff = processo?.staff ?? null;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <WelcomeSection
        nomeCompleto={session?.user?.name ?? 'Estudante'}
        estadoProcesso={processo?.estado ?? null}
      />

      <ProcessStepper
        etapas={etapas}
        etapaAtual={etapaAtual}
        totalEtapas={totalEtapas}
        estadoGlobal={processo?.estado ?? 'pendente'}
      />

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NextSteps processo={processo} />
        <PendingDocuments documentos={documentosPendentes} processoId={processo?.id ?? null} />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Timeline eventos={eventos} />
        <ConsultantWidget staff={staff} />
      </div>

      <Footer />
    </div>
  );
}
