// Componente que representa a Página Inicial do Site Institucional.
// No Next.js, por padrão, os componentes dentro da pasta 'app' são Server Components.
export default function SiteHomePage() {
  return (
    <>
      {/* SEÇÃO HERO: O primeiro impacto visual do site */}
      {/* Usamos 'relative' para posicionar elementos filhos com 'absolute' (como o background) */}
      <section className="relative h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden bg-white dark:bg-background-dark transition-colors duration-500">
        <div className="absolute inset-0 z-0">
          {/* Imagem de fundo com otimização simples e efeito de opacidade no dark mode */}
          <img
            alt="Padrão dos Descobrimentos Lisbon"
            className="w-full h-full object-cover object-center opacity-100 dark:opacity-40 transition-opacity duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-TFcTf4OCzLqbUTZRU8-AolakQt01nc5lo2dUsBmuHqHEYphwJEwZH8cCK0_ZLoVajjlK7SnOzCvYVoLgfLVMSwGLdb71KsZFCflHcJIhx_uIN4TW2JNQ_IIOHQX1s9h6Sr0hkz43HgZSLAZ8gMQq43wtzVnIluR_6vX0ltjBFtfhK56WThBoXHmBW0GcK9x9CAWdsF_-KKaMZxMlPl7auI55LW11gYOCmKSOBAvmiyLtDPQI0s8utZ1STw01AXIDcfKWVYdTnUL5"
          />
          {/* Camada de gradiente (overlay) para garantir contraste entre o texto e a imagem */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/70 to-white dark:from-background-dark/80 dark:via-background-dark/50 dark:to-background-dark"></div>
        </div>

        {/* CONTEÚDO CENTRAL: Título e Botões de Ação (CTA) */}
        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl mt-16">
          <span className="inline-block py-1.5 px-6 rounded-full bg-primary/10 dark:bg-primary/20 backdrop-blur-sm border border-primary/20 dark:border-primary/30 text-primary dark:text-blue-300 text-xs font-bold uppercase tracking-widest mb-8 font-display">
            Especialistas em Vistos de Estudo
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tight font-display">
            O caminho mais seguro para seu <span className="text-primary">Domingos Vunge</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed font-display">
            Transforme seu sonho de estudar na Europa em realidade sem dores de cabeça. Cuidamos de toda a burocracia do seu visto para que você foque apenas no seu futuro.
          </p>

          {/* Botões interativos com efeitos de hover e sombras dinâmicas */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-4">
            <button className="h-14 px-8 rounded-xl bg-primary text-white text-lg font-bold hover:bg-blue-600 transform hover:-translate-y-1 transition-all shadow-[0_10px_25px_rgba(19,37,236,0.25)] flex items-center justify-center gap-3 font-display">
              Falar com Especialista
              <span className="material-symbols-outlined">chat</span>
            </button>
            <button className="h-14 px-8 rounded-xl bg-slate-100/50 dark:bg-white/10 backdrop-blur-md text-slate-900 dark:text-white border border-slate-200 dark:border-white/20 font-bold hover:bg-slate-100 dark:hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 font-display flex items-center justify-center gap-3 shadow-sm dark:shadow-none">
              Conhecer Serviços
              <span className="material-symbols-outlined">arrow_downward</span>
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE NÚMEROS: Prova social e estatísticas da empresa */}
      <section className="py-12 bg-white dark:bg-card-dark border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200 dark:divide-slate-800/50">
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-black text-primary mb-2 font-display">+500</div>
              <div className="text-slate-600 dark:text-slate-400 font-medium font-display">Vistos Aprovados</div>
            </div>
            {/* Outros itens de estatística... */}
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-black text-primary mb-2 font-display">98%</div>
              <div className="text-slate-600 dark:text-slate-400 font-medium font-display">Taxa de Aprovação</div>
            </div>
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-black text-primary mb-2 font-display">50+</div>
              <div className="text-slate-600 dark:text-slate-400 font-medium font-display">Universidades Parceiras</div>
            </div>
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-black text-primary mb-2 font-display">24h</div>
              <div className="text-slate-600 dark:text-slate-400 font-medium font-display">Suporte Dedicado</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE DIFERENCIAIS: Cards que explicam o porquê da empresa */}
      <section className="py-20 bg-background-light dark:bg-background-dark">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-display">Por que escolher a MUVISA?</h2>
            <p className="text-slate-600 dark:text-slate-400 font-display max-w-2xl mx-auto">
              Não somos apenas uma assessoria, somos parceiros na construção da sua carreira internacional.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Cada card usa 'group' para poder disparar animações nos filhos (como o ícone) no hover do card pai */}
            <div className="bg-white dark:bg-card-dark rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:-translate-y-2 transition-transform duration-300 shadow-lg dark:shadow-none hover:shadow-xl group">
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">location_city</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-display">Especialistas em Portugal</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-display">
                Conhecemos profundamente a legislação e o sistema de ensino português. Nossa equipe respira Portugal.
              </p>
            </div>
            {/* Repetição de cards similares para outros diferenciais... */}
            <div className="bg-white dark:bg-card-dark rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:-translate-y-2 transition-transform duration-300 shadow-lg dark:shadow-none hover:shadow-xl group">
              <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">timeline</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-display">Acompanhamento Ponta a Ponta</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-display">
                Desde a escolha da universidade até a sua chegada em solo português e obtenção da residência.
              </p>
            </div>
            <div className="bg-white dark:bg-card-dark rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:-translate-y-2 transition-transform duration-300 shadow-lg dark:shadow-none hover:shadow-xl group">
              <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">folder_managed</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-display">Suporte com a Documentação</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-display">
                Revisão meticulosa de cada documento para garantir que seu processo esteja impecável para o consulado.
              </p>
            </div>
            <div className="bg-white dark:bg-card-dark rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:-translate-y-2 transition-transform duration-300 shadow-lg dark:shadow-none hover:shadow-xl group">
              <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-display">98% de Taxa de Aprovação</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-display">
                Nossa metodologia comprovada minimiza riscos e maximiza suas chances de sucesso na aplicação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO FINAL (CTA): Chamada para ação com fundo destacado */}
      <section className="py-20 relative overflow-hidden bg-primary">
        {/* Usamos mix-blend-overlay para misturar a imagem de fundo com a cor azul primária */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1592345279419-95a10728904e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">Pronto para começar sua jornada?</h2>
          <p className="text-blue-100 text-lg mb-10 font-display max-w-2xl mx-auto">
            Não deixe a burocracia atrapalhar seus sonhos. Agende uma consultoria gratuita e descubra o melhor caminho para você.
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
