import { CheckCircle2, XCircle, FileEdit, Trash2 } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type PlanStatus = 'Publicado' | 'Revisão Necessária' | 'Rascunho';

interface Feature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  priceLabel: string;
  status: PlanStatus;
  features: Feature[];
  isDraft?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const plans: Plan[] = [
  {
    id: 'PLAN-001',
    name: 'Suporte Premium',
    price: '250.000 Kz',
    priceLabel: 'por mês',
    status: 'Publicado',
    features: [
      { text: 'Assistência prioritária na candidatura universitária', included: true },
      { text: 'Apoio total na documentação de visto', included: true },
      { text: 'Rondas ilimitadas de revisão de documentos', included: true },
      { text: 'Acesso a conselheiro dedicado 24/7', included: true },
    ],
  },
  {
    id: 'PLAN-002',
    name: 'Plano de Visto Standard',
    price: '120.000 Kz',
    priceLabel: 'por mês',
    status: 'Publicado',
    features: [
      { text: 'Orientação no fluxo de pedido de visto', included: true },
      { text: 'Lista de verificação de documentos digitais', included: true },
      { text: 'Verificações de progresso quinzenais', included: true },
      { text: 'Apoio na colocação universitária', included: false },
    ],
  },
  {
    id: 'PLAN-003',
    name: 'Caminho Inicial',
    price: '65.000 Kz',
    priceLabel: 'por mês',
    status: 'Revisão Necessária',
    features: [
      { text: 'Portal de documentos self-service', included: true },
      { text: 'Alertas de notificação automáticos', included: true },
      { text: 'Acesso ao fórum da comunidade', included: true },
    ],
  },
  {
    id: 'PLAN-004',
    name: 'Via Rápida Graduados',
    price: '400.000 Kz',
    priceLabel: 'proposto',
    status: 'Rascunho',
    isDraft: true,
    features: [],
  },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

const statusBadge: Record<PlanStatus, string> = {
  'Publicado':        'bg-green-500/10 text-green-500',
  'Revisão Necessária':  'bg-amber-500/10 text-amber-500',
  'Rascunho':            'bg-slate-500/10 text-slate-500',
};

// ─── Card wrapper styles ───────────────────────────────────────────────────────

const cardClass: Record<PlanStatus, string> = {
  'Publicado':
    'bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col shadow-sm',
  'Revisão Necessária':
    'bg-white dark:bg-slate-800/40 rounded-xl border border-primary/20 dark:border-slate-800 overflow-hidden flex flex-col shadow-sm',
  'Rascunho':
    'bg-white dark:bg-slate-800/20 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 overflow-hidden flex flex-col shadow-sm opacity-80 hover:opacity-100 transition-opacity group',
};

// ─── Feature row ──────────────────────────────────────────────────────────────

function FeatureRow({ text, included }: Feature) {
  if (included) {
    return (
      <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
        <CheckCircle2 className="text-green-500" size={18} />
        <span>{text}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3 text-sm text-slate-400 dark:text-slate-500 opacity-50">
      <XCircle className="text-slate-400" size={18} />
      <span className="line-through">{text}</span>
    </div>
  );
}

// ─── Individual plan card ─────────────────────────────────────────────────────

function PlanCard({ plan }: { plan: Plan }) {
  const footerBg = 'bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800';

  return (
    <div className={cardClass[plan.status]}>
      {/* Card body */}
      <div className="p-6 flex-1">
        {/* Header row: name + price */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2 inline-block ${statusBadge[plan.status]}`}>
              {plan.status}
            </span>
            <h4 className={`text-xl font-bold ${plan.isDraft ? 'text-slate-500 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors' : 'text-slate-900 dark:text-slate-100'}`}>
              {plan.name}
            </h4>
          </div>
          <div className="text-right">
            <p className={`text-2xl font-bold ${plan.isDraft ? 'text-slate-400 dark:text-slate-600' : 'text-primary'}`}>{plan.price}</p>
            <p className="text-[10px] text-slate-500">{plan.priceLabel}</p>
          </div>
        </div>

        {/* Features or Draft placeholder */}
        {plan.isDraft ? (
          <div className="flex flex-col items-center justify-center py-10">
            <FileEdit className="text-slate-400 dark:text-slate-700 mb-2" size={48} />
            <p className="text-slate-500 text-sm italic">Configurando benefícios...</p>
          </div>
        ) : (
          <div className="space-y-3 mb-8">
            {plan.features.map((f, i) => (
              <FeatureRow key={i} text={f.text} included={f.included} />
            ))}
          </div>
        )}
      </div>

      {/* Card footer / actions */}
      {plan.status === 'Publicado' && (
        <div className={`p-4 ${footerBg} flex gap-2`}>
          <button className="flex-1 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded transition-colors">
            Editar
          </button>
          <button className="flex-1 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded transition-colors">
            Benefícios
          </button>
          <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
            <Trash2 size={20} />
          </button>
        </div>
      )}

      {plan.status === 'Revisão Necessária' && (
        <div className={`p-4 ${footerBg} flex gap-2`}>
          <button className="flex-1 py-2 text-xs font-bold text-white bg-primary hover:bg-primary/90 rounded transition-colors">
            Rever Alterações
          </button>
          <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
            <Trash2 size={20} />
          </button>
        </div>
      )}

      {plan.status === 'Rascunho' && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-2">
          <button className="w-full py-2 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors">
            Continuar a Editar
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function PlansGrid() {
  return (
    <div className="p-6">
      {/* Section header */}
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
        Planos de Serviço Ativos
        <span className="bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs px-2 py-0.5 rounded-full">
          8 Publicados
        </span>
      </h2>

      {/* Grid of plan cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
