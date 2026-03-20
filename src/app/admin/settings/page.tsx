import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import SettingsClient from './SettingsClient';

export const metadata: Metadata = {
  title: 'Definições – Admin MUVISA',
  description: 'Gira as tuas preferências de conta e configurações do sistema.',
};

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <SettingsClient />
    </AdminLayout>
  );
}
