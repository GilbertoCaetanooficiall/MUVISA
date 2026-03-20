import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import PlansClient from './PlansClient';

export const metadata: Metadata = {
  title: 'Planos e Pacotes – Admin MUVISA',
  description: 'Gira os planos de serviço e benefícios oferecidos aos estudantes.',
};

export default function AdminPlansPage() {
  return (
    <AdminLayout>
      <PlansClient />
    </AdminLayout>
  );
}
