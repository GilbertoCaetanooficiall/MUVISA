"use client";
import { Paperclip, Send, X, User } from 'lucide-react';

import {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
    ReactNode,
    KeyboardEvent,
} from "react";
import { getMensagensByProcesso, enviarMensagem, marcarMensagensComoLidas } from '@/app/actions/mensagem.actions';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ChatConfig {
    processoId?: string;
    remetenteId?: string;
    remetenteNome?: string;
    destinatarioId?: string;
    destinatarioNome?: string;
}

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

// ─── Chat Panel Component ────────────────────────────────────────────────────

function ChatPanel({ onClose, config }: { onClose: () => void, config?: ChatConfig }) {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch and poll messages
    useEffect(() => {
        if (!config?.processoId || !config?.remetenteId) return;

        async function fetchMessages() {
            try {
                const data = await getMensagensByProcesso(config!.processoId!, config!.remetenteId!);
                setMessages(data);
            } catch (error) {
                console.error("Erro a ir buscar mensagens:", error);
            }
        }

        // Marcar como lidas e buscar iniciais
        marcarMensagensComoLidas(config.processoId, config.remetenteId).catch(() => {});
        fetchMessages();

        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [config]);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    function formatTime(isoStr: string) {
        return new Date(isoStr).toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
    }

    async function handleSendMessage() {
        const text = input.trim();
        if (!text || !config?.processoId || !config?.remetenteId || !config?.destinatarioId) return;
        
        setInput("");
        setSending(true);

        try {
            await enviarMensagem(
                config.processoId,
                config.remetenteId,
                config.destinatarioId,
                text
            );
            // Re-fetch imediatamente a seguir a enviar
            const data = await getMensagensByProcesso(config.processoId, config.remetenteId);
            setMessages(data);
        } catch (error) {
            console.error("Erro a enviar mensagem:", error);
            // Podíamos mostrar um toast de erro
        } finally {
            setSending(false);
        }
    }

    function handleKey(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && !sending) handleSendMessage();
    }

    return (
        <div className="w-full max-w-sm h-full bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col pointer-events-auto relative">
            {/* Header */}
            <div className="h-16 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between px-4 bg-white dark:bg-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center border border-slate-200 dark:border-slate-600">
                            <User className="text-slate-400 w-5 h-5" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[160px]">
                            {config?.destinatarioNome || "Apoio ao Estudante"}
                        </h3>
                        <p className="text-[10px] text-green-500 font-medium">Online</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    <X className="text-[20px]" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-background-light dark:bg-slate-800/50">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Ainda não existem mensagens neste processo. Envia uma mensagem para iniciar a conversa!
                        </p>
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isMe = msg.remetente_id === config?.remetenteId;
                        return isMe ? (
                            <div key={msg.id} className="flex gap-3 flex-row-reverse">
                                <div className="flex flex-col gap-1 items-end max-w-[80%]">
                                    <div className="bg-primary p-3 rounded-2xl rounded-tr-none shadow-md text-sm text-white break-words w-full">
                                        <div dangerouslySetInnerHTML={{ __html: msg.conteudo }} />
                                    </div>
                                    <span className="text-[10px] text-slate-400 mr-1">{formatTime(msg.criado_em)}</span>
                                </div>
                            </div>
                        ) : (
                            <div key={msg.id} className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex-shrink-0 mt-1 flex items-center justify-center">
                                    <User className="w-4 h-4 text-slate-400" />
                                </div>
                                <div className="flex flex-col gap-1 max-w-[80%]">
                                    <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 break-words w-full">
                                        <div dangerouslySetInnerHTML={{ __html: msg.conteudo }} />
                                    </div>
                                    <span className="text-[10px] text-slate-400 ml-1">{formatTime(msg.criado_em)}</span>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 shrink-0">
                {!config?.processoId ? (
                    <p className="text-xs text-center text-red-500">Sem processo activo.</p>
                ) : !config?.destinatarioId ? (
                    <p className="text-xs text-center text-orange-400">À espera de atribuição de conselheiro.</p>
                ) : (
                    <div className="flex gap-2 items-end">
                        <button
                            className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-not-allowed opacity-50"
                            title="Em breve"
                        >
                            <Paperclip className="text-[20px]" />
                        </button>
                        <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center px-3 py-2 border border-transparent focus-within:border-primary/30 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all">
                            <input
                                className="w-full bg-transparent border-none focus:ring-0 text-sm text-slate-900 dark:text-white placeholder-slate-400 p-0 outline-none"
                                placeholder="Digite sua mensagem..."
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKey}
                                disabled={sending}
                            />
                        </div>
                        <button
                            onClick={handleSendMessage}
                            disabled={sending || !input.trim()}
                            className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-50"
                            title="Enviar"
                        >
                            <Send className="text-[20px]" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function ChatPanelProvider({ children, config }: { children: ReactNode, config?: ChatConfig }) {
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
                        <ChatPanel onClose={close} config={config} />
                    </div>
                </div>
            )}
        </ChatContext.Provider>
    );
}
