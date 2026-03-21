'use client';

import React, { useState, useEffect } from 'react';
import type { StaffMember } from '@/app/admin/staff/StaffClient';

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatCard {
  label: string;
  value: string | number;
  accentClass?: string; // optional left-border accent colour
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function StaffStats({ staff }: { staff: StaffMember[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = staff.length;
  const ativos = staff.filter(s => s.status === 'Ativo').length;
  const adminRoles = staff.filter(s => s.role.includes('Administrador')).length;
  
  // Use a fixed value for SSR and a random one after mounting on client
  const novosPedidos = mounted ? Math.floor(Math.random() * 5) + 2 : 3; 

  const stats: StatCard[] = [
    { label: 'Total de Funcionários', value: total },
    { label: 'Ativos Agora',      value: ativos,  accentClass: 'border-l-4 border-l-green-500' },
    { label: 'Cargos Admin',     value: adminRoles,  accentClass: 'border-l-4 border-l-primary' },
    { label: 'Novos Pedidos',    value: novosPedidos,   accentClass: 'border-l-4 border-l-yellow-500' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 p-6 rounded-xl space-y-2 ${s.accentClass ?? ''}`}
        >
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{s.label}</p>
          <p className="font-serif text-3xl font-bold text-slate-900 dark:text-white">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
