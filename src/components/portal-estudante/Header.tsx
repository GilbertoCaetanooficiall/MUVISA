"use client";
import Link from 'next/link';
import { Bell, LogOut, Menu, CheckCircle, FileText, X } from 'lucide-react';
import { useState, useRef, useEffect } from "react";

import { ThemeToggle } from "@/components/portal-estudante/ThemeToggle";
import { useMobileMenu } from "@/components/portal-estudante/MobileMenuContext";

// --- Tipos de Notificações Simuladas ---
interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'success' | 'info' | 'alert';
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Documento Aprovado",
    description: "O seu passaporte foi verificado e aprovado.",
    time: "Há 1 hora",
    read: false,
    type: "success",
  },
  {
    id: 2,
    title: "Novo Documento Necessário",
    description: "Por favor, envie o seu certificado de matrícula.",
    time: "Hoje",
    read: false,
    type: "info",
  },
  {
    id: 3,
    title: "Visto em Revisão",
    description: "O consulado iniciou a revisão do seu processo.",
    time: "Ontem",
    read: true,
    type: "alert",
  },
];

export default function Header() {
    const { setIsOpen } = useMobileMenu();
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    const notifRef = useRef<HTMLDivElement>(null);

    // Quantidade de notificações não lidas
    const unreadCount = notifications.filter(n => !n.read).length;

    // Fechar dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setIsNotifOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const removeNotification = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 sticky top-0 z-20">
            <div className="flex items-center gap-4 md:hidden">
                <button className="text-slate-500 hover:text-primary transition-colors focus:outline-none" onClick={() => setIsOpen(true)}>
                    <Menu className="text-[28px]" />
                </button>
            </div>
            
            <div className="flex items-center gap-4 ml-auto">
                <ThemeToggle />
                
                {/* Notificações */}
                <div className="relative" ref={notifRef}>
                    <button 
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none"
                    >
                        <Bell className="text-slate-500 hover:text-primary transition-colors" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-slate-800"></span>
                        )}
                    </button>

                    {/* Dropdown de Notificações */}
                    {isNotifOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-fade-in origin-top-right">
                            <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                                <h3 className="font-bold text-slate-800 dark:text-white">Notificações</h3>
                                {unreadCount > 0 && (
                                    <button 
                                        onClick={markAllAsRead}
                                        className="text-xs text-primary hover:underline font-medium"
                                    >
                                        Marcar como lidas
                                    </button>
                                )}
                            </div>
                            
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                        {notifications.map((notif) => (
                                            <div 
                                                key={notif.id} 
                                                className={`p-4 flex gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group relative ${
                                                    !notif.read ? 'bg-primary/5 dark:bg-primary/10' : ''
                                                }`}
                                            >
                                                <div className="mt-1 shrink-0">
                                                    {notif.type === 'success' && <CheckCircle className="text-green-500" size={18} />}
                                                    {notif.type === 'info' && <FileText className="text-primary" size={18} />}
                                                    {notif.type === 'alert' && <Bell className="text-orange-500" size={18} />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`text-sm ${!notif.read ? 'font-semibold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-200'}`}>
                                                        {notif.title}
                                                    </p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                                        {notif.description}
                                                    </p>
                                                    <p className="text-[10px] text-slate-400 mt-2">
                                                        {notif.time}
                                                    </p>
                                                </div>
                                                <button 
                                                    onClick={(e) => removeNotification(notif.id, e)}
                                                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-opacity"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                                        <Bell className="mx-auto mb-3 opacity-20" size={32} />
                                        <p className="text-sm">Nenhuma notificação.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1 md:mx-2"></div>
                
                <Link
                    href="/login"
                    className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-red-500 dark:hover:text-red-400 transition-colors group"
                    title="Sair da conta"
                >
                    <span className="hidden md:inline">Sair</span>
                    <LogOut className="w-5 h-5 md:w-4 md:h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>
        </header>
    );
}
