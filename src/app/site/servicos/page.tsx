export default function SiteServicosPage() {
  return (
    <>
      <section className="relative py-20 lg:py-32 flex items-center justify-center overflow-hidden bg-slate-900 dark:bg-background-dark transition-colors duration-300">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900/50 to-slate-900 dark:via-background-dark dark:to-background-dark"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <span className="inline-block py-1 px-4 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6 font-display">
            Soluções Integradas
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tight font-display drop-shadow-lg">
            Nossas Assessorias Especializadas
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-display">
            Oferecemos um acompanhamento completo e personalizado para garantir o sucesso da sua jornada internacional, seja para estudos, turismo ou negócios.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-background-dark border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-card-dark rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(25,120,229,0.15)] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-2xl">badge</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-display">Assessoria para Vistos</h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm font-display">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span>Análise de perfil e orientação</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span>Revisão completa documental</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span>Agendamento consular</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-card-dark rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(25,120,229,0.15)] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-2xl">school</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-display">Assessoria Estudantil</h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm font-display">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span>Escolha da universidade ideal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span>Aplicação e matrícula</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span>Carta de motivação personalizada</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-card-dark rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(25,120,229,0.15)] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-2xl">luggage</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-display">Planeamento de Viagem</h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm font-display">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span>Roteiro personalizado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span>Seguro viagem obrigatório</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span>Busca de alojamento</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-card-dark rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(25,120,229,0.15)] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-2xl">domain</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-display">Assessoria Empresarial</h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm font-display">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span>Viagens corporativas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span>Vistos para investidores</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span>Missões empresariais</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-background-dark overflow-hidden transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-display">Como Funciona</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-display">O processo simplificado da MUVISA para garantir que você chegue ao seu destino sem preocupações.</p>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 hidden md:block z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-card-dark border-2 border-primary text-slate-900 dark:text-white flex items-center justify-center text-xl font-bold mb-4 shadow-[0_0_15px_rgba(25,120,229,0.3)] transition-transform group-hover:scale-110">1</div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-display">Consulta Inicial</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-display">Entendemos seus objetivos e definimos a melhor estratégia.</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-card-dark border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white flex items-center justify-center text-xl font-bold mb-4 group-hover:border-primary transition-colors group-hover:shadow-[0_0_15px_rgba(25,120,229,0.3)] group-hover:scale-110 duration-300">2</div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-display">Documentação</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-display">Checklist personalizado e revisão minuciosa de documentos.</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-card-dark border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white flex items-center justify-center text-xl font-bold mb-4 group-hover:border-primary transition-colors group-hover:shadow-[0_0_15px_rgba(25,120,229,0.3)] group-hover:scale-110 duration-300">3</div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-display">Aplicação</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-display">Submissão do processo junto às entidades competentes.</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-card-dark border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white flex items-center justify-center text-xl font-bold mb-4 group-hover:border-primary transition-colors group-hover:shadow-[0_0_15px_rgba(25,120,229,0.3)] group-hover:scale-110 duration-300">4</div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-display">Acompanhamento</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-display">Monitoramento constante até a aprovação final.</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-card-dark border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white flex items-center justify-center text-xl font-bold mb-4 group-hover:border-primary transition-colors group-hover:shadow-[0_0_15px_rgba(25,120,229,0.3)] group-hover:scale-110 duration-300">5</div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-display">Chegada</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-display">Suporte pós-chegada e integração no destino.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-display">Planos de Assessoria</h2>
            <p className="text-slate-600 dark:text-slate-400 font-display">Escolha o nível de suporte ideal para a sua necessidade.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plano Básico */}
            <div className="bg-white dark:bg-card-dark rounded-2xl p-8 border border-slate-200 dark:border-slate-700 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-display">Básico</h3>
              <div className="text-3xl font-black text-slate-900 dark:text-white mb-6 font-display">50.000 <span className="text-lg font-normal text-slate-500 dark:text-slate-400">Kz</span></div>
              <ul className="space-y-4 mb-8 flex-1 text-slate-600 dark:text-slate-300 text-sm font-display">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500 text-sm">check</span> Checklist de documentos</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500 text-sm">check</span> Revisão simples</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500 text-sm">check</span> Agendamento</li>
                <li className="flex items-center gap-3 opacity-50"><span className="material-symbols-outlined text-slate-400 dark:text-slate-600 text-sm">close</span> Carta de motivação</li>
                <li className="flex items-center gap-3 opacity-50"><span className="material-symbols-outlined text-slate-400 dark:text-slate-600 text-sm">close</span> Suporte pós-chegada</li>
              </ul>
              <button className="w-full py-3 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-display">Selecionar</button>
            </div>
            {/* Plano Premium */}
            <div className="bg-gradient-to-b from-primary/10 to-white dark:from-primary/20 dark:to-card-dark rounded-2xl p-8 border border-primary relative flex flex-col transform md:-translate-y-4 shadow-2xl shadow-primary/10">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg font-display">POPULAR</div>
              <h3 className="text-xl font-bold text-primary mb-2 font-display">Premium</h3>
              <div className="text-3xl font-black text-slate-900 dark:text-white mb-6 font-display">150.000 <span className="text-lg font-normal text-slate-500 dark:text-slate-400">Kz</span></div>
              <ul className="space-y-4 mb-8 flex-1 text-slate-700 dark:text-slate-200 text-sm font-display">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-sm">check</span> Tudo do Intermédio</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-sm">check</span> Simulação de entrevista</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-sm">check</span> Busca de moradia</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-sm">check</span> Seguro viagem incluso (1 mês)</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-sm">check</span> Suporte 24h via WhatsApp</li>
              </ul>
              <button className="w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 transition-colors shadow-lg font-display">Começar Agora</button>
            </div>
            {/* Plano Intermédio */}
            <div className="bg-white dark:bg-card-dark rounded-2xl p-8 border border-slate-200 dark:border-slate-700 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-display">Intermédio</h3>
              <div className="text-3xl font-black text-slate-900 dark:text-white mb-6 font-display">90.000 <span className="text-lg font-normal text-slate-500 dark:text-slate-400">Kz</span></div>
              <ul className="space-y-4 mb-8 flex-1 text-slate-600 dark:text-slate-300 text-sm font-display">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500 text-sm">check</span> Tudo do Básico</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500 text-sm">check</span> Revisão aprofundada</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500 text-sm">check</span> Carta de motivação</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500 text-sm">check</span> Apoio na matrícula</li>
                <li className="flex items-center gap-3 opacity-50"><span className="material-symbols-outlined text-slate-400 dark:text-slate-600 text-sm">close</span> Busca de moradia</li>
              </ul>
              <button className="w-full py-3 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-display">Selecionar</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background-dark">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-r from-blue-900/40 to-slate-900 rounded-2xl p-8 md:p-12 border border-primary/30 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 pattern-dots opacity-30"></div>
            <div className="relative z-10 flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display">Consultoria Estratégica Completa</h3>
              <p className="text-slate-300 mb-6 font-display">Aproveite nossa oferta especial para uma análise de perfil completa com nossos especialistas seniores.</p>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-primary font-display">150.000 Kz</span>
                <span className="text-sm text-slate-400 line-through font-display">185.000 Kz</span>
                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded font-display">-19% OFF</span>
              </div>
            </div>
            <div className="relative z-10">
              <button className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-slate-100 transition-colors shadow-lg font-display whitespace-nowrap">
                Garantir Desconto
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-display">Solicite um Orçamento</h2>
            <p className="text-slate-600 dark:text-slate-400 font-display">Preencha o formulário abaixo e entraremos em contato em até 24 horas.</p>
          </div>
          <form className="bg-slate-50 dark:bg-card-dark p-8 md:p-10 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 font-display">Nome Completo</label>
                <input className="w-full bg-white dark:bg-background-dark border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-display" placeholder="Seu nome" type="text" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 font-display">Email</label>
                <input className="w-full bg-white dark:bg-background-dark border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-display" placeholder="seu@email.com" type="email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 font-display">WhatsApp</label>
                <input className="w-full bg-white dark:bg-background-dark border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-display" placeholder="+244 9xx xxx xxx" type="tel" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 font-display">Tipo de Viagem</label>
                <select className="w-full bg-white dark:bg-background-dark border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-display appearance-none">
                  <option>Estudos</option>
                  <option>Turismo</option>
                  <option>Trabalho</option>
                  <option>Negócios</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 font-display">Destino de Interesse</label>
                <input className="w-full bg-white dark:bg-background-dark border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-display" placeholder="Ex: Lisboa, Porto..." type="text" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 font-display">Data Prevista</label>
                <input className="w-full bg-white dark:bg-background-dark border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-display" type="date" />
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 font-display">Mensagem Adicional</label>
              <textarea className="w-full bg-white dark:bg-background-dark border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-display" placeholder="Conte-nos mais sobre seus objetivos..." rows={4}></textarea>
            </div>
            <button className="w-full py-4 rounded-lg bg-primary text-white font-bold text-lg hover:bg-blue-600 transition-all shadow-lg font-display flex justify-center items-center gap-2" type="submit">
              Enviar Solicitação
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-background-dark transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <span className="material-symbols-outlined text-2xl">groups</span>
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-1 font-display">Equipa Especializada</h4>
              <p className="text-slate-500 dark:text-slate-500 text-sm font-display">Profissionais com vasta experiência</p>
            </div>
            <div className="p-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-1 font-display">Alta Aprovação</h4>
              <p className="text-slate-500 dark:text-slate-500 text-sm font-display">98% de sucesso nos processos</p>
            </div>
            <div className="p-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <span className="material-symbols-outlined text-2xl">support_agent</span>
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-1 font-display">Suporte Dedicado</h4>
              <p className="text-slate-500 dark:text-slate-500 text-sm font-display">Atendimento humanizado</p>
            </div>
            <div className="p-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <span className="material-symbols-outlined text-2xl">lock</span>
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-1 font-display">Segurança Total</h4>
              <p className="text-slate-500 dark:text-slate-500 text-sm font-display">Dados protegidos e sigilo</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-background-dark/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 font-display">Comece seu futuro hoje mesmo</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="h-14 px-8 rounded-lg bg-white text-primary text-lg font-bold hover:bg-slate-100 transition-all shadow-xl flex items-center justify-center gap-3 font-display">
              Falar com Especialista
              <span className="material-symbols-outlined">chat</span>
            </button>
            <button className="h-14 px-8 rounded-lg bg-primary text-white border border-white/30 text-lg font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-3 font-display backdrop-blur-sm">
              Pedir Cotação
              <span className="material-symbols-outlined">request_quote</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
