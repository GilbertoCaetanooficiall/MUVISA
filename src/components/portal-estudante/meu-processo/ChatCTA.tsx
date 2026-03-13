"use client";
import { useChatPanel } from "@/components/portal-estudante/ChatPanel";

export default function ChatCTA() {
    const { open } = useChatPanel();
    return (
        <div className="bg-gradient-to-br from-primary to-primary-hover rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">Dúvidas?</h3>
                <p className="text-white/80 text-sm mb-4">Fale diretamente com sua consultora sobre esta etapa.</p>
                <button
                    onClick={open}
                    className="w-full py-2 bg-white text-primary font-bold text-sm rounded-lg hover:bg-slate-50 transition-colors"
                >
                    Abrir Chat
                </button>
            </div>
        </div>
    );
}
