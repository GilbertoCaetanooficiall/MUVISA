export interface SubStep {
  id: string;
  title: string;
  description?: string;
}

export interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
  subSteps: SubStep[];
}

export type ProcessType = 'ensino_superior' | 'formacao_profissional';

export const processTypeLabels: Record<ProcessType, string> = {
  ensino_superior: 'Visto de Estudante (Ensino Superior)',
  formacao_profissional: 'Visto de Formação Profissional',
};

export const defaultProcessStages: Record<ProcessType, ProcessStep[]> = {
  ensino_superior: [
    {
      id: 'step-1',
      number: 1,
      title: 'Coleta de Dados',
      description: 'Formulário inicial e entrevista de perfil',
      subSteps: [
        { id: 'sub-1-1', title: 'Preenchimento do questionário' },
        { id: 'sub-1-2', title: 'Entrevista com consultor' },
        { id: 'sub-1-3', title: 'Definição da estratégia' },
      ],
    },
    {
      id: 'step-2',
      number: 2,
      title: 'Documentos',
      description: 'Reunião e validação de documentos',
      subSteps: [
        { id: 'sub-2-1', title: 'Upload de passaporte' },
        { id: 'sub-2-2', title: 'Tradução juramentada' },
        { id: 'sub-2-3', title: 'Comprovantes financeiros validados' },
      ],
    },
    {
      id: 'step-3',
      number: 3,
      title: 'Candidatura',
      description: 'Submissão da candidatura para a instituição e processamento',
      subSteps: [
        { id: 'sub-3-1', title: 'Preenchimento do formulário de candidatura' },
        { id: 'sub-3-2', title: 'Revisão final do consultor' },
        { id: 'sub-3-3', title: 'Submissão à instituição' },
      ],
    },
    {
      id: 'step-4',
      number: 4,
      title: 'Matrícula',
      description: 'Inscrição formal e confirmação de matrícula na instituição',
      subSteps: [
        { id: 'sub-4-1', title: 'Receção da Carta de Aceitação (LOA)' },
        { id: 'sub-4-2', title: 'Pagamento de taxas académicas' },
        { id: 'sub-4-3', title: 'Emissão do comprovativo de matrícula' },
      ],
    },
    {
      id: 'step-5',
      number: 5,
      title: 'Visto Emitido',
      description: 'Processamento consular e orientações de viagem',
      subSteps: [
        { id: 'sub-5-1', title: 'Preenchimento do formulário de pedido de visto' },
        { id: 'sub-5-2', title: 'Pagamento da taxa consular' },
        { id: 'sub-5-3', title: 'Agendamento e submissão consular' },
        { id: 'sub-5-4', title: 'Receção do visto e kit de partida' },
      ],
    },
  ],
  formacao_profissional: [
    {
      id: 'form-1',
      number: 1,
      title: 'Coleta de Dados Profissionais',
      description: 'Análise de currículo e experiência técnica',
      subSteps: [
        { id: 'sub-f1-1', title: 'Preenchimento do perfil técnico' },
        { id: 'sub-f1-2', title: 'Entrevista de competências' },
      ],
    },
    {
      id: 'form-2',
      number: 2,
      title: 'Documentação e Certificados',
      description: 'Validação de experiência e qualificações',
      subSteps: [
        { id: 'sub-f2-1', title: 'Diplomas e certificados técnicos' },
        { id: 'sub-f2-2', title: 'Seguro de saúde profissional' },
      ],
    },
    {
      id: 'form-3',
      number: 3,
      title: 'Contrato de Formação',
      description: 'Formalização do vínculo com a entidade de formação',
      subSteps: [
        { id: 'sub-f3-1', title: 'Assinatura do contrato' },
        { id: 'sub-f3-2', title: 'Plano de formação detalhado' },
      ],
    },
    {
      id: 'form-4',
      number: 4,
      title: 'Processo Consular',
      description: 'Pedido de visto de curta/longa duração para formação',
      subSteps: [
        { id: 'sub-f4-1', title: 'Submissão na VFS/Embaixada' },
        { id: 'sub-f4-2', title: 'Receção do título de residência temporário' },
      ],
    },
  ],
};
