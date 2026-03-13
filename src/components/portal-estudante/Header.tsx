"use client";
import { Bell, LogOut, Menu } from 'lucide-react';


import { ThemeToggle } from "@/components/portal-estudante/ThemeToggle";
import { useMobileMenu } from "@/components/portal-estudante/MobileMenuContext";

export default function Header() {
    const { setIsOpen } = useMobileMenu();
    return (
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 sticky top-0 z-20">
            <div className="flex items-center gap-4 md:hidden">
                <button className="text-slate-500 hover:text-primary transition-colors focus:outline-none" onClick={() => setIsOpen(true)}>
                    <Menu className="text-[28px]" />
                </button>
            </div>
            <div className="flex items-center gap-4 ml-auto">
                <ThemeToggle />
                <div className="relative group cursor-pointer">
                    <Bell className="text-slate-500 hover:text-primary transition-colors" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 border border-white dark:border-slate-800"></span>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                <button className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-primary transition-colors">
                    <span>Sair</span>
                    <LogOut className="text-[20px]" />
                </button>
            </div>
        </header>
    );
}
