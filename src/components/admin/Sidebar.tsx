'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { 
  LayoutDashboard, 
  Users, 
  Globe, 
  FileText, 
  GraduationCap, 
  ClipboardList, 
  Package, 
  CreditCard,
  Mail, 
  UserCog, 
  BarChart3,
  Settings,
  LogOut,
  Layout
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Painel Central' },
  { href: '/admin/clients', icon: Users, label: 'Clientes' },
  { href: '/admin/visa-processes', icon: Globe, label: 'Processos de Visto' },
  { href: '/admin/processo', icon: Layout, label: 'Config. Processo' },
  { href: '/admin/documents', icon: FileText, label: 'Documentos' },
  { href: '/admin/universities', icon: GraduationCap, label: 'Universidades' },
  { href: '/admin/applications', icon: ClipboardList, label: 'Candidaturas' },
  { href: '/admin/payments', icon: CreditCard, label: 'Pagamentos' },
  { href: '/admin/plans', icon: Package, label: 'Planos/Pacotes' },
  { href: '/admin/messages', icon: Mail, label: 'Mensagens' },
  { href: '/admin/staff', icon: UserCog, label: 'Funcionários' },
  { href: '/admin/reports', icon: BarChart3, label: 'Relatórios' },
];

interface SidebarProps {
  onCloseMobile?: () => void;
}

export default function Sidebar({ onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push('/auth-admin/login');
  };

  return (
    <aside className="w-64 h-full flex-shrink-0 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark">
      {/* Logo */}
      <div className="p-6 flex flex-col items-start gap-2 border-b border-transparent dark:border-slate-800">
        <Image src="/logo-mobile.svg" alt="MUVISA Logo" width={150} height={30} className="h-[35px] w-auto object-contain block md:hidden" priority />
        <Image src="/logo-light.svg" alt="MUVISA Logo" width={200} height={45} className="h-[45px] w-auto object-contain hidden md:block dark:hidden" priority />
        <Image src="/logo-dark.svg" alt="MUVISA Logo" width={200} height={45} className="h-[45px] w-auto object-contain hidden dark:md:block" priority />
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider ml-1">
          Portal do Administrador
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* Settings separator */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/admin/settings"
            onClick={onCloseMobile}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              pathname === '/admin/settings'
                ? 'bg-primary text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Settings size={20} />
            <span className="text-sm font-medium">Definições</span>
          </Link>
        </div>
      </nav>

      {/* Admin Profile Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10">
        <div className="flex items-center gap-3 px-2 py-3 rounded-xl bg-white dark:bg-slate-900/50 shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-lg shadow-primary/20">
            RS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black truncate">Ricardo Silva</p>
            <p className="text-[10px] text-slate-500 truncate uppercase tracking-widest font-bold">Diretor Geral</p>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
            title="Sair"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
