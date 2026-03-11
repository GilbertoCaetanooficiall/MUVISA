const tickets = [
    {
        title: "Problema com Upload",
        info: "Ticket #4923 • Atualizado há 2h",
        badge: "RESOLVIDO",
        badgeStyle: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        dotColor: "bg-green-500",
        divider: true,
    },
    {
        title: "Dúvida sobre Pagamento",
        info: "Ticket #4988 • Aberto hoje",
        badge: "EM ABERTO",
        badgeStyle: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
        dotColor: "bg-orange-500",
        divider: false,
    },
];

export default function MyTickets() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Meus Chamados</h3>
                <a href="#" className="text-xs text-primary font-medium hover:underline">
                    Ver todos
                </a>
            </div>
            <div className="space-y-4">
                {tickets.map((ticket) => (
                    <div
                        key={ticket.title}
                        className={`flex items-start gap-3 ${ticket.divider ? "pb-4 border-b border-slate-100 dark:border-slate-700" : ""}`}
                    >
                        <div className={`mt-1 min-w-[8px] h-2 w-2 rounded-full shrink-0 ${ticket.dotColor}`}></div>
                        <div>
                            <h4 className="text-sm font-medium text-slate-900 dark:text-white">{ticket.title}</h4>
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
