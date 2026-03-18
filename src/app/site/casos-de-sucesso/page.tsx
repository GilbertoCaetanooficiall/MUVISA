import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const metrics = [
  { value: '+1.200', label: 'Estudantes Aprovados' },
  { value: '98%',   label: 'Taxa de Sucesso' },
  { value: 'Múltiplos', label: 'Países de Origem' },
  { value: '100%',  label: 'Processos Concluídos' },
];

const stories = [
  {
    name: 'Ricardo Mendes',
    origin: '🇧🇷 Brasil',
    days: '45 dias',
    university: 'Universidade de Coimbra',
    course: 'Direito Internacional',
    quote: '"A MUVISA cuidou de todo o meu processo e hoje estou estudando em Portugal com tudo aprovado. A tranquilidade que me passaram foi essencial."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkytge9QzCrNVoYTnh1r1kEQ9qFxd3ZHi6J9smgNLqkO4K_Io9VBKlobfEdGSRCUyK2wZXmaJtA8daZom6m676LzQ3rW7pWi0dqDHoKngM630LxcP64mfRfSVKiv-lnA_XUn79VbXaqGhXRAcZ_PA_hs4lME8pOHSYEYB1_fdWk4gEMiGiy9e09PKP6z6HhNtmuCKZCV11_36cCmB47mZsKoBklbqC4AU4sWRn-ukrusBR6eIQkoZjoCy_DdVIEijE34qyTLvP5i5m',
  },
  {
    name: 'Beatriz Souza',
    origin: '🇦🇴 Angola',
    days: '32 dias',
    university: 'Instituto Politécnico de Leiria',
    course: 'Engenharia Informática',
    quote: '"Desde a primeira reunião senti muita confiança. O suporte na documentação foi impecável e o visto saiu muito antes do esperado."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmuOK1WjIbSg_0UAsiIX0UMB09jJ8SUUXaJzMnnBMcYiMpQU7A7qCBLTgda0Z-mv162uNCPkehkPJH4sD8WLYFwB5kJ7q9AcRAv3ZwyPwN575IENW03xOn_Fw4B-7hJ_iQ8j-66FBCIhuOzhZq-JkSOUPrkbEH1XMGCaoAfoAZYo1qXVSRFj4je9yk0XtH5DtK6-GypEDFHi_8OjfXeJmC-t-vf5Ob43hJZA27Al_ouyNb8d031IWnJoU7XDZDzmGfQOnNHVuD9-bW',
  },
  {
    name: 'Lucas Ferreira',
    origin: '🇧🇷 Brasil',
    days: '50 dias',
    university: 'Universidade do Minho',
    course: 'Mestrado em Gestão',
    quote: '"O acompanhamento personalizado faz toda a diferença. Sem a ajuda da MUVISA, eu teria me perdido na burocracia do consulado."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCL1FC6O-t3HXaHawM61UnenNsfDVk-YY1ppsX5px2SMI6bsw6heB7ZtuwIKyUkG35fxIPfsqCgp6-Sy_bAT8Q7aT3vL3qhx85VAAHrrnuawSgMyOVVgF5lv64BeCca1chSotPtmsg9h9z2Xv56mUHs_EiSB52irvn-l21VO5f1Z0drxOneUgCt6CSXlcxXrJHsWGdMx30XG0NKG27c5B58siS2C0Z2sZQZ3Bz9Zhm14my9ufi_iIBH4jVCLdNNVkWyoZzWC_GdMARi',
  },
];

export default function CasosDeSuccessoPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-50 dark:bg-background-dark transition-colors duration-300">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-200 to-slate-50 dark:from-card-dark dark:to-background-dark opacity-80" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <span className="inline-block py-1 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 font-display">
            Histórias Reais
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight font-display">
            Casos de{' '}
            <span className="text-primary">Sucesso</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-display">
            Veja como ajudamos estudantes a conquistar o seu visto e realizar o sonho de estudar em Portugal com segurança e agilidade.
          </p>
        </div>
      </section>

      {/* ── Métricas ── */}
      <section className="py-16 bg-white dark:bg-background-dark transition-colors border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="bg-slate-50 dark:bg-card-dark border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 text-center hover:border-primary/40 hover:shadow-[0_0_20px_rgba(25,120,229,0.1)] transition-all duration-300"
              >
                <div className="text-3xl font-black text-primary mb-2 font-display">{m.value}</div>
                <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold font-display">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cards de histórias ── */}
      <section className="py-20 bg-slate-50 dark:bg-background-dark transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 font-display">Histórias de Quem Confiou na MUVISA</h2>
            <p className="text-slate-600 dark:text-slate-400 font-display max-w-xl mx-auto">
              Depoimentos reais de estudantes que conseguiram aprovação com o nosso acompanhamento.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {stories.map((s) => (
              <div
                key={s.name}
                className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 flex flex-col h-full shadow-sm hover:-translate-y-2 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="w-16 h-16 rounded-full border-2 border-primary object-cover shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight font-display">{s.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.origin} • {s.days}</p>
                  </div>
                </div>

                {/* Badge + Info */}
                <div className="mb-4 flex-1">
                  <span className="inline-flex items-center gap-1 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase mb-3">
                    <CheckCircle size={12} />
                    Aprovado
                  </span>
                  <p className="text-sm font-semibold text-primary mb-0.5 font-display">{s.university}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-4 font-display">{s.course}</p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-display">{s.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-20 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">
            Pronto para começar o seu processo?
          </h2>
          <p className="text-white/80 text-lg mb-10 font-display max-w-xl mx-auto">
            Não perca tempo com incertezas. A nossa equipa está pronta para guiar você em cada etapa da sua jornada para Portugal.
          </p>
          <Link href="/site/contato">
            <button className="inline-block bg-white text-primary hover:bg-slate-50 px-10 py-4 rounded-lg text-lg font-bold transition-all shadow-xl hover:shadow-2xl hover:scale-105 font-display">
              Fale com um consultor
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
