'use client';

import { useState } from 'react';
import PlansStats from '@/components/admin/plans/PlansStats';
import PlansGrid from '@/components/admin/plans/PlansGrid';
import { PlusCircle, X } from 'lucide-react';

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
  isDraft?: boolean;
}

const initialPlans: Plan[] = [
  {
    id: 'PLAN-001', name: 'Suporte Premium', price: '250.000 Kz', priceLabel: 'por mês', status: 'Publicado',
    features: [
      { text: 'Assistência prioritária na candidatura universitária', included: true },
      { text: 'Apoio total na documentação de visto', included: true },
      { text: 'Rondas ilimitadas de revisão de documentos', included: true },
      { text: 'Acesso a conselheiro dedicado 24/7', included: true },
    ],
  },
  {
    id: 'PLAN-002', name: 'Plano de Visto Standard', price: '120.000 Kz', priceLabel: 'por mês', status: 'Publicado',
    features: [
      { text: 'Orientação no fluxo de pedido de visto', included: true },
      { text: 'Lista de verificação de documentos digitais', included: true },
      { text: 'Verificações de progresso quinzenais', included: true },
      { text: 'Apoio na colocação universitária', included: false },
    ],
  },
  {
    id: 'PLAN-003', name: 'Caminho Inicial', price: '65.000 Kz', priceLabel: 'por mês', status: 'Revisão Necessária',
    features: [
      { text: 'Portal de documentos self-service', included: true },
      { text: 'Alertas de notificação automáticos', included: true },
      { text: 'Acesso ao fórum da comunidade', included: true },
    ],
  },
  {
    id: 'PLAN-004', name: 'Via Rápida Graduados', price: '400.000 Kz', priceLabel: 'proposto', status: 'Rascunho', isDraft: true,
    features: [],
  },
];

export default function PlansClient() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPlan: Plan = {
      id: `PLAN-00${plans.length + 1}`,
      name: formData.get('name') as string,
      price: formData.get('price') as string,
      priceLabel: formData.get('priceLabel') as string,
      status: formData.get('status') as PlanStatus,
      isDraft: formData.get('status') === 'Rascunho',
      features: [
        { text: 'Característica Base 1', included: true },
        { text: 'Característica Base 2', included: true }
      ],
    };
    setPlans([...plans, newPlan]);
    setIsAddModalOpen(false);
    alert('Plano adicionado com sucesso!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem a certeza que deseja eliminar este plano?')) {
      setPlans(plans.filter(p => p.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: PlanStatus) => {
    setPlans(plans.map(p => p.id === id ? { ...p, status: newStatus, isDraft: newStatus === 'Rascunho' } : p));
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Planos e Pacotes
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gira os planos de serviço e benefícios oferecidos aos estudantes.
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-primary/20"
        >
          <PlusCircle size={20} />
          <span>Criar Novo Plano</span>
        </button>
      </div>

      {/* Stats */}
      <PlansStats plans={plans} />

      {/* Plan cards grid */}
      <PlansGrid 
        plans={plans} 
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-md w-full p-6 relative">
            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Criar Novo Plano</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome do Plano</label>
                <input name="name" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Preço (ex: 15.000 Kz)</label>
                  <input name="price" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Etiqueta (ex: por mês)</label>
                  <input name="priceLabel" type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Estado</label>
                <select name="status" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required>
                  <option value="Publicado">Publicado</option>
                  <option value="Revisão Necessária">Revisão Necessária</option>
                  <option value="Rascunho">Rascunho</option>
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">Criar Plano</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
