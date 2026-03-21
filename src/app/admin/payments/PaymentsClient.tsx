'use client';

import { useState, useMemo } from 'react';
import PaymentsStats from '@/components/admin/payments/PaymentsStats';
import PaymentsTable from '@/components/admin/payments/PaymentsTable';
import { Download, Plus, X } from 'lucide-react';

export type PaymentStatus = 'Pago' | 'Aguardando Validação' | 'Por pagar' | 'Atrasado' | 'Reembolsado';
export type PaymentMethod = 'Multicaixa' | 'Transferência Bancária' | 'Cartão de Crédito' | 'Pix';

export interface Payment {
  id: string;
  invoiceId: string;
  clientName: string;
  clientInitials: string;
  amount: string;
  date: string;
  status: PaymentStatus;
  method: PaymentMethod;
  service: string;
  consultantName: string;
  consultantInitials: string;
  consultantAvatarClass: string;
  proofUrl?: string;
}

const initialPayments: Payment[] = [
  {
    id: 'PAY-001', invoiceId: 'INV-2024-001', clientName: 'Sarah Jenkins', clientInitials: 'SJ',
    amount: '1.000.000 Kz', date: '21 Mar, 2024', status: 'Pago', method: 'Transferência Bancária',
    service: 'Plano Diamond', consultantName: 'Michael King', consultantInitials: 'MK', consultantAvatarClass: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
  },
  {
    id: 'PAY-002', invoiceId: 'INV-2024-002', clientName: 'David Miller', clientInitials: 'DM',
    amount: '700.000 Kz', date: '20 Mar, 2024', status: 'Aguardando Validação', method: 'Transferência Bancária',
    service: 'Plano Académico', consultantName: 'Lisa Wong', consultantInitials: 'LW', consultantAvatarClass: 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400',
    proofUrl: 'https://images.unsplash.com/photo-1607513814885-f5a0eb365829?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Exemplo de comprovativo (fatura genérica)
  },
  {
    id: 'PAY-003', invoiceId: 'INV-2024-003', clientName: 'James Wilson', clientInitials: 'JW',
    amount: '400.000 Kz', date: '15 Mar, 2024', status: 'Pago', method: 'Cartão de Crédito',
    service: 'Plano Essencial', consultantName: 'Tom Chen', consultantInitials: 'TC', consultantAvatarClass: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'PAY-004', invoiceId: 'INV-2024-004', clientName: 'Elena Rodriguez', clientInitials: 'ER',
    amount: '1.000.000 Kz', date: '10 Mar, 2024', status: 'Atrasado', method: 'Transferência Bancária',
    service: 'Plano Diamond', consultantName: 'Michael King', consultantInitials: 'MK', consultantAvatarClass: 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400',
  },
  {
    id: 'PAY-005', invoiceId: 'INV-2024-005', clientName: 'Liam Wilson', clientInitials: 'LW',
    amount: '350.000 Kz', date: '05 Mar, 2024', status: 'Reembolsado', method: 'Multicaixa',
    service: 'Taxa Consular', consultantName: 'Ricardo Silva', consultantInitials: 'RS', consultantAvatarClass: 'bg-primary/20 text-primary',
  },
];

export default function PaymentsClient() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({ clientName: '', service: '', amount: '' });

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecord.clientName || !newRecord.service || !newRecord.amount) return;

    const names = newRecord.clientName.trim().split(' ');
    const initials = (names[0]?.[0] || 'C') + (names.length > 1 ? names[names.length - 1][0] : 'L');
    const idNum = Math.floor(Math.random() * 900) + 100;
    
    // Simulate current user submitting it
    const newPayment: Payment = {
      id: `PAY-${idNum}`,
      invoiceId: `INV-2024-${idNum}`,
      clientName: newRecord.clientName,
      clientInitials: initials.toUpperCase(),
      amount: newRecord.amount.includes('Kz') ? newRecord.amount : `${newRecord.amount} Kz`,
      date: new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Por pagar',
      method: 'Transferência Bancária',
      service: newRecord.service,
      consultantName: 'Ricardo Silva', // current admin
      consultantInitials: 'RS',
      consultantAvatarClass: 'bg-primary/20 text-primary',
    };

    setPayments(prev => [newPayment, ...prev]);
    setIsCreateModalOpen(false);
    setNewRecord({ clientName: '', service: '', amount: '' });
  };

  const filteredPayments = useMemo(() => {
    return payments.filter(p => {
      const matchSearch = p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || p.invoiceId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter ? p.status === statusFilter : true;
      return matchSearch && matchStatus;
    });
  }, [payments, searchQuery, statusFilter]);

  const handleExportExtract = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Calcular totais reais para o extrato (só dos Pagos)
    const paidPayments = filteredPayments.filter(p => p.status === 'Pago');
    
    // Esta função tenta limpar o Kz e converter para string/num, mas para visualização simples podemos apenas contar o número de recibos
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Extracto de Pagamentos - MUVISA</title>
          <style>
            @page { margin: 1cm; size: A4 portrait; }
            body { font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 20px; color: #1e293b; margin: 0; }
            h1 { font-size: 28px; margin-bottom: 4px; color: #0f172a; text-transform: uppercase; font-weight: 900; letter-spacing: -0.5px; }
            .header { border-bottom: 3px solid #f1f5f9; padding-bottom: 24px; margin-bottom: 32px; display: flex; justify-content: space-between; align-items: flex-end; }
            table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 40px; }
            th { text-align: left; padding: 14px 12px; border-bottom: 2px solid #cbd5e1; color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; }
            td { padding: 14px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; vertical-align: middle; }
            .text-right { text-align: right; }
            .badge { font-size: 10px; padding: 4px 10px; border-radius: 99px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
            .badge.Pago { background: #dcfce7; color: #166534; }
            .badge.Pendente { background: #dbeafe; color: #1e40af; }
            .badge.Atrasado { background: #ffedd5; color: #9a3412; }
            .badge.Reembolsado { background: #f1f5f9; color: #475569; }
            .total-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; width: 300px; margin-left: auto; }
            .total-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: #64748b; }
            .total-row.final { border-top: 2px solid #cbd5e1; padding-top: 12px; margin-top: 12px; font-size: 18px; color: #0f172a; font-weight: 900; margin-bottom: 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div style="font-size: 24px; font-weight: 900; letter-spacing: -1px; color: #1656df; margin-bottom: 16px;">MUVISA</div>
              <h1>Extracto Financeiro</h1>
              <p style="color: #64748b; margin:0; font-size: 14px; font-weight: 500;">Período / Filtro: ${statusFilter || 'Todos os Estados'} | Emitido a ${new Date().toLocaleDateString('pt-PT')} às ${new Date().toLocaleTimeString('pt-PT')}</p>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Fatura ID</th>
                <th>Data</th>
                <th>Cliente</th>
                <th>Serviço (Ref)</th>
                <th>Método</th>
                <th>Estado</th>
                <th class="text-right">Valor</th>
              </tr>
            </thead>
            <tbody>
              ${filteredPayments.map(p => {
                const badgeClass = p.status === 'Por pagar' || p.status === 'Aguardando Validação' ? 'Pendente' : p.status;
                return `
                <tr>
                  <td style="color: #64748b; font-family: monospace; font-size: 12px;">${p.invoiceId}</td>
                  <td style="font-weight: 500;">${p.date}</td>
                  <td style="font-weight: 700; color: #0f172a;">${p.clientName}</td>
                  <td style="color: #475569;">${p.service}</td>
                  <td style="color: #64748b;">${p.method}</td>
                  <td><span class="badge ${badgeClass}">${p.status}</span></td>
                  <td class="text-right" style="font-weight: 700; color: #0f172a;">${p.amount}</td>
                </tr>
              `}).join('')}
            </tbody>
          </table>

          <div class="total-box">
            <div class="total-row">
              <span>Total de Registos:</span>
              <span style="font-weight: 600; color: #0f172a;">${filteredPayments.length}</span>
            </div>
            <div class="total-row">
              <span>Pagamentos Sucesso:</span>
              <span style="font-weight: 600; color: #166534;">${paidPayments.length} registos</span>
            </div>
          </div>

          <p style="text-align: center; color: #94a3b8; font-size: 11px; margin-top: 80px; text-transform: uppercase; letter-spacing: 1px;">Este documento é um extracto puramente informativo e não possui valor fiscal (Não serve de fatura).</p>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    
    // Defer print to ensure images/CSS load
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Pagamentos
          </h1>
          <p className="text-slate-500 mt-1">
            Gira os recebimentos, faturas e controle financeiro dos clientes.
          </p>
        </div>
        <div className="flex gap-3 self-start md:self-auto">
          <button 
            onClick={handleExportExtract}
            className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all shadow-sm"
          >
            <Download size={18} />
            Exportar
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            Novo Registo
          </button>
        </div>
      </div>

      <PaymentsStats payments={payments} />

      <PaymentsTable 
        payments={filteredPayments}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onValidatePayment={(id: string) => {
          setPayments(p => p.map(x => x.id === id ? { ...x, status: 'Pago', proofUrl: undefined } : x));
        }}
        onDelete={(id: string) => {
          if (confirm('Eliminar este registo de pagamento?')) {
            setPayments(p => p.filter(x => x.id !== id));
          }
        }}
      />

      {/* Modal Novo Registo */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setIsCreateModalOpen(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
              Novo Registo de Fatura/Pagamento
            </h3>

            <form onSubmit={handleCreateRecord} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Cliente</label>
                <input 
                  required
                  placeholder="Nome do cliente (ex: João Silva)"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                  value={newRecord.clientName}
                  onChange={e => setNewRecord({...newRecord, clientName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Serviço/Taxa</label>
                <input 
                  required
                  placeholder="O que está a ser cobrado? (ex: Assessoria Visto)"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                  value={newRecord.service}
                  onChange={e => setNewRecord({...newRecord, service: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Valor a Cobrar</label>
                <input 
                  required
                  placeholder="Ex: 500.000 Kz"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                  value={newRecord.amount}
                  onChange={e => setNewRecord({...newRecord, amount: e.target.value})}
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="flex-1 py-2.5 font-bold rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700 transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:brightness-110 active:scale-95 transition-all">
                  Gerar Fatura
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
