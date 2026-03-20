'use client';

import React, { useState } from 'react';
import MessagesList from '@/components/admin/messages/MessagesList';
import MessageThread from '@/components/admin/messages/MessageThread';

export type ConversationStatus = 'aberto' | 'resolvido';

export interface Message {
  id: string;
  text: string;
  time: string;
  sent: boolean;
  readReceipt?: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  initials: string;
  lastMessage: string;
  time: string;
  online: boolean;
  unread?: number;
  category: 'estudante' | 'funcionario';
  status: ConversationStatus;
}

const initialConversations: Conversation[] = [
  {
    id: 'C-001', name: 'Sarah Jenkins', initials: 'SJ',
    lastMessage: "Carreguei a cópia do meu passaporte no portal.",
    time: '10:45', online: true, unread: 2, category: 'estudante', status: 'aberto'
  },
  {
    id: 'C-002', name: 'Dr. Aris Thorne', initials: 'AT',
    lastMessage: 'A revisão das candidaturas está concluída.',
    time: 'Ontem', online: false, category: 'funcionario', status: 'aberto'
  },
  {
    id: 'C-003', name: 'Kevin Zhao', initials: 'KZ',
    lastMessage: 'Quando é o prazo da entrevista?',
    time: 'Ontem', online: true, category: 'estudante', status: 'aberto'
  },
  {
    id: 'C-004', name: 'Maria Garcia', initials: 'MG',
    lastMessage: 'Obrigado pela resposta rápida!',
    time: 'Seg', online: false, category: 'estudante', status: 'resolvido'
  },
];

const initialMessages: Record<string, Message[]> = {
  'C-001': [
    { id: 'M-001', text: 'Olá! Gostaria de verificar se recebeu os documentos.', time: '10:30', sent: false },
    { id: 'M-002', text: 'Olá Sarah! Sim, recebi a base, mas falta a cópia.', time: '10:40', sent: true, readReceipt: true },
    { id: 'M-003', text: 'Carreguei a cópia do meu passaporte no portal.', time: '10:45', sent: false },
  ],
  'C-002': [
    { id: 'M-010', text: 'Como está a revisão?', time: '09:00', sent: true, readReceipt: true },
    { id: 'M-011', text: 'A revisão das candidaturas está concluída.', time: '14:30', sent: false },
  ],
  'C-003': [
    { id: 'M-020', text: 'Bom dia, quando é o prazo da entrevista?', time: '11:00', sent: false },
    { id: 'M-021', text: 'O prazo é até ao final deste mês.', time: '11:15', sent: true, readReceipt: true },
  ],
  'C-004': [
    { id: 'M-030', text: 'Boa tarde! Preciso de status do processo.', time: '15:00', sent: false },
    { id: 'M-031', text: 'O processo está em análise.', time: '15:10', sent: true, readReceipt: true },
    { id: 'M-032', text: 'Obrigado pela resposta rápida!', time: '15:12', sent: false },
  ],
};

export default function MessagesClient() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>(initialMessages);
  const [activeConversationId, setActiveConversationId] = useState<string>('C-001');

  const onSelectConversation = (id: string) => {
    setActiveConversationId(id);
    // Clear unread logic
    setConversations(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
  };

  const onSendMessage = (text: string) => {
    const thread = messagesMap[activeConversationId] ?? [];
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const newMsg: Message = {
      id: `M-${Date.now()}`,
      text,
      time: timeStr,
      sent: true,
      readReceipt: false,
    };

    setMessagesMap(prev => ({ ...prev, [activeConversationId]: [...thread, newMsg] }));
    
    // Update last message in conversation list
    setConversations(prev => prev.map(c => 
      c.id === activeConversationId ? { ...c, lastMessage: text, time: timeStr, status: 'aberto' } : c
    ));

    // Simulate Read Receipt
    setTimeout(() => {
      setMessagesMap(prev => {
        const t = prev[activeConversationId] ?? [];
        return {
          ...prev,
          [activeConversationId]: t.map(m => m.id === newMsg.id ? { ...m, readReceipt: true } : m)
        };
      });
    }, 1500);

    // Simulate Auto Reply
    setTimeout(() => {
      const autoReplyText = 'Obrigado, vou processar isto o mais rápido possível e entrarei em contacto!';
      const replyTime = `${now.getHours().toString().padStart(2, '0')}:${(now.getMinutes() + 1).toString().padStart(2, '0')}`;
      const replyMsg: Message = {
        id: `M-${Date.now() + 100}`,
        text: autoReplyText,
        time: replyTime,
        sent: false,
      };
      
      setMessagesMap(prev => ({ ...prev, [activeConversationId]: [...(prev[activeConversationId] ?? []), replyMsg] }));
      setConversations(prev => prev.map(c => 
        c.id === activeConversationId 
          ? { ...c, lastMessage: autoReplyText, time: replyTime, unread: (c.unread || 0) + 1 } 
          : c
      ));
    }, 3000);
  };

  const onResolveTicket = () => {
    setConversations(prev => prev.map(c => c.id === activeConversationId ? { ...c, status: 'resolvido' } : c));
  };

  const onDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(conversations.find(c => c.id !== id)?.id || '');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] -m-8">
      {/* Page header */}
      <div className="px-8 py-6 border-b border-slate-200 dark:border-border-muted flex-shrink-0 bg-white dark:bg-background-dark shadow-sm">
        <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
          Mensagens e Tickets
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Comunique com estudantes, acompanhe pedidos e feche tickets de apoio resolvidos.
        </p>
      </div>

      {/* Main messaging UI */}
      <div className="flex flex-1 m-8 mb-0 border border-slate-200 dark:border-border-muted rounded-t-xl overflow-hidden bg-white dark:bg-background-dark shadow-sm h-0">
        <MessagesList
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={onSelectConversation}
        />
        <MessageThread
          activeConversation={conversations.find(c => c.id === activeConversationId)}
          messages={messagesMap[activeConversationId] ?? []}
          onSendMessage={onSendMessage}
          onResolveTicket={onResolveTicket}
          onDeleteConversation={() => onDeleteConversation(activeConversationId)}
        />
      </div>
    </div>
  );
}
