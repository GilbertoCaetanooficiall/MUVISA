'use client';
import { useState } from 'react';
import { Plus, CreditCard, QrCode, Barcode, CheckCircle, X } from 'lucide-react';

interface PaymentMethod {
    id: string;
    icon: React.ElementType;
    iconColor: string;
    badge: string | null;
    badgeStyle?: string;
    title: string | null;
    subtitle?: string;
    info?: string;
    extra?: string;
    extraColor?: string;
    mono: boolean;
}

const initialMethods: PaymentMethod[] = [
    {
        id: '1',
        icon: CreditCard,
        iconColor: "text-slate-400",
        badge: "PRINCIPAL",
        badgeStyle: "bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary",
        title: null,
        subtitle: "Mastercard terminado em",
        info: "•••• 8834",
        extra: "Expira em 12/28",
        extraColor: "text-slate-400",
        mono: true,
    },
    {
        id: '2',
        icon: QrCode,
        iconColor: "text-teal-500",
        badge: null,
        title: "Pix",
        subtitle: "Pagamento instantâneo",
        extra: "5% de desconto à vista",
        extraColor: "text-green-600",
        mono: false,
    },
    {
        id: '3',
        icon: Barcode,
        iconColor: "text-slate-400",
        badge: null,
        title: "Boleto Bancário",
        subtitle: "Processamento em até 3 dias úteis",
        mono: false,
    },
];

export default function PaymentMethods() {
    const [methods] = useState(initialMethods);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handleSelect = (id: string, name: string) => {
        setSelectedId(id);
        showToast(`✓ "${name}" seleccionado como método de pagamento.`);
    };

    const handleAddNew = () => {
        showToast('Funcionalidade de adicionar método estará disponível em breve.');
    };

    return (
        <div className="flex flex-col gap-4 relative">
            {/* Toast */}
            {toast && (
                <div className="absolute top-0 right-0 z-50 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg text-sm font-medium bg-slate-900 text-white animate-fade-in">
                    <CheckCircle size={16} className="text-green-400" />
                    {toast}
                    <button onClick={() => setToast(null)}><X size={14} /></button>
                </div>
            )}

            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Métodos de Pagamento</h3>
                <button
                    onClick={handleAddNew}
                    className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                >
                    <Plus className="text-[18px]" />
                    Adicionar Novo
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {methods.map((m) => {
                    const Icon = m.icon;
                    const isSelected = selectedId === m.id;
                    const displayName = m.title ?? (m.info ?? m.subtitle ?? 'Método');
                    return (
                        <button
                            key={m.id}
                            onClick={() => handleSelect(m.id, displayName)}
                            className={`bg-white dark:bg-slate-800 p-5 rounded-xl border flex flex-col justify-between h-40 shadow-sm relative overflow-hidden group transition-all text-left ${
                                isSelected
                                    ? 'border-primary ring-2 ring-primary/20 shadow-primary/10'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
                            }`}
                        >
                            <div className="flex justify-between items-start z-10 relative">
                                <Icon className={`w-8 h-8 ${m.iconColor}`} />
                                <div className="flex items-center gap-2">
                                    {isSelected && <CheckCircle size={16} className="text-primary" />}
                                    {m.badge && (
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded ${m.badgeStyle}`}>{m.badge}</span>
                                    )}
                                </div>
                            </div>
                            <div className="z-10 relative">
                                {m.title && <h4 className="text-slate-900 dark:text-white font-bold">{m.title}</h4>}
                                {m.subtitle && <p className="text-slate-500 text-xs mt-1">{m.subtitle}</p>}
                                {m.info && (
                                    <p className={`text-slate-900 dark:text-white text-lg font-semibold ${m.mono ? "font-mono" : ""}`}>
                                        {m.info}
                                    </p>
                                )}
                                {m.extra && (
                                    <p className={`text-xs mt-1 ${m.extraColor ?? "text-slate-400"}`}>{m.extra}</p>
                                )}
                            </div>
                            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-slate-50 dark:bg-slate-800 rounded-full opacity-50 group-hover:bg-primary/5 transition-colors"></div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
