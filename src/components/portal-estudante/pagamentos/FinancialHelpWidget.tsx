'use client';
import { HelpCircle, ChevronDown, MessageSquare, CheckCircle } from 'lucide-react';
import { useState } from "react";
import { useChatPanel } from "@/components/portal-estudante/ChatPanel";

const faqs = [
    {
        question: "Como parcelar?",
        answer: "Pode parcelar a assessoria em até 12x no cartão de crédito ou 3x via transferência bancária sem juros.",
    },
    {
        question: "Nota Fiscal",
        answer: "As faturas e recibos ficam disponíveis para download na tabela ao lado assim que o pagamento é confirmado.",
    },
    {
        question: "Métodos Aceites",
        answer: "Aceitamos Multicaixa Express, Transferência Bancária, Cartão de Crédito (Visa/Mastercard) e Pix.",
    },
];

export default function FinancialHelpWidget() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const { open } = useChatPanel();
    const [toast, setToast] = useState(false);

    const handleTalkToFinance = () => {
        setToast(true);
        setTimeout(() => {
            setToast(false);
            open(); // Abre o chat do portal
        }, 1500);
    };

    return (
        <div className="bg-[#0f172a] dark:bg-[#020617] rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden border border-white/5 animate-page-enter">
            {/* Efeito Glow Background */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-[60px] pointer-events-none"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-600/10 rounded-full blur-[60px] pointer-events-none"></div>

            {/* Toast de conexão */}
            {toast && (
                <div className="absolute top-4 inset-x-4 z-50 flex items-center justify-center animate-fade-in">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-xl">
                        <div className="flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </div>
                        A conectar ao Departamento Financeiro...
                    </div>
                </div>
            )}

            <div className="relative z-10">
                <div className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                    <HelpCircle className="text-white/80 w-6 h-6" />
                </div>
                
                <h3 className="font-black text-2xl mb-8 tracking-tight">Dúvidas Financeiras?</h3>
                
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={faq.question} className="border-b border-white/5 pb-4 last:border-0">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="flex items-center justify-between w-full text-left transition-colors group"
                            >
                                <span className={`text-sm font-bold tracking-wide transition-colors ${openIndex === i ? 'text-primary' : 'text-white/80 group-hover:text-white'}`}>
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-4 h-4 text-white/40 transition-all duration-300 ${openIndex === i ? "rotate-180 text-primary" : ""}`}
                                />
                            </button>
                            {openIndex === i && (
                                <div className="mt-3 text-xs leading-relaxed text-white/50 font-medium animate-fade-in pl-1 border-l border-primary/30">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <button 
                        onClick={handleTalkToFinance}
                        className="w-full py-4 bg-white text-slate-950 font-black text-sm rounded-2xl hover:bg-slate-50 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_30px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 group"
                    >
                        <MessageSquare className="w-4 h-4 transition-transform group-hover:rotate-12" />
                        Falar com Financeiro
                    </button>
                    <p className="text-[10px] text-center text-white/30 mt-4 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                        <CheckCircle size={10} className="text-green-500/50" /> Atendimento Prioritário
                    </p>
                </div>
            </div>
        </div>
    );
}
