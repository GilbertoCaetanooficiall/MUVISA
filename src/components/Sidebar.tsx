/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: "Home", icon: "home" },
        { href: "/meu-processo", label: "Meu Processo", icon: "work" },
        { href: "/meus-documentos", label: "Meus Documentos", icon: "folder_open" },
        { href: "/pagamentos", label: "Pagamentos", icon: "credit_card" },
        { href: "/suporte", label: "Suporte", icon: "support_agent" },
    ];

    return (
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col hidden md:flex h-screen sticky top-0">
            <div className="p-6 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-3xl">flight_takeoff</span>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-slate-900 dark:text-white text-base font-bold leading-tight">MUVISA</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Student Portal</p>
                </div>
            </div>
            <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                }`}
                        >
                            <span className={`material-symbols-outlined ${isActive ? "filled" : ""}`}>{link.icon}</span>
                            <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>{link.label}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <Link
                    href="/configuracoes"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                    <span className="material-symbols-outlined">settings</span>
                    <span className="text-sm font-medium">Configurações</span>
                </Link>
                <div className="mt-4 flex items-center gap-3 px-3">
                    <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden">
                        <img
                            alt="Maria Silva"
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO4JkjzlC-Awc2Tgd_VUI2S-kSSY1I5KuUSHc6itaB_lVh_bCW9aGF55JaFusUKcuWBrTH-Px2DHldRFZYBpiCzAkx9f2Ejga32oH79VvYIgGib2kOYvR8QfQwnkNlctzEnL3VoY08p3nYUIsujI4BcPCeVAutcQLr9gufa8ViArSUUVPR0_tWnL-lwjZhxoRSnjDJxwo4xXqZrZ_3VZ6zGtLmKIksujpqhmmMZOmW-xmQke56iUcSmbOWrwEvBgZF2njCapS3E7bx"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">Maria Silva</span>
                        <span className="text-[10px] text-slate-500">maria.silva@email.com</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

