import Sidebar from "@/components/portal-estudante/Sidebar";
import Header from "@/components/portal-estudante/Header";
import { ChatPanelProvider } from "@/components/portal-estudante/ChatPanel";
import { MobileMenuProvider } from "@/components/portal-estudante/MobileMenuContext";
import { auth } from '@/auth';
import { getProcessoByEstudante } from '@/app/actions/processo.actions';
import { supabaseAdmin } from '@/lib/db';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const processo = session?.user?.id ? await getProcessoByEstudante(session.user.id) : null;
  
  let destinatarioId = processo?.staff?.utilizador_id;
  let destinatarioNome = processo?.staff?.utilizador?.nome_completo;

  if (processo && !destinatarioId) {
    const { data: admin } = await supabaseAdmin
      .from('utilizador')
      .select('id, nome_completo')
      .in('role', ['admin', 'senior_admin'])
      .limit(1)
      .single();
      
    if (admin) {
      destinatarioId = admin.id;
      destinatarioNome = admin.nome_completo;
    }
  }

  const chatConfig = {
    processoId: processo?.id,
    remetenteId: session?.user?.id,
    remetenteNome: session?.user?.name || "Estudante",
    destinatarioId,
    destinatarioNome: destinatarioNome || "Equipa MUVISA",
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <MobileMenuProvider>
        <ChatPanelProvider config={chatConfig}>
          <Sidebar />
          <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark transition-colors duration-300">
            <Header />
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {children}
            </div>
          </main>
        </ChatPanelProvider>
      </MobileMenuProvider>
    </div>
  );
}
