import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import ReportsClient from './ReportsClient';

export const metadata: Metadata = {
  title: 'Relatórios e Análises – Admin MUVISA',
  description: 'Monitorize KPIs, tendências de estudantes e crescimento do negócio.',
};

export default function AdminReportsPage() {
  return (
    <AdminLayout>
      <ReportsClient />
    </AdminLayout>
  );
}
