import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import ApplicationsClient from './ApplicationsClient';

export const metadata: Metadata = {
  title: 'Candidaturas – Admin MUVISA',
  description: 'Gira todas as candidaturas universitárias submetidas pelos estudantes.',
};

export default function AdminApplicationsPage() {
  return (
    <AdminLayout>
      <ApplicationsClient />
    </AdminLayout>
  );
}
