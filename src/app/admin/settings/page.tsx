import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  ProfileSettings,
  SecuritySettings,
  NotificationSettings,
  AppPreferences,
} from '@/components/admin/settings/SettingsSections';

export const metadata: Metadata = {
  title: 'Definições – Admin MUVISA',
  description: 'Gira as tuas preferências de conta e configurações do sistema.',
};

function SettingsContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Definições</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Gira as tuas preferências de conta e configurações do sistema.
        </p>
      </div>

      {/* Sections */}
      <ProfileSettings />
      <SecuritySettings />
      <NotificationSettings />
      <AppPreferences />

      {/* Bottom actions */}
      <div className="flex items-center justify-end gap-4 pb-12 pt-4">
        <button className="px-6 py-2.5 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          Cancelar
        </button>
        <button className="px-8 py-2.5 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
          Guardar Alterações
        </button>
      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <SettingsContent />
    </AdminLayout>
  );
}
