'use client';
import { useState } from 'react';
import { Plus, X, CheckCircle } from 'lucide-react';

const initialTickets = [
    {
        id: '1',
        title: "Problema com Upload",
        info: "Ticket #4923 • Atualizado há 2h",
        badge: "RESOLVIDO",
        badgeStyle: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        dotColor: "bg-green-500",
        status: 'resolvido' as const,
    },
    {
        id: '2',
        title: "Dúvida sobre Pagamento",
        info: "Ticket #4988 • Aberto hoje",
        badge: "EM ABERTO",
        badgeStyle: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
        dotColor: "bg-orange-500",
        status: 'aberto' as const,
    },
];

export default function MyTickets() {
    const [tickets] = useState(initialTickets);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handleNewTicket = () => {
        showToast('Funcionalidade de novo ticket disponível em breve.');
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 relative">
            {/* Toast */}
            {toast && (
                <div className="absolute top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg shadow text-xs font-medium bg-green-500 text-white animate-fade-in">
                    <CheckCircle size={14} /> {toast}
                    <button onClick={() => setToast(null)}><X size={12} /></button>
                </div>
            )}

            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Meus Chamados</h3>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleNewTicket}
                        className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
                    >
                        <Plus size={14} /> Novo
                    </button>
                    <a href="#" className="text-xs text-primary font-medium hover:underline">Ver todos</a>
                </div>
            </div>
            <div className="space-y-4">
                {tickets.map((ticket, i) => (
                    <div
                        key={ticket.id}
                        className={`flex items-start gap-4 ${i < tickets.length - 1 ? "pb-4 border-b border-slate-100 dark:border-slate-700" : ""}`}
                    >
                        <div className={`mt-1.5 min-w-[8px] h-2 w-2 rounded-full shrink-0 ${ticket.dotColor}`}></div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{ticket.title}</h4>
                            <p className="text-xs text-slate-500 mt-1">{ticket.info}</p>
                            <span className={`inline-block mt-2 px-2 py-0.5 text-[10px] font-bold rounded-full ${ticket.badgeStyle}`}>
                                {ticket.badge}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
