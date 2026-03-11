/* eslint-disable @next/next/no-img-element */
"use client";
import { useChatPanel } from "@/components/portal-estudante/ChatPanel";

export default function ConsultantWidget() {
    const { open } = useChatPanel();
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6 w-full text-left">Minha Consultora</h3>
            <div className="relative mb-4 group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-lg">
                    <img
                        alt="Ana Souza"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU2P-L-OyxAqH1u-5MWAkN7lcQV3zkGG1wb9dmCW_cuGdHjU5FFGV5kylBSu5WYkpwHyb1TMX6SrzzgSQ35u9mXhLMqxOTiYJYED2qHh9DfdHjFFc8eC3jcLxEG_63v2Qu87z8wewILkQxq7VlVSIn5YJdMwAQ3XKvOUs3uKUoTmXVL-wo6JmPjTYvR9odcbB745kvQaWJoGLAhjhWaPF_4L_frbwkr8VziVNNC5xjWJmYxm_xMss5FlJMjlsqxp2ePqXWxSTswDXm"
                    />
                </div>
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" title="Online"></div>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Ana Souza</h4>
            <p className="text-sm text-slate-500 mb-6">Especialista em Vistos de Estudo</p>
            <button
                onClick={open}
                className="w-full py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Iniciar Chat
            </button>
            <button className="mt-3 text-xs text-slate-500 hover:text-primary transition-colors">
                Ver perfil completo
            </button>
        </div>
    );
}
