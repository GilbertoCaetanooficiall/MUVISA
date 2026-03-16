import { Phone, Info, MoreVertical, CheckCheck, PlusCircle, Paperclip, Smile, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  time: string;
  sent: boolean;
  readReceipt?: boolean;
}

const messages: Message[] = [
  {
    id: 'M-001',
    text: "Hi there! I wanted to check if you received the documents for my student visa application.",
    time: '10:30 AM', sent: false,
  },
  {
    id: 'M-002',
    text: "Hello Sarah! Yes, I've received the basic forms, but we are still missing the scanned copy of your passport.",
    time: '10:40 AM', sent: true, readReceipt: true,
  },
  {
    id: 'M-003',
    text: "Oh, I'm sorry about that! I've just uploaded it to the portal right now. Please check.",
    time: '10:45 AM', sent: false,
  },
];

export default function MessageThread() {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-background-dark/50">
      {/* Chat header */}
      <div className="flex h-20 items-center justify-between px-6 border-b border-slate-200 dark:border-border-muted bg-white dark:bg-neutral-slate/20">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
            SJ
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white text-base font-bold">Sarah Jenkins</h4>
            <div className="flex items-center gap-2">
              <div className="size-2 bg-green-500 rounded-full" />
              <span className="text-xs text-slate-500 dark:text-slate-400">Online</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center justify-center size-10 rounded-lg bg-slate-100 dark:bg-neutral-slate text-slate-600 dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
            <Phone size={20} />
          </button>
          <button className="flex items-center justify-center size-10 rounded-lg bg-slate-100 dark:bg-neutral-slate text-slate-600 dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
            <Info size={20} />
          </button>
          <button className="flex items-center justify-center size-10 rounded-lg bg-slate-100 dark:bg-neutral-slate text-slate-600 dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Message feed */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {/* Date separator */}
        <div className="flex items-center justify-center">
          <div className="h-px bg-slate-200 dark:bg-border-muted flex-1" />
          <span className="mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Today
          </span>
          <div className="h-px bg-slate-200 dark:bg-border-muted flex-1" />
        </div>

        {/* Messages */}
        {messages.map((msg) =>
          msg.sent ? (
            // Sent — right-aligned, primary blue
            <div key={msg.id} className="flex items-end gap-3 max-w-[80%] self-end flex-row-reverse">
              <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                You
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
            // Received — left-aligned, light gray in light / neutral-slate in dark
            <div key={msg.id} className="flex items-end gap-3 max-w-[80%] self-start">
              <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                SJ
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
      </div>

      {/* Input bar */}
      <div className="p-6 bg-white dark:bg-neutral-slate/10 border-t border-slate-200 dark:border-border-muted">
        <div className="flex items-center gap-3 bg-slate-100 dark:bg-neutral-slate rounded-xl p-2 px-4 shadow-sm">
          <button className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
            <PlusCircle size={20} />
          </button>
          <button className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
            <Paperclip size={20} />
          </button>
          <input
            className="flex-1 bg-transparent border-none text-slate-900 dark:text-white focus:ring-0 text-sm py-2 placeholder:text-slate-400"
            placeholder="Type your message..."
            type="text"
          />
          <div className="flex gap-3">
            <button className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
              <Smile size={20} />
            </button>
            <button className="bg-primary hover:bg-primary/80 text-white p-2 rounded-lg flex items-center justify-center transition-colors shadow-md">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
