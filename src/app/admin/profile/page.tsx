'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Edit3, 
  MapPin, 
  Shield, 
  Camera, 
  User, 
  Mail, 
  Calendar,
  X,
  Save,
  Check
} from 'lucide-react';
import { ProfileSettings } from '@/components/admin/settings/SettingsSections';

export default function AdminProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Ricardo',
    lastName: 'Silva',
    email: 'admin@muvisa.com',
    phone: '+244 923 000 000',
    role: 'Administrador Master'
  });

  const handleProfileChange = (key: string, value: string) => {
    setProfile(p => ({ ...p, [key]: value }));
  };

  const handleSave = () => {
    // In a real app we would save to API here
    setIsEditing(false);
    alert('Perfil atualizado com sucesso!');
  };

  const admin = {
    name: `${profile.firstName} ${profile.lastName}`,
    avatar: profile.firstName[0] + (profile.lastName[0] || ''),
    role: profile.role,
    location: 'Luanda, Angola',
    email: profile.email,
    since: 'Março de 2024',
    accessLevel: 'Total (Nível 5)',
    metrics: [
      { label: 'Processos Geridos', value: '1,240' },
      { label: 'Taxa de Aprovação', value: '98.5%' },
      { label: 'Tempo Médio Resposta', value: '45m' }
    ],
    activities: [
      { action: 'Aprovou Documento', context: 'Maria Silva', time: 'Há 10 minutos' },
      { action: 'Criou Novo Staff', context: 'Eurio Joaquim', time: 'Há 2 horas' },
      { action: 'Alterou Configuração', context: 'Geral', time: 'Há 5 horas' },
      { action: 'Finalizou Processo', context: 'João Manuel', time: 'Há 1 dia' }
    ]
  };

  return (
    <AdminLayout>
      <div className="max-w-[960px] mx-auto flex flex-col gap-5 p-10 font-sans animate-page-enter">
        
        {/* HERO CARD */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden relative shadow-sm">
          {/* Banner with Grid Effect */}
          <div className="h-[100px] bg-[#2F5BE7] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(255,255,255,0.08)_0%,transparent_70%),radial-gradient(ellipse_30%_60%_at_20%_20%,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:32px_32px]" />
            
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 z-10 bg-white/15 border border-white/25 text-white text-[13px] font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-md hover:bg-white/22 transition-colors"
              >
                <Edit3 size={14} /> Editar Perfil
              </button>
            )}
          </div>

          <div className="px-7 pb-7">
            {/* Avatar Wrap */}
            <div className="relative w-20 h-20 -mt-10 mb-3.5">
              <div className="w-20 h-20 rounded-[20px] bg-[#2F5BE7] border-[3px] border-white dark:border-slate-800 flex items-center justify-center font-serif text-[26px] text-white tracking-widest shadow-[0_4px_16px_rgba(47,91,231,0.25)]">
                {admin.avatar}
              </div>
              <div className="absolute -bottom-1 -right-1 w-[26px] h-[26px] border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center cursor-pointer shadow-sm">
                <Camera size={12} className="text-slate-500 dark:text-slate-400" />
              </div>
            </div>

            <h1 className="font-serif text-[22px] font-semibold text-slate-900 dark:text-white mb-1.5">{admin.name}</h1>
            
            <div className="flex items-center gap-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-[#EEF2FF] dark:bg-[#EEF2FF]/10 text-[#2F5BE7] dark:text-[#5c84ff] text-[12px] font-medium px-2.5 py-1 rounded-full border border-[#2F5BE7]/10 dark:border-[#2F5BE7]/20">
                <Shield size={12} /> {admin.role}
              </span>
              <span className="flex items-center gap-1.5 text-[13px] text-slate-500 dark:text-slate-400 font-normal leading-none">
                <MapPin size={14} className="text-slate-300 dark:text-slate-500" /> {admin.location}
              </span>
            </div>
          </div>
        </div>

        {/* METRICS ROW (Always visible) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {admin.metrics.map((m, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 md:px-[22px] md:py-[20px] shadow-sm group hover:border-primary/40 transition-colors">
              <div className="text-[10px] font-semibold tracking-[0.08em] text-slate-400 dark:text-slate-500 uppercase mb-2">{m.label}</div>
              <div className="font-serif text-[32px] text-slate-900 dark:text-white leading-none">{m.value}</div>
            </div>
          ))}
        </div>

        {/* BOTTOM GRID */}
        <div className={`grid grid-cols-1 ${isEditing ? 'lg:grid-cols-1' : 'lg:grid-cols-[1fr_340px]'} gap-5 transition-all duration-300`}>
          
          {/* INFO CARD OR EDIT CARD */}
          <div className="space-y-5">
            {isEditing ? (
              <div className="animate-scale-in">
                <ProfileSettings profile={profile} onChange={handleProfileChange} />
                <div className="mt-4 flex items-center justify-end gap-3 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <X size={16} /> Cancelar
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
                  >
                    <Check size={16} /> Guardar Perfil
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 md:px-7 md:py-6 shadow-sm h-full">
                <div className="text-[14px] font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                  <User size={16} className="text-slate-500 dark:text-slate-400" /> Informações Detalhadas
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-semibold tracking-[0.08em] text-slate-400 dark:text-slate-500 uppercase">E-mail Profissional</span>
                    <span className="text-[14px] text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Mail size={14} className="text-slate-300 dark:text-slate-600" /> {admin.email}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-semibold tracking-[0.08em] text-slate-400 dark:text-slate-500 uppercase">Membro Desde</span>
                    <span className="text-[14px] text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Calendar size={14} className="text-slate-300 dark:text-slate-600" /> {admin.since}
                    </span>
                  </div>
                  
                  <div className="col-span-full h-px bg-slate-100 dark:bg-slate-700 my-1" />
                  
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-semibold tracking-[0.08em] text-slate-400 dark:text-slate-500 uppercase">Acesso ao Painel</span>
                    <span className="inline-flex items-center gap-1.5 bg-[#E8F5EE] dark:bg-[#1A8C4E]/10 text-[#1A8C4E] text-[12px] font-semibold px-3 py-1 rounded-full mr-auto border border-[#1A8C4E]/10">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#1A8C4E]" /> {admin.accessLevel}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ACTIVITY CARD (Hidden when editing to focus on the form) */}
          {!isEditing && (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pt-6 px-6 pb-0 flex flex-col shadow-sm mt-auto">
              <div className="text-[14px] font-semibold text-slate-900 dark:text-white mb-5 uppercase tracking-wide">Atividade Recente</div>
              
              <div className="flex flex-col flex-1 divide-y divide-slate-100 dark:divide-slate-700">
                {admin.activities.map((a, i) => (
                  <div key={i} className="flex gap-3 py-3 w-full">
                    <div className="w-2 h-2 rounded-full bg-[#2F5BE7] shrink-0 mt-1.5" />
                    <div className="flex-1 space-y-0.5">
                      <p className="text-[13px] font-medium text-slate-900 dark:text-white leading-tight">{a.action}</p>
                      <p className="text-[12px] text-slate-500 dark:text-slate-400">em <span className="text-[#2F5BE7] dark:text-[#5c84ff] font-medium">{a.context}</span></p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 pt-0.5 uppercase tracking-tighter">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full py-3.5 mt-auto border-t border-slate-100 dark:border-slate-700 text-[13px] font-medium text-slate-500 dark:text-slate-400 hover:text-[#2F5BE7] dark:hover:text-[#5c84ff] transition-colors bg-white dark:bg-slate-800 rounded-b-2xl">
                Ver Log Completo →
              </button>
            </div>
          )}

        </div>
      </div>
    </AdminLayout>
  );
}
