'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative z-20 w-full max-w-6xl px-4 grid lg:grid-cols-2 gap-12 items-center h-full min-h-[80vh] font-sans antialiased text-white">
      
      {/* BEGIN: Brand & Social Proof Column */}
      <section className="hidden lg:flex flex-col space-y-8 text-left" data-purpose="branding-info">
        <div className="flex items-center space-y-2 flex-col items-start">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary p-2 rounded-lg">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <span className="text-3xl font-bold tracking-tight">MUVISA</span>
          </div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Especialistas em Vistos <span className="text-primary">D4</span> e <span className="text-blue-400">D7</span> para Portugal
          </h1>
          <p className="text-lg text-gray-300 max-w-md">
            Junte-se a mais de 5.000 estudantes e profissionais que realizaram o sonho de viver em Portugal com a nossa assessoria especializada.
          </p>
        </div>
        <div className="grid gap-4 max-w-md">
          {/* Badge 1 */}
          <div className="bg-slate-950/60 backdrop-blur-xl border border-white/10 p-4 rounded-xl flex items-center space-x-4">
            <div className="bg-green-500/20 p-2 rounded-full">
              <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <div>
              <h4 className="font-semibold">Taxa de Aprovação de 98%</h4>
              <p className="text-sm text-gray-400">Nossa equipe revisa cada detalhe para garantir o sucesso do seu processo.</p>
            </div>
          </div>
          {/* Badge 2 */}
          <div className="bg-slate-950/60 backdrop-blur-xl border border-white/10 p-4 rounded-xl flex items-center space-x-4">
            <div className="bg-primary/20 p-2 rounded-full">
              <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <div>
              <h4 className="font-semibold">Suporte Dedicado 24/7</h4>
              <p className="text-sm text-gray-400">Acompanhamento desde a documentação até sua chegada em Lisboa ou Porto.</p>
            </div>
          </div>
        </div>
      </section>
      {/* END: Brand & Social Proof Column */}

      {/* BEGIN: Login Card */}
      <section className="flex justify-center lg:justify-end" data-purpose="login-form-container">
        <div className="bg-slate-950/60 backdrop-blur-2xl border border-white/10 w-full max-w-md p-8 sm:p-10 rounded-[24px] shadow-2xl">
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">MUVISA</span>
            </div>
          </div>
          
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-bold">Bem-vindo de volta</h2>
            <p className="text-gray-400 mt-2">Acesse sua conta para acompanhar seu processo.</p>
          </div>
          
          <form action="/boas-vindas" className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300" htmlFor="email">E-mail</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>
                <input className="block w-full pl-10 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm py-3 transition-all outline-none" id="email" name="email" placeholder="seu@email.com" required type="email" />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300" htmlFor="password">Senha</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>
                <input className="block w-full pl-10 pr-10 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm py-3 transition-all outline-none" id="password" name="password" placeholder="••••••••" required type={showPassword ? 'text' : 'password'} />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  <svg className="h-5 w-5 text-gray-500 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input className="h-4 w-4 text-primary focus:ring-primary border-white/20 rounded bg-black/40 focus:ring-offset-background-dark" id="remember-me" name="remember-me" type="checkbox" />
                <label className="ml-2 block text-gray-300" htmlFor="remember-me">Lembrar de mim</label>
              </div>
              <Link className="font-medium text-primary hover:text-primary-hover transition-colors" href="/recuperar-senha">Esqueceu a senha?</Link>
            </div>
            
            {/* Submit Button */}
            <button className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary transition-all transform hover:scale-[1.02]" type="submit">
              Entrar
            </button>
            
            {/* Footer Text */}
            <p className="text-center text-sm text-gray-400">
              Não tem uma conta?{' '} 
              <Link className="font-medium text-primary hover:text-primary-hover transition-colors" href="/cadastro">Cadastre-se</Link>
            </p>
          </form>
        </div>
      </section>
      {/* END: Login Card */}

      {/* BEGIN: Footer Links */}
      <div className="absolute lg:fixed bottom-6 w-full text-center z-20 pointer-events-none left-0">
        <div className="text-xs text-gray-500 flex justify-center space-x-4 pointer-events-auto">
          <span>© 2024 MUVISA</span>
          <Link className="hover:text-white transition-colors" href="/privacidade">Privacidade</Link>
          <Link className="hover:text-white transition-colors" href="/termos">Termos</Link>
        </div>
      </div>
      {/* END: Footer Links */}

    </div>
  );
}
