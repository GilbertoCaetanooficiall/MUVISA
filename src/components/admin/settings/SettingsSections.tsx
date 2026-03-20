import { User, Shield, Mail, Smartphone, RefreshCw, MessageCircle, Bell, Layout, ChevronDown, Sun, Moon, Camera } from 'lucide-react';

// ─── Shared input class ────────────────────────────────────────────────────────
const inputCls =
  'w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-slate-900 dark:text-white transition';

// ─── Shared label class ────────────────────────────────────────────────────────
const labelCls = 'text-sm font-semibold text-slate-700 dark:text-slate-300';

// ─── Section wrapper ──────────────────────────────────────────────────────────
export function Section({
  icon: Icon, title, children,
}: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
        <Icon className="text-primary" size={20} />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

// ─── Toggle component ──────────────────────────────────────────────────────────
export function Toggle({ checked = false, onChange }: { checked?: boolean; onChange?: (checked: boolean) => void }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        checked={checked} 
        onChange={(e) => onChange?.(e.target.checked)} 
        className="sr-only peer" 
        type="checkbox" 
      />
      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
    </label>
  );
}

// ─── Profile section ──────────────────────────────────────────────────────────
export function ProfileSettings({ profile, onChange }: { profile: Record<string, string>; onChange: (key: string, value: string) => void }) {
  return (
    <Section icon={User} title="Informações do Perfil">
      {/* Avatar */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <div className="relative group flex-shrink-0">
          <div className="size-24 rounded-full bg-primary/20 border-4 border-slate-100 dark:border-slate-700 flex items-center justify-center text-primary text-2xl font-black">
            {profile.firstName[0]}{profile.lastName[0] || ''}
          </div>
          <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-2 border-white dark:border-slate-800 shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors">
            <Camera size={14} />
          </button>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Foto do Utilizador</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Formatos permitidos: JPG, PNG. Tamanho máx: 2MB</p>
          <div className="mt-2 flex gap-2 justify-center md:justify-start">
            <button className="text-xs font-bold text-primary px-3 py-1.5 rounded bg-primary/10 hover:bg-primary/20 transition">Carregar Nova</button>
            <button className="text-xs font-bold text-slate-500 px-3 py-1.5 rounded bg-slate-100 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition">Remover</button>
          </div>
        </div>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: 'Primeiro Nome',    type: 'text',  key: 'firstName' },
          { label: 'Apelido',          type: 'text',  key: 'lastName' },
          { label: 'Endereço de Email',type: 'email', key: 'email' },
          { label: 'Número de Telefone',type: 'tel',   key: 'phone' },
        ].map(({ label, type, key }) => (
          <div key={label} className="space-y-2">
            <label className={labelCls}>{label}</label>
            <input 
              className={inputCls} 
              type={type} 
              value={profile[key] || ''} 
              onChange={(e) => onChange(key, e.target.value)} 
            />
          </div>
        ))}
        <div className="space-y-2 md:col-span-2">
          <label className={labelCls}>Cargo</label>
          <input
            className="w-full bg-slate-100 dark:bg-background-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-500 dark:text-slate-500 cursor-not-allowed"
            readOnly
            type="text"
            value={profile.role || ''}
          />
        </div>
      </div>
    </Section>
  );
}

// ─── Security section ──────────────────────────────────────────────────────────
export function SecuritySettings({ security, onChange }: { security: Record<string, string | boolean>; onChange: (key: string, value: string | boolean) => void }) {
  return (
    <Section icon={Shield} title="Segurança e Palavra-passe">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Palavra-passe Atual',   type: 'password', key: 'currentPassword', placeholder: 'Sua senha atual' },
            { label: 'Nova Palavra-passe',    type: 'password', key: 'newPassword', placeholder: 'Nova palavra-passe' },
            { label: 'Confirmar Nova Palavra-passe', type: 'password', key: 'confirmPassword', placeholder: 'Repetir palavra-passe' },
          ].map(({ label, placeholder, type, key }) => (
            <div key={label} className="space-y-2">
              <label className={labelCls}>{label}</label>
              <input 
                className={inputCls} 
                type={type} 
                value={(security[key] as string) || ''}
                onChange={(e) => onChange(key, e.target.value)}
                placeholder={placeholder} 
              />
            </div>
          ))}
        </div>

        {/* 2FA toggle */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Autenticação de Dois Fatores (2FA)</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Adicione uma camada extra de segurança à sua conta.</p>
          </div>
          <Toggle checked={security.twoFactor as boolean} onChange={(v) => onChange('twoFactor', v)} />
        </div>
      </div>
    </Section>
  );
}

// ─── Notifications section ────────────────────────────────────────────────────
export function NotificationSettings({ notifications, onChange }: { notifications: Record<string, boolean>; onChange: (key: string, value: boolean) => void }) {
  const notifList = [
    { key: 'emailNotifications', icon: Mail,           iconBg: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',     title: 'Notificações por Email',  desc: 'Receba atualizações sobre a atividade via email.' },
    { key: 'pushNotifications',  icon: Smartphone,      iconBg: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400', title: 'Notificações Push',    desc: 'Alertas instantâneos no seu navegador ou dispositivo móvel.' },
    { key: 'appUpdates',         icon: RefreshCw,       iconBg: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',   title: 'Atualizações de Candidatura',   desc: 'Notificações sobre alterações e correções de software.' },
    { key: 'messageAlerts',      icon: MessageCircle,   iconBg: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400', title: 'Alertas de Novas Mensagens', desc: 'Receba alertas quando receber mensagens diretas.' },
  ];

  return (
    <Section icon={Bell} title="Preferências de Notificação">
      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {notifList.map((n) => (
          <div key={n.title} className="py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`size-10 rounded-lg flex items-center justify-center flex-shrink-0 ${n.iconBg}`}>
                <n.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{n.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{n.desc}</p>
              </div>
            </div>
            <Toggle checked={notifications[n.key] as boolean} onChange={(v) => onChange(n.key, v)} />
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── App Preferences section ──────────────────────────────────────────────────
export function AppPreferences({ preferences, onChange }: { preferences: Record<string, string>; onChange: (key: string, value: string) => void }) {
  return (
    <Section icon={Layout} title="Preferências da App">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Language */}
        <div className="space-y-3">
          <label className={labelCls}>Idioma Padrão</label>
          <div className="relative">
            <select 
              value={preferences.language || 'pt'}
              onChange={(e) => onChange('language', e.target.value)}
              className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm appearance-none focus:ring-2 focus:ring-primary/20 outline-none text-slate-900 dark:text-white"
            >
              <option value="en">Inglês (Estados Unidos)</option>
              <option value="es">Espanhol</option>
              <option value="fr">Francês</option>
              <option value="de">Alemão</option>
              <option value="pt">Português</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
          </div>
        </div>

        {/* Theme mode */}
        <div className="space-y-3">
          <label className={labelCls}>Modo de Tema</label>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => onChange('theme', 'light')}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                preferences.theme === 'light' 
                  ? 'border-2 border-primary bg-primary/10 text-primary font-bold' 
                  : 'border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-background-dark/50 text-slate-500 hover:border-primary hover:text-primary font-bold'
              }`}
            >
              <Sun size={20} />
              <span className="text-xs">Claro</span>
            </button>
            <button 
               onClick={() => onChange('theme', 'dark')}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                preferences.theme === 'dark' 
                  ? 'border-2 border-primary bg-primary/10 text-primary font-bold' 
                  : 'border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-background-dark/50 text-slate-500 hover:border-primary hover:text-primary font-bold'
              }`}
            >
              <Moon size={20} />
              <span className="text-xs">Escuro</span>
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
