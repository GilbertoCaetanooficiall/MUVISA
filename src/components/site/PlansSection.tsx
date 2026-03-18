'use client';

import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import PlanSelectionModal from '@/components/site/PlanSelectionModal';

const plans = [
  {
    name: 'Essencial',
    price: '400.000',
    slug: 'essencial',
    featured: false,
    buttonLabel: 'Selecionar',
    features: [
      { label: 'Checklist de documentos', included: true },
      { label: 'Revisão de dossiê', included: true },
      { label: 'Agendamento consular', included: true },
      { label: 'Acesso ao Portal do Aluno', included: true },
      { label: 'Termo de Responsabilidade', included: false },
    ],
  },
  {
    name: 'Diamond',
    price: '1.000.000',
    slug: 'diamond',
    featured: true,
    buttonLabel: 'Começar Agora',
    badge: 'RECOMENDADO',
    features: [
      { label: 'Tudo do Académico', included: true },
      { label: 'Abertura de NIF e Conta', included: true },
      { label: 'Busca de Moradia/Residência', included: true },
      { label: 'Orientação de Chegada & SEF', included: true },
      { label: 'Suporte Premium 24h', included: true },
    ],
  },
  {
    name: 'Académico',
    price: '700.000',
    slug: 'academico',
    featured: false,
    buttonLabel: 'Selecionar',
    features: [
      { label: 'Tudo do Essencial', included: true },
      { label: 'Escolha de Universidade', included: true },
      { label: 'Apoio na Matrícula/Admissão', included: true },
      { label: 'Termo de Responsabilidade', included: true },
      { label: 'Extracto Bancário', included: true },
    ],
  },
];

export default function PlansSection() {
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.slug}
            className={`rounded-2xl p-8 border flex flex-col relative transition-all duration-300 ${
              plan.featured
                ? 'bg-gradient-to-b from-primary/10 to-white dark:from-primary/20 dark:to-card-dark border-primary transform md:-translate-y-4 shadow-2xl shadow-primary/10'
                : 'bg-white dark:bg-card-dark border-slate-200 dark:border-slate-700'
            }`}
          >
            {plan.badge && (
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg font-display">
                {plan.badge}
              </div>
            )}

            <h3 className={`text-xl font-bold mb-2 font-display ${plan.featured ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
              {plan.name}
            </h3>
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-6 font-display">
              {plan.price} <span className="text-lg font-normal text-slate-500 dark:text-slate-400">Kz</span>
            </div>

            <ul className={`space-y-4 mb-8 flex-1 text-sm font-display ${plan.featured ? 'text-slate-700 dark:text-slate-200' : 'text-slate-600 dark:text-slate-300'}`}>
              {plan.features.map((feat) => (
                <li key={feat.label} className={`flex items-center gap-3 ${!feat.included ? 'opacity-50' : ''}`}>
                  {feat.included
                    ? <Check className={`text-sm shrink-0 ${plan.featured ? 'text-primary' : 'text-green-500'}`} size={16} />
                    : <X className="text-slate-400 dark:text-slate-600 text-sm shrink-0" size={16} />
                  }
                  {feat.label}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedPlan(plan)}
              className={`w-full py-3 rounded-lg font-bold transition-colors font-display ${
                plan.featured
                  ? 'bg-primary text-white hover:bg-primary-hover shadow-lg'
                  : 'border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {plan.buttonLabel}
            </button>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <PlanSelectionModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </>
  );
}
