'use client';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { useChatPanel } from "@/components/portal-estudante/ChatPanel";

export default function HelpWidget() {
    const { open } = useChatPanel();

    return (
        <div className="bg-[#0f172a] dark:bg-[#020617] rounded-[32px] p-8 shadow-2xl text-white relative overflow-hidden border border-white/5 group animate-fade-in">
            {/* Efeito Glow Background */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-[60px] pointer-events-none transition-all group-hover:bg-blue-600/20"></div>
            
            <div className="relative z-10 text-left">
                {/* Icon Circle */}
                <div className="w-14 h-14 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner transition-transform group-hover:scale-110">
                    <HelpCircle className="text-white/80 w-7 h-7" />
                </div>
                
                <h3 className="font-bold text-2xl mb-4 tracking-tight">Precisa de ajuda?</h3>
                
                <p className="text-slate-400 text-[15px] leading-relaxed mb-10 font-medium max-w-[240px]">
                    Está com dificuldades para encontrar ou digitalizar seus documentos?
                </p>

                <button 
                    onClick={open}
                    className="w-full py-4 bg-white text-[#0f172a] font-bold text-[15px] rounded-2xl hover:bg-slate-50 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98] flex items-center justify-center gap-3 group/btn"
                >
                    Solicitar Ajuda
                    <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                </button>
            </div>
        </div>
    );
}
