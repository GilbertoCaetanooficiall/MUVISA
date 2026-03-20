import { FolderOpen, ClipboardList, CheckCircle2, XCircle } from 'lucide-react';
import type { Document } from '@/app/admin/documents/DocumentsClient';

interface StatCardProps {
  icon: React.ElementType;
  iconClass: string;
  label: string;
  value: string | number;
  badge: string;
  badgeClass: string;
}

function StatCard({ icon: Icon, iconClass, label, value, badge, badgeClass }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconClass}`}>
          <Icon size={24} />
        </div>
        {badge && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}>
            {badge}
          </span>
        )}
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
    </div>
  );
}

export default function DocumentsStats({ documents }: { documents: Document[] }) {
  const countTotal = documents.length;
  const countPendente = documents.filter(d => d.status === 'Pendente de Revisão').length;
  const countAprovado = documents.filter(d => d.status === 'Aprovado').length;
  const countRejeitado = documents.filter(d => d.status === 'Rejeitado').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={FolderOpen}
        iconClass="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
        label="Total de Documentos"
        value={countTotal}
        badge=""
        badgeClass="text-green-600 bg-green-100 dark:bg-green-900/30"
      />
      <StatCard
        icon={ClipboardList}
        iconClass="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
        label="Pendentes de Revisão"
        value={countPendente}
        badge={countPendente > 0 ? 'Ativo' : ''}
        badgeClass="text-amber-600 bg-amber-100 dark:bg-amber-900/30"
      />
      <StatCard
        icon={CheckCircle2}
        iconClass="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
        label="Documentos Aprovados"
        value={countAprovado}
        badge={countTotal > 0 ? `${Math.round((countAprovado / countTotal) * 100)}%` : '0%'}
        badgeClass="text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30"
      />
      <StatCard
        icon={XCircle}
        iconClass="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
        label="Documentos Rejeitados"
        value={countRejeitado}
        badge={countRejeitado > 0 ? 'Ação' : ''}
        badgeClass="text-rose-600 bg-rose-100 dark:bg-rose-900/30"
      />
    </div>
  );
}
