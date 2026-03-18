import Link from 'next/link';
import FaqAccordion from '@/components/site/FaqAccordion';

export const metadata = {
  title: 'FAQ do Estudante – MUVISA',
  description: 'Tire todas as suas dúvidas sobre estudar em Portugal e o processo de visto com a MUVISA.',
};

export default function FaqDoEstudantePage() {
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
            Perguntas Frequentes
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight font-display">
            FAQ do <span className="text-primary">Estudante</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-display">
            Tire todas as suas dúvidas sobre estudar em Portugal e o processo de visto.
          </p>
        </div>
      </section>

      {/* ── Acordeões de FAQ ── */}
      <section className="py-20 bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-4">
          <FaqAccordion />
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-20 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">
            Ainda tem dúvidas?
          </h2>
          <p className="text-white/80 text-lg mb-10 font-display max-w-2xl mx-auto">
            Fale com um dos nossos consultores e comece o seu processo com segurança.
          </p>
          <Link href="/site/contato">
            <button className="inline-block bg-white text-primary hover:bg-slate-50 px-10 py-4 rounded-xl text-lg font-bold transition-all shadow-xl hover:shadow-2xl hover:scale-105 font-display">
              Fale com um consultor
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
