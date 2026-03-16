interface StatCardProps {
  label: string;
  value: string;
  valueClass?: string;
}

function StatCard({ label, value, valueClass = 'text-slate-900 dark:text-slate-100' }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`text-3xl font-bold mt-2 ${valueClass}`}>{value}</p>
    </div>
  );
}

export default function UniversitiesStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Total Universities"  value="120" />
      <StatCard label="Active Universities" value="112" />
      <StatCard label="Open Applications"  value="45"  />
      <StatCard label="Upcoming Deadlines" value="8"   valueClass="text-primary" />
    </div>
  );
}
