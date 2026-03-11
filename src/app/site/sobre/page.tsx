export default function SiteSobrePage() {
  return (
    <>
      <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-50 dark:bg-background-dark transition-colors duration-300">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-200 to-slate-50 dark:from-card-dark dark:to-background-dark opacity-80"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <span className="inline-block py-1 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 font-display">
            Quem Somos
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight font-display">
            Nossa Missão é <span className="text-primary">Facilitar Seu Futuro</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-display">
            Acreditamos que fronteiras não devem ser barreiras para o conhecimento. Trabalhamos incansavelmente para conectar estudantes brasileiros às melhores oportunidades em Portugal.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background-light dark:bg-background-dark border-t border-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 font-display">
                De Estudantes para Estudantes
              </h2>
              <div className="space-y-6 text-slate-600 dark:text-slate-400 font-display leading-relaxed text-lg">
                <p>
                  A MUVISA nasceu da experiência pessoal de seus fundadores. Quando decidimos estudar em Portugal, enfrentamos um labirinto burocrático, informações desencontradas e a ansiedade de não saber se o visto seria aprovado a tempo.
                </p>
                <p>
                  Percebemos que não estávamos sozinhos. Milhares de estudantes brilhantes desistiam de seus sonhos por medo da papelada. Foi aí que decidimos mudar essa realidade.
                </p>
                <p>
                  Hoje, somos mais que uma agência de vistos. Somos seus parceiros estratégicos. Nossa equipe combina conhecimento jurídico com a empatia de quem já esteve no seu lugar, garantindo que sua única preocupação seja fazer as malas.
                </p>
              </div>
              <div className="mt-10 flex gap-6">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary">2018</span>
                  <span className="text-sm text-slate-500">Ano de Fundação</span>
                </div>
                <div className="w-px bg-slate-700 h-12"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary">100%</span>
                  <span className="text-sm text-slate-500">Dedicação</span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Equipe MUVISA em escritório moderno" className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwI9TjDh3CYjqI-5Hcj2iXEa-s73AC7WPQhOExdUUA3j-WoktgH9TMh8FOABpcZFcuGHXZ-XvzFyKtpQA-ElR-Jjm5r8DpzbGpP2w_Aln2CQRAGS0VVcoE--m49l8CK5bFqsw0RLo3aPSo6q42b1Xzrr5ZWPKlqW2LeHDjUda3YWlJblWItO_HnoKGAH6gEJwnCqXFl_InFyl3F1GJSNpOlCBB9Y55-HLMkZX-0XljukJOT1qnuXDehi085STwVtF4-MuX2PLfFcEs" />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-lg">Nosso time em Lisboa</p>
                  <p className="text-slate-300 text-sm">Prontos para te receber na Europa</p>
                </div>
              </div>
              <div className="absolute -z-10 top-10 -right-10 w-full h-full border-2 border-primary/20 rounded-2xl hidden lg:block"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-background-dark relative overflow-hidden transition-colors">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-display">Nossos Valores</h2>
            <p className="text-slate-600 dark:text-slate-400 font-display max-w-2xl mx-auto">
              Os pilares que sustentam cada processo e cada história de sucesso que ajudamos a construir.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 dark:bg-card-dark border border-slate-200 dark:border-slate-700/50 p-8 rounded-2xl hover:border-primary/50 transition-colors duration-300 group">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-[0_0_15px_rgba(25,120,229,0.15)] group-hover:shadow-[0_0_25px_rgba(25,120,229,0.4)] transition-shadow duration-300">
                <span className="material-symbols-outlined text-4xl">search</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-display">Transparência</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-display">
                Sem letras miúdas ou promessas vazias. Mantemos você informado sobre cada etapa, custos e prazos reais do processo consular. A verdade é a base da nossa confiança.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-card-dark border border-slate-200 dark:border-slate-700/50 p-8 rounded-2xl hover:border-primary/50 transition-colors duration-300 group">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-[0_0_15px_rgba(25,120,229,0.15)] group-hover:shadow-[0_0_25px_rgba(25,120,229,0.4)] transition-shadow duration-300">
                <span className="material-symbols-outlined text-4xl">handshake</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-display">Compromisso</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-display">
                Seu sonho é nossa responsabilidade. Tratamos cada processo como se fosse o nosso próprio, dedicando attention aos detalhes que fazem a diferença na aprovação.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-card-dark border border-slate-200 dark:border-slate-700/50 p-8 rounded-2xl hover:border-primary/50 transition-colors duration-300 group">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-[0_0_15px_rgba(25,120,229,0.15)] group-hover:shadow-[0_0_25px_rgba(25,120,229,0.4)] transition-shadow duration-300">
                <span className="material-symbols-outlined text-4xl">hotel_class</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-display">Excelência</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-display">
                Buscamos a perfeição técnica na montagem dos dossiês. Nossa equipe se mantém constantemente atualizada sobre as mudanças na legislação portuguesa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block font-display">Onde Estamos</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 font-display">Venha nos visitar em Lisboa</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 font-display">
                Nosso escritório está estrategicamente localizado no coração de Lisboa, próximo às principais universidades e órgãos públicos.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold font-display">Endereço</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 font-display">Av. da Liberdade, 100, 2º Andar<br/>1250-144 Lisboa, Portugal</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold font-display">Horário de Atendimento</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 font-display">Segunda a Sexta: 09h às 18h<br/>Sábados: Apenas com agendamento</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold font-display">Contato</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 font-display">contato@muvisa.pt<br/>+351 21 000 0000</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[400px] w-full bg-slate-200 dark:bg-card-dark rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Mapa de Lisboa" className="w-full h-full object-cover opacity-30 grayscale dark:invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeb9fpceLRyY0pFUG9bGbgRRlBfi7smArKNaGbvpN1kcpvZVBclBopz9Re_9Wy-5H-_Mb2oATKBPz-GWwIm60_Rbh4GLzh2JqMy9MMnFCw7buTCteKFLtKgq6_GYyYdFYYp6PuFSVEyfOgXUimKYCtK9Z6e9Jw6-3GNlf-mqqnkfIbX5jqSuqv0kyyHYaRzkZflAtdMOoVLWEZvA4x8koeP8XPZG181ImU50eSmglRLEync91E_Q4sY4tLlTDUSfa75yzp1bM8OrJ4" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
                <div className="relative">
                  <span className="material-symbols-outlined text-primary text-5xl drop-shadow-[0_0_10px_rgba(25,120,229,0.8)]">location_on</span>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-2 bg-black/50 blur-sm rounded-[100%]"></div>
                </div>
                <div className="mt-2 bg-white text-slate-900 px-3 py-1 rounded text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  MUVISA Headquarters
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1592345279419-95a10728904e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">Faça parte da nossa história</h2>
          <p className="text-blue-100 text-lg mb-10 font-display max-w-2xl mx-auto">
            Já ajudamos mais de 500 estudantes a realizarem seus sonhos. O próximo pode ser você.
          </p>
          <button className="px-8 py-4 bg-white text-primary font-bold rounded-lg text-lg hover:bg-blue-50 transition-colors shadow-xl font-display inline-flex items-center gap-2">
            Agendar Minha Consultoria
            <span className="material-symbols-outlined">calendar_month</span>
          </button>
        </div>
      </section>
    </>
  );
}
