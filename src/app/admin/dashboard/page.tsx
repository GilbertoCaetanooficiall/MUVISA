'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { Users, ClipboardList, ShieldCheck, FolderOpen, Landmark, FileText, CheckCircle, XCircle } from 'lucide-react';

// ─── Stat Card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

function StatCard({ icon: Icon, label, value, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md cursor-default">
      <div className="flex items-center justify-between mb-4">
        <span className="p-2 bg-primary/10 rounded-lg text-primary">
          <Icon size={20} />
        </span>
        <span
          className={`text-xs font-bold ${
            trendUp ? 'text-accent-success' : 'text-accent-warning'
          }`}
        >
          {trend}
        </span>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

// ─── Recent Client Row ────────────────────────────────────────────────────────

interface ClientRowProps {
  initials: string;
  name: string;
  detail: string;
  status: 'Ativo' | 'Pendente' | 'Revisão';
  id: string;
}

const statusStyles: Record<ClientRowProps['status'], string> = {
  Ativo: 'bg-accent-success/10 text-accent-success',
  Pendente: 'bg-primary/10 text-primary',
  Revisão: 'bg-accent-warning/10 text-accent-warning',
};

function ClientRow({ initials, name, detail, status, id }: ClientRowProps) {
  return (
    <Link href={`/admin/clients?id=${id}`} passHref>
      <div className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{name}</p>
          <p className="text-xs text-slate-500 truncate">{detail}</p>
        </div>
        <span
          className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase flex-shrink-0 ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>
    </Link>
  );
}

// ─── Pending Document Row ─────────────────────────────────────────────────────

interface DocumentRowProps {
  id: string;
  icon: React.ElementType;
  title: string;
  uploadedBy: string;
  onAction: (id: string, action: 'approve' | 'reject') => void;
  status: 'pending' | 'approved' | 'rejected';
}

function DocumentRow({ id, icon: Icon, title, uploadedBy, onAction, status }: DocumentRowProps) {
  if (status === 'approved') {
    return (
      <div className="flex items-start gap-3 p-2 -mx-2 rounded-lg bg-green-50/50 dark:bg-green-900/10">
        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 flex-shrink-0">
          <CheckCircle size={16} />
        </div>
        <div className="flex-1 min-w-0 flex items-center h-8">
          <p className="text-sm font-semibold text-green-700 dark:text-green-400">Aprovado: {title}</p>
        </div>
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="flex items-start gap-3 p-2 -mx-2 rounded-lg bg-red-50/50 dark:bg-red-900/10">
        <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 flex-shrink-0">
          <XCircle size={16} />
        </div>
        <div className="flex-1 min-w-0 flex items-center h-8">
          <p className="text-sm font-semibold text-red-700 dark:text-red-400">Rejeitado: {title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 flex-shrink-0 transition-colors">
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{title}</p>
        <p className="text-xs text-slate-500 truncate">Enviado por {uploadedBy}</p>
        <div className="mt-2 flex gap-2">
          <button 
            onClick={() => onAction(id, 'approve')}
            className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded hover:bg-primary-hover transition-colors shadow-sm"
          >
            Aprovar
          </button>
          <button 
            onClick={() => onAction(id, 'reject')}
            className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            Rejeitar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Deadline Row ─────────────────────────────────────────────────────────────

interface DeadlineRowProps {
  title: string;
  detail: string;
  urgency: 'warning' | 'primary' | 'neutral';
}

const deadlineBorder: Record<DeadlineRowProps['urgency'], string> = {
  warning: 'border-accent-warning',
  primary: 'border-primary',
  neutral: 'border-slate-300 dark:border-slate-700',
};

function DeadlineRow({ title, detail, urgency }: DeadlineRowProps) {
  return (
    <div className={`border-l-4 pl-4 py-1 hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-r-lg transition-colors cursor-pointer ${deadlineBorder[urgency]}`}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs text-slate-500">{detail}</p>
    </div>
  );
}

// ─── Dashboard Content ────────────────────────────────────────────────────────

function DashboardContent() {
  const [docStatuses, setDocStatuses] = useState<Record<string, 'pending' | 'approved' | 'rejected'>>({
    'doc1': 'pending',
    'doc2': 'pending'
  });

  const handleDocAction = (id: string, action: 'approve' | 'reject') => {
    setDocStatuses(prev => ({
      ...prev,
      [id]: action === 'approve' ? 'approved' : 'rejected'
    }));
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Visão Geral do Painel
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Bem-vindo de volta. Aqui está o que está a acontecer hoje.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard icon={Users}           label="Total de Clientes"   value="1.284" trend="+12%" trendUp />
        <StatCard icon={ClipboardList}   label="Em Processamento"     value="156"   trend="+5%"  trendUp />
        <StatCard icon={ShieldCheck}     label="Vistos Aprovados"  value="892"   trend="-2%"  trendUp={false} />
        <StatCard icon={FolderOpen}      label="Docs Pendentes"    value="43"    trend="+8%"  trendUp />
        <StatCard icon={Landmark}        label="Universidades"    value="120"   trend="+3%"  trendUp />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

        {/* Line Chart – Students to Portugal */}
        <div className="bg-white dark:bg-slate-900/40 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold">Estudantes para Portugal</h3>
              <p className="text-sm text-slate-500">Tendência mensal nos últimos 6 meses</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">450</p>
              <p className="text-sm text-accent-success font-semibold">+15% vs AP</p>
            </div>
          </div>
          <div className="h-48 relative w-full group cursor-crosshair">
            <svg
              className="w-full h-full"
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1656df" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path
                className="transition-opacity duration-300 group-hover:opacity-30"
                d="M0 130 C 50 120, 100 80, 150 90 S 250 40, 300 60 S 400 20, 500 10 V 150 H 0 Z"
                fill="url(#lineGradient)"
                opacity="0.15"
              />
              <path
                className="transition-all duration-300 drop-shadow-sm group-hover:drop-shadow-md"
                d="M0 130 C 50 120, 100 80, 150 90 S 250 40, 300 60 S 400 20, 500 10"
                stroke="#1656df"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex justify-between mt-3">
            {['JAN','FEV','MAR','ABR','MAI','JUN'].map((m) => (
              <span key={m} className="text-xs text-slate-500 font-bold hover:text-primary transition-colors cursor-pointer">{m}</span>
            ))}
          </div>
        </div>

        {/* Bar Chart – University Distribution */}
        <div className="bg-white dark:bg-slate-900/40 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold">Distribuição por Universidades</h3>
              <p className="text-sm text-slate-500">Principais destinos por candidaturas</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">1.284</p>
              <p className="text-sm text-slate-500">Total de Candidaturas</p>
            </div>
          </div>
          <div className="h-48 flex items-end justify-between gap-4 px-2">
            {[
              { label: 'U. Porto',   height: '100%', value: '450' },
              { label: 'U. Lisboa',  height: '80%', value: '380'  },
              { label: 'U. Coimbra', height: '90%', value: '410'  },
              { label: 'U. Minho',   height: '35%', value: '150'  },
              { label: 'NOVA',       height: '45%', value: '200'  },
            ].map(({ label, height, value }) => (
              <div key={label} className="group relative flex-1 flex flex-col items-center cursor-pointer">
                <div
                  className="w-full bg-primary/20 group-hover:bg-primary/50 transition-colors rounded-t-lg relative"
                  style={{ height }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    {value} cand.
                  </div>
                </div>
                <span className="text-[10px] font-bold mt-2 text-slate-500 text-center group-hover:text-primary transition-colors">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Recent Clients */}
        <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold">Clientes Recentes</h3>
            <Link href="/admin/clients">
              <button className="text-primary text-sm font-semibold hover:underline">
                Ver Todos
              </button>
            </Link>
          </div>
          <div className="p-4 space-y-2 flex-1 relative">
            <ClientRow id="c1" initials="AS" name="Anna Smith"      detail="Visto de Estudante – Portugal" status="Ativo"  />
            <ClientRow id="c2" initials="DM" name="David Miller"    detail="Visto de Trabalho – Lisboa"       status="Pendente" />
            <ClientRow id="c3" initials="ER" name="Elena Rodriguez" detail="Golden Visa – Algarve"    status="Revisão"  />
          </div>
        </div>

        {/* Pending Documents */}
        <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold">Documentos Pendentes</h3>
            <Link href="/admin/documents">
              <button className="text-primary text-sm font-semibold hover:underline">
                Revisar Todos
              </button>
            </Link>
          </div>
          <div className="p-4 space-y-4 flex-1">
            <DocumentRow 
              id="doc1"
              icon={FileText} 
              title="Registo Criminal (FBI)"       
              uploadedBy="John Doe" 
              status={docStatuses['doc1']}
              onAction={handleDocAction}
            />
            <DocumentRow 
              id="doc2"
              icon={FileText} 
              title="Extratos Bancários (3 meses)" 
              uploadedBy="Maria Garcia" 
              status={docStatuses['doc2']}
              onAction={handleDocAction}
            />
            
            {docStatuses['doc1'] !== 'pending' && docStatuses['doc2'] !== 'pending' && (
              <div className="text-center text-sm text-slate-500 font-medium pt-4 pb-2">
                Todos os documentos revistos! 🎉
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold">Próximos Prazos</h3>
            <span className="text-xs font-bold px-2 py-1 bg-accent-warning/20 text-accent-warning rounded-lg">
              Prioridade Alta
            </span>
          </div>
          <div className="p-4 space-y-4 flex-1">
            <DeadlineRow
              urgency="warning"
              title="Agendamento de Visto – James Wilson"
              detail="Amanhã às 10:00 – VFS Global"
            />
            <DeadlineRow
              urgency="primary"
              title="Envio de Documentos – Univ. do Porto"
              detail="24 Out, 2023 – 2 dias restantes"
            />
            <DeadlineRow
              urgency="neutral"
              title="Prazo de Pagamento Propinas – NOVA"
              detail="28 Out, 2023 – 6 dias restantes"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <DashboardContent />
    </AdminLayout>
  );
}
