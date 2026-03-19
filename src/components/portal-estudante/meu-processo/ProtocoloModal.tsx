'use client';

import React, { useEffect, useCallback } from 'react';
import { X, Printer, Download, ShieldCheck, FileCheck, GraduationCap, Fingerprint, Wallet, ScrollText } from 'lucide-react';
import Image from 'next/image';

interface ProtocoloModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const documents = [
  {
    icon: FileCheck,
    title: 'Acceptance Letter (Carta de Aceite)',
    description: 'Documento oficial da Universidade de Aveiro',
    status: 'VALIDADO',
  },
  {
    icon: ScrollText,
    title: 'Proof of Enrollment (Comprovativo de Matrícula)',
    description: 'Pagamento de propinas confirmado',
    status: 'APROVADO',
  },
  {
    icon: GraduationCap,
    title: 'Academic Transcripts (Histórico Escolar)',
    description: 'Apostilamento de Haia verificado',
    status: 'VALIDADO',
  },
  {
    icon: Fingerprint,
    title: 'NIF (Número de Identificação Fiscal)',
    description: 'Documento de representação fiscal em Portugal',
    status: 'APROVADO',
  },
  {
    icon: Wallet,
    title: 'Financial Proof (Meios de Subsistência)',
    description: 'Saldo mínimo exigido para 12 meses',
    status: 'VALIDADO',
  },
];

export default function ProtocoloModal({ isOpen, onClose }: ProtocoloModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl bg-slate-900 rounded-xl shadow-2xl border border-slate-800 flex flex-col max-h-[90vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 shrink-0">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="text-primary w-5 h-5" />
              Protocolo de Submissão — Visto D4
            </h2>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20 uppercase tracking-wider">
                Verified
              </span>
              <span className="text-[10px] text-slate-500 uppercase font-medium">Portugal Student Visa Portal</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-200 transition-colors p-1.5 rounded-full hover:bg-slate-800"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Application ID */}
          <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck className="w-16 h-16" />
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Application ID</p>
                <p className="text-2xl font-mono font-extrabold text-white tracking-tight">MU-D4-2024-8572</p>
                <p className="text-xs text-slate-500 mt-1">Gerado em: 24/10/2023 • Válido para candidatura 2024/25</p>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/50 px-3 py-2 rounded-lg border border-slate-800 shadow-inner">
                <ShieldCheck className="text-primary w-5 h-5" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-300 uppercase">Status</span>
                  <span className="text-xs font-semibold text-green-400">Verificado MUVISA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Student & Destination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Dados do Estudante
              </h3>
              <div className="space-y-3">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] uppercase font-semibold">Nome Completo</span>
                  <span className="font-medium text-white">Maria Silva dos Santos</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] uppercase font-semibold">Número do Passaporte</span>
                  <span className="font-medium text-white tracking-widest">FR123456</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Destino em Portugal
              </h3>
              <div className="space-y-3">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] uppercase font-semibold">Instituição de Ensino</span>
                  <span className="font-medium text-white">Universidade de Aveiro</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] uppercase font-semibold">Curso &amp; Cidade</span>
                  <span className="font-medium text-white">Mestrado em Design Digital — Aveiro</span>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Documentação Acadêmica Obrigatória
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {documents.map((doc) => {
                const Icon = doc.icon;
                return (
                  <div
                    key={doc.title}
                    className="group flex items-center justify-between p-3.5 rounded-lg border border-slate-800 bg-slate-800/30 hover:bg-slate-800/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-slate-900 border border-slate-700 text-primary flex items-center justify-center shrink-0">
                        <Icon className="w-[22px] h-[22px]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{doc.title}</p>
                        <p className="text-[10px] text-slate-500">{doc.description}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded shrink-0 ml-2">
                      {doc.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* University Preview */}
          <div className="rounded-xl overflow-hidden h-24 relative border border-slate-800 grayscale-[0.5] opacity-40">
            <Image
              alt="Universidade de Aveiro"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida/ADBb0uhir49wdZrGHY4D_69yKpBEw6z0850DlvIDtQwXeW47Y2mHoUMc_zSm9DhdAouEM1Ao4Sg4l_-84Tb1UQCUt7SIRs2fMhELoL9IOU7N8UADWyrEVtVyx9JECuxhIs_w9houeIQ1lN8Dw1li3c6olYA6arOiquW5nUPJluFmHs04J7sOP5Li9U1EAnbinTRwFzTwU7okvp1FibhpmlZudU1pxm42cR1fij6uaWXSkwGEei4v5wfzaTxAnZBxdilg51YZg-a3leat-w0"
              width={700}
              height={96}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-slate-800 bg-slate-900/80 backdrop-blur-sm flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 text-slate-300 font-bold text-sm hover:bg-slate-800 hover:text-white transition-all order-2 sm:order-1">
            <Printer className="w-5 h-5" />
            Imprimir
          </button>
          <button className="w-full sm:flex-1 max-w-xs flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/20 order-1 sm:order-2">
            <Download className="w-5 h-5" />
            Baixar Protocolo PDF
          </button>
        </div>
      </div>
    </div>
  );
}
