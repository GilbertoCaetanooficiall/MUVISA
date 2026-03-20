"use client";
import { Paperclip, Send, X } from 'lucide-react';


import {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
    ReactNode,
    KeyboardEvent,
} from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Message {
    id: number;
    sender: "ronaldo" | "maria";
    text: string;
    time: string;
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface ChatContextType {
    open: () => void;
    close: () => void;
    isOpen: boolean;
}

const ChatContext = createContext<ChatContextType>({
    open: () => { },
    close: () => { },
    isOpen: false,
});

export function useChatPanel() {
    return useContext(ChatContext);
}

// ─── Avatars ─────────────────────────────────────────────────────────────────

const RONALDO_AVATAR = "/team/ronaldo-joaquim.jpg";

const MARIA_AVATAR =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAO4JkjzlC-Awc2Tgd_VUI2S-kSSY1I5KuUSHc6itaB_lVh_bCW9aGF55JaFusUKcuWBrTH-Px2DHldRFZYBpiCzAkx9f2Ejga32oH79VvYIgGib2kOYvR8QfQwnkNlctzEnL3VoY08p3nYUIsujI4BcPCeVAutcQLr9gufa8ViArSUUVPR0_tWnL-lwjZhxoRSnjDJxwo4xXqZrZ_3VZ6zGtLmKIksujpqhmmMZOmW-xmQke56iUcSmbOWrwEvBgZF2njCapS3E7bx";

const INITIAL_MESSAGES: Message[] = [
    {
        id: 1,
        sender: "ronaldo",
        text: "Olá Maria! Vi que enviou os documentos. Vou analisá-los ainda hoje.",
        time: "10:30",
    },
    {
        id: 2,
        sender: "maria",
        text: "Olá Ronaldo! Obrigada. Fico no aguardo do seu retorno.",
        time: "10:32",
    },
    {
        id: 3,
        sender: "ronaldo",
        text: "Poderia me enviar também uma cópia do comprovante de residência atualizado?",
        time: "10:35",
    },
    {
        id: 4,
        sender: "maria",
        text: "Claro! Vou providenciar agora mesmo.",
        time: "10:40",
    },
];

// ─── Chat Panel Component ────────────────────────────────────────────────────

function ChatPanel({ onClose }: { onClose: () => void }) {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    function now() {
        return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    }

    function sendMessage() {
        const text = input.trim();
        if (!text) return;
        setMessages((prev) => [
            ...prev,
            { id: Date.now(), sender: "maria", text, time: now() },
        ]);
        setInput("");

        // Simulate Ronaldo replying after a short delay
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    sender: "ronaldo",
                    text: "Recebi a sua mensagem! Vou verificar e respondo-lhe em breve. 😊",
                    time: now(),
                },
            ]);
        }, 1500);
    }

    function handleKey(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") sendMessage();
    }

    return (
        /* eslint-disable @next/next/no-img-element */
        <div className="w-full max-w-sm h-full bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col pointer-events-auto relative">
            {/* Header */}
            <div className="h-20 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between px-4 bg-white dark:bg-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 p-0.5">
                            <img alt="Ronaldo Joaquim" className="w-full h-full object-cover rounded-full" src={RONALDO_AVATAR} />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm animate-pulse"></div>
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white leading-tight">Conversa com Ronaldo Joaquim</h3>
                        <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider mt-0.5">Online agora</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                >
                    <X className="text-[20px]" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#f8fafc] dark:bg-slate-900/50 scrollbar-thin scrollbar-thumb-slate-200 dark:scroll-thumb-slate-700">
                {/* Date separator */}
                <div className="flex justify-center">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full shadow-sm">
                        Hoje, 24 Out
                    </span>
                </div>

                {messages.map((msg) =>
                    msg.sender === "ronaldo" ? (
                        <div key={msg.id} className="flex gap-3 animate-fade-in">
                            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 mt-1 shadow-md border-2 border-white dark:border-slate-700">
                                <img alt="Ronaldo Joaquim" className="w-full h-full object-cover" src={RONALDO_AVATAR} />
                            </div>
                            <div className="flex flex-col gap-1.5 max-w-[80%]">
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl rounded-tl-none shadow-[0_4px_15px_rgba(0,0,0,0.05)] text-sm text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 leading-relaxed font-medium">
                                    <p>{msg.text}</p>
                                </div>
                                <span className="text-[10px] text-slate-400 font-bold ml-2 uppercase tracking-tight">{msg.time}</span>
                            </div>
                        </div>
                    ) : (
                        <div key={msg.id} className="flex gap-3 flex-row-reverse animate-fade-in">
                            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 mt-1 shadow-md border-2 border-white dark:border-slate-700">
                                <img alt="Maria Silva" className="w-full h-full object-cover" src={MARIA_AVATAR} />
                            </div>
                            <div className="flex flex-col gap-1.5 items-end max-w-[80%]">
                                <div className="bg-primary p-4 rounded-3xl rounded-tr-none shadow-[0_8px_20px_rgba(14,86,224,0.25)] text-sm text-white leading-relaxed font-bold">
                                    <p>{msg.text}</p>
                                </div>
                                <span className="text-[10px] text-slate-400 font-bold mr-2 uppercase tracking-tight">{msg.time}</span>
                            </div>
                        </div>
                    )
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
                <div className="flex gap-3 items-center">
                    <button
                        className="p-3 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all"
                        title="Anexar arquivo"
                    >
                        <Paperclip className="text-[20px]" />
                    </button>
                    <div className="flex-1 bg-slate-100 dark:bg-slate-900/50 rounded-[1.25rem] flex items-center px-4 py-3 border-2 border-transparent focus-within:border-primary/20 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all shadow-inner">
                        <input
                            className="w-full bg-transparent border-none focus:ring-0 text-sm text-slate-900 dark:text-white font-medium placeholder-slate-400 p-0 outline-none"
                            placeholder="Escreva ao Ronaldo..."
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKey}
                        />
                    </div>
                    <button
                        onClick={sendMessage}
                        className="p-3.5 bg-primary text-white rounded-[1.25rem] hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30"
                        title="Enviar"
                    >
                        <Send className="text-[20px]" />
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function ChatPanelProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    function open() { setIsOpen(true); }
    function close() { setIsOpen(false); }

    return (
        <ChatContext.Provider value={{ open, close, isOpen }}>
            {children}

            {/* Overlay + Sliding panel */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Blurred backdrop with higher quality blur */}
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[4px] animate-fade-in"
                        onClick={close}
                    />
                    {/* Panel slides in from the right */}
                    <div className="relative h-full w-full max-w-sm animate-slide-in-right">
                        <ChatPanel onClose={close} />
                    </div>
                </div>
            )}
        </ChatContext.Provider>
    );
}
