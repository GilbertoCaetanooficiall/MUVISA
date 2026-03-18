import Link from 'next/link';
import { Building2, Home, DoorOpen, MapPin, MessageCircle } from 'lucide-react';

const accommodationTypes = [
  {
    icon: Building2,
    title: 'Residência Universitária',
    description: 'Opção mais económica, gerida pela própria universidade. Ideal para quem está a chegar pela primeira vez.',
    price: '~€250/mês',
    badge: 'Económico',
    badgeColor: 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20',
  },
  {
    icon: DoorOpen,
    title: 'Quarto em Casa Partilhada',
    description: 'Partilha de apartamento com outros estudantes. Boa relação qualidade-preço com mais independência.',
    price: '~€450/mês',
    badge: 'Moderado',
    badgeColor: 'bg-primary/10 text-primary border border-primary/20',
  },
  {
    icon: Home,
    title: 'Apartamento Próprio',
    description: 'Máxima privacidade e autonomia. Ideal para quem prefere um espaço exclusivamente seu.',
    price: '~€800/mês',
    badge: 'Premium',
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20',
  },
];

const cities = [
  { name: 'Lisboa',  price: '~€700/mês', description: 'Capital, mais cosmopolita', emoji: '🏛️' },
  { name: 'Porto',   price: '~€550/mês', description: 'Segunda maior cidade, vibrante', emoji: '🌉' },
  { name: 'Coimbra', price: '~€400/mês', description: 'Cidade universitária por excelência', emoji: '📚' },
  { name: 'Braga',   price: '~€350/mês', description: 'Cidade jovem e acessível', emoji: '🌿' },
];

const steps = [
  { number: '01', title: 'Defines o teu orçamento', description: 'Indica-nos quanto podes gastar mensalmente em alojamento e as tuas preferências.' },
  { number: '02', title: 'Escolhes a cidade e tipo', description: 'Selecionas a cidade de destino e o tipo de alojamento que melhor se adapta ao teu estilo.' },
  { number: '03', title: 'A MUVISA pesquisa opções', description: 'A nossa equipa contacta parceiros locais e apresenta-te as melhores opções disponíveis.' },
  { number: '04', title: 'Assinas o contrato com suporte', description: 'Acompanhamos toda a assinatura do contrato para garantir que estás totalmente protegido.' },
];

export default function AlojamentoPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-50 dark:bg-background-dark transition-colors duration-300">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-200 to-slate-50 dark:from-card-dark dark:to-background-dark opacity-80" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <span className="inline-block py-1 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 font-display">
            Alojamento em Portugal
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight font-display">
            Encontra o teu Alojamento{' '}
            <span className="text-primary">em Portugal</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-display">
            Ajudamos a encontrar a casa certa para a tua vida académica.
          </p>
        </div>
      </section>

      {/* ── Tipos de Alojamento ── */}
      <section className="py-20 bg-white dark:bg-background-dark transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 font-display">Tipos de Alojamento</h2>
            <p className="text-slate-600 dark:text-slate-400 font-display">Escolhe a modalidade que melhor se adapta ao teu perfil e orçamento.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {accommodationTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.title}
                  className="bg-slate-50 dark:bg-card-dark border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 flex flex-col gap-5 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(25,120,229,0.1)] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon size={24} />
                  </div>
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight font-display">{type.title}</h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shrink-0 ${type.badgeColor}`}>
                        {type.badge}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-display">{type.description}</p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700/50">
                    <span className="text-2xl font-black text-primary font-display">{type.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Cidades Populares ── */}
      <section className="py-20 bg-slate-50 dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 font-display">Cidades Populares</h2>
            <p className="text-slate-600 dark:text-slate-400 font-display">Custo médio de alojamento por cidade universitária em Portugal.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {cities.map((city) => (
              <div
                key={city.name}
                className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 flex flex-col gap-3 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(25,120,229,0.1)] transition-all duration-300 cursor-default"
              >
                <span className="text-3xl">{city.emoji}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={13} className="text-primary shrink-0" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">{city.name}</h3>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-display">{city.description}</p>
                </div>
                <p className="text-xl font-black text-primary font-display mt-auto">{city.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Como Funciona ── */}
      <section className="py-20 bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 font-display">Como Funciona</h2>
            <p className="text-slate-600 dark:text-slate-400 font-display">O processo da MUVISA para te ajudar a encontrar o alojamento ideal.</p>
          </div>
          <div className="max-w-2xl mx-auto">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex gap-6 relative">
                {idx < steps.length - 1 && (
                  <div className="absolute left-[19px] top-10 w-px bg-gradient-to-b from-primary/40 to-transparent h-[calc(100%-8px)]" />
                )}
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-xs font-bold relative z-10 font-display">
                  {step.number}
                </div>
                <div className={`${idx < steps.length - 1 ? 'pb-10' : ''}`}>
                  <h3 className="text-slate-900 dark:text-white font-bold mb-1 font-display">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-display">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-20 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=2073&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
            Precisas de ajuda para encontrar alojamento?
          </h2>
          <p className="text-white/80 text-lg mb-10 font-display max-w-2xl mx-auto">
            A nossa equipa de consultores está disponível para te ajudar a encontrar a melhor opção de acordo com as tuas necessidades e orçamento.
          </p>
          <Link href="/site/contato">
            <button className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-lg text-lg hover:bg-slate-50 transition-colors shadow-xl font-display">
              <MessageCircle size={20} />
              Falar com um consultor
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
