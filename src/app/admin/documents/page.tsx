import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import DocumentsClient from './DocumentsClient';

export const metadata: Metadata = {
  title: 'Documentos – Admin MUVISA',
  description: 'Gira e reveja todos os documentos dos estudantes necessários para candidaturas universitárias e processos de visto.',
};

export default function AdminDocumentsPage() {
  return (
    <AdminLayout>
      <DocumentsClient />
    </AdminLayout>
  );
}
