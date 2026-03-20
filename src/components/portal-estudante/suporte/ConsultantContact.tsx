'use client';
/* eslint-disable @next/next/no-img-element */
import { MessageCircle, CheckCircle } from 'lucide-react';
import { useChatPanel } from "@/components/portal-estudante/ChatPanel";
import { useState } from 'react';

// Ícone oficial SVG do WhatsApp
const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
);

export default function ConsultantContact() {
    const { open } = useChatPanel();
    const [isConnecting, setIsConnecting] = useState(false);

    const handleChatClick = () => {
        setIsConnecting(true);
        setTimeout(() => {
            setIsConnecting(false);
            open();
        }, 1200);
    };

    return (
        <div className="flex flex-col gap-6 animate-page-enter">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Canais de Atendimento</h3>

            {/* Consultant card - Adaptable Premium Dark/Light Style with Ronaldo Joaquim */}
            <div className="bg-white dark:bg-[#0f172a] rounded-[2.5rem] p-8 shadow-xl dark:shadow-2xl border border-slate-100 dark:border-white/5 flex flex-col items-center text-center relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
                {/* Glow Background - Adapts to theme */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/5 dark:bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-all"></div>
                
                <div className="relative mb-6 group-hover:scale-105 transition-transform duration-500">
                    <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary to-blue-400 shadow-xl relative">
                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-[#0f172a]">
                            <img
                                alt="Ronaldo Joaquim"
                                className="w-full h-full object-cover"
                                src="/team/ronaldo-joaquim.jpg"
                            />
                        </div>
                    </div>
                    {/* Status Online */}
                    <div className="absolute bottom-1.5 right-1.5 w-5 h-5 bg-green-500 rounded-full border-[3px] border-white dark:border-[#0f172a] shadow-lg flex items-center justify-center animate-pulse">
                         <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    </div>
                </div>

                <div className="mb-8 relative z-10">
                    <p className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mb-2 leading-none">Seu Consultor</p>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Ronaldo Joaquim</h4>
                    <p className="text-xs font-medium text-slate-500 dark:text-white/40 mt-1">Sempre online para si.</p>
                </div>

                <button
                    onClick={handleChatClick}
                    disabled={isConnecting}
                    className="w-full py-4 rounded-2xl bg-[#0e56e0] hover:bg-[#0c4bc4] text-white font-black text-sm transition-all shadow-[0_10px_25px_rgba(14,86,224,0.3)] dark:shadow-[0_10px_25px_rgba(14,86,224,0.35)] hover:shadow-[0_15px_35px_rgba(14,86,224,0.45)] active:scale-[0.97] flex items-center justify-center gap-3 disabled:opacity-80 group/btn"
                >
                    {isConnecting ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        A conectar...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5 transition-transform group-hover/btn:rotate-12 fill-white/10" />
                        Abrir Chat
                      </>
                    )}
                </button>
            </div>

            {/* WhatsApp button - Original Design with Real WhatsApp Icon */}
            <a
                href="#"
                className="bg-[#22c55e] hover:bg-[#1faa51] text-white p-4 rounded-2xl shadow-lg flex items-center gap-4 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                   <WhatsAppIcon className="w-7 h-7" />
                </div>
                <div className="text-left flex-1">
                    <p className="text-[10px] font-black uppercase tracking-wider text-white/80">Suporte Directo</p>
                    <span className="font-bold text-base">Central WhatsApp</span>
                </div>
                <CheckCircle className="w-5 h-5 opacity-40 shrink-0 mr-2" />
            </a>
        </div>
    );
}
