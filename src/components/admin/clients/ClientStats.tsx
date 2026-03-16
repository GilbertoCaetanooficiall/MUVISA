interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  trend: string;
  iconColor: 'primary' | 'emerald' | 'orange';
  trendColor: 'emerald' | 'orange';
}

const iconColorMap: Record<StatCardProps['iconColor'], string> = {
  primary: 'bg-primary/10 text-primary',
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500',
  orange:  'bg-orange-500/10 text-orange-600 dark:text-orange-500',
};

const trendColorMap: Record<StatCardProps['trendColor'], string> = {
  emerald: 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10',
  orange:  'text-orange-700 dark:text-orange-400 bg-orange-500/10',
};

function StatCard({ icon, label, value, trend, iconColor, trendColor }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 p-6 rounded-xl hover:border-primary/50 transition-all shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${iconColorMap[iconColor]}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded ${trendColorMap[trendColor]}`}>
          {trend}
        </span>
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</h3>
    </div>
  );
}

export default function ClientStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard icon="person"          label="Total Clients"       value="1,284" trend="+12%" iconColor="primary" trendColor="emerald" />
      <StatCard icon="pending_actions" label="Active Applications" value="456"   trend="+5%"  iconColor="primary" trendColor="emerald" />
      <StatCard icon="verified"        label="Visa Approved"       value="892"   trend="+18%" iconColor="emerald" trendColor="emerald" />
      <StatCard icon="folder_open"     label="Pending Documents"   value="124"   trend="-2%"  iconColor="orange"  trendColor="orange"  />
    </div>
  );
}
