import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProcessConfigClient from '@/components/admin/processo/ProcessConfigClient';

export default function ProcessConfigPage() {
  return (
    <AdminLayout>
      <ProcessConfigClient />
    </AdminLayout>
  );
}
