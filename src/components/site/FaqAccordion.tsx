'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  number: string;
  title: string;
  items: FaqItem[];
}

const categories: FaqCategory[] = [
  {
    number: '1',
    title: 'Vistos e Processo',
    items: [
      {
        question: 'Quanto tempo demora para obter o visto?',
        answer: 'O tempo médio varia entre 60 a 90 dias após a submissão no consulado, dependendo da demanda e do tipo de visto solicitado.',
      },
      {
        question: 'Quais documentos são necessários?',
        answer: 'Inclui carta de aceitação, comprovativo de meios de subsistência, alojamento, seguro de saúde e certificado de antecedentes criminais.',
      },
    ],
  },
  {
    number: '2',
    title: 'Universidades e Cursos',
    items: [
      {
        question: 'Como escolho a universidade?',
        answer: 'Analisamos o seu perfil académico, orçamento e objetivos de carreira para sugerir as instituições mais adequadas em Portugal.',
      },
      {
        question: 'Posso estudar sem falar português?',
        answer: 'Sim, existem diversas opções de mestrados e doutorados ministrados integralmente em inglês nas principais universidades portuguesas.',
      },
    ],
  },
  {
    number: '3',
    title: 'Custos',
    items: [
      {
        question: 'Quanto custa estudar em Portugal?',
        answer: 'As propinas para estudantes internacionais variam entre €1.500 a €7.000 anuais, dependendo do curso e da universidade.',
      },
      {
        question: 'Posso pagar em parcelas?',
        answer: 'Sim, a maioria das universidades permite o parcelamento da anuidade (propinas) em até 10 vezes ao longo do ano letivo.',
      },
    ],
  },
  {
    number: '4',
    title: 'Vida em Portugal',
    items: [
      {
        question: 'Quanto custa viver em Portugal?',
        answer: 'Um estudante gasta em média entre €700 a €1.000 por mês, incluindo alojamento, alimentação e transporte, variando conforme a cidade.',
      },
      {
        question: 'É seguro morar em Portugal?',
        answer: 'Sim, Portugal é consistentemente classificado como um dos países mais seguros do mundo (Global Peace Index).',
      },
    ],
  },
  {
    number: '5',
    title: 'Documentação',
    items: [
      {
        question: 'O que é NIF?',
        answer: 'É o Número de Identificação Fiscal, essencial para qualquer atividade em Portugal, como alugar casa ou abrir conta bancária.',
      },
      {
        question: 'Preciso de seguro saúde?',
        answer: 'Sim, é obrigatório ter um seguro de saúde internacional ou o PB4 (para brasileiros) durante toda a estadia.',
      },
    ],
  },
  {
    number: '6',
    title: 'Processo com a MUVISA',
    items: [
      {
        question: 'O que está incluído no serviço?',
        answer: 'Desde a escolha do curso, candidatura à universidade, preparação de toda a documentação do visto até o suporte pós-chegada.',
      },
      {
        question: 'Tenho suporte durante todo o processo?',
        answer: 'Sim, terá um consultor dedicado para tirar dúvidas via WhatsApp e e-mail em todas as etapas da jornada.',
      },
    ],
  },
];

function AccordionItem({ question, answer }: FaqItem) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none group"
        aria-expanded={open}
      >
        <span className="font-medium text-slate-900 dark:text-white text-sm leading-snug font-display group-hover:text-primary transition-colors">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-400 dark:text-slate-500 transition-transform duration-300 ${open ? 'rotate-180 text-primary' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-display">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FaqAccordion() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
      {categories.map((cat) => (
        <div key={cat.number}>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-3 font-display">
            <span className="w-1.5 h-7 bg-primary rounded-full shrink-0" />
            {cat.number}. {cat.title}
          </h2>
          <div className="space-y-3">
            {cat.items.map((item) => (
              <AccordionItem key={item.question} {...item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
