import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import MessagesClient from './MessagesClient';

export const metadata: Metadata = {
  title: 'Mensagens e Tickets – Admin MUVISA',
  description: 'Comunique com estudantes, acompanhe pedidos e feche tickets de apoio.',
};

export default function AdminMessagesPage() {
  return (
    <AdminLayout>
      <MessagesClient />
    </AdminLayout>
  );
}
