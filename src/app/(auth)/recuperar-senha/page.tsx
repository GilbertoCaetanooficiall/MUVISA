'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RecuperarSenhaPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="font-sans antialiased text-white flex flex-col items-center justify-center w-full max-w-2xl mx-auto relative z-20 px-4 py-12 min-h-[80vh]">

      {/* Logo */}
      <div className="mb-8 text-center animate-fade-in w-full">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/30">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">MUVISA</h2>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mt-2 text-white">
          {submitted ? 'Email enviado!' : 'Recuperar senha'}
        </h1>
        <p className="text-gray-300 mt-2 max-w-sm mx-auto">
          {submitted
            ? `Enviamos instruções para ${email}. Verifique sua caixa de entrada e pasta de spam.`
            : 'Informe o email cadastrado e enviaremos um link seguro para redefinir sua senha.'}
        </p>
      </div>

      <div className="w-full max-w-md bg-slate-950/60 backdrop-blur-2xl rounded-[24px] shadow-2xl border border-white/10 p-8 sm:p-10 animate-fade-in">
        {!submitted ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200" htmlFor="email">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors text-[20px]">mail</span>
                </div>
                <input
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-black/40 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all sm:text-sm shadow-inner"
                  id="email" placeholder="seu@email.com" type="email" required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button
              className="w-full group relative flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary transition-all duration-200 shadow-sm transform hover:scale-[1.02] mt-2"
              type="submit"
            >
              Enviar link de recuperação
              <span className="material-symbols-outlined text-lg opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">send</span>
            </button>

            <div className="text-center pt-4 border-t border-white/10">
              <Link className="text-sm font-medium text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group" href="/login">
                <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                Voltar ao login
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative z-10 w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center ring-4 ring-green-500/20 border border-green-500/30">
                <span className="material-symbols-outlined text-green-400 text-5xl">mark_email_read</span>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              Não recebeu o email? Verifique a pasta de spam ou{' '}
              <button className="text-primary hover:text-primary-hover font-medium underline transition-colors" onClick={() => setSubmitted(false)}>tente novamente</button>.
            </p>
            <div className="pt-2">
                <Link
                className="w-full flex justify-center items-center py-3.5 px-4 border border-white/20 text-sm font-semibold rounded-xl text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-white/20 transition-all duration-200"
                href="/login"
                >
                Voltar ao login
                </Link>
            </div>
          </div>
        )}
      </div>

      {/* Security badges */}
      <div className="mt-12 grid grid-cols-2 gap-8 md:gap-16 text-center max-w-xl w-full animate-fade-in px-4">
        {[
          { icon: 'verified_user', title: 'Segurança Garantida', text: 'Seus dados são criptografados militarmente.' },
          { icon: 'location_city', title: 'Especialistas em Portugal', text: 'Orientação especializada em processos de visto.' },
        ].map(item => (
          <div key={item.icon} className="flex flex-col items-center group cursor-default">
            <div className="h-14 w-14 rounded-full bg-black/40 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300 shadow-lg">
              <span className="material-symbols-outlined text-white/80 group-hover:text-primary text-2xl transition-colors">{item.icon}</span>
            </div>
            <h3 className="text-sm font-semibold text-white drop-shadow-sm mb-1">{item.title}</h3>
            <p className="text-xs text-gray-400 max-w-[140px] leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      <p className="absolute bottom-6 w-full text-center text-xs text-gray-500 pointer-events-none">
        <span className="pointer-events-auto">© 2024 MUVISA. Todos os direitos reservados.</span><br />
        <span className="pointer-events-auto inline-flex gap-2 mt-1">
            <Link className="hover:text-white transition-colors" href="/privacidade">Privacidade</Link>
            <span>·</span>
            <Link className="hover:text-white transition-colors" href="/termos">Termos</Link>
        </span>
      </p>
    </div>
  );
}
