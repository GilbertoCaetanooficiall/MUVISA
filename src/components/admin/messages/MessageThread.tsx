'use client';

import React, { useRef, useEffect } from 'react';
import {
  Phone, Video, Info, MoreVertical, CheckCheck,
  PlusCircle, Paperclip, Smile, Send, X,
  Archive, Trash2, VolumeX, Flag, CheckCircle,
  Image as ImageIcon, FileText, MapPin,
} from 'lucide-react';
import { avatarColors } from './MessagesList';
import type { Conversation, Message } from '@/app/admin/messages/MessagesClient';

/* ───────── Emoji palette (mini) ───────── */
const emojis = ['😀', '😂', '😍', '👍', '👋', '🙏', '🎉', '❤️', '🔥', '✅', '📄', '📎', '📞', '💬', '⭐', '✨'];

/* ───────── Component ───────── */

interface MessageThreadProps {
  activeConversation?: Conversation;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onResolveTicket: () => void;
  onDeleteConversation: () => void;
}

export default function MessageThread({
  activeConversation,
  messages,
  onSendMessage,
  onResolveTicket,
  onDeleteConversation,
}: MessageThreadProps) {
  /* ── State ── */
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

  /* ── Auto-scroll on new messages ── */
  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length, activeConversation?.id]);

  /* ── Close menus on outside click ── */
  useEffect(() => {
    function handleClick() {
      setShowMoreMenu(false);
      setShowAttachMenu(false);
      setShowPlusMenu(false);
    }
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

    onSendMessage(text);
    setInputValue('');
    setShowEmojiPicker(false);
  };

  /* ── Keyboard shortcut (Enter to send) ── */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* ── Phone call simulation ── */
  const handleCall = () => {
    if (callingStatus !== 'idle') return;
    setCallingStatus('calling');
    showToast(`A ligar para ${activeConversation?.name}...`);
    setTimeout(() => {
      setCallingStatus('in-call');
      showToast(`Em chamada com ${activeConversation?.name}`);
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

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-background-dark/50 p-8 text-center flex-col">
        <div className="size-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4 animate-pulse">
           <Info size={30} />
        </div>
        <p className="text-slate-500 font-bold dark:text-slate-400">Selecione um Ticket ou Mensagem</p>
        <p className="text-sm text-slate-400 mt-2">Nenhuma conversa selecionada no painel esquerdo.</p>
      </div>
    );
  }

  const isResolved = activeConversation.status === 'resolvido';

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
          <div className={`size-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm ${avatarColors[activeConversation.initials] ?? 'bg-slate-600'}`}>
            {activeConversation.initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-slate-900 dark:text-white text-base font-bold">{activeConversation.name}</h4>
              {isResolved && <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-200 dark:bg-slate-700 px-2 rounded-full py-0.5 tracking-wider">Resolvido</span>}
            </div>
            {!isResolved ? (
               <div className="flex items-center gap-2 mt-0.5">
               <div className={`size-2 rounded-full ${activeConversation.online ? 'bg-green-500' : 'bg-slate-400'}`} />
               <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                 {activeConversation.online ? 'Online' : 'Offline'}
               </span>
               {callingStatus === 'in-call' && (
                 <span className="text-xs text-green-500 font-bold ml-1">● Em chamada</span>
               )}
             </div>
            ) : (
                <div className="flex items-center gap-1 mt-0.5 text-xs text-slate-400 font-medium">
                    Ticket Fechado — Arquivado
                </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {/* Resolve Ticket Button */}
          {!isResolved && (
            <button
               onClick={() => {
                   onResolveTicket();
                   showToast('Ticket fechado e resolvido!');
               }}
               className="flex items-center justify-center px-4 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-500 transition-colors gap-2 text-sm font-bold"
               title="Fechar Ticket"
            >
               <CheckCircle size={18} />
               <span className="hidden lg:inline">Resolver Ticket</span>
            </button>
          )}

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
                  { icon: Archive, label: 'Arquivar ticket', action: () => showToast('Conversa arquivada.') },
                  { icon: VolumeX, label: 'Silenciar notificações', action: () => showToast('Notificações silenciadas.') },
                  { icon: Flag, label: 'Sinalizar (Flag)', action: () => showToast('Ticket marcado.') },
                  { icon: Trash2, label: 'Apagar ticket', action: () => { showToast('Ticket apagado.'); onDeleteConversation(); }, danger: true },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => { item.action(); setShowMoreMenu(false); }}
                    className={`flex items-center gap-3 px-4 py-3 w-full text-sm font-semibold text-left transition-colors ${
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
        <div ref={feedRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scroll-smooth">
          {/* Date separator */}
          <div className="flex items-center justify-center mt-2">
            <div className="h-px bg-slate-200 dark:bg-border-muted flex-1" />
            <span className="mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              Histórico
            </span>
            <div className="h-px bg-slate-200 dark:bg-border-muted flex-1" />
          </div>

          {/* Messages */}
          {messages.map((msg) =>
            msg.sent ? (
              <div key={msg.id} className="flex items-end gap-3 max-w-[80%] self-end flex-row-reverse animate-fade-in">
                <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] shadow-sm font-bold flex-shrink-0">
                  ADMIN
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <div className="bg-primary text-white p-3.5 px-4 rounded-2xl rounded-br-sm text-sm font-medium leading-relaxed shadow-sm">
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1.5 opacity-80 mt-0.5">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">{msg.time}</span>
                    {msg.readReceipt && (
                      <CheckCheck className="text-primary" size={12} />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex items-end gap-3 max-w-[80%] self-start animate-fade-in">
                <div className={`size-8 shadow-sm rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${avatarColors[activeConversation.initials] ?? 'bg-slate-600'}`}>
                  {activeConversation.initials}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="bg-white dark:bg-neutral-slate text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800 p-3.5 px-4 rounded-2xl rounded-bl-sm text-sm font-medium leading-relaxed shadow-sm">
                    {msg.text}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-0.5">{msg.time}</span>
                </div>
              </div>
            )
          )}
        </div>

        {/* ───── Info side-panel ───── */}
        {showInfoPanel && (
          <div className="w-72 border-l border-slate-200 dark:border-border-muted bg-white dark:bg-neutral-slate/20 flex flex-col animate-slide-in-right overflow-y-auto flex-shrink-0">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-border-muted">
              <h3 className="text-slate-900 dark:text-white text-sm font-bold">Resumo do Ticket</h3>
              <button onClick={() => setShowInfoPanel(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 flex flex-col items-center gap-4 border-b border-slate-100 dark:border-slate-800">
              <div className={`size-20 shadow-md rounded-full flex items-center justify-center text-white text-2xl font-bold ${avatarColors[activeConversation.initials] ?? 'bg-slate-600'}`}>
                {activeConversation.initials}
              </div>
              <div className="text-center">
                <h4 className="text-slate-900 dark:text-white font-black text-lg">{activeConversation.name}</h4>
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <div className={`size-2.5 rounded-full ${activeConversation.online ? 'bg-green-500' : 'bg-slate-400'}`} />
                  <span className="text-xs font-bold text-slate-500 uppercase">{activeConversation.online ? 'Online Agora' : 'Inativo Recente'}</span>
                </div>
              </div>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <div className="bg-slate-50 dark:bg-neutral-slate/30 border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1.5">Estatuto</p>
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${isResolved ? 'bg-slate-200 text-slate-500' : 'bg-primary/10 text-primary'}`}>
                        {isResolved ? 'FECHADO' : 'ABERTO'}
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {activeConversation.category === 'estudante' ? 'Estudante' : 'Membro Staff'}
                    </span>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-neutral-slate/30 border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1.5">Interações Atuais</p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{messages.length} mensagens trocadas</p>
              </div>
              <div className="bg-slate-50 dark:bg-neutral-slate/30 border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1.5">ID Interno do Ticket</p>
                <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">#{activeConversation.id}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ───── Input bar ───── */}
      {!isResolved ? (
          <div className="p-6 pt-4 bg-white dark:bg-neutral-slate/10 border-t border-slate-200 dark:border-border-muted flex-shrink-0 relative">
            {/* Emoji picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-full right-6 mb-2 bg-white dark:bg-neutral-slate border border-slate-200 dark:border-border-muted rounded-xl shadow-xl p-3 z-50 animate-fade-in">
                <div className="grid grid-cols-8 gap-1">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => insertEmoji(emoji)}
                      className="size-9 flex items-center justify-center text-lg hover:bg-slate-100 dark:hover:bg-neutral-slate/50 rounded-lg transition-colors focus:bg-slate-200"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 bg-slate-100 dark:bg-neutral-slate border border-slate-200 dark:border-slate-700/50 rounded-2xl p-2 px-4 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              {/* Plus button (quick actions) */}
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowPlusMenu(!showPlusMenu); setShowAttachMenu(false); }}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Ações rápidas"
                >
                  <PlusCircle size={20} />
                </button>
                {showPlusMenu && (
                  <div className="absolute bottom-full left-0 mb-3 w-56 bg-white dark:bg-neutral-slate border border-slate-200 dark:border-border-muted rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
                    {[
                      { icon: FileText, label: 'Inserir FAQ Padrão', action: () => { setInputValue('Olá! Segue em anexo a informação solicitada. Qualquer dúvida adicional, pergunte!'); setShowPlusMenu(false); inputRef.current?.focus(); } },
                      { icon: MapPin, label: 'Localização do Escritório', action: () => { showToast('Localização enviada em fundo.'); setShowPlusMenu(false); } },
                      { icon: Video, label: 'Iniciar Videochamada', action: () => { showToast('Pop-up de videochamada lançado...'); setShowPlusMenu(false); } },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={item.action}
                        className="flex items-center gap-3 px-4 py-3 w-full text-sm font-semibold text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-slate/50 transition-colors"
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
                  className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Anexar ficheiro"
                >
                  <Paperclip size={20} />
                </button>
                {showAttachMenu && (
                  <div className="absolute bottom-full left-0 mb-3 w-48 bg-white dark:bg-neutral-slate border border-slate-200 dark:border-border-muted rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
                    {[
                      { icon: ImageIcon, label: 'Imagem da Galeria', action: () => { showToast('Sistema de upload aberto...'); setShowAttachMenu(false); } },
                      { icon: FileText, label: 'PDF ou Documento', action: () => { showToast('Sistema de documentos aberto...'); setShowAttachMenu(false); } },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={item.action}
                        className="flex items-center gap-3 px-4 py-3 w-full text-sm font-semibold text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-slate/50 transition-colors"
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
                className="flex-1 bg-transparent border-none text-slate-900 dark:text-white font-medium focus:ring-0 text-sm py-2.5 placeholder:text-slate-400 outline-none"
                placeholder={`Responder a ${activeConversation.name}...`}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />

              <div className="flex gap-2">
                {/* Emoji button */}
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className={`p-1.5 rounded transition-colors ${showEmojiPicker ? 'text-primary bg-primary/10' : 'text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                  title="Emojis"
                >
                  <Smile size={20} />
                </button>

                {/* Send button */}
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className={`p-2 rounded-xl flex items-center justify-center transition-all bg-primary ${
                    inputValue.trim()
                      ? 'hover:bg-primary/90 text-white cursor-pointer shadow-md shadow-primary/30 hover:-translate-y-0.5'
                      : 'opacity-50 text-white cursor-not-allowed grayscale'
                  }`}
                  title="Enviar"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
      ) : (
          <div className="p-6 bg-slate-50 dark:bg-background-dark border-t border-slate-200 dark:border-border-muted flex-shrink-0 flex items-center justify-center">
             <div className="px-6 py-3 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 flex items-center gap-3 border border-slate-300 dark:border-slate-700">
                <CheckCircle className="text-slate-500" size={18} />
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Este ticket de comunicação já se encontra resolvido.</span>
             </div>
          </div>
      )}
    </div>
  );
}
