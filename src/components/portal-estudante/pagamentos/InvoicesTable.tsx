import { Filter, Lock, Receipt } from 'lucide-react';
type InvoiceStatus = "Pago" | "Pendente" | "A vencer";

const statusStyles: Record<InvoiceStatus, string> = {
    Pago: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Pendente: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    "A vencer": "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700",
};

interface Invoice {
    description: string;
    dueDate: string;
    dueDateColor?: string;
    rowBg?: string;
    amount: string;
    status: InvoiceStatus;
    action: "receipt" | "pay" | "locked";
}

const invoices: Invoice[] = [
    {
        description: "Taxa de Matrícula (Enrollment Fee)",
        dueDate: "10 Set 2023",
        amount: "Kz 1.500.000,00",
        status: "Pago",
        action: "receipt",
    },
    {
        description: "Assessoria MUVISA (Parc. 1/3)",
        dueDate: "10 Out 2023",
        amount: "Kz 3.000.000,00",
        status: "Pago",
        action: "receipt",
    },
    {
        description: "Taxa Consular",
        dueDate: "10 Nov 2023",
        dueDateColor: "text-orange-600 dark:text-orange-400 font-medium",
        rowBg: "bg-orange-50/50 dark:bg-orange-900/5",
        amount: "Kz 850.000,00",
        status: "Pendente",
        action: "pay",
    },
    {
        description: "Assessoria MUVISA (Parc. 2/3)",
        dueDate: "10 Dez 2023",
        amount: "Kz 3.000.000,00",
        status: "A vencer",
        action: "locked",
    },
];

export default function InvoicesTable() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Minhas Faturas</h3>
                <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                    <Filter className="text-[18px]" />
                    Filtrar
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase font-semibold text-slate-500">
                        <tr>
                            <th className="px-6 py-4">Descrição</th>
                            <th className="px-6 py-4">Vencimento</th>
                            <th className="px-6 py-4">Valor</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {invoices.map((inv) => (
                            <tr
                                key={inv.description}
                                className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${inv.rowBg ?? ""}`}
                            >
                                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                    {inv.description}
                                </td>
                                <td className={`px-6 py-4 ${inv.dueDateColor ?? ""}`}>{inv.dueDate}</td>
                                <td className="px-6 py-4 font-semibold">{inv.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[inv.status]}`}>
                                        {inv.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {inv.action === "receipt" && (
                                        <button className="text-slate-500 hover:text-primary transition-colors flex items-center justify-end gap-1 ml-auto text-xs">
                                            <Receipt className="text-[16px]" />
                                            Recibo
                                        </button>
                                    )}
                                    {inv.action === "pay" && (
                                        <button className="bg-primary text-white hover:bg-primary-hover px-3 py-1.5 rounded text-xs font-medium transition-colors inline-flex items-center gap-1">
                                            Pagar Agora
                                        </button>
                                    )}
                                    {inv.action === "locked" && (
                                        <button className="text-slate-400 cursor-not-allowed flex items-center justify-end gap-1 ml-auto text-xs" disabled>
                                            <Lock className="text-[16px]" />
                                            Aguardando
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
