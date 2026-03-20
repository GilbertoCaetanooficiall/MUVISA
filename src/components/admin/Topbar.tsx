'use client';

import { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import { Search, Bell, Sun, Moon, LogOut, User, Settings, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';

const initialNotifications = [
  { id: 1, title: 'Novo Cliente', message: 'Maria Silva acabou de se registar.', time: 'há 5 min', unread: true },
  { id: 2, title: 'Documento Recebido', message: 'Ronaldo Joaquim enviou um passaporte.', time: 'há 15 min', unread: true },
  { id: 3, title: 'Pagamento Confirmado', message: 'Fatura #1029 foi paga via Pix.', time: 'há 2 h', unread: false },
];

export default function Topbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const router = useRouter();
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Only render theme-dependent content after hydration to avoid SSR mismatch
  useEffect(() => { 
    setMounted(true); 
    
    // Close menus on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    router.push('/auth-admin/login');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const toggleNotificationRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));
  };

  return (
    <header className="h-16 flex-shrink-0 flex items-center justify-between px-8 bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 z-50">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            placeholder="Pesquisar clientes, vistos, documentos..."
            className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-lg transition-all relative ${showNotifications ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 size-4 bg-red-500 rounded-full border-2 border-white dark:border-background-dark text-[8px] font-black text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden animate-scale-in">
              <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <span className="font-bold text-sm">Notificações</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-[10px] text-primary font-bold uppercase tracking-wider hover:underline"
                  >
                    Lidas todas
                  </button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(n => (
                    <div 
                      key={n.id} 
                      onClick={() => toggleNotificationRead(n.id)}
                      className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border-b border-slate-50 dark:border-slate-800 cursor-pointer relative ${n.unread ? 'bg-primary/[0.03]' : ''}`}
                    >
                      {n.unread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-xs ${n.unread ? 'font-black' : 'font-medium'}`}>{n.title}</span>
                        <span className="text-[10px] text-slate-400 tracking-tight">{n.time}</span>
                      </div>
                      <p className={`text-xs leading-relaxed ${n.unread ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>{n.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    Sem notificações no momento.
                  </div>
                )}
              </div>
              <button className="w-full py-3 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors bg-slate-50 dark:bg-slate-800/50">
                Ver todo o histórico
              </button>
            </div>
          )}
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Alternar modo escuro"
        >
          {mounted ? (
            theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1" />

        {/* User menu and Logout */}
        <div className="relative" ref={userMenuRef}>
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={`flex items-center gap-2 p-1.5 pl-3 rounded-xl transition-all ${showUserMenu ? 'bg-primary/10' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <div className="flex flex-col items-end mr-1 hidden lg:flex">
              <span className="text-[11px] font-black text-slate-900 dark:text-white tracking-tight">Admin Master</span>
              <span className="text-[9px] text-primary font-bold uppercase tracking-widest">Administrador</span>
            </div>
            <div className="size-9 rounded-full bg-primary flex items-center justify-center text-white text-xs font-black shadow-lg shadow-primary/20">
              AM
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden animate-scale-in">
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">Conta Activa</p>
                <p className="text-sm font-black truncate">admin@muvisa.com</p>
              </div>
              
              <div className="p-2">
                <Link 
                  href="/admin/profile" 
                  onClick={() => setShowUserMenu(false)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <User size={18} />
                  Perfil
                </Link>
                <Link 
                  href="/admin/settings" 
                  onClick={() => setShowUserMenu(false)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <Settings size={18} />
                  Configurações
                </Link>
                <div className="h-px bg-slate-100 dark:bg-slate-700 my-2" />
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-2.5 rounded-lg text-sm font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={18} />
                  Terminar Sessão
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
