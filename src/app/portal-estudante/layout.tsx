import Sidebar from "@/components/portal-estudante/Sidebar";
import Header from "@/components/portal-estudante/Header";
import { ChatPanelProvider } from "@/components/portal-estudante/ChatPanel";
import { MobileMenuProvider } from "@/components/portal-estudante/MobileMenuContext";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <MobileMenuProvider>
        <ChatPanelProvider>
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
