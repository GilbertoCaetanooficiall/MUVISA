'use client';

import { useState } from 'react';
import PlansStats from '@/components/admin/plans/PlansStats';
import PlansGrid from '@/components/admin/plans/PlansGrid';
import { X, Plus, Trash2, CheckCircle2, Ticket, LayoutGrid, Tag, Calendar, Edit2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';

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
  maxUses?: number;
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
  { id: 'C-001', code: 'MUVISA10', discountValue: '10', type: 'Percentage', expiry: '31 Dez, 2024', usageCount: 145, maxUses: 200 },
  { id: 'C-002', code: 'BEMVINDO50', discountValue: '50.000', type: 'Fixed', expiry: '15 Jul, 2024', usageCount: 32, maxUses: 50 },
];

export default function PlansClient() {
  const [activeTab, setActiveTab] = useState<'plans' | 'coupons'>('plans');
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [isAddCouponModalOpen, setIsAddCouponModalOpen] = useState(false);
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
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
      id: `C-${Date.now().toString().slice(-6)}`,
      code: (formData.get('code') as string).toUpperCase(),
      discountValue: formData.get('discountValue') as string,
      type: formData.get('type') as 'Percentage' | 'Fixed',
      expiry: formData.get('expiry') as string,
      usageCount: 0,
      maxUses: formData.get('maxUses') ? parseInt(formData.get('maxUses') as string) : undefined,
    };
    setCoupons([...coupons, newCoupon]);
    setIsAddCouponModalOpen(false);
    (e.target as HTMLFormElement).reset();
    alert('Cupão de desconto ativado!');
  };

  const handleAddPlanSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const planToAdd = {
      ...newPlan,
      id: `PLAN-${Date.now().toString().slice(-6)}`
    };
    setPlans([...plans, planToAdd]);
    setIsAddPlanModalOpen(false);
    setNewPlan({
      id: '', name: '', price: '', priceLabel: 'por processo', status: 'Rascunho',
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

  const handleEditCouponSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCoupon) return;
    setCoupons(coupons.map(c => c.id === editingCoupon.id ? editingCoupon : c));
    setEditingCoupon(null);
    alert('Cupão atualizado com sucesso!');
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
        <div className="animate-fade-in space-y-8 p-6">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="font-serif text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-3">
              Cupões Ativos
              <span className="bg-primary/10 text-primary text-[10px] px-3 py-1 rounded-full border border-primary/20">
                 {coupons.length} Criado{coupons.length !== 1 ? 's' : ''}
              </span>
            </h2>
            
            <button 
              onClick={() => setIsAddCouponModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20 self-start sm:self-auto"
            >
              Adicionar Novo Cupão
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.map((coupon) => (
              <div key={coupon.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 relative group hover:shadow-2xl transition-all duration-500 active:scale-[0.98]">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button onClick={() => setEditingCoupon({...coupon})} className="text-slate-300 hover:text-primary transition-colors bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg border border-slate-100 dark:border-white/10">
                    <Edit2 size={16} />
                  </button>
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
                  <span className="bg-primary/5 dark:bg-white/5 text-primary px-3 py-1.5 rounded-full">
                    {coupon.usageCount} Usados / {coupon.maxUses ? (coupon.maxUses - coupon.usageCount) + ' Restam' : '∞'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Add Coupon Modal ─── */}
      <Modal open={isAddCouponModalOpen} onClose={() => setIsAddCouponModalOpen(false)}>
        <div className="p-6 relative">
          <button 
            onClick={() => setIsAddCouponModalOpen(false)} 
            className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
          
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Novo Cupão</h2>
          
          <form onSubmit={handleAddCouponSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Código do Cupão</label>
              <input name="code" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary uppercase transition-shadow" placeholder="Ex: MUVISA20" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Valor</label>
                <input name="discountValue" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" placeholder="Ex: 50.000" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tipo</label>
                <select name="type" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow">
                  <option value="Fixed">Fixo (Kz)</option>
                  <option value="Percentage">Percentagem (%)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Data de Expiração</label>
                <input name="expiry" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" placeholder="Ex: 31 Dez, 2024" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Limite de Usos</label>
                <input name="maxUses" type="number" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" placeholder="Ilimitado" />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button type="button" onClick={() => setIsAddCouponModalOpen(false)} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">Cancelar</button>
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 shadow-sm transition-colors">Ativar Cupão</button>
            </div>
          </form>
        </div>
      </Modal>

      {/* ─── Add Plan Modal ─── */}
      <Modal open={isAddPlanModalOpen} onClose={() => setIsAddPlanModalOpen(false)} maxWidth="max-w-xl">
        <div className="p-6 relative max-h-[85vh] overflow-y-auto custom-scrollbar">
          <button 
            onClick={() => setIsAddPlanModalOpen(false)} 
            className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
          
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Novo Plano de Serviço</h2>
          
          <form onSubmit={handleAddPlanSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome do Plano</label>
              <input value={newPlan.name} onChange={e => setNewPlan({...newPlan, name: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" placeholder="Ex: Diamond" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Preço (Kz)</label>
                <input value={newPlan.price} onChange={e => setNewPlan({...newPlan, price: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" placeholder="Ex: 1.000.000 Kz" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sufixo</label>
                <input value={newPlan.priceLabel} onChange={e => setNewPlan({...newPlan, priceLabel: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" placeholder="Ex: por processo" required />
              </div>
            </div>

            <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <input type="checkbox" className="w-4 h-4 rounded text-primary border-slate-300 focus:ring-primary" checked={!!newPlan.isRecommended} onChange={(e) => setNewPlan({...newPlan, isRecommended: e.target.checked})} />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900 dark:text-white">Destacar como Recomendado</span>
                <span className="text-xs text-slate-500">Exibirá o distintivo no cartão</span>
              </div>
            </label>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Benefícios Incluídos</label>
              <div className="space-y-2">
                {newPlan.features.map((f, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <button type="button" onClick={() => { const nf = [...newPlan.features]; nf[i].included = !nf[i].included; setNewPlan({...newPlan, features: nf}); }} className={`p-2 rounded-lg border transition-colors ${f.included ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}>
                      <CheckCircle2 size={16} />
                    </button>
                    <input value={f.text} onChange={e => { const nf = [...newPlan.features]; nf[i].text = e.target.value; setNewPlan({...newPlan, features: nf}); }} className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" placeholder={`Benefício ${i + 1}`} required />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2">
              <button type="button" onClick={() => setIsAddPlanModalOpen(false)} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">Cancelar</button>
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 shadow-sm transition-colors">Criar Plano</button>
            </div>
          </form>
        </div>
      </Modal>

      {/* ─── Edit Plan Modal ─── */}
      <Modal open={!!editingPlan} onClose={() => setEditingPlan(null)} maxWidth="max-w-xl">
        {editingPlan && (
          <div className="p-6">
            <button
              onClick={() => setEditingPlan(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Editar {editingPlan.name}</h2>

            <form onSubmit={handleEditPlanSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome do Plano</label>
                <input
                  value={editingPlan.name}
                  onChange={e => setEditingPlan(p => p ? {...p, name: e.target.value} : null)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Nome do plano"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Preço (Kz)</label>
                  <input
                    value={editingPlan.price}
                    onChange={e => setEditingPlan(p => p ? {...p, price: e.target.value} : null)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Preço"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sufixo</label>
                  <input
                    value={editingPlan.priceLabel}
                    onChange={e => setEditingPlan(p => p ? {...p, priceLabel: e.target.value} : null)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="por processo"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded text-primary border-slate-300 focus:ring-primary"
                  checked={!!editingPlan.isRecommended}
                  onChange={e => setEditingPlan(p => p ? {...p, isRecommended: e.target.checked} : null)}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">Destacar como Recomendado</span>
                  <span className="text-xs text-slate-500">Exibirá o distintivo no cartão</span>
                </div>
              </label>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Benefícios</label>
                <div className="space-y-2">
                  {editingPlan.features.map((f, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <button
                        type="button"
                        onClick={() => updateFeature(i, {included: !f.included})}
                        className={`p-2 rounded-lg border transition-colors ${f.included ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}
                      >
                        <CheckCircle2 size={16} />
                      </button>
                      <input
                        value={f.text}
                        onChange={e => updateFeature(i, {text: e.target.value})}
                        className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={() => { const nf = editingPlan.features.filter((_, idx) => idx !== i); setEditingPlan({...editingPlan, features: nf}); }}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setEditingPlan(p => p ? {...p, features: [...p.features, {text: '', included: true}]} : null)}
                  className="w-full mt-2 py-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 text-sm font-medium hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Adicionar Benefício
                </button>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingPlan(null)} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">Gravar Plano</button>
              </div>
            </form>
          </div>
        )}
      </Modal>

      {/* ─── Edit Coupon Modal ─── */}
      <Modal open={!!editingCoupon} onClose={() => setEditingCoupon(null)}>
        {editingCoupon && (
          <div className="p-6 relative">
            <button 
              onClick={() => setEditingCoupon(null)} 
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Editar Cupão</h2>
            
            <form onSubmit={handleEditCouponSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Código do Cupão</label>
                <input
                  value={editingCoupon.code}
                  onChange={e => setEditingCoupon({...editingCoupon, code: e.target.value.toUpperCase()})}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary uppercase transition-shadow"
                  placeholder="Ex: MUVISA20"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Valor</label>
                  <input
                    value={editingCoupon.discountValue}
                    onChange={e => setEditingCoupon({...editingCoupon, discountValue: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                    placeholder="Ex: 50.000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tipo</label>
                  <select
                    value={editingCoupon.type}
                    onChange={e => setEditingCoupon({...editingCoupon, type: e.target.value as 'Percentage' | 'Fixed'})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                  >
                    <option value="Fixed">Fixo (Kz)</option>
                    <option value="Percentage">Percentagem (%)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Data de Expiração</label>
                  <input
                    value={editingCoupon.expiry}
                    onChange={e => setEditingCoupon({...editingCoupon, expiry: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                    placeholder="Ex: 31 Dez, 2024"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Limite de Usos</label>
                  <input
                    type="number"
                    value={editingCoupon.maxUses || ''}
                    onChange={e => setEditingCoupon({...editingCoupon, maxUses: e.target.value ? parseInt(e.target.value) : undefined})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                    placeholder="Ilimitado"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingCoupon(null)} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 shadow-sm transition-colors">Atualizar Cupão</button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}
