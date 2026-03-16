import { Search } from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
  initials: string;
  lastMessage: string;
  time: string;
  online: boolean;
  unread?: number;
  active?: boolean;
}

const conversations: Conversation[] = [
  {
    id: 'C-001', name: 'Sarah Jenkins',   initials: 'SJ',
    lastMessage: "I've uploaded my passport copy to the portal. Please check.",
    time: '10:45 AM', online: true, unread: 2, active: true,
  },
  {
    id: 'C-002', name: 'Dr. Aris Thorne', initials: 'AT',
    lastMessage: 'The application review for Group B is completed.',
    time: 'Yesterday', online: false,
  },
  {
    id: 'C-003', name: 'Kevin Zhao',      initials: 'KZ',
    lastMessage: 'When is the deadline for the visa interview booking?',
    time: 'Yesterday', online: true,
  },
  {
    id: 'C-004', name: 'Maria Garcia',    initials: 'MG',
    lastMessage: 'Thank you for the quick response!',
    time: 'Mon', online: false,
  },
];

const avatarColors: Record<string, string> = {
  'SJ': 'bg-blue-600',
  'AT': 'bg-purple-600',
  'KZ': 'bg-emerald-600',
  'MG': 'bg-rose-600',
};

export default function MessagesList() {
  return (
    <div className="w-1/3 min-w-[300px] flex flex-col border-r border-slate-200 dark:border-border-muted bg-white dark:bg-neutral-slate/10">
      {/* Search */}
      <div className="p-4 border-b border-slate-200 dark:border-border-muted">
        <div className="flex items-center rounded-lg bg-slate-100 dark:bg-neutral-slate px-3 py-2 gap-2">
          <Search className="text-slate-400" size={18} />
          <input
            className="bg-transparent border-none text-slate-900 dark:text-white text-sm focus:ring-0 w-full placeholder:text-slate-400 p-0"
            placeholder="Search conversations..."
            type="text"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex px-4 pt-2 border-b border-slate-200 dark:border-border-muted">
        {['All', 'Students', 'Staff'].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${
              i === 0
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
        {conversations.map((c) => (
          <div
            key={c.id}
            className={`flex items-center gap-3 p-4 cursor-pointer border-l-4 transition-colors ${
              c.active
                ? 'bg-primary/10 dark:bg-primary/20 border-primary'
                : 'border-transparent hover:bg-slate-50 dark:hover:bg-neutral-slate/30'
            }`}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className={`size-11 rounded-full flex items-center justify-center text-white text-sm font-bold ${avatarColors[c.initials] ?? 'bg-slate-600'}`}>
                {c.initials}
              </div>
              <div className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-white dark:border-background-dark ${c.online ? 'bg-green-500' : 'bg-slate-400'}`} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h4 className="text-slate-900 dark:text-white text-sm font-bold truncate">{c.name}</h4>
                <span className="text-[10px] text-slate-400 ml-2 flex-shrink-0">{c.time}</span>
              </div>
              <p className={`text-xs truncate ${c.active ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400'}`}>
                {c.lastMessage}
              </p>
            </div>

            {/* Unread badge */}
            {c.unread && (
              <div className="bg-primary size-5 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-bold text-white">{c.unread}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
