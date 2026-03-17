import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/db';
import { getProcessoByEstudante } from '@/app/actions/processo.actions';
import FinancialSummary from '@/components/portal-estudante/pagamentos/FinancialSummary';
import InvoicesTable from '@/components/portal-estudante/pagamentos/InvoicesTable';
import PaymentMethods from '@/components/portal-estudante/pagamentos/PaymentMethods';
import NextPayment from '@/components/portal-estudante/pagamentos/NextPayment';
import FinancialHelpWidget from '@/components/portal-estudante/pagamentos/FinancialHelpWidget';
import Footer from '@/components/portal-estudante/Footer';

export default async function PagamentosPage() {
  const session = await auth();
  const utilizadorId = session?.user?.id ?? '';

  let processo = null;
  let pagamentos: {estado: string; valor: number; descricao: string; criado_em: string; id: string}[] = [];
  let totalPago = 0;
  let totalPendente = 0;

  try {
    processo = await getProcessoByEstudante(utilizadorId);
    if (processo?.id) {
      const { data } = await supabaseAdmin
        .from('pagamento')
        .select('*')
        .eq('processo_id', processo.id)
        .order('criado_em', { ascending: false });

      pagamentos = data ?? [];
      totalPago = pagamentos
        .filter((p) => p.estado === 'confirmado')
        .reduce((sum, p) => sum + (p.valor ?? 0), 0);
      totalPendente = pagamentos
        .filter((p) => p.estado === 'pendente')
        .reduce((sum, p) => sum + (p.valor ?? 0), 0);
    }
  } catch {
    // sem dados
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <div className="flex-1 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Controlo Financeiro</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Acompanhe os seus pagamentos, facturas pendentes e histórico financeiro.
          </p>
        </div>

        <FinancialSummary totalPago={totalPago} totalPendente={totalPendente} />
        <InvoicesTable pagamentos={pagamentos} />
        <PaymentMethods />

        <Footer />
      </div>
      <div className="w-full lg:w-80 flex flex-col gap-6">
        <NextPayment pagamentos={pagamentos} />
        <FinancialHelpWidget />
      </div>
    </div>
  );
}
