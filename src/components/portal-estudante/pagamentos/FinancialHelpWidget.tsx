"use client";
import { HelpCircle, ChevronDown } from 'lucide-react';

import { useState } from "react";

const faqs = [
    {
        question: "Como parcelar?",
        answer:
            "O parcelamento pode ser feito em até 12x no cartão de crédito diretamente na área de pagamento.",
    },
    {
        question: "Nota Fiscal",
        answer:
            "As notas fiscais são enviadas automaticamente para o seu e-mail após a confirmação do pagamento.",
    },
];

export default function FinancialHelpWidget() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
            <div className="relative z-10">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                    <HelpCircle className="text-white" />
                </div>
                <h3 className="font-bold text-lg mb-4">Dúvidas Financeiras?</h3>
                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <div key={faq.question} className="group">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="flex items-center justify-between w-full text-sm font-medium text-white/90 hover:text-white"
                            >
                                <span>{faq.question}</span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                                />
                            </button>
                            {openIndex === i && (
                                <p className="text-xs text-white/70 mt-2 pl-2 border-l-2 border-primary/50">
                                    {faq.answer}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
                <button className="w-full mt-6 py-2.5 bg-white text-slate-900 font-bold text-sm rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                    Falar com Financeiro
                </button>
            </div>
        </div>
    );
}
