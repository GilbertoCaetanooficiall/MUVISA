import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, EyeOff, LogIn, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Login Admin – MUVISA',
  description: 'Faça login para gerenciar vistos e processos MUVISA.',
};

export default function AdminLoginPage() {
  return (
    /* Full-screen dark corporate background */
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden antialiased font-display">
      {/* Background layer */}
      <div className="fixed inset-0 z-0 bg-slate-900">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(19,88,178,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 0%, rgba(19,88,178,0.10) 0%, transparent 30%)',
          }}
        />
        {/* Subtle crosshatch pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Centred card */}
      <main className="relative z-10 flex min-h-screen w-full items-center justify-center p-4">
        <div className="w-full max-w-[480px] overflow-hidden rounded-xl bg-white dark:bg-[#1c2430] shadow-2xl ring-1 ring-slate-900/5 transition-all">

          {/* Card header — branded image area */}
          <div className="relative h-48 w-full bg-primary/10 overflow-hidden flex items-center justify-center">
            {/* Blue overlay */}
            <div className="absolute inset-0 bg-[#1358b2]/80 mix-blend-multiply" />
            {/* University campus photo */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')",
              }}
            />
            {/* Logo */}
            <div className="relative z-10 flex flex-col items-center">
              <Image src="/logo-mobile.svg" alt="MUVISA Logo" width={150} height={35} className="h-[40px] w-auto object-contain drop-shadow-lg block md:hidden mb-2" priority />
              <Image src="/logo-light.svg" alt="MUVISA Logo" width={200} height={45} className="h-[50px] w-auto object-contain drop-shadow-lg hidden md:block dark:hidden mb-2" priority />
              <Image src="/logo-dark.svg" alt="MUVISA Logo" width={200} height={45} className="h-[50px] w-auto object-contain drop-shadow-lg hidden dark:md:block mb-2" priority />
              <p className="text-white text-[11px] font-bold uppercase tracking-widest drop-shadow-md">Admin Portal</p>
            </div>
          </div>

          {/* Card body */}
          <div className="flex flex-col gap-6 px-8 py-8">
            {/* Heading */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Bem-vindo à Gestão MUVISA
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Faça login para gerenciar vistos e processos.
              </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-5" action="/admin/dashboard">
              {/* Email */}
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-slate-900 dark:text-slate-200">
                  E-mail Corporativo
                </span>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 text-slate-400 dark:text-slate-500" size={20} />
                  <input
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111821] py-3 pl-11 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#1358b2] focus:bg-white dark:focus:bg-[#111821] focus:outline-none focus:ring-1 focus:ring-[#1358b2] transition"
                    placeholder="nome@muvisa.com"
                    type="email"
                    autoComplete="email"
                  />
                </div>
              </label>

              {/* Password */}
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-slate-900 dark:text-slate-200">
                  Senha
                </span>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 text-slate-400 dark:text-slate-500" size={20} />
                  <input
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111821] py-3 pl-11 pr-11 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#1358b2] focus:bg-white dark:focus:bg-[#111821] focus:outline-none focus:ring-1 focus:ring-[#1358b2] transition"
                    placeholder="••••••••"
                    type="password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-4 flex items-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                  >
                    <EyeOff size={20} />
                  </button>
                </div>
              </label>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 dark:bg-slate-700 text-[#1358b2] focus:ring-[#1358b2]"
                    type="checkbox"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Lembrar-me</span>
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-[#1358b2] hover:text-blue-700 hover:underline transition-colors"
                >
                  Esqueceu a senha?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1358b2] py-3 text-sm font-bold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#1358b2] focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors"
              >
                <LogIn size={18} />
                Entrar na Plataforma
              </button>
            </form>

            {/* Footer */}
            <div className="flex flex-col items-center gap-4 border-t border-slate-100 dark:border-slate-700/50 pt-6">
              <p className="text-center text-xs text-slate-500 dark:text-slate-500">
                Protegido por reCAPTCHA e sujeito à{' '}
                <a href="#" className="text-slate-700 dark:text-slate-300 hover:underline">
                  Política de Privacidade
                </a>{' '}
                e{' '}
                <a href="#" className="text-slate-700 dark:text-slate-300 hover:underline">
                  Termos de Serviço
                </a>
                .
              </p>
              <Link
                href="/"
                className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-1 transition-colors"
              >
                <ArrowLeft size={14} />
                Voltar ao site
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
