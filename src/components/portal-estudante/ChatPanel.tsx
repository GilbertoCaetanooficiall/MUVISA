"use client";

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
    sender: "ana" | "maria";
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

const ANA_AVATAR =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDU2P-L-OyxAqH1u-5MWAkN7lcQV3zkGG1wb9dmCW_cuGdHjU5FFGV5kylBSu5WYkpwHyb1TMX6SrzzgSQ35u9mXhLMqxOTiYJYED2qhh9DfdHjFFc8eC3jcLxEG_63v2Qu87z8wewILkQxq7VlVSIn5YJdMwAQ3XKvOUs3uKUoTmXVL-wo6JmPjTYvR9odcbB745kvQaWJoGLAhjhWaPF_4L_frbwkr8VziVNNC5xjWJmYxm_xMss5FlJMjlsqxp2ePqXWxSTswDXm";

const MARIA_AVATAR =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAO4JkjzlC-Awc2Tgd_VUI2S-kSSY1I5KuUSHc6itaB_lVh_bCW9aGF55JaFusUKcuWBrTH-Px2DHldRFZYBpiCzAkx9f2Ejga32oH79VvYIgGib2kOYvR8QfQwnkNlctzEnL3VoY08p3nYUIsujI4BcPCeVAutcQLr9gufa8ViArSUUVPR0_tWnL-lwjZhxoRSnjDJxwo4xXqZrZ_3VZ6zGtLmKIksujpqhmmMZOmW-xmQke56iUcSmbOWrwEvBgZF2njCapS3E7bx";

const INITIAL_MESSAGES: Message[] = [
    {
        id: 1,
        sender: "ana",
        text: "Olá Maria! Vi que você enviou os documentos. Vou analisá-los ainda hoje.",
        time: "10:30",
    },
    {
        id: 2,
        sender: "maria",
        text: "Oi Ana! Obrigada. Fico no aguardo do seu retorno.",
        time: "10:32",
    },
    {
        id: 3,
        sender: "ana",
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

        // Simulate Ana replying after a short delay
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    sender: "ana",
                    text: "Recebi sua mensagem! Vou retornar em breve. 😊",
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
            <div className="h-16 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between px-4 bg-white dark:bg-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                            <img alt="Ana Souza" className="w-full h-full object-cover" src={ANA_AVATAR} />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Conversa com Ana Souza</h3>
                        <p className="text-[10px] text-green-500 font-medium">Online agora</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-background-light dark:bg-slate-800/50">
                {/* Date separator */}
                <div className="flex justify-center">
                    <span className="text-[10px] text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                        Hoje, 24 Out
                    </span>
                </div>

                {messages.map((msg) =>
                    msg.sender === "ana" ? (
                        <div key={msg.id} className="flex gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                                <img alt="Ana Souza" className="w-full h-full object-cover" src={ANA_AVATAR} />
                            </div>
                            <div className="flex flex-col gap-1 max-w-[80%]">
                                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700">
                                    <p>{msg.text}</p>
                                </div>
                                <span className="text-[10px] text-slate-400 ml-1">{msg.time}</span>
                            </div>
                        </div>
                    ) : (
                        <div key={msg.id} className="flex gap-3 flex-row-reverse">
                            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 mt-1">
                                <img alt="Maria Silva" className="w-full h-full object-cover" src={MARIA_AVATAR} />
                            </div>
                            <div className="flex flex-col gap-1 items-end max-w-[80%]">
                                <div className="bg-primary p-3 rounded-2xl rounded-tr-none shadow-md text-sm text-white">
                                    <p>{msg.text}</p>
                                </div>
                                <span className="text-[10px] text-slate-400 mr-1">{msg.time}</span>
                            </div>
                        </div>
                    )
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 shrink-0">
                <div className="flex gap-2 items-end">
                    <button
                        className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Anexar arquivo"
                    >
                        <span className="material-symbols-outlined text-[20px]">attach_file</span>
                    </button>
                    <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center px-3 py-2 border border-transparent focus-within:border-primary/30 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all">
                        <input
                            className="w-full bg-transparent border-none focus:ring-0 text-sm text-slate-900 dark:text-white placeholder-slate-400 p-0 outline-none"
                            placeholder="Digite sua mensagem..."
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKey}
                        />
                    </div>
                    <button
                        onClick={sendMessage}
                        className="p-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                        title="Enviar"
                    >
                        <span className="material-symbols-outlined text-[20px]">send</span>
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
                    {/* Blurred backdrop */}
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
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
