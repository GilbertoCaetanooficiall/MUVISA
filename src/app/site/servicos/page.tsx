import { BadgeCheck, Building2, Check, CheckCircle, FileSignature, GraduationCap, Headset, Lock, MessageCircle, Users, X } from 'lucide-react';
import Link from 'next/link';
export default function SiteServicosPage() {
  return (
    <>
      <section className="relative py-20 lg:py-32 flex items-center justify-center overflow-hidden bg-slate-900 dark:bg-background-dark transition-colors duration-300">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-slate-900/50 to-slate-900 dark:via-background-dark dark:to-background-dark"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <span className="inline-block py-1 px-4 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary dark:text-primary text-xs font-bold uppercase tracking-widest mb-6 font-display">
            Soluções Integradas
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tight font-display drop-shadow-lg">
            Sua Carreira em Portugal Começa Aqui
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-display">
            Oferecemos um acompanhamento de ponta a ponta focado exclusivamente em visto de estudante, garantindo que você se preocupe apenas com seus estudos.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-background-dark border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Card 1: Planeamento Acadêmico */}
            <div className="bg-white dark:bg-card-dark rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(25,120,229,0.15)] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <GraduationCap className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-display">Planeamento Acadêmico</h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm font-display">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary text-base shrink-0" />
                  <span>Escolha da universidade e curso ideal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary text-base shrink-0" />
                  <span>Análise de requisitos de admissão</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary text-base shrink-0" />
                  <span>Aplicação e matrícula assistida</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Gestão Documental */}
            <div className="bg-white dark:bg-card-dark rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(25,120,229,0.15)] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <FileSignature className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-display">Gestão Documental</h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm font-display">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary text-base shrink-0" />
                  <span>Termo de responsabilidade e Extractos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary text-base shrink-0" />
                  <span>Análise minuciosa de extratos bancários</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary text-base shrink-0" />
                  <span>Revisão do dossiê acadêmico e financeiro</span>
                </li>
              </ul>
            </div>

            {/* Card 3: Aplicação de Visto */}
            <div className="bg-white dark:bg-card-dark rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(25,120,229,0.15)] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <BadgeCheck className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-display">Aplicação de Visto</h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm font-display">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary text-base shrink-0" />
                  <span>Preenchimento de formulários consulares</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary text-base shrink-0" />
                  <span>Preparação para entrevista</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary text-base shrink-0" />
                  <span>Agendamento e acompanhamento legal</span>
                </li>
              </ul>
            </div>

            {/* Card 4: Apoio à Chegada */}
            <div className="bg-white dark:bg-card-dark rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(25,120,229,0.15)] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Building2 className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-display">Apoio à Chegada</h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm font-display">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary text-base shrink-0" />
                  <span>Busca de alojamento em Portugal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary text-base shrink-0" />
                  <span>Abertura de NIF e Conta Bancária</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary text-base shrink-0" />
                  <span>Orientação SEF/AIMA e integração</span>
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
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-display">Essencial</h3>
              <div className="text-3xl font-black text-slate-900 dark:text-white mb-6 font-display">400.000 <span className="text-lg font-normal text-slate-500 dark:text-slate-400">Kz</span></div>
              <ul className="space-y-4 mb-8 flex-1 text-slate-600 dark:text-slate-300 text-sm font-display">
                <li className="flex items-center gap-3"><Check className="text-green-500 text-sm" /> Checklist de documentos</li>
                <li className="flex items-center gap-3"><Check className="text-green-500 text-sm" /> Revisão de dossiê</li>
                <li className="flex items-center gap-3"><Check className="text-green-500 text-sm" /> Agendamento consular</li>
                <li className="flex items-center gap-3"><Check className="text-green-500 text-sm" /> Acesso ao Portal do Aluno</li>
                <li className="flex items-center gap-3 opacity-50"><X className="text-slate-400 dark:text-slate-600 text-sm" /> Termo de Responsabilidade</li>
              </ul>
              <Link href="/site/contato" className="w-full">
                <button className="w-full py-3 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-display">Selecionar</button>
              </Link>
            </div>
            {/* Plano Premium */}
            <div className="bg-gradient-to-b from-primary/10 to-white dark:from-primary/20 dark:to-card-dark rounded-2xl p-8 border border-primary relative flex flex-col transform md:-translate-y-4 shadow-2xl shadow-primary/10">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg font-display">RECOMENDADO</div>
              <h3 className="text-xl font-bold text-primary mb-2 font-display">Diamond</h3>
              <div className="text-3xl font-black text-slate-900 dark:text-white mb-6 font-display">1.000.000 <span className="text-lg font-normal text-slate-500 dark:text-slate-400">Kz</span></div>
              <ul className="space-y-4 mb-8 flex-1 text-slate-700 dark:text-slate-200 text-sm font-display">
                <li className="flex items-center gap-3"><Check className="text-primary text-sm" /> Tudo do Acadêmico</li>
                <li className="flex items-center gap-3"><Check className="text-primary text-sm" /> Abertura de NIF e Conta</li>
                <li className="flex items-center gap-3"><Check className="text-primary text-sm" /> Busca de Moradia/Residência</li>
                <li className="flex items-center gap-3"><Check className="text-primary text-sm" /> Orientação de Chegada & SEF</li>
                <li className="flex items-center gap-3"><Check className="text-primary text-sm" /> Suporte Premium 24h</li>
              </ul>
              <Link href="/site/contato" className="w-full">
                <button className="w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover transition-colors shadow-lg font-display">Começar Agora</button>
              </Link>
            </div>
            {/* Plano Intermédio */}
            <div className="bg-white dark:bg-card-dark rounded-2xl p-8 border border-slate-200 dark:border-slate-700 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-display">Acadêmico</h3>
              <div className="text-3xl font-black text-slate-900 dark:text-white mb-6 font-display">700.000 <span className="text-lg font-normal text-slate-500 dark:text-slate-400">Kz</span></div>
              <ul className="space-y-4 mb-8 flex-1 text-slate-600 dark:text-slate-300 text-sm font-display">
                <li className="flex items-center gap-3"><Check className="text-green-500 text-sm" /> Tudo do Essencial</li>
                <li className="flex items-center gap-3"><Check className="text-green-500 text-sm" /> Escolha de Universidade</li>
                <li className="flex items-center gap-3"><Check className="text-green-500 text-sm" /> Apoio na Matrícula/Admissão</li>
                <li className="flex items-center gap-3"><Check className="text-green-500 text-sm" /> Termo de Responsabilidade</li>
                <li className="flex items-center gap-3"><Check className="text-green-500 text-sm" /> Extracto Bancário</li>
              </ul>
              <Link href="/site/contato" className="w-full">
                <button className="w-full py-3 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-display">Selecionar</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background-dark">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-r from-primary/40 to-slate-900 rounded-2xl p-8 md:p-12 border border-primary/30 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 pattern-dots opacity-30"></div>
            <div className="relative z-10 flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display">Consultoria Estratégica Completa</h3>
              <p className="text-slate-300 mb-6 font-display">Aproveite nossa oferta especial para uma análise de perfil completa com nossos especialistas seniores.</p>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-primary font-display">250.000 Kz</span>
                <span className="text-sm text-slate-400 line-through font-display">400.000 Kz</span>
                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded font-display">-37% OFF</span>
              </div>
            </div>
            <div className="relative z-10">
              <Link href="/site/contato">
                <button className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-slate-100 transition-colors shadow-lg font-display whitespace-nowrap">
                  Garantir Desconto
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>



      <section className="py-16 bg-white dark:bg-background-dark transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <Users className="text-2xl" />
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-1 font-display">Equipa Especializada</h4>
              <p className="text-slate-500 dark:text-slate-500 text-sm font-display">Profissionais com vasta experiência</p>
            </div>
            <div className="p-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <BadgeCheck className="text-2xl" />
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-1 font-display">Alta Aprovação</h4>
              <p className="text-slate-500 dark:text-slate-500 text-sm font-display">98% de sucesso nos processos</p>
            </div>
            <div className="p-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <Headset className="text-2xl" />
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-1 font-display">Suporte Dedicado</h4>
              <p className="text-slate-500 dark:text-slate-500 text-sm font-display">Atendimento humanizado</p>
            </div>
            <div className="p-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <Lock className="text-2xl" />
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
            <Link href="/site/contato">
              <button className="h-14 px-8 rounded-lg bg-white text-primary text-lg font-bold hover:bg-slate-100 transition-all shadow-xl flex items-center justify-center gap-3 font-display">
                Falar com Especialista
                <MessageCircle />
              </button>
            </Link>
            <Link href="/site/contato">
              <button className="h-14 px-8 rounded-lg bg-primary text-white border border-white/30 text-lg font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-3 font-display backdrop-blur-sm">
                Pedir Cotação
                <FileSignature />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
