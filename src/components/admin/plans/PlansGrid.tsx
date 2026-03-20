import { CheckCircle2, XCircle, FileEdit, Trash2, PowerOff, Edit } from 'lucide-react';
import type { Plan, PlanStatus, Feature } from '@/app/admin/plans/PlansClient';

// ─── Status badge ─────────────────────────────────────────────────────────────

const statusBadge: Record<PlanStatus, string> = {
  'Publicado':        'bg-green-500/10 text-green-500',
  'Revisão Necessária':  'bg-amber-500/10 text-amber-500',
  'Rascunho':            'bg-slate-500/10 text-slate-500',
};

// ─── Card wrapper styles ───────────────────────────────────────────────────────

const cardClass: Record<PlanStatus, string> = {
  'Publicado':
    'bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col shadow-sm transition-all hover:shadow-md relative',
  'Revisão Necessária':
    'bg-white dark:bg-slate-800/40 rounded-xl border border-primary/20 dark:border-slate-800 overflow-hidden flex flex-col shadow-sm transition-all hover:shadow-md relative',
  'Rascunho':
    'bg-white dark:bg-slate-800/20 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 overflow-hidden flex flex-col shadow-sm opacity-80 hover:opacity-100 transition-all relative group',
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

// ─── Component Props ─────────────────────────────────────────────────────────

interface PlansGridProps {
  plans: Plan[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, nextStatus: PlanStatus) => void;
  onEdit: (plan: Plan) => void;
}

// ─── Individual plan card ─────────────────────────────────────────────────────

function PlanCard({ plan, onDelete, onStatusChange, onEdit }: { 
  plan: Plan; 
  onDelete: (id: string) => void; 
  onStatusChange: (id: string, s: PlanStatus) => void; 
  onEdit: (plan: Plan) => void;
}) {
  const footerBg = 'bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800';

  const handleToggleStatus = () => {
    const cycle: Record<PlanStatus, PlanStatus> = {
      'Rascunho': 'Revisão Necessária',
      'Revisão Necessária': 'Publicado',
      'Publicado': 'Rascunho'
    };
    onStatusChange(plan.id, cycle[plan.status]);
  };

  return (
    <div className={cardClass[plan.status]}>
      {/* Top right quick actions */}
      <div className="absolute top-4 right-4 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100">
        <button 
          onClick={() => onEdit(plan)}
          className="p-1.5 text-slate-400 hover:text-primary bg-white dark:bg-slate-800 rounded shadow-sm border border-slate-200 dark:border-slate-700 transition-colors" 
          title="Editar Plano"
        >
          <FileEdit size={16} />
        </button>
        <button onClick={handleToggleStatus} className="p-1.5 text-slate-400 hover:text-amber-500 bg-white dark:bg-slate-800 rounded shadow-sm border border-slate-200 dark:border-slate-700 transition-colors" title="Mudar Estado">
          <PowerOff size={16} />
        </button>
      </div>

      {/* Card body */}
      <div className="p-6 flex-1 pt-8">
        {/* Header row: name + price */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-4">
            <span 
              onClick={handleToggleStatus}
              title="Clique para mudar o estado rapidamente"
              className={`cursor-pointer px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2 inline-block ${statusBadge[plan.status]} hover:opacity-80 transition-opacity`}
            >
              {plan.status}
            </span>
            <h4 className={`text-xl font-bold ${plan.isDraft ? 'text-slate-500 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors' : 'text-slate-900 dark:text-slate-100'}`}>
              {plan.name}
            </h4>
          </div>
          <div className="text-right flex-shrink-0">
            <p className={`font-serif text-2xl font-bold ${plan.isDraft ? 'text-slate-400 dark:text-slate-600' : 'text-primary'}`}>{plan.price}</p>
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
          <button onClick={() => onEdit(plan)} className="flex-1 flex justify-center items-center gap-2 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded transition-colors">
            <Edit size={14} /> Editar
          </button>
          <button onClick={() => onEdit(plan)} className="flex-1 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded transition-colors">
            Benefícios
          </button>
          <button onClick={() => onDelete(plan.id)} className="p-2 text-slate-400 hover:text-red-500 bg-slate-200 dark:bg-slate-700 rounded transition-colors" title="Eliminar Plano">
            <Trash2 size={16} />
          </button>
        </div>
      )}

      {plan.status === 'Revisão Necessária' && (
        <div className={`p-4 ${footerBg} flex gap-2`}>
          <button onClick={() => onEdit(plan)} className="flex-1 py-2 text-xs font-bold text-white bg-primary hover:bg-primary/90 rounded transition-colors">
            Rever Alterações
          </button>
          <button onClick={() => onDelete(plan.id)} className="p-2 text-slate-400 hover:text-red-500 bg-slate-200 dark:bg-slate-700 rounded transition-colors" title="Eliminar Plano">
            <Trash2 size={16} />
          </button>
        </div>
      )}

      {plan.status === 'Rascunho' && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-2">
          <button onClick={() => onEdit(plan)} className="w-full py-2 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors">
            Continuar a Editar
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function PlansGrid({ plans, onDelete, onStatusChange, onEdit }: PlansGridProps) {
  const publishedCount = plans.filter(p => p.status === 'Publicado').length;

  return (
    <div className="p-6">
      {/* Section header */}
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
        Planos de Serviço Ativos
        <span className="bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs px-2 py-0.5 rounded-full">
          {publishedCount} Publicado{publishedCount !== 1 ? 's' : ''}
        </span>
      </h2>

      {plans.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/20 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400">Nenhum plano disponível.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard 
              key={plan.id} 
              plan={plan} 
              onDelete={onDelete} 
              onStatusChange={onStatusChange} 
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
