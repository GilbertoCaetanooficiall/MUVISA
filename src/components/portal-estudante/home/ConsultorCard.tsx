'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useChatPanel } from "@/components/portal-estudante/ChatPanel";
import ConsultantProfileModal from "./ConsultantProfileModal";

interface ConsultorCardProps {
  nome?: string;
  role?: string;
  avatarUrl?: string;
  isOnline?: boolean;
  processos?: string;
  aprovacao?: string;
  avaliacao?: string;
}

export default function ConsultorCard({
  nome = 'Ronaldo Joaquim',
  role = 'Especialista em Vistos de Estudo',
  avatarUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
  isOnline = true,
  processos = '240+',
  aprovacao = '98%',
  avaliacao = '4.9'
}: ConsultorCardProps) {
  const { open: openChat } = useChatPanel();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <div className="bg-white dark:bg-slate-800/60 backdrop-blur-md rounded-[20px] border border-[#E8E8E4] dark:border-slate-700 p-[28px_24px_20px] flex flex-col items-center text-center w-full max-w-[320px] shadow-sm transition-colors duration-300">
      {/* Eyebrow */}
      <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 font-bold mb-6">
        MEU CONSULTOR
      </span>

      {/* Avatar with Double Ring */}
      <div className="relative mb-5">
        {/* Outer Ring (25% opacity) */}
        <div className="size-24 rounded-full border-[1.5px] border-[#2F5BE7]/25 flex items-center justify-center">
          {/* Inner Ring (Solid) */}
          <div className="size-[86px] rounded-full border-[2px] border-[#2F5BE7] overflow-hidden p-1 bg-white dark:bg-slate-800">
            <img 
              src={avatarUrl} 
              alt={nome} 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        
        {/* Online Indicator */}
        {isOnline && (
          <div className="absolute bottom-1.5 right-1.5 size-4 bg-[#22C55E] border-[2.5px] border-white dark:border-slate-800 rounded-full flex items-center justify-center">
            <div className="size-1 bg-white rounded-full opacity-40" />
          </div>
        )}
      </div>

      {/* Name and Role */}
      <div className="space-y-1 mb-6">
        <h3 className="font-serif text-[20px] font-bold text-slate-900 dark:text-white leading-snug">
          {nome}
        </h3>
        <p className="font-sans text-[13px] text-slate-500 dark:text-slate-400 leading-none">
          {role}
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#F0F0ED] dark:bg-slate-700/50 mb-6" />

      {/* Stats Row */}
      <div className="flex w-full justify-between items-center mb-7">
        <div className="flex-1 flex flex-col items-center">
          <span className="font-serif text-[18px] font-bold text-slate-900 dark:text-white leading-none mb-1.5">{processos}</span>
          <span className="font-sans text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">PROCESSOS</span>
        </div>
        <div className="w-px h-8 bg-[#F0F0ED] dark:bg-slate-700/50" />
        <div className="flex-1 flex flex-col items-center px-2">
          <span className="font-serif text-[18px] font-bold text-slate-900 dark:text-white leading-none mb-1.5">{aprovacao}</span>
          <span className="font-sans text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">APROVAÇÃO</span>
        </div>
        <div className="w-px h-8 bg-[#F0F0ED] dark:bg-slate-700/50" />
        <div className="flex-1 flex flex-col items-center">
          <span className="font-serif text-[18px] font-bold text-slate-900 dark:text-white leading-none mb-1.5">{avaliacao}</span>
          <span className="font-sans text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">AVALIAÇÃO</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3">
        <button 
          onClick={openChat}
          className="w-full bg-[#2F5BE7] text-white py-3.5 rounded-xl font-sans text-[14px] font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-[#2F5BE7]/20 hover:brightness-110 active:scale-[0.98] transition-all"
        >
          <MessageCircle size={18} fill="currentColor" className="opacity-90" />
          Iniciar Chat
        </button>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full py-2 font-sans text-[12px] uppercase font-bold text-slate-400 dark:text-slate-500 hover:text-[#2F5BE7] dark:hover:text-[#5c84ff] transition-colors tracking-widest text-center"
        >
          Ver Perfil Completo
        </button>
      </div>
    </div>
    
    <ConsultantProfileModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
    />
    </>
  );
}
