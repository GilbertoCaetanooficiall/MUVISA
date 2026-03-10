"use client";
import { useState } from "react";

const faqs = [
    {
        question: "Quanto tempo demora a análise dos documentos?",
        answer:
            "A análise inicial dos documentos leva em média 3 a 5 dias úteis após o envio. Você receberá uma notificação assim que a análise for concluída. Caso haja alguma pendência, nossa equipe entrará em contato.",
        defaultOpen: true,
    },
    {
        question: "Quais documentos precisam ser traduzidos?",
        answer:
            "Geralmente, todos os documentos que não estão em inglês (ou na língua oficial do país de destino) precisam de tradução juramentada. Isso inclui certidões de nascimento, casamento, diplomas e extratos bancários.",
    },
    {
        question: "Como agendar minha entrevista no consulado?",
        answer:
            "O agendamento é feito após a aprovação da documentação inicial. Nossa equipe enviará um link direto e as instruções passo a passo para você escolher a melhor data e horário disponíveis.",
    },
    {
        question: "Posso alterar a data da minha viagem?",
        answer:
            "Sim, é possível, mas recomendamos que isso seja feito antes da emissão final do visto para evitar taxas adicionais ou necessidade de reemissão de documentos. Entre em contato com seu consultor o quanto antes.",
    },
];

export default function FaqAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Dúvidas Frequentes</h2>
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800">
                {faqs.map((faq, i) => (
                    <div key={faq.question} className="p-4">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="flex items-center justify-between w-full text-left"
                        >
                            <span className="font-medium text-slate-900 dark:text-white text-sm">{faq.question}</span>
                            <span
                                className={`material-symbols-outlined text-slate-400 transition-transform duration-200 shrink-0 ml-4 ${openIndex === i ? "rotate-180" : ""}`}
                            >
                                expand_more
                            </span>
                        </button>
                        {openIndex === i && (
                            <div className="mt-3 text-sm text-slate-600 dark:text-slate-400 pl-4 border-l-2 border-primary/20">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
