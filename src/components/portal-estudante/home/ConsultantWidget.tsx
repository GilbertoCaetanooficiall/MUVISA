/* eslint-disable @next/next/no-img-element */
'use client';
import { MessageCircle } from 'lucide-react';
import { useChatPanel } from '@/components/portal-estudante/ChatPanel';

interface StaffInfo {
  id?: string;
  cargo?: string;
  utilizador?: {
    nome_completo?: string;
    email?: string;
  } | null;
}

interface ConsultantWidgetProps {
  staff: StaffInfo | null;
}

// Avatar placeholder usando iniciais
function Avatar({ nome }: { nome: string }) {
  const iniciais = nome
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  return (
    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold border-4 border-white dark:border-slate-700 shadow-lg">
      {iniciais}
    </div>
  );
}

export default function ConsultantWidget({ staff }: ConsultantWidgetProps) {
  const { open } = useChatPanel();
  const nome = staff?.utilizador?.nome_completo ?? 'Consultor MUVISA';
  const cargo = staff?.cargo ?? 'Especialista em Vistos de Estudo';

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6 w-full text-left">
        Meu Consultor
      </h3>
      <div className="relative mb-4">
        <Avatar nome={nome} />
        <div
          className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"
          title="Online"
        />
      </div>
      <h4 className="text-lg font-bold text-slate-900 dark:text-white">{nome}</h4>
      <p className="text-sm text-slate-500 mb-6">{cargo}</p>
      <button
        onClick={open}
        className="w-full py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
      >
        <MessageCircle className="text-[18px]" />
        Iniciar Chat
      </button>
      <button className="mt-3 text-xs text-slate-500 hover:text-primary transition-colors">
        Ver perfil completo
      </button>
    </div>
  );
}
