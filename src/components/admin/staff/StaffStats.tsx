// ─── Types ────────────────────────────────────────────────────────────────────

interface StatCard {
  label: string;
  value: string;
  accentClass?: string; // optional left-border accent colour
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats: StatCard[] = [
  { label: 'Total Employees', value: '124' },
  { label: 'Active Now',      value: '42',  accentClass: 'border-l-4 border-l-green-500' },
  { label: 'Admin Roles',     value: '12',  accentClass: 'border-l-4 border-l-primary' },
  { label: 'New Requests',    value: '8',   accentClass: 'border-l-4 border-l-yellow-500' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function StaffStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 p-6 rounded-xl space-y-2 ${s.accentClass ?? ''}`}
        >
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{s.label}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
