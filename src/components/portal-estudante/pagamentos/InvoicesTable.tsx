'use client';
import { useState } from 'react';
import { Filter, Lock, Receipt, X, CheckCircle } from 'lucide-react';

type InvoiceStatus = "Pago" | "Pendente" | "A vencer";

const statusStyles: Record<InvoiceStatus, string> = {
    Pago: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Pendente: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    "A vencer": "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700",
};

interface Invoice {
    id: string;
    description: string;
    dueDate: string;
    dueDateColor?: string;
    rowBg?: string;
    amount: string;
    status: InvoiceStatus;
    action: "receipt" | "pay" | "locked";
}

const initialInvoices: Invoice[] = [
    { id: '1', description: "Taxa de Matrícula (Enrollment Fee)", dueDate: "10 Set 2023", amount: "Kz 1.500.000,00", status: "Pago", action: "receipt" },
    { id: '2', description: "Assessoria MUVISA (Parc. 1/3)", dueDate: "10 Out 2023", amount: "Kz 3.000.000,00", status: "Pago", action: "receipt" },
    { id: '3', description: "Taxa Consular", dueDate: "10 Nov 2023", dueDateColor: "text-orange-600 dark:text-orange-400 font-medium", rowBg: "bg-orange-50/50 dark:bg-orange-900/5", amount: "Kz 850.000,00", status: "Pendente", action: "pay" },
    { id: '4', description: "Assessoria MUVISA (Parc. 2/3)", dueDate: "10 Dez 2023", amount: "Kz 3.000.000,00", status: "A vencer", action: "locked" },
];

type ToastMsg = { message: string; success: boolean };

export default function InvoicesTable() {
    const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
    const [filter, setFilter] = useState<InvoiceStatus | 'Todos'>('Todos');
    const [showFilter, setShowFilter] = useState(false);
    const [toast, setToast] = useState<ToastMsg | null>(null);
    const [payingId, setPayingId] = useState<string | null>(null);

    const showToast = (message: string, success = true) => {
        setToast({ message, success });
        setTimeout(() => setToast(null), 3000);
    };

    const handleReceipt = (inv: Invoice) => {
        showToast(`Recibo de "${inv.description}" gerado.`, true);
    };

    const handlePay = (inv: Invoice) => {
        setPayingId(inv.id);
        setTimeout(() => {
            setInvoices(prev => prev.map(i =>
                i.id === inv.id ? { ...i, status: 'Pago', action: 'receipt', rowBg: undefined, dueDateColor: undefined } : i
            ));
            setPayingId(null);
            showToast(`Pagamento de "${inv.description}" confirmado!`, true);
        }, 1500);
    };

    const displayed = filter === 'Todos' ? invoices : invoices.filter(i => i.status === filter);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden relative">
            {/* Toast */}
            {toast && (
                <div className={`absolute top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-fade-in ${toast.success ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    <CheckCircle size={16} />
                    {toast.message}
                    <button onClick={() => setToast(null)}><X size={14} /></button>
                </div>
            )}

            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center relative">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Minhas Faturas</h3>
                <div className="relative">
                    <button
                        onClick={() => setShowFilter(v => !v)}
                        className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                    >
                        <Filter className="text-[18px]" />
                        {filter === 'Todos' ? 'Filtrar' : filter}
                    </button>
                    {showFilter && (
                        <div className="absolute right-0 top-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-30 py-1 w-36 animate-fade-in">
                            {(['Todos', 'Pago', 'Pendente', 'A vencer'] as const).map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => { setFilter(opt); setShowFilter(false); }}
                                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${filter === opt ? 'text-primary font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
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
                        {displayed.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-slate-400">Nenhuma fatura encontrada para este filtro.</td>
                            </tr>
                        ) : displayed.map((inv) => (
                            <tr key={inv.id} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${inv.rowBg ?? ""}`}>
                                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{inv.description}</td>
                                <td className={`px-6 py-4 ${inv.dueDateColor ?? ""}`}>{inv.dueDate}</td>
                                <td className="px-6 py-4 font-semibold">{inv.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[inv.status]}`}>
                                        {inv.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {inv.action === "receipt" && (
                                        <button
                                            onClick={() => handleReceipt(inv)}
                                            className="text-slate-500 hover:text-primary transition-colors flex items-center justify-end gap-1 ml-auto text-xs"
                                        >
                                            <Receipt className="text-[16px]" /> Recibo
                                        </button>
                                    )}
                                    {inv.action === "pay" && (
                                        <button
                                            onClick={() => handlePay(inv)}
                                            disabled={payingId === inv.id}
                                            className="bg-primary text-white hover:bg-primary-hover px-3 py-1.5 rounded text-xs font-medium transition-colors inline-flex items-center gap-1 disabled:opacity-60"
                                        >
                                            {payingId === inv.id ? 'A processar...' : 'Pagar Agora'}
                                        </button>
                                    )}
                                    {inv.action === "locked" && (
                                        <button className="text-slate-400 cursor-not-allowed flex items-center justify-end gap-1 ml-auto text-xs" disabled>
                                            <Lock className="text-[16px]" /> Aguardando
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
