import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getProcessoByEstudante } from '@/app/actions/processo.actions';
import { getDocumentosByProcesso } from '@/app/actions/documento.actions';

import UploadZone from "@/components/portal-estudante/meus-documentos/UploadZone";
import FilesTable from "@/components/portal-estudante/meus-documentos/FilesTable";
import AgencyDocuments from "@/components/portal-estudante/meus-documentos/AgencyDocuments";
import DocumentChecklist from "@/components/portal-estudante/meus-documentos/DocumentChecklist";
import HelpWidget from "@/components/portal-estudante/meus-documentos/HelpWidget";
import Footer from "@/components/portal-estudante/Footer";

export default async function MeusDocumentosPage() {
    const session = await auth();
    if (!session?.user?.id) return redirect('/login');

    const processo = await getProcessoByEstudante(session.user.id);
    const documentos = processo ? await getDocumentosByProcesso(processo.id) : [];

    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Left Column - Main Content */}
            <div className="flex-1 flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Gerenciamento de Documentos
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Organize, envie e acompanhe a validação dos documentos necessários para o seu visto.
                    </p>
                </div>

                <UploadZone processoId={processo?.id} />
                <FilesTable documentos={documentos as any} />
                <AgencyDocuments />

                <Footer />
            </div>

            {/* Right Column - Sidebar Widgets */}
            <div className="w-full lg:w-80 flex flex-col gap-6">
                <DocumentChecklist documentos={documentos as any} />
                <HelpWidget />
            </div>
        </div>
    );
}
