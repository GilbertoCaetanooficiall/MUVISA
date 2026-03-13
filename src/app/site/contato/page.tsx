import { ArrowRight, ClipboardList, Clock, ListChecks, Lock, Mail, Phone } from 'lucide-react';
export default function SiteContatoPage() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-16 items-start mx-auto py-10 px-4 sm:px-6">
        <div className="flex-1 flex flex-col justify-center space-y-8 lg:sticky lg:top-24">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 px-3 py-1 text-xs font-semibold text-primary dark:text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Consultoria Gratuita
            </span>
            <h1 className="text-slate-900 dark:text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight drop-shadow-sm">
              Desbloqueie o Seu Futuro Académico Hoje
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
              Reserve a sua sessão estratégica gratuita de 30 minutos. Analisaremos o seu perfil e traçaremos a sua jornada para a universidade dos seus sonhos.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_20px_rgba(25,120,229,0.15)] group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary group-hover:text-primary transition-colors">
                <ClipboardList />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Avaliação de Perfil</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Analisamos o seu histórico, notas e interesses para encontrar a universidade ideal para si.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_20px_rgba(25,120,229,0.15)] group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary group-hover:text-primary transition-colors">
                <ListChecks />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Checklist Personalizada</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Receba uma lista personalizada de todos os documentos necessários para a sua candidatura.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_20px_rgba(25,120,229,0.15)] group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary group-hover:text-primary transition-colors">
                <Clock />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Cronograma de Visto</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Obtenha um roteiro claro com prazos para o seu processo de pedido de visto.</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Retrato de estudante" className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbUZrUmxOtNmISLlRz7MdXzaeJg-QuC2ynRVeSSIH_Ck06ElvvEBHI2TTzND00rRsvCG_e6s4AKs9UhAU1rYdOp53JzAaOcOB7_4Te7u8Rn8eMhJI-bSgRYKd4H2IZQ9l8Y2Ix691IPwdz_eJFyb8ydotS0zxwjKmXwx_4ax-hmh0OeDSwHgSXacud7EUmNKLxqVDQ13-WxBSswGEEnjaIdfHN8v6kO5SZBsFKQmdrrFBstcNJQWqySQBtvnqlQMomX3qE8tvAqY6z" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Retrato de estudante" className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCCQ_OKBreg1nmZkTsoTEk2sMSFO9ltriySan0HEAyt8ZAcEcKAZ_P7dV5KzjNCKB6NGdVob8nuTql53dK6uRc5uQZspeqfkbKNDSoPgvATzUCQBZvIejnaYAHzL_J2awoYeoBOX0V3mIfRe5MoMdbE7QnN3CRhHZVIFxWjQXO8FCEcsKN3f7QdwbX7crK3V6chpclezwXzT2Ae47WJU-CTIq5iPfLdjKbETrcgkLoqgaNsMYz87IrRuDSNYzyEq00v8ouPdBZnt8G" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Retrato de estudante" className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALDDFEzt0Seur94GFLJtKfYzaNySAF3HNIJ_dFQjO0v_27eYsxZ169HlR_tRO_U6mmVMS0owGIw2QiTmOoMJqGYBRI851TFZ8ZMYDEObsIqcsxPMyYRvLQCo5cf4vtdzg8JiCvTdj1UY8AwxJRJkanEY8IjdEJE4iiBsijqMoYbL3XZs6KOj5ukuoGR3EXysyYyKLRrlYZEut1yRQEa9bOXtutTouUlBj3rzbJLKU4zxxCScFuxbyIY59luoVd1c2RFgr28iouG4XE" />
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Junte-se a mais de <span className="text-slate-900 dark:text-white font-bold">2.000</span> estudantes ajudados este ano.</p>
          </div>
        </div>

        <div className="flex-1 max-w-xl w-full mx-auto">
          <div className="bg-white dark:bg-card-dark rounded-2xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden relative">
            <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h2 className="font-bold text-slate-900 dark:text-white">Agende a sua sessão</h2>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_10px_rgba(25,120,229,0.5)]">1</span>
                <span>Contacto</span>
                <span className="h-px w-3 bg-slate-300 dark:bg-slate-600"></span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">2</span>
                <span>Detalhes</span>
              </div>
            </div>

            <form className="p-6 lg:p-8 flex flex-col gap-6">
              <div className="space-y-5">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Nome Completo</span>
                  <input className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary py-2.5 px-3 placeholder:text-slate-400" placeholder="Seu nome" type="text" />
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Endereço de E-mail</span>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <Mail className="text-[20px]" />
                      </div>
                      <input className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary pl-10 py-2.5 placeholder:text-slate-400" placeholder="exemplo@email.com" type="email" />
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">WhatsApp</span>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <Phone className="text-[20px]" />
                      </div>
                      <input className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary pl-10 py-2.5 placeholder:text-slate-400" placeholder="+244 9xx xxx xxx" type="tel" />
                    </div>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Tipo de Visto</span>
                    <select defaultValue="" className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary py-2.5 px-3">
                      <option disabled value="">Selecione o visto</option>
                      <option value="d4">Visto de Estudante (D4)</option>
                      <option value="d3">Investigação/Ensino (D3)</option>
                      <option value="d4-sec">Ensino Secundário</option>
                      <option value="d4-trainee">Estágio/Voluntariado</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Nível de Ensino</span>
                    <select defaultValue="" className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary py-2.5 px-3">
                      <option disabled value="">Selecione o nível</option>
                      <option value="licenciatura">Licenciatura</option>
                      <option value="mestrado">Mestrado</option>
                      <option value="doutoramento">Doutoramento</option>
                      <option value="ctesp">CTeSP</option>
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Cidade ou Universidade de Interesse</span>
                  <input className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary py-2.5 px-3 placeholder:text-slate-400" placeholder="Ex: Porto, Coimbra, Aveiro..." type="text" />
                </label>

                <div className="pt-2">
                  <label className="block mb-3">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">Data e Hora Sugerida</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary py-2.5 px-3" type="date" />
                    <select className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary py-2.5 px-3">
                      <option>Manhã (09:00 - 12:00)</option>
                      <option>Tarde (14:00 - 18:00)</option>
                      <option>Noite (19:00 - 21:00)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold h-12 transition-all shadow-[0_0_15px_rgba(25,120,229,0.4)] hover:shadow-[0_0_20px_rgba(25,120,229,0.6)] active:scale-[0.99]" type="button">
                  Confirmar Agendamento
                  <ArrowRight className="text-lg" />
                </button>
                <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                  <Lock className="text-sm text-green-500 dark:text-green-400" />
                  <span>Seus dados estão seguros.</span>
                </div>
              </div>
            </form>
          </div>

          <div className="lg:hidden flex items-center justify-center gap-3 mt-8">
            <div className="flex -space-x-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Retrato de estudante" className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk5yQvZ6x43JWfoAT074kvjQs_jeCINESPoXIpM6lvYHSzKdaNpmKpAJtheaAK18t1_QGe6ob1v-d4KjEsTiXgMkwp9fTbW05Jl3mbrCocBOSVlPsmvaEhJL1c5PJctNmON6ZU_GTn7NFBW6m6Qr3mM4o_ZchmCRzjR_tGjqGWwKh4QdfNDnPInaXIWUVZhTj_m1EmGu_fAUjPGI1AP-Am6KvGXNYK0V0sTYJk3X_QVXqT9hIxdniZBdv00wnaxRxXDKeNfm59iaUg" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Retrato de estudante" className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWKsM2IDq7BIUsDGiONN83nqx_PyyFT46Rc8qKZ7ITY2JlWSZAFj7kXFKIzgV2UFCMWf61BCdO2MzXAyoATaIphWAlYcAchSoK-SIGvT9ZzjVUHOWY95utxjz0Dwy4fXcLcF96CiO7Lr6s1mXFnBiyGn9WwNN23wHnEdT9YNeUCarjfteN_fnoIcKD_KRBtaEvR5o_NCsDejryFv3KrR_GfQTpYpNUhTzILsfZjxajnhF-4STkDeOpzpWPurSMKeSnfGazi1o5UdG2" />
            </div>
            <p className="text-xs font-medium text-slate-400">Com a confiança de mais de <span className="text-white font-bold">2.000</span> estudantes</p>
          </div>
        </div>
      </div>
    </>
  );
}
