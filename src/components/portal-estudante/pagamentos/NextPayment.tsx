'use client';
import { useState, useRef, useEffect } from 'react';
import { ArrowRight, CalendarDays, X, CheckCircle, UploadCloud, FileText, CreditCard, Building2, User } from 'lucide-react';

const nextInstallments = [
    { month: "Dezembro", amount: "Kz 3.000.000,00" },
    { month: "Janeiro '24", amount: "Kz 3.000.000,00" },
    { month: "Fevereiro '24", amount: "Kz 1.150.000,00" },
];

export default function NextPayment() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploadDragging, setIsUploadDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{message: string, success: boolean} | null>(null);
    const [nextPayment, setNextPayment] = useState<{id: string, description: string, amount: string, dueDate: string} | null>({
        id: '3',
        description: "Taxa Consular",
        amount: "Kz 850.000,00",
        dueDate: "10 Nov 2023"
    });
    const [installments, setInstallments] = useState(nextInstallments);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const showToast = (message: string, success = true) => {
        setToast({ message, success });
        setTimeout(() => setToast(null), 4000);
    };

    // Escuta atualizações da tabela (quando uma fatura é paga, a próxima assume o topo)
    useEffect(() => {
        const handler = (e: Event) => {
            const data = (e as CustomEvent).detail;
            if (data) {
                setNextPayment(data);
                // Remove o item da lista de parcelas futuras se ele subiu para o topo
                setInstallments(prev => prev.filter(i => !data.description.includes(i.month)));
            } else {
                setNextPayment(null);
                setInstallments([]);
            }
        };
        window.addEventListener('atualizarProximoPagamento', handler);
        return () => window.removeEventListener('atualizarProximoPagamento', handler);
    }, []);

    const closePaymentModal = () => {
        setIsModalOpen(false);
        setUploadedFile(null);
        setIsSubmitting(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setUploadedFile(e.target.files[0]);
        }
    };

    const handleSubmitReceipt = () => {
        if (!uploadedFile || !nextPayment) return;

        setIsSubmitting(true);
        // Simulate upload delay
        setTimeout(() => {
            closePaymentModal();
            // Dispara evento para o InvoicesTable cuidar do Toast e do estado da fatura
            window.dispatchEvent(new CustomEvent('simularEnvioComprovativo', { 
                detail: { id: nextPayment.id, description: nextPayment.description } 
            }));
        }, 1500);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 relative">
            {/* Toast */}
            {toast && (
                <div className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3 rounded-lg shadow-2xl text-sm font-medium animate-fade-in ${toast.success ? 'bg-green-600' : 'bg-red-500'} text-white`}>
                    <CheckCircle size={18} />
                    {toast.message}
                    <button onClick={() => setToast(null)} className="ml-2 hover:bg-white/20 rounded p-1 transition-colors"><X size={14} /></button>
                </div>
            )}

            {/* Payment Modal */}
            {isModalOpen && nextPayment && (
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
                                    <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{nextPayment.amount}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">{nextPayment.description}</p>
                                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Vence: {nextPayment.dueDate}</p>
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

            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Próximo Vencimento</h3>
            
            {!nextPayment ? (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/5 border border-green-100 dark:border-green-900/30 rounded-2xl p-8 mb-6 text-center shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition-colors"></div>
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 shadow-inner">
                        <CheckCircle size={32} />
                    </div>
                    <h4 className="text-lg font-bold text-green-900 dark:text-green-400">Todas as taxas pagas!</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Você está em dia com suas obrigações financeiras. Bom trabalho!</p>
                </div>
            ) : (
                <>
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-4 mb-6 relative overflow-hidden animate-fade-in">
                        <div className="flex items-center gap-3 mb-2">
                            <CalendarDays className="text-red-500" />
                            <span className="text-sm font-bold text-red-700 dark:text-red-400">{nextPayment.dueDate}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-1">{nextPayment.description}</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{nextPayment.amount}</p>
                        <div className="absolute right-0 top-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none"></div>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-lg shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2 mb-6"
                    >
                        <span>Efetuar Pagamento</span>
                        <ArrowRight className="text-[20px]" />
                    </button>
                </>
            )}

            <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
                <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase">Próximas Parcelas</h4>
                <div className="space-y-3">
                    {installments.length > 0 ? installments.map((inst) => (
                        <div key={inst.month} className="flex justify-between items-center text-sm animate-fade-in">
                            <span className="text-slate-600 dark:text-slate-400">{inst.month}</span>
                            <span className="font-medium text-slate-900 dark:text-white">{inst.amount}</span>
                        </div>
                    )) : (
                        <p className="text-xs text-slate-400 italic">Sem parcelas futuras.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
