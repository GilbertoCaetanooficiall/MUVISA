'use client';

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import MessagesList from '@/components/admin/messages/MessagesList';
import MessageThread from '@/components/admin/messages/MessageThread';

function MessagesContent() {
  const [activeConversationId, setActiveConversationId] = React.useState('C-001');

  return (
    <div className="flex flex-col h-full -m-8">
      {/* Page header */}
      <div className="px-8 py-6 border-b border-slate-200 dark:border-border-muted flex-shrink-0">
        <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
          Mensagens
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base mt-1">
          Comunique com estudantes e membros da equipa.
        </p>
      </div>

      {/* Main messaging UI */}
      <div className="flex flex-1 mx-8 mb-8 mt-6 border border-slate-200 dark:border-border-muted rounded-xl bg-white dark:bg-background-dark overflow-hidden">
        <MessagesList
          activeConversationId={activeConversationId}
          onSelectConversation={setActiveConversationId}
        />
        <MessageThread
          activeConversationId={activeConversationId}
        />
      </div>
    </div>
  );
}

export default function AdminMessagesPage() {
  return (
    <AdminLayout>
      <MessagesContent />
    </AdminLayout>
  );
}
