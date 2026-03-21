import { useState } from 'react';
import Link from 'next/link';
import { Payment, PaymentStatus } from '@/app/admin/payments/PaymentsClient';
import { Search, Eye, Filter, MoreVertical, FileText, CheckCircle, Clock, AlertTriangle, XCircle, Receipt, ShieldCheck, X } from 'lucide-react';

interface PaymentsTableProps {
  payments: Payment[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  onValidatePayment: (id: string) => void;
  onDelete: (id: string) => void;
}

const statusStyle: Record<PaymentStatus, { color: string, icon: React.ElementType }> = {
  'Pago':        { color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400', icon: CheckCircle },
  'Aguardando Validação': { color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-400', icon: ShieldCheck },
  'Por pagar':    { color: 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400', icon: Clock },
  'Atrasado':    { color: 'bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-400', icon: AlertTriangle },
  'Reembolsado': { color: 'bg-slate-100 text-slate-800 dark:bg-slate-500/20 dark:text-slate-400', icon: XCircle },
};

export default function PaymentsTable({ payments, searchQuery, setSearchQuery, statusFilter, setStatusFilter, onValidatePayment, onDelete }: PaymentsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [proofToValidate, setProofToValidate] = useState<Payment | null>(null);
  const itemsPerPage = 6;
  
  const totalPages = Math.ceil(payments.length / itemsPerPage) || 1;
  const currentDocs = payments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleActionMore = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const action = prompt('Opções: Digite "eliminar" para remover:');
    if (action?.toLowerCase() === 'eliminar') {
      onDelete(id);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setCurrentPage(1);
  };

  return (
    <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      
      {/* Filters */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-1 min-w-[240px] gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="Pesquisar por cliente ou fatura..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <select 
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 py-2 pl-3 pr-8 focus:ring-1 focus:ring-primary outline-none transition-all"
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="">Todos os Estados</option>
            <option value="Pago">Pago</option>
            <option value="Aguardando Validação">Aguardando Validação</option>
            <option value="Por pagar">Por pagar</option>
            <option value="Atrasado">Atrasado</option>
            <option value="Reembolsado">Reembolsado</option>
          </select>
        </div>
        <button 
          onClick={clearFilters}
          className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          Limpar Filtros
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
              {['Cliente / Fatura', 'Valor & Método', 'Estado & Data', 'Consultor (Responsável)', 'Ações'].map((col) => (
                <th key={col} className={`px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider ${col === 'Ações' ? 'text-right' : ''}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {currentDocs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  Nenhum pagamento encontrado com os filtros atuais.
                </td>
              </tr>
            ) : currentDocs.map(p => {
              const StatusIcon = statusStyle[p.status].icon;
              return (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                  {/* Cliente e Fatura */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs flex-shrink-0">
                        {p.clientInitials}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors">{p.clientName}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <FileText size={12} /> {p.invoiceId} • {p.service}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Valor & Método */}
                  <td className="px-6 py-4">
                    <p className="font-bold text-sm text-slate-900 dark:text-white">{p.amount}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{p.method}</p>
                  </td>

                  {/* Estado & Data */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-start gap-1.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${statusStyle[p.status].color}`}>
                        <StatusIcon size={12} />
                        {p.status}
                      </span>
                      <p className="text-xs text-slate-500 font-medium">{p.date}</p>
                    </div>
                  </td>

                  {/* Consultor Responsável */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`size-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${p.consultantAvatarClass}`}>
                        {p.consultantInitials}
                      </div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {p.consultantName}
                      </p>
                    </div>
                  </td>

                  {/* Ações */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {p.status === 'Pago' && (
                        <Link href={`/admin/payments/recibo/${p.id}`} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Download / Ver Recibo">
                          <Receipt size={18} />
                        </Link>
                      )}
                      {p.status === 'Aguardando Validação' && (
                        <button onClick={() => setProofToValidate(p)} className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Verificar Comprovativo">
                          <ShieldCheck size={18} />
                        </button>
                      )}
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Ver Detalhes">
                        <Eye size={18} />
                      </button>
                      <button onClick={(e) => handleActionMore(p.id, e)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Mais Opções">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {payments.length > 0 && (
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/10">
          <p className="text-sm text-slate-500">
            A mostrar <span className="font-semibold">{Math.min((currentPage - 1) * itemsPerPage + 1, payments.length)}</span> a <span className="font-semibold">{Math.min(currentPage * itemsPerPage, payments.length)}</span> de <span className="font-semibold">{payments.length}</span> resultados
          </p>
          <div className="flex gap-1.5">
             <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
             >
               Anterior
             </button>
             <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
             >
               Próxima
             </button>
          </div>
        </div>
      )}

      {/* Validation Modal */}
      {proofToValidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setProofToValidate(null)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex gap-3 items-center mb-6">
              <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Verificar Comprovativo</h3>
                <p className="text-sm text-slate-500">Valide o pagamento do cliente para gerar a fatura.</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-500 block text-xs uppercase tracking-wider font-bold mb-1">Cliente</span>
                  <p className="font-semibold text-slate-900 dark:text-white">{proofToValidate.clientName}</p>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs uppercase tracking-wider font-bold mb-1">Valor Informado</span>
                  <p className="font-semibold text-primary">{proofToValidate.amount}</p>
                </div>
              </div>

              {/* Fake Proof Image Image */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 relative h-72 flex items-center justify-center group cursor-pointer" title="Clique para ampliar">
                {proofToValidate.proofUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={proofToValidate.proofUrl} alt="Comprovativo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <p className="text-slate-400 font-medium text-sm">Nenhuma imagem disponível.</p>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                   <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-lg">Ver num novo separador</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button 
                onClick={() => {
                  alert(`Pagamento ID: ${proofToValidate.id} rejeitado. Um email automático será enviado ao cliente.`);
                  setProofToValidate(null);
                }} 
                className="px-6 py-2.5 font-bold rounded-xl text-slate-600 hover:text-red-500 dark:text-slate-300 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Rejeitar Comprovativo
              </button>
              <button 
                onClick={() => {
                  onValidatePayment(proofToValidate.id);
                  setProofToValidate(null);
                  alert('Pagamento validado com sucesso! A Fatura/Recibo já está disponível.');
                }} 
                className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
              >
                <CheckCircle size={18} />
                Validar e Emitir Recibo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
