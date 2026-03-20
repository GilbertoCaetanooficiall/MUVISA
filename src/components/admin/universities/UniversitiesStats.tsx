import type { University } from '@/app/admin/universities/UniversitiesClient';

interface StatCardProps {
  label: string;
  value: string | number;
  valueClass?: string;
}

function StatCard({ label, value, valueClass = 'text-slate-900 dark:text-slate-100' }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`font-serif text-3xl font-bold mt-2 ${valueClass}`}>{value}</p>
    </div>
  );
}

export default function UniversitiesStats({ universities }: { universities: University[] }) {
  const totalUniversities = universities.length;
  // Let's assume all are active in this mock, or we can consider "Fechadas" inactive
  const activeUniversities = totalUniversities; 
  const candidaturasAbertas = universities.filter(u => u.status === 'Candidaturas Abertas').length;
  const prazosProximos = universities.filter(u => u.status === 'A terminar').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Total de Universidades" value={totalUniversities} />
      <StatCard label="Universidades Ativas" value={activeUniversities} />
      <StatCard label="Candidaturas Abertas" value={candidaturasAbertas} />
      <StatCard label="Prazos Próximos" value={prazosProximos} valueClass="text-primary" />
    </div>
  );
}
