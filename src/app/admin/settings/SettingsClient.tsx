'use client';

import { useState, useCallback } from 'react';
import {
  SecuritySettings,
  NotificationSettings,
} from '@/components/admin/settings/SettingsSections';

export default function SettingsClient() {
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: true
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    appUpdates: true,
    messageAlerts: true
  });

  // Handlers
  const handleSecurityChange = useCallback((key: string, value: string | boolean) => setSecurity(s => ({ ...s, [key]: value })), []);
  const handleNotificationChange = useCallback((key: string, value: boolean) => setNotifications(n => ({ ...n, [key]: value })), []);

  const handleSave = () => {
    // Basic validation example
    if (security.newPassword && security.newPassword !== security.confirmPassword) {
      alert('A nova palavra-passe e a confirmação não coincidem!');
      return;
    }

    // In a real app we would POST this to an API
    console.log('Saved Security:', security);
    console.log('Saved Notifications:', notifications);

    alert('Alterações guardadas com sucesso no sistema!');
  };

  const handleCancel = () => {
    if (confirm('Tem a certeza que quer descartar as alterações não guardadas?')) {
      // In a real app, typically re-fetch from backend or reset to initial props
      alert('As alterações foram revertidas.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-3xl font-black text-slate-900 dark:text-white tracking-tight">Definições</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Gira as tuas preferências de conta e configurações do sistema.
        </p>
      </div>

      {/* Sections */}
      <SecuritySettings security={security} onChange={handleSecurityChange} />
      
      <NotificationSettings notifications={notifications} onChange={handleNotificationChange} />

      {/* Bottom actions */}
      <div className="flex items-center justify-end gap-4 pb-12 pt-4">
        <button 
          onClick={handleCancel}
          className="px-6 py-2.5 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          Cancelar
        </button>
        <button 
          onClick={handleSave}
          className="px-8 py-2.5 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
        >
          Guardar Alterações
        </button>
      </div>
    </div>
  );
}
