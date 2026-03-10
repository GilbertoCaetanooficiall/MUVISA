import UploadZone from "@/components/meus-documentos/UploadZone";
import FilesTable from "@/components/meus-documentos/FilesTable";
import AgencyDocuments from "@/components/meus-documentos/AgencyDocuments";
import DocumentChecklist from "@/components/meus-documentos/DocumentChecklist";
import HelpWidget from "@/components/meus-documentos/HelpWidget";
import Footer from "@/components/Footer";

export default function MeusDocumentosPage() {
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

                <UploadZone />
                <FilesTable />
                <AgencyDocuments />

                <Footer />
            </div>

            {/* Right Column - Sidebar Widgets */}
            <div className="w-full lg:w-80 flex flex-col gap-6">
                <DocumentChecklist />
                <HelpWidget />
            </div>
        </div>
    );
}
