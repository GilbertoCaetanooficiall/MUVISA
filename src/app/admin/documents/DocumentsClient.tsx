'use client';

import { useState, useMemo } from 'react';
import { Upload, X } from 'lucide-react';
import DocumentsStats from '@/components/admin/documents/DocumentsStats';
import DocumentsFilters from '@/components/admin/documents/DocumentsFilters';
import DocumentsTable from '@/components/admin/documents/DocumentsTable';

// ─── Types and Sample Data ──────────────────────────────────────────────────

export type DocStatus = 'Pendente de Revisão' | 'Aprovado' | 'Rejeitado' | 'Em Falta';

export interface Document {
  id: string;
  studentName: string;
  initials: string;
  docType: string;
  docIcon: React.ElementType;
  uploadDate: string;
  status: DocStatus;
  verifiedBy: string;
  lastUpdate: string;
}

import { Contact, Landmark, FileText, GraduationCap, BookOpen } from 'lucide-react';

const initialDocuments: Document[] = [
  {
    id: 'DOC-001', studentName: 'Sarah Jenkins', initials: 'SJ',
    docType: 'Cópia do Passaporte', docIcon: Contact,
    uploadDate: '24 Out, 2023', status: 'Pendente de Revisão', verifiedBy: '--', lastUpdate: 'há 2 horas',
  },
  {
    id: 'DOC-002', studentName: 'Michael Chen', initials: 'MC',
    docType: 'Extrato Bancário', docIcon: Landmark,
    uploadDate: '22 Out, 2023', status: 'Aprovado', verifiedBy: 'Alex Rivera', lastUpdate: 'Ontem',
  },
  {
    id: 'DOC-003', studentName: 'Marcus Thorne', initials: 'MT',
    docType: 'Teste de Inglês', docIcon: FileText,
    uploadDate: '21 Out, 2023', status: 'Rejeitado', verifiedBy: 'Sarah Smith', lastUpdate: '22 Out, 2023',
  },
  {
    id: 'DOC-004', studentName: 'Elena Rodriguez', initials: 'ER',
    docType: 'Certificados Académicos', docIcon: GraduationCap,
    uploadDate: '--', status: 'Em Falta', verifiedBy: '--', lastUpdate: '20 Out, 2023',
  },
  {
    id: 'DOC-005', studentName: 'Anna Smith', initials: 'AS',
    docType: 'Carta de Recomendação', docIcon: FileText,
    uploadDate: '19 Out, 2023', status: 'Aprovado', verifiedBy: 'Alex Rivera', lastUpdate: '20 Out, 2023',
  },
  {
    id: 'DOC-006', studentName: 'David Miller', initials: 'DM',
    docType: 'Certificados Académicos', docIcon: BookOpen,
    uploadDate: '18 Out, 2023', status: 'Pendente de Revisão', verifiedBy: '--', lastUpdate: 'há 3 dias',
  },
];

export default function DocumentsClient() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  
  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDocType, setFilterDocType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterStudent, setFilterStudent] = useState('');
  
  // Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  // Computed Filtered Documents
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchSearch = doc.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || doc.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDocType = filterDocType ? doc.docType.includes(filterDocType) : true;
      const matchStatus = filterStatus ? doc.status === filterStatus : true;
      const matchStudent = filterStudent ? (filterStudent === 'Ação Urgente Necessária' ? ['Pendente de Revisão', 'Rejeitado'].includes(doc.status) : true) : true;
      return matchSearch && matchDocType && matchStatus && matchStudent;
    });
  }, [documents, searchQuery, filterDocType, filterStatus, filterStudent]);

  // Handlers
  const handleAprovar = (id: string) => {
    setDocuments(docs => docs.map(d => d.id === id ? { ...d, status: 'Aprovado', verifiedBy: 'Admin', lastUpdate: 'Agora' } : d));
  };

  const handleRejeitar = (id: string) => {
    setDocuments(docs => docs.map(d => d.id === id ? { ...d, status: 'Rejeitado', lastUpdate: 'Agora' } : d));
  };
  
  const handleSolicitar = (id: string) => {
    setDocuments(docs => docs.map(d => d.id === id ? { ...d, status: 'Pendente de Revisão', lastUpdate: 'Agora', uploadDate: 'Agora' } : d));
    alert('Pedido de documento enviado com sucesso.');
  };

  const handleView = (doc: Document) => {
    setSelectedDoc(doc);
  };

  const handleDownload = (doc: Document) => {
    alert(`A descarregar o documento ${doc.id} de ${doc.studentName}...`);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Documento carregado submetido!');
    setIsUploadModalOpen(false);
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">Documentos</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gira e reveja todos os documentos dos estudantes necessários para candidaturas universitárias e processos de visto.
          </p>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-lg shadow-primary/20 self-start md:self-auto"
        >
          <Upload size={18} />
          Carregar Documento
        </button>
      </div>

      {/* Stats */}
      <DocumentsStats documents={documents} />

      {/* Filters */}
      <DocumentsFilters 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        filterDocType={filterDocType} setFilterDocType={setFilterDocType}
        filterStatus={filterStatus} setFilterStatus={setFilterStatus}
        filterStudent={filterStudent} setFilterStudent={setFilterStudent}
      />

      {/* Table */}
      <DocumentsTable 
        documents={filteredDocuments}
        onAprovar={handleAprovar}
        onRejeitar={handleRejeitar}
        onView={handleView}
        onDownload={handleDownload}
        onSolicitar={handleSolicitar}
      />

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-md w-full p-6 relative">
            <button onClick={() => setIsUploadModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Carregar Novo Documento</h2>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Selecione o Estudante</label>
                <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required>
                  <option value="">Selecione...</option>
                  <option>Sarah Jenkins</option>
                  <option>Michael Chen</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tipo de Documento</label>
                <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required>
                  <option value="">Selecione...</option>
                  <option>Passaporte</option>
                  <option>Extrato Bancário</option>
                  <option>Certificados Académicos</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Ficheiro</label>
                <input type="file" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary" required />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setIsUploadModalOpen(false)} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">Carregar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Document Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-lg w-full p-6 relative shadow-xl">
            <button onClick={() => setSelectedDoc(null)} className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <selectedDoc.docIcon size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{selectedDoc.docType}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Estudante: {selectedDoc.studentName}</p>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 border-dashed mb-6 h-48">
              <FileText size={48} className="text-slate-400 mb-3" />
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Pré-visualização do Documento Indisponível</p>
              <p className="text-xs text-slate-400 mt-1">Este mock não contém o ficheiro real.</p>
            </div>
            
            <div className="flex justify-end gap-3 flex-wrap">
              <button onClick={() => handleDownload(selectedDoc)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700">Descarregar</button>
              {selectedDoc.status === 'Pendente de Revisão' && (
                <>
                  <button onClick={() => { handleRejeitar(selectedDoc.id); setSelectedDoc(null); }} className="px-4 py-2 bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 rounded-lg text-sm font-medium hover:bg-rose-200 dark:hover:bg-rose-900/50">Rejeitar</button>
                  <button onClick={() => { handleAprovar(selectedDoc.id); setSelectedDoc(null); }} className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600">Aprovar</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
