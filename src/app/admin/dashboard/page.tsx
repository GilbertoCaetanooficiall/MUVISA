import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import { Users, ClipboardList, ShieldCheck, FolderOpen, Landmark, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard – MUVISA Admin',
  description: 'MUVISA admin dashboard overview: clients, visa processes, documents and deadlines.',
};

// ─── Stat Card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: any;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

function StatCard({ icon: Icon, label, value, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="p-2 bg-primary/10 rounded-lg text-primary">
          <Icon size={20} />
        </span>
        <span
          className={`text-xs font-bold ${
            trendUp ? 'text-accent-success' : 'text-accent-warning'
          }`}
        >
          {trend}
        </span>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

// ─── Recent Client Row ────────────────────────────────────────────────────────

interface ClientRowProps {
  initials: string;
  name: string;
  detail: string;
  status: 'Active' | 'Pending' | 'Review';
}

const statusStyles: Record<ClientRowProps['status'], string> = {
  Active: 'bg-accent-success/10 text-accent-success',
  Pending: 'bg-primary/10 text-primary',
  Review: 'bg-accent-warning/10 text-accent-warning',
};

function ClientRow({ initials, name, detail, status }: ClientRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{name}</p>
        <p className="text-xs text-slate-500 truncate">{detail}</p>
      </div>
      <span
        className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase flex-shrink-0 ${statusStyles[status]}`}
      >
        {status}
      </span>
    </div>
  );
}

// ─── Pending Document Row ─────────────────────────────────────────────────────

interface DocumentRowProps {
  icon: any;
  title: string;
  uploadedBy: string;
}

function DocumentRow({ icon: Icon, title, uploadedBy }: DocumentRowProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 flex-shrink-0">
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-slate-500">Uploaded by {uploadedBy}</p>
        <div className="mt-2 flex gap-2">
          <button className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded hover:bg-primary-hover transition-colors">
            Approve
          </button>
          <button className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Deadline Row ─────────────────────────────────────────────────────────────

interface DeadlineRowProps {
  title: string;
  detail: string;
  urgency: 'warning' | 'primary' | 'neutral';
}

const deadlineBorder: Record<DeadlineRowProps['urgency'], string> = {
  warning: 'border-accent-warning',
  primary: 'border-primary',
  neutral: 'border-slate-300 dark:border-slate-700',
};

function DeadlineRow({ title, detail, urgency }: DeadlineRowProps) {
  return (
    <div className={`border-l-4 pl-4 ${deadlineBorder[urgency]}`}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs text-slate-500">{detail}</p>
    </div>
  );
}

// ─── Dashboard Content ────────────────────────────────────────────────────────

function DashboardContent() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Welcome back. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard icon={Users}           label="Total Clients"   value="1,284" trend="+12%" trendUp />
        <StatCard icon={ClipboardList}   label="In Progress"     value="156"   trend="+5%"  trendUp />
        <StatCard icon={ShieldCheck}     label="Approved Visas"  value="892"   trend="-2%"  trendUp={false} />
        <StatCard icon={FolderOpen}      label="Pending Docs"    value="43"    trend="+8%"  trendUp />
        <StatCard icon={Landmark}        label="Universities"    value="120"   trend="+3%"  trendUp />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

        {/* Line Chart – Students to Portugal */}
        <div className="bg-white dark:bg-slate-900/40 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold">Students to Portugal</h3>
              <p className="text-sm text-slate-500">Monthly trend over the last 6 months</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">450</p>
              <p className="text-sm text-accent-success font-semibold">+15% vs LY</p>
            </div>
          </div>
          <div className="h-48 relative w-full">
            <svg
              className="w-full h-full"
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1656df" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path
                d="M0 130 C 50 120, 100 80, 150 90 S 250 40, 300 60 S 400 20, 500 10 V 150 H 0 Z"
                fill="url(#lineGradient)"
                opacity="0.15"
              />
              <path
                d="M0 130 C 50 120, 100 80, 150 90 S 250 40, 300 60 S 400 20, 500 10"
                stroke="#1656df"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex justify-between mt-3">
            {['JAN','FEB','MAR','APR','MAY','JUN'].map((m) => (
              <span key={m} className="text-xs text-slate-500 font-bold">{m}</span>
            ))}
          </div>
        </div>

        {/* Bar Chart – University Distribution */}
        <div className="bg-white dark:bg-slate-900/40 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold">University Distribution</h3>
              <p className="text-sm text-slate-500">Top destinations by applications</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">1,284</p>
              <p className="text-sm text-slate-500">Total Applications</p>
            </div>
          </div>
          <div className="h-48 flex items-end justify-between gap-4 px-2">
            {[
              { label: 'U. Porto',   height: '100%' },
              { label: 'U. Lisboa',  height: '80%'  },
              { label: 'U. Coimbra', height: '90%'  },
              { label: 'U. Minho',   height: '35%'  },
              { label: 'NOVA',       height: '45%'  },
            ].map(({ label, height }) => (
              <div key={label} className="group relative flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-primary/20 group-hover:bg-primary/50 transition-colors rounded-t-lg"
                  style={{ height }}
                />
                <span className="text-[10px] font-bold mt-2 text-slate-500 text-center">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Recent Clients */}
        <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold">Recent Clients</h3>
            <button className="text-primary text-sm font-semibold hover:underline">
              View All
            </button>
          </div>
          <div className="p-4 space-y-4">
            <ClientRow initials="AS" name="Anna Smith"      detail="Student Visa – Portugal" status="Active"  />
            <ClientRow initials="DM" name="David Miller"    detail="Work Visa – Lisbon"       status="Pending" />
            <ClientRow initials="ER" name="Elena Rodriguez" detail="Golden Visa – Algarve"    status="Review"  />
          </div>
        </div>

        {/* Pending Documents */}
        <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold">Pending Documents</h3>
            <button className="text-primary text-sm font-semibold hover:underline">
              Review All
            </button>
          </div>
          <div className="p-4 space-y-4">
            <DocumentRow icon={FileText} title="FBI Background Check"       uploadedBy="John Doe"    />
            <DocumentRow icon={FileText} title="Bank Statements (3 months)" uploadedBy="Maria Garcia" />
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold">Upcoming Deadlines</h3>
            <span className="text-xs font-bold px-2 py-1 bg-accent-warning/20 text-accent-warning rounded-lg">
              High Priority
            </span>
          </div>
          <div className="p-4 space-y-4">
            <DeadlineRow
              urgency="warning"
              title="Visa Appointment – James Wilson"
              detail="Tomorrow at 10:00 AM – VFS Global"
            />
            <DeadlineRow
              urgency="primary"
              title="Document Submission – University of Porto"
              detail="Oct 24, 2023 – 2 days remaining"
            />
            <DeadlineRow
              urgency="neutral"
              title="Tuition Payment Deadline – NOVA"
              detail="Oct 28, 2023 – 6 days remaining"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <DashboardContent />
    </AdminLayout>
  );
}
