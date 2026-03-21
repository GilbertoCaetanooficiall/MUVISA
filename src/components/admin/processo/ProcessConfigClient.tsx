'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp,
  Save,
  RotateCcw,
  Layout,
  GraduationCap,
  Briefcase,
  FilePlus,
  Settings2
} from 'lucide-react';
import { 
  ProcessStep, 
  SubStep, 
  defaultProcessStages, 
  processTypeLabels 
} from '@/lib/constants/visa-process';

export default function ProcessConfigClient() {
  const [activeType, setActiveType] = useState<string>('ensino_superior');
  const [stagesByType, setStagesByType] = useState<Record<string, ProcessStep[]>>(defaultProcessStages);
  const [typeLabels, setTypeLabels] = useState<Record<string, string>>(processTypeLabels);
  
  const [isSaving, setIsSaving] = useState(false);
  const [expandedStages, setExpandedStages] = useState<string[]>(['step-1', 'form-1']);
  const [isAddingType, setIsAddingType] = useState(false);
  const [newTypeName, setNewTypeName] = useState('');

  const currentStages = stagesByType[activeType] || [];

  const toggleExpand = (id: string) => {
    setExpandedStages(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleAddType = () => {
    if (!newTypeName.trim()) return;
    
    const newTypeId = `custom_${Date.now()}`;
    const newLabels = { ...typeLabels, [newTypeId]: newTypeName };
    const newStages = { 
      ...stagesByType, 
      [newTypeId]: [
        {
          id: `step-${Date.now()}`,
          number: 1,
          title: 'Etapa Inicial',
          description: 'Descrição da sua primeira etapa',
          subSteps: []
        }
      ] 
    };
    
    setTypeLabels(newLabels);
    setStagesByType(newStages);
    setActiveType(newTypeId);
    setNewTypeName('');
    setIsAddingType(false);
  };

  const handleRemoveType = (typeId: string) => {
    if (confirm(`Tem certeza que deseja remover o processo "${typeLabels[typeId]}"?`)) {
      // Remover o tipo sem criar variáveis não utilizadas
      const nextLabels = { ...typeLabels };
      delete nextLabels[typeId];
      
      const nextStages = { ...stagesByType };
      delete nextStages[typeId];
      
      setTypeLabels(nextLabels);
      setStagesByType(nextStages);
      
      if (activeType === typeId) {
        setActiveType(Object.keys(nextLabels)[0] || '');
      }
    }
  };

  const handleAddStage = () => {
    const newId = `step-${Date.now()}`;
    const newStage: ProcessStep = {
      id: newId,
      number: currentStages.length + 1,
      title: 'Nova Etapa',
      description: 'Descrição da nova etapa',
      subSteps: []
    };
    
    setStagesByType({
      ...stagesByType,
      [activeType]: [...currentStages, newStage]
    });
    setExpandedStages([...expandedStages, newId]);
  };

  const handleRemoveStage = (id: string) => {
    const filtered = currentStages.filter(s => s.id !== id).map((s, idx) => ({ ...s, number: idx + 1 }));
    setStagesByType({
      ...stagesByType,
      [activeType]: filtered
    });
  };

  const handleUpdateStage = (id: string, updates: Partial<ProcessStep>) => {
    const updated = currentStages.map(s => s.id === id ? { ...s, ...updates } : s);
    setStagesByType({
      ...stagesByType,
      [activeType]: updated
    });
  };

  const handleAddSubStep = (stageId: string) => {
    const newSubStep: SubStep = {
      id: `sub-${Date.now()}`,
      title: 'Nova Subetapa'
    };
    const updated = currentStages.map(s => 
      s.id === stageId 
        ? { ...s, subSteps: [...s.subSteps, newSubStep] } 
        : s
    );
    setStagesByType({
      ...stagesByType,
      [activeType]: updated
    });
  };

  const handleRemoveSubStep = (stageId: string, subStepId: string) => {
    const updated = currentStages.map(s => 
      s.id === stageId 
        ? { ...s, subSteps: s.subSteps.filter(ss => ss.id !== subStepId) } 
        : s
    );
    setStagesByType({
      ...stagesByType,
      [activeType]: updated
    });
  };

  const handleUpdateSubStep = (stageId: string, subStepId: string, updates: Partial<SubStep>) => {
    const updated = currentStages.map(s => 
      s.id === stageId 
        ? { ...s, subSteps: s.subSteps.map(ss => ss.id === subStepId ? { ...ss, ...updates } : ss) } 
        : s
    );
    setStagesByType({
      ...stagesByType,
      [activeType]: updated
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert(`Todas as configurações de processos foram salvas! (Simulado)`);
    }, 1500);
  };

  const handleReset = () => {
    if (confirm(`Redefinir TODOS os processos para o padrão?`)) {
      setStagesByType(defaultProcessStages);
      setTypeLabels(processTypeLabels);
      setActiveType('ensino_superior');
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <Layout className="text-primary" />
            Gestão de Processos
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Crie e personalize múltiplos modelos de acompanhamento de visto.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-700/50"
          >
            <RotateCcw size={18} />
            Redefinir
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Salvar Alterações
          </button>
        </div>
      </div>

      {/* Process Type Selector and Creation */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl overflow-x-auto max-w-full">
          {Object.entries(typeLabels).map(([id, label]) => (
            <div key={id} className="relative group">
              <button
                onClick={() => setActiveType(id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                  activeType === id 
                    ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {id === 'ensino_superior' ? <GraduationCap size={16} /> : 
                 id === 'formacao_profissional' ? <Briefcase size={16} /> : 
                 <Settings2 size={16} />}
                {label}
              </button>
              {id !== 'ensino_superior' && id !== 'formacao_profissional' && (
                <button 
                  onClick={(e) => { e.stopPropagation(); handleRemoveType(id); }}
                  className="absolute -top-1 -right-1 size-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px]"
                >
                  <X size={10} />
                </button>
              )}
            </div>
          ))}
        </div>

        {isAddingType ? (
          <div className="flex items-center gap-2 animate-in slide-in-from-left-2 duration-300">
            <input 
              autoFocus
              type="text"
              value={newTypeName}
              onChange={(e) => setNewTypeName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddType()}
              placeholder="Nome do novo processo..."
              className="px-3 py-2 bg-white dark:bg-slate-800 border border-primary rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none min-w-[200px]"
            />
            <button 
              onClick={handleAddType}
              className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              <Check size={18} />
            </button>
            <button 
              onClick={() => setIsAddingType(false)}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingType(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-sm font-bold hover:bg-primary/20 transition-all border border-dashed border-primary/30"
          >
            <FilePlus size={18} />
            Adicionar Novo Processo
          </button>
        )}
      </div>

      <div className="space-y-4">
        {currentStages.map((stage) => (
          <div 
            key={stage.id}
            className={`bg-white dark:bg-slate-800/50 rounded-xl border transition-all duration-300 ${
              expandedStages.includes(stage.id) 
                ? 'border-primary shadow-lg ring-1 ring-primary/10' 
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
            }`}
          >
            {/* Stage Header */}
            <div className="p-5 flex items-start gap-4">
              <div className="flex flex-col items-center gap-2 mt-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm transition-colors ${
                  expandedStages.includes(stage.id) 
                    ? 'bg-primary text-white' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}>
                  {stage.number}
                </div>
                {expandedStages.includes(stage.id) && (
                  <div className="w-0.5 flex-1 bg-primary/20 min-h-[20px]" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <input
                    type="text"
                    value={stage.title}
                    onChange={(e) => handleUpdateStage(stage.id, { title: e.target.value })}
                    className="text-lg font-bold text-slate-900 dark:text-white bg-transparent border-none focus:ring-0 w-full p-0"
                    placeholder="Título da Etapa"
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    <button 
                      onClick={() => handleRemoveStage(stage.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                      title="Eliminar Etapa"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button 
                      onClick={() => toggleExpand(stage.id)}
                      className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                    >
                      {expandedStages.includes(stage.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  value={stage.description}
                  onChange={(e) => handleUpdateStage(stage.id, { description: e.target.value })}
                  className="text-sm text-slate-500 dark:text-slate-400 bg-transparent border-none focus:ring-0 w-full p-0 mt-1"
                  placeholder="Descrição da etapa"
                />

                {/* Substeps Container */}
                {expandedStages.includes(stage.id) && (
                  <div className="mt-6 space-y-3 pl-4 border-l-2 border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Subetapas</h4>
                    {stage.subSteps.map((subStep) => (
                      <div key={subStep.id} className="flex items-center gap-3 group">
                        <div className="w-5 h-5 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full" />
                        </div>
                        <input
                          type="text"
                          value={subStep.title}
                          onChange={(e) => handleUpdateSubStep(stage.id, subStep.id, { title: e.target.value })}
                          className="text-sm text-slate-700 dark:text-slate-200 bg-transparent border-none focus:ring-0 flex-1 p-0"
                          placeholder="Título da subetapa"
                        />
                        <button 
                          onClick={() => handleRemoveSubStep(stage.id, subStep.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-all"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => handleAddSubStep(stage.id)}
                      className="flex items-center gap-2 text-primary hover:text-primary-hover text-sm font-semibold transition-colors mt-4"
                    >
                      <Plus size={16} />
                      Adicionar Subetapa
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={handleAddStage}
          className="w-full flex items-center justify-center gap-2 py-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all group"
        >
          <Plus className="group-hover:scale-110 transition-transform" />
          <span className="font-bold">Adicionar Nova Etapa Principal</span>
        </button>
      </div>

      <div className="mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/20">
        <h3 className="font-bold text-slate-900 dark:text-white mb-2">Configuração Específica</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Você está editando o modelo de processo para <strong>{typeLabels[activeType]}</strong>. 
          Estudantes vinculados a este tipo visualizarão estas etapas exatamente como configuradas aqui.
        </p>
      </div>
    </div>
  );
}
