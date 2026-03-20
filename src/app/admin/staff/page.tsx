import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import StaffClient from './StaffClient';

export const metadata: Metadata = {
  title: 'Funcionários – Admin MUVISA',
  description: 'Gira os funcionários internos, funções e permissões de acesso para o portal MUVISA.',
};

export default function AdminStaffPage() {
  return (
    <AdminLayout>
      <StaffClient />
    </AdminLayout>
  );
}
