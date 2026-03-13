/* eslint-disable @next/next/no-img-element */
"use client";
import { MessageCircle } from 'lucide-react';

import { useChatPanel } from "@/components/portal-estudante/ChatPanel";

export default function ConsultantContact() {
    const { open } = useChatPanel();
    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Canais de Atendimento</h3>

            {/* Consultant card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden relative shrink-0">
                        <img
                            alt="Consultora Ana"
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDISOuPH9afLiM0lOt1duJnHr4qFkUSNQa33Isu95_2Ywgw7nEtVrWKN2xaRVhSVtmkXhDD-eQrgEkoqd1XdEfZXJKbkiDm3bz3rKcDaEdt4QohhVDmtnNd8yEFisr49lAuXzi-gLow2mODzSECt3y2a8rdmmPkdb4HUpZ1bCnZ7ApX2B3YLv0R06wehac_vGcOiXoEHzl3ubOMypbQ2aXPrPOB7r5wmuBRjd03GHowfzzRPUOqr8yf1JeV2RFiefmcFXzhlypsVAKX"
                        />
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium">Sua Consultora</p>
                        <h4 className="font-bold text-slate-900 dark:text-white">Ana Souza</h4>
                    </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    Estou disponível para ajudar com seu processo de visto e tirar suas dúvidas.
                </p>
                <button
                    onClick={open}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                >
                    <MessageCircle className="text-[18px]" />
                    Abrir Chat
                </button>
            </div>

            {/* WhatsApp button */}
            <a
                href="#"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-xl shadow-lg shadow-green-500/20 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 cursor-pointer"
            >
                <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="font-bold">Central de Ajuda WhatsApp</span>
            </a>
        </div>
    );
}
