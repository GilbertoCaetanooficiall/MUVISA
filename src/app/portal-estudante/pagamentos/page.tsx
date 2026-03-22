import FinancialSummary from "@/components/portal-estudante/pagamentos/FinancialSummary";
import InvoicesTable from "@/components/portal-estudante/pagamentos/InvoicesTable";
import NextPayment from "@/components/portal-estudante/pagamentos/NextPayment";
import FinancialHelpWidget from "@/components/portal-estudante/pagamentos/FinancialHelpWidget";
import Footer from "@/components/portal-estudante/Footer";

export default function PagamentosPage() {
    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Left Column - Main Content */}
            <div className="flex-1 flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Controle Financeiro</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Acompanhe seus pagamentos, faturas pendentes e histórico financeiro.
                    </p>
                </div>

                <FinancialSummary />
                <InvoicesTable />

                <Footer />
            </div>

            {/* Right Column - Sidebar */}
            <div className="w-full lg:w-80 flex flex-col gap-6">
                <NextPayment />
                <FinancialHelpWidget />
            </div>
        </div>
    );
}
