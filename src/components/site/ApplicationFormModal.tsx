'use client';

import React, { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, Info, Check } from 'lucide-react';
import Link from 'next/link';

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  universityName?: string;
}

const costData: Record<string, string> = {
  'Lisboa': '950 €/mês',
  'Porto': '850 €/mês',
  'Coimbra': '700 €/mês',
  'Braga': '750 €/mês',
  'Aveiro': '720 €/mês',
  'Faro': '800 €/mês'
};

const assessmentPlans = [
  {
    name: 'Essencial',
    price: '400.000',
    slug: 'essencial',
    featured: false,
    buttonStrings: 'Selecionar',
    features: [
      { label: 'Checklist de documentos', included: true },
      { label: 'Revisão de dossiê', included: true },
      { label: 'Agendamento consular', included: true },
      { label: 'Acesso ao Portal do Aluno', included: true },
    ],
  },
  {
    name: 'Académico',
    price: '700.000',
    slug: 'academico',
    featured: false,
    buttonStrings: 'Selecionar',
    features: [
      { label: 'Tudo do Essencial', included: true },
      { label: 'Escolha de Universidade', included: true },
      { label: 'Apoio na Matrícula/Admissão', included: true },
      { label: 'Termo de Responsabilidade', included: true },
    ],
  },
  {
    name: 'Diamond',
    price: '1.000.000',
    slug: 'diamond',
    featured: true,
    buttonStrings: 'Começar Agora',
    badge: 'RECOMENDADO',
    features: [
      { label: 'Tudo do Académico', included: true },
      { label: 'Abertura de NIF e Conta', included: true },
      { label: 'Busca de Moradia/Residência', included: true },
      { label: 'Suporte Premium 24h', included: true },
    ],
  },
];

export default function ApplicationFormModal({ isOpen, onClose, universityName = 'Universidade de Lisboa' }: ApplicationFormModalProps) {
  const [selectedCity, setSelectedCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

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
      if (!isOpen) { // reset when closing
        setStep(1);
        setSelectedCity('');
      }
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate brief async action
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 800);
  };

  const handleSelectPlan = () => {
    setStep(3);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-label="Crie sua Conta de Estudante"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className={`relative z-10 w-full ${step === 2 ? 'max-w-5xl' : 'max-w-2xl'} max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 animate-fade-in duration-300 custom-scrollbar transition-all`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors z-20"
          aria-label="Fechar modal"
        >
          <X size={22} />
        </button>

        {/* ── STEP 1: Form ── */}
        {step === 1 && (
          <div className="p-8">
            <div className="text-center mb-8">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                Candidatura Académica
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 font-display">
                Crie sua Conta de Estudante
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Dê o próximo passo para sua carreira internacional em Portugal.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contextual Info (University) */}
              <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Universidade Selecionada</p>
                <p className="text-slate-800 dark:text-slate-200 font-semibold font-display text-lg">{universityName}</p>
                <input name="selected_university" type="hidden" value={universityName} />
              </div>

              {/* Row 1: Full Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1" htmlFor="fullName">
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <input 
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-colors focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  id="fullName" 
                  name="fullName" 
                  placeholder="Ex: Maria Silva" 
                  required 
                  type="text" 
                />
              </div>

              {/* Row 2: Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1" htmlFor="email">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <input 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-colors focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    id="email" 
                    name="email" 
                    placeholder="maria@email.com" 
                    required 
                    type="email" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1" htmlFor="whatsapp">
                    WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-colors focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    id="whatsapp" 
                    name="whatsapp" 
                    placeholder="+244 923 000 000" 
                    required 
                    type="tel" 
                  />
                </div>
              </div>

              {/* Row 3: Country and Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1" htmlFor="country">
                    País de Origem <span className="text-red-500">*</span>
                  </label>
                  <input 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-colors focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    id="country" 
                    name="country" 
                    placeholder="Ex: Angola, Brasil, etc." 
                    required 
                    type="text" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1" htmlFor="password">
                    Palavra-passe <span className="text-red-500">*</span>
                  </label>
                  <input 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-colors focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    id="password" 
                    name="password" 
                    placeholder="Mínimo 8 caracteres" 
                    required 
                    type="password"
                    minLength={8}
                  />
                </div>
              </div>

              {/* Row 4: Study City and Target Course */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1" htmlFor="studyCity">
                    Cidade de Estudo <span className="text-red-500">*</span>
                  </label>
                  <select 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-colors focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    id="studyCity" 
                    name="studyCity" 
                    required
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option disabled value="">Selecione a cidade</option>
                    <option value="Lisboa">Lisboa</option>
                    <option value="Porto">Porto</option>
                    <option value="Coimbra">Coimbra</option>
                    <option value="Braga">Braga</option>
                    <option value="Aveiro">Aveiro</option>
                    <option value="Faro">Faro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1" htmlFor="targetCourse">
                    Curso Pretendido <span className="text-red-500">*</span>
                  </label>
                  <input 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-colors focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    id="targetCourse" 
                    name="targetCourse" 
                    placeholder="Ex: Engenharia Informática" 
                    required 
                    type="text" 
                  />
                </div>
              </div>

              {/* Dynamic Cost Display */}
              {selectedCity && costData[selectedCity] && (
                <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex items-start gap-3 animate-fade-in duration-300">
                  <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">Estimativa de Custos</span>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-1">
                      O custo médio estimado de vida mensal nesta cidade é de <span className="text-primary font-bold">{costData[selectedCity]}</span>.
                    </p>
                  </div>
                </div>
              )}

              {/* Row 5: Level */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1" htmlFor="studyLevel">
                    Nível de Estudo <span className="text-red-500">*</span>
                  </label>
                  <select 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-colors focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    id="studyLevel" 
                    name="studyLevel" 
                    required
                    defaultValue=""
                  >
                    <option disabled value="">Selecione o nível</option>
                    <option value="Licenciatura">Licenciatura</option>
                    <option value="Mestrado">Mestrado</option>
                    <option value="Doutoramento">Doutoramento</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-base transition-colors shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      A processar...
                    </>
                  ) : 'Criar conta de estudante'}
                </button>
              </div>

              <div className="text-center">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Ao clicar em &quot;Criar conta de estudante&quot;, você concorda com nossos <br className="hidden sm:block"/> Termos de Serviço e Política de Privacidade.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Já tem uma conta? <Link href="/login" onClick={onClose} className="text-primary hover:text-primary-hover transition-colors ml-1">Entrar aqui</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ── STEP 2: Plan Selection ── */}
        {step === 2 && (
          <div className="p-8 md:p-10 bg-slate-50 dark:bg-slate-900/50 animate-fade-in duration-300">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                Planos de Assessoria
              </span>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3 font-display">
                Escolha o seu nível de acompanhamento
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl mx-auto">
                Para darmos seguimento ao seu processo, selecione um dos nossos planos de assessoria. Pode alterar esta escolha mais tarde.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {assessmentPlans.map((plan) => (
                <div
                  key={plan.slug}
                  className={`rounded-2xl p-6 border flex flex-col relative transition-all duration-300 ${
                    plan.featured
                      ? 'bg-gradient-to-b from-primary/10 to-white dark:from-primary/20 dark:to-slate-800 border-primary shadow-xl shadow-primary/10 transform md:-translate-y-2'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-bl-lg rounded-tr-lg tracking-widest uppercase">
                      {plan.badge}
                    </div>
                  )}

                  <h3 className={`text-xl font-black mb-1 tracking-tight ${plan.featured ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight flex items-baseline gap-1">
                    {plan.price} <span className="text-sm font-bold text-slate-400 pt-1">Kz</span>
                  </div>

                  <ul className="space-y-4 mb-8 flex-1 text-sm font-medium">
                    {plan.features.map((feat) => (
                      <li key={feat.label} className="flex items-start gap-3">
                        <Check className={`shrink-0 mt-0.5 ${plan.featured ? 'text-primary' : 'text-green-500'}`} size={16} />
                        <span className="text-slate-600 dark:text-slate-300">{feat.label}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelectPlan()}
                    className={`w-full py-3 rounded-xl font-black tracking-wide transition-all ${
                      plan.featured
                        ? 'bg-primary text-white hover:bg-primary-hover shadow-[0_10px_20px_rgba(14,86,224,0.3)] active:scale-95'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-95'
                    }`}
                  >
                    {plan.buttonStrings}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 3: Success ── */}
        {step === 3 && (
          <div className="p-10 text-center animate-fade-in duration-300">
            {/* Green check icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 className="text-green-500 dark:text-green-400" size={56} />
              </div>
            </div>

            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3 font-display">
              Conta criada com sucesso!
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base max-w-sm mx-auto mb-8 leading-relaxed">
              O seu plano foi selecionado. Aceda ao portal para dar continuidade à sua candidatura para a <span className="font-semibold text-slate-700 dark:text-slate-300">{universityName}</span>.
            </p>

            <div className="flex flex-col gap-3 max-w-sm mx-auto">
              <Link href="/portal-estudante/home" onClick={onClose} className="w-full">
                <button className="w-full py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-base transition-colors shadow-lg shadow-primary/20">
                  Aceder ao Portal do Estudante
                </button>
              </Link>
              <button 
                onClick={onClose}
                className="w-full py-4 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-bold text-base hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                Voltar à página principal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
