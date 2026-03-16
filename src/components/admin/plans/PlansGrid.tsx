import { CheckCircle2, XCircle, FileEdit, Trash2 } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type PlanStatus = 'Published' | 'Review Required' | 'Draft';

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
    name: 'Premium Support',
    price: '$299',
    priceLabel: 'per month',
    status: 'Published',
    features: [
      { text: 'Priority university application assistance', included: true },
      { text: 'Full visa documentation support', included: true },
      { text: 'Unlimited document review rounds', included: true },
      { text: '24/7 dedicated advisor access', included: true },
    ],
  },
  {
    id: 'PLAN-002',
    name: 'Standard Visa Plan',
    price: '$149',
    priceLabel: 'per month',
    status: 'Published',
    features: [
      { text: 'Visa application workflow guidance', included: true },
      { text: 'Digital document checklist', included: true },
      { text: 'Bi-weekly progress check-ins', included: true },
      { text: 'University placement support', included: false },
    ],
  },
  {
    id: 'PLAN-003',
    name: 'Starter Pathway',
    price: '$89',
    priceLabel: 'per month',
    status: 'Review Required',
    features: [
      { text: 'Self-service document portal', included: true },
      { text: 'Automated notification alerts', included: true },
      { text: 'Community forum access', included: true },
    ],
  },
  {
    id: 'PLAN-004',
    name: 'Graduate Fast-Track',
    price: '$499',
    priceLabel: 'proposed',
    status: 'Draft',
    isDraft: true,
    features: [],
  },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

const statusBadge: Record<PlanStatus, string> = {
  'Published':        'bg-green-500/10 text-green-500',
  'Review Required':  'bg-amber-500/10 text-amber-500',
  'Draft':            'bg-slate-500/10 text-slate-500',
};

// ─── Card wrapper styles ───────────────────────────────────────────────────────

const cardClass: Record<PlanStatus, string> = {
  'Published':
    'bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col shadow-sm',
  'Review Required':
    'bg-white dark:bg-slate-800/40 rounded-xl border border-primary/20 dark:border-slate-800 overflow-hidden flex flex-col shadow-sm',
  'Draft':
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
            <p className="text-slate-500 text-sm italic">Configuring benefits...</p>
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
      {plan.status === 'Published' && (
        <div className={`p-4 ${footerBg} flex gap-2`}>
          <button className="flex-1 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded transition-colors">
            Edit
          </button>
          <button className="flex-1 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded transition-colors">
            Benefits
          </button>
          <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
            <Trash2 size={20} />
          </button>
        </div>
      )}

      {plan.status === 'Review Required' && (
        <div className={`p-4 ${footerBg} flex gap-2`}>
          <button className="flex-1 py-2 text-xs font-bold text-white bg-primary hover:bg-primary/90 rounded transition-colors">
            Review Changes
          </button>
          <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
            <Trash2 size={20} />
          </button>
        </div>
      )}

      {plan.status === 'Draft' && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-2">
          <button className="w-full py-2 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors">
            Continue Editing
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
        Active Service Plans
        <span className="bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs px-2 py-0.5 rounded-full">
          8 Published
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
