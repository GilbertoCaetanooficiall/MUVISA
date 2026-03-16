import { FileText, ClipboardList, ShieldCheck, XCircle } from 'lucide-react';

interface StatCardProps {
  icon: React.ElementType;
  iconClass: string;
  label: string;
  value: string;
}

function StatCard({ icon: Icon, iconClass, label, value }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${iconClass}`}>
          <Icon size={24} />
        </div>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
      <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}

export default function VisaStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard icon={FileText}      iconClass="bg-primary/10 text-primary"                                label="Total Visa Applications" value="842" />
      <StatCard icon={ClipboardList} iconClass="bg-blue-500/10 text-blue-500"                           label="In Review"               value="156" />
      <StatCard icon={ShieldCheck}   iconClass="bg-accent-success/10 text-accent-success"                 label="Approved Visas"          value="642" />
      <StatCard icon={XCircle}       iconClass="bg-accent-warning/10 text-accent-warning"                 label="Rejected Visas"          value="44"  />
    </div>
  );
}
