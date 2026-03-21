'use client';

import { useState } from 'react';
import PlansStats from '@/components/admin/plans/PlansStats';
import PlansGrid from '@/components/admin/plans/PlansGrid';
import { X, Plus, Trash2, CheckCircle2, Ticket, LayoutGrid, Tag, Calendar } from 'lucide-react';

export type PlanStatus = 'Publicado' | 'Revisão Necessária' | 'Rascunho';

export interface Feature {
  text: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  priceLabel: string;
  status: PlanStatus;
  features: Feature[];
  isRecommended?: boolean;
  discountPercentage?: number;
  isDraft?: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountValue: string;
  type: 'Percentage' | 'Fixed';
  expiry: string;
  usageCount: number;
}

const initialPlans: Plan[] = [
  {
    id: 'PLAN-001', name: 'Essencial', price: '400.000 Kz', priceLabel: 'por processo', status: 'Publicado',
    features: [
      { text: 'Checklist de documentos', included: true },
      { text: 'Revisão de dossiê', included: true },
      { text: 'Agendamento consular', included: true },
      { text: 'Acesso ao Portal do Aluno', included: true },
    ],
  },
  {
    id: 'PLAN-002', name: 'Académico', price: '700.000 Kz', priceLabel: 'por processo', status: 'Publicado',
    features: [
      { text: 'Tudo do Essencial', included: true },
      { text: 'Escolha de Universidade', included: true },
      { text: 'Apoio na Matrícula/Admissão', included: true },
      { text: 'Termo de Responsabilidade', included: true },
    ],
  },
  {
    id: 'PLAN-003', name: 'Diamond', price: '1.000.000 Kz', priceLabel: 'por processo', status: 'Publicado', isRecommended: true,
    features: [
      { text: 'Tudo do Académico', included: true },
      { text: 'Abertura de NIF e Conta', included: true },
      { text: 'Busca de Moradia/Residência', included: true },
      { text: 'Suporte Premium 24h', included: true },
    ],
  },
];

const initialCoupons: Coupon[] = [
  { id: 'C-001', code: 'MUVISA10', discountValue: '10', type: 'Percentage', expiry: '31 Dez, 2024', usageCount: 145 },
  { id: 'C-002', code: 'BEMVINDO50', discountValue: '50.000', type: 'Fixed', expiry: '15 Jul, 2024', usageCount: 32 },
];

export default function PlansClient() {
  const [activeTab, setActiveTab] = useState<'plans' | 'coupons'>('plans');
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [isAddCouponModalOpen, setIsAddCouponModalOpen] = useState(false);
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [newPlan, setNewPlan] = useState<Plan>({
    id: '',
    name: '',
    price: '',
    priceLabel: 'por processo',
    status: 'Rascunho',
    features: [
      { text: '', included: true },
      { text: '', included: true },
      { text: '', included: true },
      { text: '', included: true },
    ]
  });

  const handleAddCouponSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCoupon: Coupon = {
      id: `C-00${coupons.length + 1}`,
      code: (formData.get('code') as string).toUpperCase(),
      discountValue: formData.get('discountValue') as string,
      type: formData.get('type') as 'Percentage' | 'Fixed',
      expiry: formData.get('expiry') as string,
      usageCount: 0,
    };
    setCoupons([...coupons, newCoupon]);
    setIsAddCouponModalOpen(false);
    alert('Cupão de desconto ativado!');
  };

  const handleAddPlanSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const planToAdd = {
      ...newPlan,
      id: `PLAN-00${plans.length + 1}`
    };
    setPlans([...plans, planToAdd]);
    setIsAddPlanModalOpen(false);
    setNewPlan({
      id: '',
      name: '',
      price: '',
      priceLabel: 'por processo',
      status: 'Rascunho',
      features: [
        { text: '', included: true },
        { text: '', included: true },
        { text: '', included: true },
        { text: '', included: true },
      ]
    });
    alert('Novo plano criado com sucesso!');
  };

  const handleEditPlanSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingPlan) return;
    setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
    setEditingPlan(null);
    alert('Pacote atualizado com sucesso!');
  };

  const updateFeature = (index: number, updates: Partial<Feature>) => {
    if (!editingPlan) return;
    const newFeatures = [...editingPlan.features];
    newFeatures[index] = { ...newFeatures[index], ...updates };
    setEditingPlan({ ...editingPlan, features: newFeatures });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-black text-slate-900 dark:text-white tracking-tight">Marketing e Gestão</h1>
          <p className="text-sm text-slate-500 dark:text-white/40 font-medium">Define preços, promoções e cupões do ecossistema MUVISA.</p>
        </div>
        <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-2xl border border-slate-200 dark:border-white/10 shadow-inner">
          <button 
            onClick={() => setActiveTab('plans')}
            className={`flex items-center gap-2 px-6 py-2.5 text-sm font-black rounded-xl transition-all ${activeTab === 'plans' ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            <LayoutGrid size={18} /> Planos
          </button>
          <button 
            onClick={() => setActiveTab('coupons')}
            className={`flex items-center gap-2 px-6 py-2.5 text-sm font-black rounded-xl transition-all ${activeTab === 'coupons' ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            <Ticket size={18} /> Cupões
          </button>
        </div>
      </div>

      {activeTab === 'plans' ? (
        <>
          <PlansStats plans={plans} />
          <PlansGrid 
            plans={plans} 
            onDelete={(id) => setPlans(plans.filter(p => p.id !== id))}
            onStatusChange={(id, s) => setPlans(plans.map(p => p.id === id ? {...p, status: s} : p))}
            onEdit={(plan) => setEditingPlan({...plan})}
            onAddPlan={() => setIsAddPlanModalOpen(true)}
          />
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 relative group hover:shadow-2xl transition-all duration-500 active:scale-[0.98]">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => setCoupons(coupons.filter(c => c.id !== coupon.id))} className="text-slate-300 hover:text-red-500 transition-colors bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg border border-slate-100 dark:border-white/10">
                    <Trash2 size={16} />
                 </button>
              </div>
              <div className="flex items-center gap-4 mb-6">
                 <div className="bg-primary/10 p-4 rounded-[1.25rem] group-hover:bg-primary transition-all duration-500 group-hover:rotate-12">
                   <Tag className="text-primary group-hover:text-white" size={28} />
                 </div>
                 <div>
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-widest">{coupon.code}</h4>
                    <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">CUPÃO ATIVO</p>
                 </div>
              </div>
              <div className="flex items-end gap-1 mb-8">
                 <span className="text-4xl font-black text-primary tracking-tight">{coupon.discountValue}</span>
                 <span className="text-sm font-black text-slate-400 mb-1">{coupon.type === 'Percentage' ? '%' : 'Kz'} DESCONTO</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] pt-6 border-t border-slate-100 dark:border-white/5">
                 <span className="flex items-center gap-2"><Calendar size={14} className="text-slate-300" /> Válido até {coupon.expiry}</span>
                 <span className="bg-primary/5 dark:bg-white/5 text-primary px-3 py-1.5 rounded-full">{coupon.usageCount} Usos</span>
              </div>
            </div>
          ))}
          <button 
            onClick={() => setIsAddCouponModalOpen(true)}
            className="h-full min-h-[200px] border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-primary hover:text-primary transition-all group active:scale-95"
          >
             <div className="p-5 bg-slate-50 dark:bg-white/5 rounded-full group-hover:bg-primary/10 transition-all scale-110">
                <Plus size={32} />
             </div>
             <span className="font-black text-sm uppercase tracking-widest">Ativar Novo Cupão</span>
          </button>
        </div>
      )}

      {/* Add Coupon Modal */}
      {isAddCouponModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] max-w-md w-full p-10 relative shadow-2xl border border-white/10 animate-scale-in">
              <button 
                onClick={() => setIsAddCouponModalOpen(false)} 
                className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all bg-slate-50 dark:bg-white/5 p-2 rounded-full"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-3 mb-10">
                 <div className="bg-primary/10 p-3 rounded-2xl">
                    <Ticket className="text-primary" size={24} />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Novo Cupão</h3>
              </div>

              <form onSubmit={handleAddCouponSubmit} className="space-y-8">
                 <div className="space-y-6">
                    <div>
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Código do Cupão</label>
                       <input 
                         name="code" 
                         className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 font-black uppercase tracking-widest focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-300" 
                         placeholder="Ex: MUVISA20" 
                         required 
                       />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Valor</label>
                          <input 
                            name="discountValue" 
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 font-black" 
                            placeholder="Ex: 50.000" 
                            required 
                          />
                       </div>
                       <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Tipo</label>
                          <select 
                            name="type" 
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 font-black outline-none focus:ring-1 focus:ring-primary transition-all appearance-none"
                          >
                             <option value="Fixed">Fixo (Kz)</option>
                             <option value="Percentage">Percentagem (%)</option>
                          </select>
                       </div>
                    </div>

                    <div>
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Data de Expiração</label>
                       <input 
                         name="expiry" 
                         className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 font-black" 
                         placeholder="Ex: 31 Dez, 2024" 
                         required 
                       />
                    </div>
                 </div>

                 <button 
                   type="submit" 
                   className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-[0_15px_30px_rgba(14,86,224,0.3)] hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-widest"
                 >
                   Ativar Cupão de Desconto
                 </button>
              </form>
           </div>
        </div>
      )}

      {/* Add Plan Modal */}
      {isAddPlanModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] max-w-xl w-full p-10 relative shadow-2xl border border-white/10 animate-scale-in overflow-y-auto max-h-[90vh]">
              <button 
                onClick={() => setIsAddPlanModalOpen(false)} 
                className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all bg-slate-50 dark:bg-white/5 p-2 rounded-full"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-3 mb-10">
                 <div className="bg-emerald-500/10 p-3 rounded-2xl">
                    <Plus className="text-emerald-500" size={24} />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Novo Plano de Serviço</h3>
              </div>

              <form onSubmit={handleAddPlanSubmit} className="space-y-6">
                 <div className="space-y-4">
                    <div>
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Nome do Plano</label>
                       <input 
                         value={newPlan.name}
                         onChange={e => setNewPlan({...newPlan, name: e.target.value})}
                         className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 font-black focus:ring-2 focus:ring-primary outline-none transition-all" 
                         placeholder="Ex: Diamond" 
                         required 
                       />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Preço (Kz)</label>
                          <input 
                            value={newPlan.price}
                            onChange={e => setNewPlan({...newPlan, price: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 font-black" 
                            placeholder="Ex: 1.000.000 Kz" 
                            required 
                          />
                       </div>
                       <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Sufixo</label>
                          <input 
                            value={newPlan.priceLabel}
                            onChange={e => setNewPlan({...newPlan, priceLabel: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 font-black" 
                            placeholder="Ex: por processo" 
                            required 
                          />
                       </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Benefícios do Plano</label>
                      {newPlan.features.map((f, i) => (
                        <div key={i} className="flex gap-2 items-center">
                           <button 
                             type="button" 
                             onClick={() => {
                               const nf = [...newPlan.features];
                               nf[i].included = !nf[i].included;
                               setNewPlan({...newPlan, features: nf});
                             }} 
                             className={`p-2.5 rounded-xl border transition-all ${f.included ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400'}`}
                           >
                              <CheckCircle2 size={18} />
                           </button>
                           <input 
                             value={f.text} 
                             onChange={e => {
                               const nf = [...newPlan.features];
                               nf[i].text = e.target.value;
                               setNewPlan({...newPlan, features: nf});
                             }} 
                             className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-xs font-bold" 
                             placeholder={`Benefício ${i + 1}`}
                             required 
                           />
                        </div>
                      ))}
                    </div>
                 </div>

                 <button 
                   type="submit" 
                   className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-[0_15px_30px_rgba(14,86,224,0.3)] hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-widest"
                 >
                   Criar Plano agora
                 </button>
              </form>
           </div>
        </div>
      )}

      {/* Edit Plan Modal */}
      {editingPlan && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] max-w-xl w-full p-8 relative shadow-2xl border border-white/10 overflow-y-auto max-h-[90vh]">
            {/* Reaproveita o modal anterior, mantendo a consistência */}
            <h2 className="font-serif text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-8">Editar {editingPlan.name}</h2>
            <form onSubmit={handleEditPlanSubmit} className="space-y-6">
              <input value={editingPlan.name} onChange={e => setEditingPlan(p => p ? {...p, name: e.target.value} : null)} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 font-bold" placeholder="Nome do plano" />
              <input value={editingPlan.price} onChange={e => setEditingPlan(p => p ? {...p, price: e.target.value} : null)} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 font-bold" placeholder="Preço" />
              
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Vantagens</label>
                {editingPlan.features.map((f, i) => (
                  <div key={i} className="flex gap-2 items-center">
                     <button type="button" onClick={() => updateFeature(i, {included: !f.included})} className={`p-2 rounded-xl border transition-all ${f.included ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400'}`}>
                        <CheckCircle2 size={18} />
                     </button>
                     <input value={f.text} onChange={e => updateFeature(i, {text: e.target.value})} className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-xs font-bold" />
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button type="button" onClick={() => setEditingPlan(null)} className="flex-1 py-4 font-black">Cancelar</button>
                <button type="submit" className="flex-[2] py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20">Atualizar Plano</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
