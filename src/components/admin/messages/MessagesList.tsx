'use client';

import React from 'react';
import { Search } from 'lucide-react';
import type { Conversation } from '@/app/admin/messages/MessagesClient';

export const avatarColors: Record<string, string> = {
  'SJ': 'bg-blue-600',
  'AT': 'bg-purple-600',
  'KZ': 'bg-emerald-600',
  'MG': 'bg-rose-600',
};

type TabFilter = 'Abertos' | 'Estudantes' | 'Resolvidos';

interface MessagesListProps {
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
}

export default function MessagesList({ conversations, activeConversationId, onSelectConversation }: MessagesListProps) {
  const [activeTab, setActiveTab] = React.useState<TabFilter>('Abertos');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredConversations = conversations.filter((c) => {
    // Category filter
    if (activeTab === 'Abertos' && c.status !== 'aberto') return false;
    if (activeTab === 'Estudantes' && c.category !== 'estudante') return false;
    if (activeTab === 'Resolvidos' && c.status !== 'resolvido') return false;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q)
      );
    }

    return true;
  });

  return (
    <div className="w-1/3 min-w-[300px] flex flex-col border-r border-slate-200 dark:border-border-muted bg-slate-50/50 dark:bg-neutral-slate/10">
      {/* Search */}
      <div className="p-4 border-b border-slate-200 dark:border-border-muted bg-white dark:bg-background-dark">
        <div className="flex items-center rounded-lg bg-slate-100 dark:bg-neutral-slate px-3 py-2 gap-2 focus-within:ring-2 focus-within:ring-primary/30 transition-shadow">
          <Search className="text-slate-400" size={18} />
          <input
            className="bg-transparent border-none text-slate-900 dark:text-white text-sm focus:ring-0 w-full placeholder:text-slate-400 p-0 outline-none"
            placeholder="Pesquisar tickets..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex px-4 pt-2 border-b border-slate-200 dark:border-border-muted bg-white dark:bg-background-dark">
        {(['Abertos', 'Estudantes', 'Resolvidos'] as TabFilter[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-primary text-primary dark:text-white'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-6 text-center text-sm text-slate-400">
            Nenhuma conversa encontrada.
          </div>
        ) : (
          filteredConversations.map((c) => (
            <div
              key={c.id}
              onClick={() => onSelectConversation(c.id)}
              className={`flex items-center gap-3 p-4 cursor-pointer border-l-4 transition-colors ${
                c.id === activeConversationId
                  ? 'bg-primary/10 dark:bg-primary/20 border-primary'
                  : 'border-transparent hover:bg-white dark:hover:bg-neutral-slate/30'
              }`}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className={`size-11 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm ${avatarColors[c.initials] ?? 'bg-slate-600'}`}>
                  {c.initials}
                </div>
                {c.status === 'aberto' ? (
                  <div className={`absolute bottom-0 right-0 size-3 xl:size-3.5 rounded-full border-2 border-white dark:border-background-dark ${c.online ? 'bg-green-500' : 'bg-slate-400'}`} />
                ) : (
                  <div className="absolute bottom-0 right-0 size-4 xl:size-4.5 rounded-full border-2 border-white dark:border-background-dark bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <div className="size-2 bg-slate-500 rounded-full" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className={`text-sm font-bold truncate ${c.id === activeConversationId ? 'text-primary dark:text-white' : 'text-slate-900 dark:text-white'}`}>{c.name}</h4>
                  <span className="text-[10px] text-slate-400 ml-2 flex-shrink-0 font-bold">{c.time}</span>
                </div>
                <div className="flex justify-between items-center gap-2 mt-0.5">
                  <p className={`text-xs truncate ${c.unread && c.id !== activeConversationId ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                    {c.lastMessage}
                  </p>
                  
                  {/* Unread badge */}
                  {c.unread && c.id !== activeConversationId ? (
                    <div className="bg-primary size-5 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-white">{c.unread}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
