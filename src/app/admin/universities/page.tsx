import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import UniversitiesClient from './UniversitiesClient';

export const metadata: Metadata = {
  title: 'Universidades – Admin MUVISA',
  description: 'Gira todas as universidades em Portugal disponíveis para candidaturas de estudantes.',
};

export default function AdminUniversitiesPage() {
  return (
    <AdminLayout>
      <UniversitiesClient />
    </AdminLayout>
  );
}
