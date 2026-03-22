'use client';
import { useState, useRef, useEffect } from 'react';
import { Filter, Lock, Receipt, X, CheckCircle, UploadCloud, FileText, CreditCard, Building2, User } from 'lucide-react';

type InvoiceStatus = "Pago" | "Pendente" | "A vencer" | "Em Análise";

const statusStyles: Record<InvoiceStatus, string> = {
    Pago: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Pendente: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    "A vencer": "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700",
    "Em Análise": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
};

interface Invoice {
    id: string;
    description: string;
    dueDate: string;
    dueDateColor?: string;
    rowBg?: string;
    amount: string;
    status: InvoiceStatus;
    action: "receipt" | "pay" | "locked" | "analyzing";
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
    
    // Modal states
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [isUploadDragging, setIsUploadDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const showToast = (message: string, success = true) => {
        setToast({ message, success });
        setTimeout(() => setToast(null), 4000);
    };

    const handleReceipt = (inv: Invoice) => {
        showToast(`Recibo de "${inv.description}" gerado.`, true);
    };

    const openPaymentModal = (inv: Invoice) => {
        setSelectedInvoice(inv);
        setUploadedFile(null);
    };

    const closePaymentModal = () => {
        setSelectedInvoice(null);
        setUploadedFile(null);
        setIsSubmitting(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setUploadedFile(e.target.files[0]);
        }
    };

    const atualizarFinanceiroGlobal = (currentInvoices: Invoice[]) => {
        const totalPlanValue = 12500000;
        
        const parseValue = (val: string) => {
            return Number(val.replace('Kz ', '').replace(/\./g, '').replace(',', '.'));
        };

        const paid = currentInvoices
            .filter(i => i.status === 'Pago')
            .reduce((acc, curr) => acc + parseValue(curr.amount), 0);
            
        const due = totalPlanValue - paid;
        const percentValue = Math.round((paid / totalPlanValue) * 100);

        const formatCurrency = (v: number) => {
            const formatted = v.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            return `Kz ${formatted}`;
        };

        window.dispatchEvent(new CustomEvent('atualizarResumoFinanceiro', {
            detail: {
                total: formatCurrency(totalPlanValue),
                pago: formatCurrency(paid),
                saldo: formatCurrency(due),
                percent: `${percentValue}% quitado`
            }
        }));
    };

    // Atualiza estatísticas sempre que a lista de faturas mudar
    useEffect(() => {
        atualizarFinanceiroGlobal(invoices);
    }, [invoices]);

    const processarEnvioComprovativo = (invId: string, description: string) => {
        // 1. Change to "Em Análise"
        setInvoices(prev => prev.map(i =>
            i.id === invId 
                ? { ...i, status: 'Em Análise', action: 'analyzing', rowBg: 'bg-blue-50/50 dark:bg-blue-900/10', dueDateColor: 'text-blue-600 dark:text-blue-400' } 
                : i
        ));
        showToast('✅ Comprovante enviado! A equipa está a analisar o seu pagamento.');

        // 2. Simulate admin approval after 6 seconds
        setTimeout(() => {
            setInvoices(prev => {
                const updated = prev.map(i => {
                    if (i.id === invId) {
                        return { 
                            ...i, 
                            status: 'Pago' as InvoiceStatus, 
                            action: 'receipt' as const, 
                            rowBg: undefined, 
                            dueDateColor: undefined 
                        } as Invoice;
                    }
                    return i;
                });
                
                // Unlocks next if it exists (e.g., if we paid ID '3', unlock ID '4')
                const nextIdx = updated.findIndex(i => i.id === invId) + 1;
                if (nextIdx < updated.length && updated[nextIdx].action === 'locked') {
                    const nextInv = updated[nextIdx];
                    updated[nextIdx] = { 
                        ...nextInv, 
                        status: 'Pendente' as InvoiceStatus, 
                        action: 'pay' as const 
                    } as Invoice;
                    
                    // Avisa o widget lateral qual é o novo próximo pagamento
                    window.dispatchEvent(new CustomEvent('atualizarProximoPagamento', {
                        detail: {
                            id: nextInv.id,
                            description: nextInv.description,
                            amount: nextInv.amount,
                            dueDate: nextInv.dueDate
                        }
                    }));
                } else if (nextIdx === updated.length) {
                    // All paid (for this demo list)
                    window.dispatchEvent(new CustomEvent('atualizarProximoPagamento', { detail: null }));
                }
                
                return [...updated];
            });
            showToast(`🎉 Pagamento de "${description}" confirmado!`, true);
        }, 6000);
    };

    // Escuta evento simulado pelo widget 'NextPayment'
    useEffect(() => {
        const handler = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            processarEnvioComprovativo(detail.id, detail.description);
        };
        window.addEventListener('simularEnvioComprovativo', handler);
        return () => window.removeEventListener('simularEnvioComprovativo', handler);
    }, []);

    const handleSubmitReceipt = () => {
        if (!selectedInvoice || !uploadedFile) return;

        setIsSubmitting(true);
        const invId = selectedInvoice.id;
        const desc = selectedInvoice.description;

        // Simulate upload delay
        setTimeout(() => {
            closePaymentModal();
            processarEnvioComprovativo(invId, desc);
        }, 1500);
    };

    const displayed = filter === 'Todos' ? invoices : invoices.filter(i => i.status === filter);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden relative">
            {/* Toast */}
            {toast && (
                <div className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3 rounded-lg shadow-2xl text-sm font-medium animate-fade-in ${toast.success ? 'bg-green-600' : 'bg-red-500'} text-white`}>
                    <CheckCircle size={18} />
                    {toast.message}
                    <button onClick={() => setToast(null)} className="ml-2 hover:bg-white/20 rounded p-1 transition-colors"><X size={14} /></button>
                </div>
            )}

            {/* Payment Modal */}
            {selectedInvoice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/80">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <CreditCard size={20} className="text-primary" />
                                Realizar Pagamento
                            </h2>
                            <button onClick={closePaymentModal} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto flex flex-col gap-6">
                            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-xl p-4 flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Total a pagar</p>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{selectedInvoice.amount}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedInvoice.description}</p>
                                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Vence: {selectedInvoice.dueDate}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Dados Bancários</h3>
                                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
                                    <div className="flex items-start gap-3">
                                        <Building2 className="text-slate-400 mt-0.5" size={18} />
                                        <div>
                                            <p className="text-xs text-slate-500">Banco</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">BAI (Banco Angolano de Investimentos)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CreditCard className="text-slate-400 mt-0.5" size={18} />
                                        <div>
                                            <p className="text-xs text-slate-500">IBAN</p>
                                            <p className="text-sm font-mono font-bold text-slate-900 dark:text-white bg-slate-200/50 dark:bg-slate-800 px-2 py-0.5 rounded mt-1">0040.0000.6881.8420.1019.2</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <User className="text-slate-400 mt-0.5" size={18} />
                                        <div>
                                            <p className="text-xs text-slate-500">Titular da Conta</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">GILBERTO MARCIO JOSÉ CAETANO</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Anexar Comprovante (PDF)</h3>
                                
                                {!uploadedFile ? (
                                    <div 
                                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${isUploadDragging ? 'border-primary bg-primary/5' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                                        onDragOver={(e) => { e.preventDefault(); setIsUploadDragging(true); }}
                                        onDragLeave={() => setIsUploadDragging(false)}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            setIsUploadDragging(false);
                                            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                                setUploadedFile(e.dataTransfer.files[0]);
                                            }
                                        }}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            className="hidden" 
                                            accept=".pdf,image/*" 
                                            onChange={handleFileChange} 
                                        />
                                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-500">
                                            <UploadCloud size={24} />
                                        </div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                                            Clique para enviar ou arraste o arquivo aqui
                                        </p>
                                        <p className="text-xs text-slate-500">Suporta PDF, JPG ou PNG (Máx 5MB)</p>
                                    </div>
                                ) : (
                                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                                <FileText size={20} />
                                            </div>
                                            <div className="truncate">
                                                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{uploadedFile.name}</p>
                                                <p className="text-xs text-slate-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => setUploadedFile(null)}
                                            className="text-slate-400 hover:text-red-500 p-2 transition-colors flex-shrink-0"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex justify-end gap-3">
                            <button 
                                onClick={closePaymentModal}
                                disabled={isSubmitting}
                                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleSubmitReceipt}
                                disabled={!uploadedFile || isSubmitting}
                                className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                                        A enviar...
                                    </>
                                ) : (
                                    'Enviar Comprovante'
                                )}
                            </button>
                        </div>
                    </div>
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
                            {(['Todos', 'Pago', 'Pendente', 'Em Análise', 'A vencer'] as const).map(opt => (
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
                                            onClick={() => openPaymentModal(inv)}
                                            className="bg-primary text-white hover:bg-primary-hover px-3 py-1.5 rounded text-xs font-medium transition-colors inline-flex items-center gap-1"
                                        >
                                            Pagar Agora
                                        </button>
                                    )}
                                    {inv.action === "analyzing" && (
                                        <div className="flex items-center justify-end gap-2 ml-auto">
                                            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-800">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                                </span>
                                                <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-300 italic">
                                                    Aguardando Consultor
                                                </span>
                                            </div>
                                        </div>
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
