import ProcessStages from "@/components/portal-estudante/meu-processo/ProcessStages";
import DestinationDetails from "@/components/portal-estudante/meu-processo/DestinationDetails";
import VisaSummary from "@/components/portal-estudante/meu-processo/VisaSummary";
import ChatCTA from "@/components/portal-estudante/meu-processo/ChatCTA";
import Footer from "@/components/portal-estudante/Footer";

export default function MeuProcessoPage() {
    return (
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Acompanhamento Detalhado</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Visualize cada etapa da sua jornada rumo ao intercâmbio.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Baixar Guia
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                        Ver Protocolo
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <ProcessStages />
                <div className="flex flex-col gap-6">
                    <DestinationDetails />
                    <VisaSummary />
                    <ChatCTA />
                </div>
            </div>

            <Footer />
        </div>
    );
}
