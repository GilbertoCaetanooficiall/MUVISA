'use client';

import { useState } from 'react';
import ReportsStats from '@/components/admin/reports/ReportsStats';
import ReportsCharts from '@/components/admin/reports/ReportsCharts';
import { FileText, Download } from 'lucide-react';

// Simulated mock data for different timeframes
const mockDataStore = {
  '12M': {
    stats: {
      receita: { value: '350.000.000 Kz', trend: '+12.5%', isUp: true },
      novosEstudantes: { value: '124', trend: '+8.2%', isUp: true },
      taxaVisto: { value: '92%', trend: '+1.5%', isUp: true },
      candidaturasAtivas: { value: '1.840', trend: '-2.1%', isUp: false },
    },
    chart: {
      barHeights: ['40%', '55%', '45%', '70%', '85%', '60%', '75%', '90%', '95%', '100%'],
      months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
    },
    universities: [
      { name: 'Universidade de Lisboa', apps: '842 Candidaturas', width: '85%' },
      { name: 'Universidade do Porto', apps: '612 Candidaturas', width: '65%' },
      { name: 'Universidade de Coimbra', apps: '456 Candidaturas', width: '45%' },
      { name: 'Universidade Nova de Lisboa', apps: '310 Candidaturas', width: '30%' },
    ],
    plans: [
      { label: 'Premium', pct: '45%' },
      { label: 'Standard', pct: '35%' },
      { label: 'Básico', pct: '20%' },
    ]
  },
  'YTD': {
    stats: {
      receita: { value: '280.000.000 Kz', trend: '+18.0%', isUp: true },
      novosEstudantes: { value: '98', trend: '+12.0%', isUp: true },
      taxaVisto: { value: '94%', trend: '+3.5%', isUp: true },
      candidaturasAtivas: { value: '1.200', trend: '+5.1%', isUp: true },
    },
    chart: {
      barHeights: ['20%', '35%', '40%', '50%', '65%', '80%', '85%', '90%', '95%', '100%'],
      months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'], // Assuming 10 months YTD for mock
    },
    universities: [
      { name: 'Universidade de Lisboa', apps: '600 Candidaturas', width: '90%' },
      { name: 'Universidade Nova de Lisboa', apps: '500 Candidaturas', width: '75%' },
      { name: 'Universidade do Porto', apps: '400 Candidaturas', width: '60%' },
      { name: 'Universidade do Minho', apps: '250 Candidaturas', width: '35%' },
    ],
    plans: [
      { label: 'Premium', pct: '50%' },
      { label: 'Standard', pct: '30%' },
      { label: 'Básico', pct: '20%' },
    ]
  }
};

export type Timeframe = '12M' | 'YTD';

export default function ReportsClient() {
  const [timeframe, setTimeframe] = useState<Timeframe>('12M');
  const [isExporting, setIsExporting] = useState(false);

  const currentData = mockDataStore[timeframe];

  const handleDownloadPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      alert('Relatório PDF gerado e descarregado com sucesso!');
      setIsExporting(false);
    }, 1500);
  };

  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      alert('Ficheiro CSV exportado com sucesso!');
      setIsExporting(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Relatórios e Análises
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Monitorize KPIs, tendências de estudantes e crescimento do negócio.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value as Timeframe)}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="12M">Últimos 12 Meses</option>
            <option value="YTD">Ano Inteiro (YTD)</option>
          </select>

          <button 
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="flex items-center gap-2 bg-slate-100 dark:bg-card-dark hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-4 py-2 rounded-lg text-sm border border-slate-200 dark:border-slate-700 transition-all disabled:opacity-50"
          >
            <FileText size={18} />
            Descarregar PDF
          </button>
          
          <button 
            onClick={handleExportCSV}
            disabled={isExporting}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-4 py-2 rounded-lg text-sm transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            <Download size={18} />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <ReportsStats data={currentData.stats} />

      {/* Charts */}
      <ReportsCharts data={currentData} timeframe={timeframe} setTimeframe={setTimeframe} />
    </div>
  );
}
