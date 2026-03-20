'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

const assessmentPlans = [
  {
    name: 'Essencial',
    price: '400.000',
    slug: 'essencial',
    featured: false,
    description: 'O início ideal para o seu processo de visto e candidatura.',
    features: [
      'Checklist de documentos completo',
      'Revisão de dossiê profissional',
      'Agendamento consular garantido',
      'Acesso ao Portal do Aluno',
    ],
  },
  {
    name: 'Académico',
    price: '700.000',
    slug: 'academico',
    featured: false,
    description: 'Apoio total na escolha e entrada na universidade.',
    features: [
      'Tudo do plano Essencial',
      'Consultoria na escolha de UP',
      'Apoio na Matrícula e Admissão',
      'Termo de Responsabilidade',
    ],
  },
  {
    name: 'Diamond',
    price: '1.000.000',
    slug: 'diamond',
    featured: true,
    badge: 'RECOMENDADO',
    description: 'A solução completa: do visto à sua chegada em Portugal.',
    features: [
      'Tudo do plano Académico',
      'Abertura de NIF e Conta Bancária',
      'Busca de Moradia em Portugal',
      'Suporte Premium 24h via WhatsApp',
    ],
  },
];

export default function EscolhaPlanoPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="font-sans antialiased text-white animate-fade-in w-full max-w-6xl mx-auto px-4 py-12 relative z-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-md">
          Escolha o seu <span className="text-primary">Plano de Assessoria</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Para darmos seguimento à sua jornada rumo a Portugal, selecione o nível de acompanhamento que melhor se adapta às suas necessidades.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {assessmentPlans.map((plan) => (
          <div
            key={plan.slug}
            className={`relative group rounded-[32px] p-8 transition-all duration-500 border ${
              plan.featured
                ? 'bg-slate-900/80 border-primary/50 shadow-2xl shadow-primary/20 scale-105 z-10'
                : 'bg-slate-950/40 border-white/10 hover:border-white/20'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-[0.2em] uppercase shadow-lg z-20">
                {plan.badge}
              </div>
            )}

            <div className="mb-8">
              <h3 className={`text-2xl font-bold mb-2 ${plan.featured ? 'text-primary' : 'text-white'}`}>
                {plan.name}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed min-h-[40px]">
                {plan.description}
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white tracking-tight">{plan.price}</span>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Kz</span>
              </div>
              <div className="text-xs text-gray-500 mt-1 font-medium italic">Pagamento único por processo</div>
            </div>

            <ul className="space-y-4 mb-10">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.featured ? 'bg-primary/20' : 'bg-white/5'}`}>
                    <Check className={plan.featured ? 'text-primary w-3 h-3' : 'text-gray-500 w-3 h-3'} />
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/boas-vindas"
              onClick={() => setSelectedPlan(plan.slug)}
              className={`block w-full py-4 rounded-2xl font-black text-center transition-all duration-300 tracking-wider uppercase text-sm ${
                plan.featured
                  ? 'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95'
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 active:scale-95'
              }`}
            >
              Selecionar Plano
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500 italic">
          * Pode fazer o upgrade do seu plano a qualquer momento através do seu Dashboard.
        </p>
      </div>
    </div>
  );
}
