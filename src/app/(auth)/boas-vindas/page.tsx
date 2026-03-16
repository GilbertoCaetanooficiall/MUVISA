'use client';

import Link from 'next/link';
import { CheckCircle, PlaneTakeoff, MapPin, User, Upload, Headset, Compass, ArrowRight } from 'lucide-react';

export default function BoasVindasPage() {
  const userName = 'Estudante'; // In a real app, this would come from auth session

  return (
    <div className="font-sans antialiased text-white animate-fade-in w-full max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[80vh] px-4 relative z-20 py-12">

      <div className="w-full max-w-3xl bg-slate-950/60 backdrop-blur-2xl rounded-[24px] shadow-2xl border border-white/10 overflow-hidden flex flex-col relative z-10 animate-fade-in">
        {/* Header logo */}
        <div className="px-8 pt-8 pb-0 flex justify-center md:justify-start w-full">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/30">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">MUVISA</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 flex flex-col items-center text-center">
          {/* Animated success icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center ring-4 ring-green-500/20 border border-green-500/30 relative z-10">
              <CheckCircle className="text-green-400 w-12 h-12" />
            </div>
            <div className="absolute -top-2 -right-6 animate-bounce-slow" style={{ animationDelay: '0.1s' }}>
                <PlaneTakeoff className="text-primary/60 w-6 h-6" />
            </div>
            <div className="absolute bottom-0 -left-8 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                <MapPin className="text-primary/60 w-6 h-6" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-sm">
            Cadastro realizado com sucesso!
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
            Bem-vindo à MUVISA,{' '}
            <span className="font-semibold text-white drop-shadow-sm">{userName}</span>. Sua jornada rumo a Portugal começa agora.
          </p>

          {/* Next steps */}
          <div className="w-full max-w-2xl bg-black/20 backdrop-blur-md rounded-[20px] p-6 border border-white/5 mb-10 shadow-inner">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 text-left">Próximos Passos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: User, label: 'Complete seu Perfil' },
                { icon: Upload, label: 'Envie seus documentos' },
                { icon: Headset, label: 'Fale com sua consultora' },
              ].map(item => (
                <div key={item.label} className="bg-black/40 rounded-xl p-4 border border-white/10 shadow-sm flex flex-col items-center text-center hover:bg-white/10 hover:border-white/20 transition-all group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors shadow-sm">
                    <item.icon className="text-white/80 group-hover:text-primary w-5 h-5 transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link
              className="w-full sm:w-auto px-6 py-3.5 bg-black/40 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 shadow-sm flex items-center justify-center gap-2 group"
              href="/site/estudar-em-portugal"
            >
              <Compass className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              Explorar Guia
            </Link>
            <Link
              className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-primary/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary flex items-center justify-center gap-2 group transform hover:scale-[1.02]"
              href="/portal-estudante/home"
            >
              Acessar meu Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
