'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function ReceiptPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    // Generate current date on client only to avoid hydration mismatch
    setDateStr(new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' }));
    
    // Auto trigger print dialog after a tiny delay for styles to load
    const timer = setTimeout(() => {
      window.print();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8 flex items-center justify-center print:bg-white print:p-0 print:m-0 font-sans">
      <div className="max-w-3xl w-full bg-white shadow-2xl p-12 shrink-0 print:shadow-none print:max-w-none print:p-8">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8 mb-8">
          <div>
            <Image src="/logo-light.svg" alt="MUVISA Logo" width={180} height={40} className="mb-6 object-contain" priority />
            <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">RECIBO</h1>
            <p className="text-sm font-bold text-slate-500 mt-2">ID: <span className="text-primary">{id || 'PAY-000'}</span></p>
          </div>
          <div className="text-right">
            <h3 className="font-bold text-slate-800 text-lg">MUVISA Consultoria</h3>
            <p className="text-sm text-slate-500 mt-1">Av. da Liberdade, 100</p>
            <p className="text-sm text-slate-500">Lisboa, Portugal</p>
            <p className="text-sm text-slate-500 mt-2 font-medium">NIF: 510 123 456</p>
            <p className="text-sm text-primary font-medium">muvisaintercambio@gmail.com</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Faturado à</p>
            <h2 className="text-xl font-black text-slate-800">Sarah Jenkins</h2>
            <p className="text-sm text-slate-600 mt-1 font-medium">ID Cliente: CLI-8942</p>
            <p className="text-sm text-slate-600">Luanda, Angola</p>
            <p className="text-sm text-slate-600 mt-2 font-bold flex items-center gap-1">
              Método: <span className="px-2 py-0.5 bg-slate-200 rounded text-slate-700 text-xs">Transferência</span>
            </p>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col justify-center gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-500">Data de Emissão:</span>
              <span className="text-sm font-bold text-slate-800">{dateStr}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-500">Fatura Ref:</span>
              <span className="text-sm font-bold text-slate-800">INV-2024-001</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-500">Estado:</span>
              <span className="text-sm font-black text-white bg-emerald-500 px-3 py-1 rounded-full uppercase tracking-widest">PAGO</span>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <table className="w-full mb-12 border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200">
              <th className="py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Descrição / Serviço</th>
              <th className="py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Qtd</th>
              <th className="py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Preço Unit.</th>
              <th className="py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="py-6">
                <p className="font-bold text-slate-900 text-base">Plano Diamond</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">Pacote completo com abertura de conta bancária, assessoria ao NIF e agendamento consular.</p>
              </td>
              <td className="py-6 text-right font-medium text-slate-600">1</td>
              <td className="py-6 text-right font-medium text-slate-600">1.000.000 Kz</td>
              <td className="py-6 text-right font-bold text-slate-900">1.000.000 Kz</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-6">
                <p className="font-bold text-slate-900 text-base">Taxa Administrativa e Urgência</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">Processamento prioritário de dossiê do estudante.</p>
              </td>
              <td className="py-6 text-right font-medium text-slate-600">1</td>
              <td className="py-6 text-right font-medium text-slate-600">50.000 Kz</td>
              <td className="py-6 text-right font-bold text-slate-900">50.000 Kz</td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-16">
          <div className="w-72 space-y-4">
            <div className="flex justify-between text-sm font-bold text-slate-500">
              <span>Subtotal:</span>
              <span className="text-slate-800">1.050.000 Kz</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-500">
              <span>Desconto Aplicado:</span>
              <span className="text-emerald-500">-50.000 Kz</span>
            </div>
            <div className="flex justify-between items-center text-xl font-black text-slate-900 border-t-2 border-slate-900 pt-4">
              <span>Total Pago:</span>
              <span className="text-primary text-2xl">1.000.000 Kz</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-slate-100 pt-8 mt-auto flex flex-col items-center justify-center text-center">
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Obrigado pela preferência!</p>
          <p className="text-[10px] uppercase font-bold text-slate-400">Documento processado por computador.</p>
          
          <div className="mt-12 flex justify-center print:hidden">
            <button 
              onClick={() => window.print()}
              className="bg-primary text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all outline-none"
            >
              Imprimir / Salvar PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
