'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, Shield, Scale, CheckCircle, Lock, Mail, ArrowRight } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !mounted) return null;

  const isTerms = type === 'terms';
  const title = isTerms ? 'Termos de Uso' : 'Política de Privacidade';
  const icon = isTerms ? <Scale className="text-primary" size={24} /> : <Shield className="text-primary" size={24} />;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-hidden bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 flex flex-col font-display">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                {title}
              </h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                MUVISA Consultoria Jurídica
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          {isTerms ? (
            <>
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-4">1. Aceitação dos Termos</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]">
                  Ao utilizar os nossos serviços, você concorda legalmente com as nossas diretrizes consultivas. A transparência é a base de nossa relação com cada estudante.
                </p>
              </section>

              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-100">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-4">2. Prestação de Serviços</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]">
                  A MUVISA atua como intermediária e consultora estratégica para vistos e mobilidade acadêmica em Portugal. Nosso compromisso é com a excelência documental e processual.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Análise de Perfil', 'Revisão Documental', 'Apoio Consular', 'Guia de Chegada'].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <CheckCircle className="text-primary" size={14} />
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-200">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-4">3. Responsabilidade Final</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px] font-medium p-5 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 text-amber-800 dark:text-amber-400 italic">
                  &quot;É fundamental entender que a decisão final sobre vistos cabe exclusivamente às autoridades consulares e governamentais de Portugal (AIMA/Embaixadas).&quot;
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Proteção de Dados</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]">
                  Os seus dados pessoais e documentos sensíveis são protegidos por criptografia de nível militar e armazenados em servidores seguros em conformidade com o GDPR.
                </p>
              </section>

              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-100">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Como usamos os dados</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]">
                  Utilizamos as informações estritamente para a finalidade do seu processo de intercâmbio. Não compartilhamos, vendemos ou alugamos seus dados para fins de marketing de terceiros.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                    <Lock className="text-primary shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Seus documentos são eliminados de nossa base de acesso imediato após a conclusão e validação do serviço solicitado.</p>
                  </div>
                </div>
              </section>

              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-200">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Seus Direitos</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]">
                  De acordo com a lei, você pode solicitar a acesso, retificação ou exclusão dos seus dados enviando um email formal para a nossa equipe de suporte.
                </p>
              </section>
            </>
          )}

          {/* Contact help */}
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                <Mail size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Central de Apoio Jurídico</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">muvisaintercambio@gmail.com</p>
              </div>
              <ArrowRight className="text-slate-300" size={18} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-primary hover:bg-primary-hover text-white font-black text-sm rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95"
          >
            Li e Concordo
          </button>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.2);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.4);
        }
      `}</style>
    </div>,
    document.body
  );
}
