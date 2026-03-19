'use client';

import React, { useRef, useEffect } from 'react';
import {
  Phone, Video, Info, MoreVertical, CheckCheck,
  PlusCircle, Paperclip, Smile, Send, X,
  Archive, Trash2, VolumeX, Flag,
  Image as ImageIcon, FileText, MapPin,
} from 'lucide-react';
import { allConversations, avatarColors } from './MessagesList';

/* ───────── Types ───────── */

interface Message {
  id: string;
  text: string;
  time: string;
  sent: boolean;
  readReceipt?: boolean;
}

type MessagesMap = Record<string, Message[]>;

/* ───────── Initial seed data per conversation ───────── */

const seedMessages: MessagesMap = {
  'C-001': [
    { id: 'M-001', text: 'Olá! Gostaria de verificar se recebeu os documentos para o meu pedido de visto de estudante.', time: '10:30', sent: false },
    { id: 'M-002', text: 'Olá Sarah! Sim, recebi os formulários básicos, mas ainda falta a cópia digitalizada do seu passaporte.', time: '10:40', sent: true, readReceipt: true },
    { id: 'M-003', text: 'Oh, peço desculpa por isso! Acabei de carregá-lo no portal agora mesmo. Por favor, verifique.', time: '10:45', sent: false },
  ],
  'C-002': [
    { id: 'M-010', text: 'Dr. Thorne, como está o andamento da revisão do Grupo B?', time: '09:00', sent: true, readReceipt: true },
    { id: 'M-011', text: 'A revisão das candidaturas para o Grupo B está concluída. Envio o relatório em breve.', time: '14:30', sent: false },
  ],
  'C-003': [
    { id: 'M-020', text: 'Bom dia, quando é o prazo para a marcação da entrevista de visto?', time: '11:00', sent: false },
    { id: 'M-021', text: 'Bom dia Kevin! O prazo é até ao final deste mês. Recomendo marcar o mais cedo possível.', time: '11:15', sent: true, readReceipt: true },
  ],
  'C-004': [
    { id: 'M-030', text: 'Boa tarde! Preciso de informações sobre o estado do meu processo.', time: '15:00', sent: false },
    { id: 'M-031', text: 'Boa tarde Maria! O seu processo está em análise. Atualizaremos em 2 dias úteis.', time: '15:10', sent: true, readReceipt: true },
    { id: 'M-032', text: 'Obrigado pela resposta rápida!', time: '15:12', sent: false },
  ],
};

/* ───────── Emoji palette (mini) ───────── */

const emojis = ['😀', '😂', '😍', '👍', '👋', '🙏', '🎉', '❤️', '🔥', '✅', '📄', '📎', '📞', '💬', '⭐', '✨'];

/* ───────── Component ───────── */

interface MessageThreadProps {
  activeConversationId: string;
}

export default function MessageThread({ activeConversationId }: MessageThreadProps) {
  /* ── State ── */
  const [messagesMap, setMessagesMap] = React.useState<MessagesMap>(seedMessages);
  const [inputValue, setInputValue] = React.useState('');
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [showMoreMenu, setShowMoreMenu] = React.useState(false);
  const [showInfoPanel, setShowInfoPanel] = React.useState(false);
  const [showAttachMenu, setShowAttachMenu] = React.useState(false);
  const [showPlusMenu, setShowPlusMenu] = React.useState(false);
  const [callingStatus, setCallingStatus] = React.useState<'idle' | 'calling' | 'in-call'>('idle');
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const feedRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const conversation = allConversations.find((c) => c.id === activeConversationId);
  const messages = messagesMap[activeConversationId] ?? [];

  /* ── Auto-scroll on new messages ── */
  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length, activeConversationId]);

  /* ── Close menus on outside click ── */
  useEffect(() => {
    function handleClick() {
      setShowMoreMenu(false);
      setShowAttachMenu(false);
      setShowPlusMenu(false);
    }
    // delayed so the opening click doesn't immediately close
    const id = setTimeout(() => document.addEventListener('click', handleClick), 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener('click', handleClick);
    };
  }, [showMoreMenu, showAttachMenu, showPlusMenu]);

  /* ── Toast helper ── */
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  /* ── Send message ── */
  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newMsg: Message = {
      id: `M-${Date.now()}`,
      text,
      time: timeStr,
      sent: true,
      readReceipt: false,
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] ?? []), newMsg],
    }));
    setInputValue('');
    setShowEmojiPicker(false);

    // Simulate a read receipt after 1.5s
    setTimeout(() => {
      setMessagesMap((prev) => ({
        ...prev,
        [activeConversationId]: (prev[activeConversationId] ?? []).map((m) =>
          m.id === newMsg.id ? { ...m, readReceipt: true } : m
        ),
      }));
    }, 1500);

    // Simulate auto-reply after 3s
    setTimeout(() => {
      const replies = [
        'Obrigado pela informação! Vou verificar.',
        'Entendido, obrigado!',
        'Perfeito, já anotei aqui.',
        'Ok, irei tratar disso imediatamente.',
        'Ótimo, muito obrigado pela atualização!',
      ];
      const autoReply: Message = {
        id: `M-${Date.now() + 1}`,
        text: replies[Math.floor(Math.random() * replies.length)],
        time: `${now.getHours().toString().padStart(2, '0')}:${(now.getMinutes() + 1).toString().padStart(2, '0')}`,
        sent: false,
      };
      setMessagesMap((prev) => ({
        ...prev,
        [activeConversationId]: [...(prev[activeConversationId] ?? []), autoReply],
      }));
    }, 3000);
  };

  /* ── Phone call simulation ── */
  const handleCall = () => {
    if (callingStatus !== 'idle') return;
    setCallingStatus('calling');
    showToast(`A ligar para ${conversation?.name}...`);
    setTimeout(() => {
      setCallingStatus('in-call');
      showToast(`Em chamada com ${conversation?.name}`);
    }, 2000);
    setTimeout(() => {
      setCallingStatus('idle');
      showToast('Chamada terminada.');
    }, 6000);
  };

  /* ── Emoji insert ── */
  const insertEmoji = (emoji: string) => {
    setInputValue((prev) => prev + emoji);
    inputRef.current?.focus();
  };

  /* ── Keyboard shortcut (Enter to send) ── */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-background-dark/50">
        <p className="text-slate-400 text-sm">Selecione uma conversa para começar.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-background-dark/50 relative">
      {/* ───── Toast ───── */}
      {toastMessage && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white text-sm px-5 py-2.5 rounded-xl shadow-lg animate-fade-in flex items-center gap-2">
          {callingStatus === 'calling' && <Phone size={14} className="animate-pulse" />}
          {callingStatus === 'in-call' && <Phone size={14} className="text-green-400" />}
          {toastMessage}
        </div>
      )}

      {/* ───── Chat header ───── */}
      <div className="flex h-20 items-center justify-between px-6 border-b border-slate-200 dark:border-border-muted bg-white dark:bg-neutral-slate/20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${avatarColors[conversation.initials] ?? 'bg-slate-600'}`}>
            {conversation.initials}
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white text-base font-bold">{conversation.name}</h4>
            <div className="flex items-center gap-2">
              <div className={`size-2 rounded-full ${conversation.online ? 'bg-green-500' : 'bg-slate-400'}`} />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {conversation.online ? 'Online' : 'Offline'}
              </span>
              {callingStatus === 'in-call' && (
                <span className="text-xs text-green-500 font-bold ml-1">● Em chamada</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {/* Phone */}
          <button
            onClick={handleCall}
            disabled={callingStatus !== 'idle'}
            className={`flex items-center justify-center size-10 rounded-lg transition-colors ${
              callingStatus !== 'idle'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                : 'bg-slate-100 dark:bg-neutral-slate text-slate-600 dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20'
            }`}
            title="Ligar"
          >
            <Phone size={20} />
          </button>

          {/* Info panel toggle */}
          <button
            onClick={() => setShowInfoPanel(!showInfoPanel)}
            className={`flex items-center justify-center size-10 rounded-lg transition-colors ${
              showInfoPanel
                ? 'bg-primary/10 dark:bg-primary/20 text-primary'
                : 'bg-slate-100 dark:bg-neutral-slate text-slate-600 dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20'
            }`}
            title="Informações do contato"
          >
            <Info size={20} />
          </button>

          {/* More options */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowMoreMenu(!showMoreMenu); }}
              className="flex items-center justify-center size-10 rounded-lg bg-slate-100 dark:bg-neutral-slate text-slate-600 dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
              title="Mais opções"
            >
              <MoreVertical size={20} />
            </button>
            {showMoreMenu && (
              <div className="absolute right-0 top-12 w-52 bg-white dark:bg-neutral-slate border border-slate-200 dark:border-border-muted rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
                {[
                  { icon: Archive, label: 'Arquivar conversa', action: () => showToast('Conversa arquivada.') },
                  { icon: VolumeX, label: 'Silenciar notificações', action: () => showToast('Notificações silenciadas.') },
                  { icon: Flag, label: 'Marcar como importante', action: () => showToast('Conversa marcada.') },
                  { icon: Trash2, label: 'Apagar conversa', action: () => showToast('Conversa apagada.'), danger: true },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => { item.action(); setShowMoreMenu(false); }}
                    className={`flex items-center gap-3 px-4 py-3 w-full text-sm text-left transition-colors ${
                      (item as { danger?: boolean }).danger
                        ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-slate/50'
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ───── Body: messages + optional info panel ───── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Message feed */}
        <div ref={feedRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {/* Date separator */}
          <div className="flex items-center justify-center">
            <div className="h-px bg-slate-200 dark:bg-border-muted flex-1" />
            <span className="mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Hoje
            </span>
            <div className="h-px bg-slate-200 dark:bg-border-muted flex-1" />
          </div>

          {/* Messages */}
          {messages.map((msg) =>
            msg.sent ? (
              <div key={msg.id} className="flex items-end gap-3 max-w-[80%] self-end flex-row-reverse animate-fade-in">
                <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                  Eu
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <div className="bg-primary text-white p-3 rounded-xl rounded-br-none text-sm leading-relaxed shadow-sm">
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-slate-400">{msg.time}</span>
                    {msg.readReceipt && (
                      <CheckCheck className="text-primary" size={12} />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex items-end gap-3 max-w-[80%] self-start animate-fade-in">
                <div className={`size-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${avatarColors[conversation.initials] ?? 'bg-slate-600'}`}>
                  {conversation.initials}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="bg-slate-200 dark:bg-neutral-slate text-slate-900 dark:text-white p-3 rounded-xl rounded-bl-none text-sm leading-relaxed shadow-sm">
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400">{msg.time}</span>
                </div>
              </div>
            )
          )}

          {/* Typing indicator after sending (briefly) */}
        </div>

        {/* ───── Info side-panel ───── */}
        {showInfoPanel && (
          <div className="w-72 border-l border-slate-200 dark:border-border-muted bg-white dark:bg-neutral-slate/20 flex flex-col animate-slide-in-right overflow-y-auto flex-shrink-0">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-border-muted">
              <h3 className="text-slate-900 dark:text-white text-sm font-bold">Informações do Contato</h3>
              <button onClick={() => setShowInfoPanel(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 flex flex-col items-center gap-4">
              <div className={`size-16 rounded-full flex items-center justify-center text-white text-xl font-bold ${avatarColors[conversation.initials] ?? 'bg-slate-600'}`}>
                {conversation.initials}
              </div>
              <div className="text-center">
                <h4 className="text-slate-900 dark:text-white font-bold">{conversation.name}</h4>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <div className={`size-2 rounded-full ${conversation.online ? 'bg-green-500' : 'bg-slate-400'}`} />
                  <span className="text-xs text-slate-500">{conversation.online ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
            <div className="px-5 pb-5 flex flex-col gap-3">
              <div className="bg-slate-50 dark:bg-neutral-slate/30 rounded-lg p-3">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Categoria</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {conversation.category === 'estudante' ? 'Estudante' : 'Funcionário'}
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-neutral-slate/30 rounded-lg p-3">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Mensagens</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">{messages.length} mensagens</p>
              </div>
              <div className="bg-slate-50 dark:bg-neutral-slate/30 rounded-lg p-3">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Última atividade</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">{conversation.time}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ───── Input bar ───── */}
      <div className="p-6 bg-white dark:bg-neutral-slate/10 border-t border-slate-200 dark:border-border-muted flex-shrink-0 relative">
        {/* Emoji picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-full right-6 mb-2 bg-white dark:bg-neutral-slate border border-slate-200 dark:border-border-muted rounded-xl shadow-xl p-3 z-50 animate-fade-in">
            <div className="grid grid-cols-8 gap-1">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => insertEmoji(emoji)}
                  className="size-9 flex items-center justify-center text-lg hover:bg-slate-100 dark:hover:bg-neutral-slate/50 rounded-lg transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 bg-slate-100 dark:bg-neutral-slate rounded-xl p-2 px-4 shadow-sm">
          {/* Plus button (quick actions) */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowPlusMenu(!showPlusMenu); setShowAttachMenu(false); }}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
              title="Ações rápidas"
            >
              <PlusCircle size={20} />
            </button>
            {showPlusMenu && (
              <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-neutral-slate border border-slate-200 dark:border-border-muted rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
                {[
                  { icon: FileText, label: 'Enviar template', action: () => { setInputValue('Olá! Segue em anexo a informação solicitada. Qualquer dúvida, estou disponível.'); setShowPlusMenu(false); } },
                  { icon: MapPin, label: 'Enviar localização', action: () => { showToast('Localização enviada.'); setShowPlusMenu(false); } },
                  { icon: Video, label: 'Iniciar videochamada', action: () => { showToast('A iniciar videochamada...'); setShowPlusMenu(false); } },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="flex items-center gap-3 px-4 py-3 w-full text-sm text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-slate/50 transition-colors"
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Attach button */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowAttachMenu(!showAttachMenu); setShowPlusMenu(false); }}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
              title="Anexar ficheiro"
            >
              <Paperclip size={20} />
            </button>
            {showAttachMenu && (
              <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-neutral-slate border border-slate-200 dark:border-border-muted rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
                {[
                  { icon: ImageIcon, label: 'Imagem', action: () => { showToast('Selecione uma imagem...'); setShowAttachMenu(false); } },
                  { icon: FileText, label: 'Documento', action: () => { showToast('Selecione um documento...'); setShowAttachMenu(false); } },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="flex items-center gap-3 px-4 py-3 w-full text-sm text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-slate/50 transition-colors"
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            className="flex-1 bg-transparent border-none text-slate-900 dark:text-white focus:ring-0 text-sm py-2 placeholder:text-slate-400 outline-none"
            placeholder="Escreva a sua mensagem..."
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <div className="flex gap-3">
            {/* Emoji button */}
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className={`transition-colors ${showEmojiPicker ? 'text-primary' : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'}`}
              title="Emojis"
            >
              <Smile size={20} />
            </button>

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`p-2 rounded-lg flex items-center justify-center transition-all shadow-md ${
                inputValue.trim()
                  ? 'bg-primary hover:bg-primary/80 text-white cursor-pointer'
                  : 'bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
              }`}
              title="Enviar"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
