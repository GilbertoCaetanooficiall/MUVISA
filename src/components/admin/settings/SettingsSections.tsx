import { User, Shield, Mail, Smartphone, RefreshCw, MessageCircle, Bell, Layout, ChevronDown, Sun, Moon, Camera } from 'lucide-react';

// ─── Shared input class ────────────────────────────────────────────────────────
const inputCls =
  'w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-slate-900 dark:text-white transition';

// ─── Shared label class ────────────────────────────────────────────────────────
const labelCls = 'text-sm font-semibold text-slate-700 dark:text-slate-300';

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({
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
function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input defaultChecked={defaultChecked} className="sr-only peer" type="checkbox" />
      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
    </label>
  );
}

// ─── Profile section ──────────────────────────────────────────────────────────
export function ProfileSettings() {
  return (
    <Section icon={User} title="Profile Information">
      {/* Avatar */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <div className="relative group flex-shrink-0">
          <div className="size-24 rounded-full bg-primary/20 border-4 border-slate-100 dark:border-slate-700 flex items-center justify-center text-primary text-2xl font-black">
            AR
          </div>
          <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-2 border-white dark:border-slate-800 shadow-lg flex items-center justify-center">
            <Camera size={14} />
          </button>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">User Photo</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Allowed formats: JPG, PNG. Max size: 2MB</p>
          <div className="mt-2 flex gap-2">
            <button className="text-xs font-bold text-primary px-3 py-1.5 rounded bg-primary/10 hover:bg-primary/20 transition">Upload New</button>
            <button className="text-xs font-bold text-slate-500 px-3 py-1.5 rounded bg-slate-100 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition">Remove</button>
          </div>
        </div>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: 'First Name',    type: 'text',     value: 'Alex',                    readOnly: false },
          { label: 'Last Name',     type: 'text',     value: 'Rivera',                  readOnly: false },
          { label: 'Email Address', type: 'email',    value: 'alex.rivera@muvisa.com',   readOnly: false },
          { label: 'Phone Number',  type: 'tel',      value: '+1 (555) 0123-4567',       readOnly: false },
        ].map(({ label, type, value, readOnly }) => (
          <div key={label} className="space-y-2">
            <label className={labelCls}>{label}</label>
            <input className={inputCls} type={type} defaultValue={value} readOnly={readOnly} />
          </div>
        ))}
        <div className="space-y-2 md:col-span-2">
          <label className={labelCls}>Role</label>
          <input
            className="w-full bg-slate-100 dark:bg-background-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-500 dark:text-slate-500 cursor-not-allowed"
            readOnly
            type="text"
            defaultValue="System Administrator"
          />
        </div>
      </div>
    </Section>
  );
}

// ─── Security section ──────────────────────────────────────────────────────────
export function SecuritySettings() {
  return (
    <Section icon={Shield} title="Security & Password">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Current Password',   placeholder: '',                type: 'password', value: '············' },
            { label: 'New Password',       placeholder: 'New password',     type: 'password', value: '' },
            { label: 'Confirm New Password', placeholder: 'Repeat password', type: 'password', value: '' },
          ].map(({ label, placeholder, type, value }) => (
            <div key={label} className="space-y-2">
              <label className={labelCls}>{label}</label>
              <input className={inputCls} type={type} defaultValue={value} placeholder={placeholder} />
            </div>
          ))}
        </div>

        {/* 2FA toggle */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Two-Factor Authentication (2FA)</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Add an extra layer of security to your account.</p>
          </div>
          <Toggle defaultChecked />
        </div>
      </div>
    </Section>
  );
}

// ─── Notifications section ────────────────────────────────────────────────────
const notifPrefs = [
  { icon: Mail,           iconBg: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',     title: 'Email Notifications',  desc: 'Get updates about activity via email.',                        on: true  },
  { icon: Smartphone,      iconBg: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400', title: 'Push Notifications',    desc: 'Instant alerts on your browser or mobile device.',             on: false },
  { icon: RefreshCw,       iconBg: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',   title: 'Application Updates',   desc: 'Notifications about software changes and fixes.',              on: true  },
  { icon: MessageCircle,   iconBg: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400', title: 'New Message Alerts', desc: 'Receive alerts when you get direct messages.',             on: true  },
];

export function NotificationSettings() {
  return (
    <Section icon={Bell} title="Notification Preferences">
      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {notifPrefs.map((n) => (
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
            <Toggle defaultChecked={n.on} />
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── App Preferences section ──────────────────────────────────────────────────
export function AppPreferences() {
  return (
    <Section icon={Layout} title="App Preferences">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Language */}
        <div className="space-y-3">
          <label className={labelCls}>Default Language</label>
          <div className="relative">
            <select className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm appearance-none focus:ring-2 focus:ring-primary/20 outline-none text-slate-900 dark:text-white">
              <option value="en">English (United States)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="pt">Português</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
          </div>
        </div>

        {/* Theme mode */}
        <div className="space-y-3">
          <label className={labelCls}>Theme Mode</label>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-background-dark/50 text-slate-500 hover:border-primary hover:text-primary transition-colors">
              <Sun size={20} />
              <span className="text-xs font-bold">Light</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg border-2 border-primary bg-primary/10 text-primary">
              <Moon size={20} />
              <span className="text-xs font-bold">Dark</span>
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
