'use client';
/* eslint-disable @next/next/no-img-element */
import { X, CheckCircle, Award, Clock, GraduationCap, MessageCircle, Star, ShieldCheck } from 'lucide-react';
import { useChatPanel } from "@/components/portal-estudante/ChatPanel";

interface ConsultantProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ConsultantProfileModal({ isOpen, onClose }: ConsultantProfileModalProps) {
    const { open: openChat } = useChatPanel();

    if (!isOpen) return null;

    const handleSendMessage = () => {
        onClose();
        setTimeout(openChat, 300);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-white dark:bg-[#0f172a] rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col md:flex-row animate-scale-in">
                
                {/* Lateral Esquerda - Foto & Stats Rápidos */}
                <div className="md:w-1/3 bg-slate-50 dark:bg-white/5 p-8 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/5">
                    <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary to-blue-400 shadow-xl mb-6">
                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-[#0f172a]">
                            <img alt="Ronaldo Joaquim" src="/team/ronaldo-joaquim.jpg" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-yellow-500 mb-1">
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/30 mb-8">
                        5.0 Avaliação Média
                    </p>

                    <div className="w-full space-y-4">
                        <div className="bg-white dark:bg-white/5 p-3 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-widest mb-1">Vistos Aprovados</p>
                            <p className="text-xl font-black text-slate-900 dark:text-white">+2.100</p>
                        </div>
                        <div className="bg-white dark:bg-white/5 p-3 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-widest mb-1">Anos na MUVISA</p>
                            <p className="text-xl font-black text-slate-900 dark:text-white">5 Anos</p>
                        </div>
                    </div>
                </div>

                {/* Direita - Detalhes & Bio */}
                <div className="flex-1 p-8 md:p-10 flex flex-col">
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div className="mb-8">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">Ronaldo Joaquim</h2>
                        <div className="flex flex-col gap-3">
                           <div className="flex">
                             <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md border border-primary/20">Senior Specialist</span>
                           </div>
                           <p className="text-slate-500 dark:text-white font-medium text-sm leading-relaxed">
                             Líder de Estratégias de Visto para a União Europeia
                           </p>
                        </div>
                    </div>

                    <div className="space-y-8 flex-1">
                        <section>
                            <h4 className="text-xs font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                                <Award size={14} /> Especialidades & Perfil
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed">
                                Especialista em candidaturas a Universidades em Portugal (Porto, Coimbra e Lisboa) e consultoria estratégica para Vistos D4 e D3. Com um vasto conhecimento do SEF/AIMA, o Ronaldo garante que nenhum documento é deixado ao acaso.
                            </p>
                        </section>

                        <section>
                           <h4 className="text-xs font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mb-4">Focus do Consultor</h4>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { icon: GraduationCap, text: 'Vistos de Estudante (D4)' },
                                    { icon: ShieldCheck, text: 'Processos de Imigração' },
                                    { icon: Clock, text: 'Cronograma Académico' },
                                    { icon: CheckCircle, text: 'Acompanhamento 24/7' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-white/80">
                                        <item.icon size={16} className="text-primary" />
                                        {item.text}
                                    </div>
                                ))}
                           </div>
                        </section>
                    </div>

                    <div className="mt-10 pt-8 border-t border-slate-200 dark:border-white/5">
                        <button 
                            onClick={handleSendMessage}
                            className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-black rounded-2xl shadow-[0_10px_25px_rgba(14,86,224,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                            <MessageCircle size={20} />
                            Iniciar Conversa Privada
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
