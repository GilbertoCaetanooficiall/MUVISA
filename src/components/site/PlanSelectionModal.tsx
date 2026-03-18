'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { X, CheckCircle2 } from 'lucide-react';

interface Plan {
  name: string;
  price: string;
  slug: string;
}

interface PlanSelectionModalProps {
  plan: Plan | null;
  onClose: () => void;
}

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
}

interface FormErrors {
  nome?: string;
  email?: string;
  telefone?: string;
  cidade?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^[\d\s\+\-\(\)]{7,}$/.test(phone.trim());
}

export default function PlanSelectionModal({ plan, onClose }: PlanSelectionModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state when plan changes
  useEffect(() => {
    setStep(1);
    setFormData({ nome: '', email: '', telefone: '', cidade: '' });
    setErrors({});
  }, [plan]);

  // ESC key to close
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!plan) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.nome.trim() || formData.nome.trim().length < 3) {
      newErrors.nome = 'Por favor, insira o seu nome completo.';
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido.';
    }
    if (!formData.telefone.trim() || !validatePhone(formData.telefone)) {
      newErrors.telefone = 'Por favor, insira um número de telefone válido.';
    }
    if (!formData.cidade.trim()) {
      newErrors.cidade = 'Por favor, insira a cidade de destino.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Simulate brief async action
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 600);
  };

  const loginUrl = `/login?plano=${plan.slug}`;
  const cadastroUrl = `/cadastro?plano=${plan.slug}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-opacity duration-300"
      aria-modal="true"
      role="dialog"
      aria-label="Selecionar Plano"
      onClick={onClose}
    >


      {/* Modal Panel */}
      <div 
        className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transform transition-all duration-300 scale-100 opacity-100 animate-[fade-in_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >

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
            {/* Header */}
            <div className="mb-6">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                Plano {plan.name}
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1 font-display">
                Registar Interesse
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Preencha os dados abaixo para reservar o seu lugar.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Nome */}
              <div>
                <label htmlFor="pm-nome" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nome completo <span className="text-red-500">*</span>
                </label>
                <input
                  id="pm-nome"
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Ex: Maria Silva"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-colors focus:ring-2 focus:ring-primary/50 ${errors.nome ? 'border-red-500' : 'border-slate-300 dark:border-slate-600 focus:border-primary'}`}
                />
                {errors.nome && <p className="mt-1 text-xs text-red-500">{errors.nome}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="pm-email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="pm-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ex: maria@email.com"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-colors focus:ring-2 focus:ring-primary/50 ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-600 focus:border-primary'}`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* Telefone */}
              <div>
                <label htmlFor="pm-telefone" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Telefone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  id="pm-telefone"
                  name="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="Ex: +244 923 000 000"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-colors focus:ring-2 focus:ring-primary/50 ${errors.telefone ? 'border-red-500' : 'border-slate-300 dark:border-slate-600 focus:border-primary'}`}
                />
                {errors.telefone && <p className="mt-1 text-xs text-red-500">{errors.telefone}</p>}
              </div>

              {/* Cidade */}
              <div>
                <label htmlFor="pm-cidade" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Cidade preferencial de destino <span className="text-red-500">*</span>
                </label>
                <input
                  id="pm-cidade"
                  name="cidade"
                  type="text"
                  value={formData.cidade}
                  onChange={handleChange}
                  placeholder="Ex: Lisboa, Porto, Coimbra..."
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-colors focus:ring-2 focus:ring-primary/50 ${errors.cidade ? 'border-red-500' : 'border-slate-300 dark:border-slate-600 focus:border-primary'}`}
                />
                {errors.cidade && <p className="mt-1 text-xs text-red-500">{errors.cidade}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-sm transition-colors shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    A processar...
                  </>
                ) : 'Confirmar interesse'}
              </button>
            </form>
          </div>
        )}

        {/* ── STEP 2: Success ── */}
        {step === 2 && (
          <div className="p-8 text-center">
            {/* Green check icon */}
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 className="text-green-500 dark:text-green-400" size={48} />
              </div>
            </div>

            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 font-display">
              Tudo certo!
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              Os teus dados foram guardados com sucesso. Para associar o plano à tua conta, faz login ou cria uma conta nova.
            </p>

            {/* Plan summary */}
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-6 py-4 mb-6 inline-block w-full text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Plano selecionado</p>
              <p className="text-xl font-black text-primary font-display">{plan.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{plan.price} Kz</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <Link href={loginUrl} className="w-full">
                <button className="w-full py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-sm transition-colors shadow-lg shadow-primary/20">
                  Entrar na minha conta
                </button>
              </Link>
              <Link href={cadastroUrl} className="w-full">
                <button className="w-full py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  Criar conta nova
                </button>
              </Link>
            </div>

            <p className="mt-5 text-xs text-slate-400 dark:text-slate-500 italic">
              O teu plano ficará guardado após o login.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
