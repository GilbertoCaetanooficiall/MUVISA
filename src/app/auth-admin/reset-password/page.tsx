'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, EyeOff, Eye, ArrowLeft, CheckCircle2, Loader2, KeyRound } from 'lucide-react';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    setIsSubmitting(true);
    // Simulando chamada de API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden antialiased font-display">
      {/* Background layer */}
      <div className="fixed inset-0 z-0 bg-slate-900">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(19,88,178,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 0%, rgba(19,88,178,0.10) 0%, transparent 30%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <main className="relative z-10 flex min-h-screen w-full items-center justify-center p-4">
        <div className="w-full max-w-[480px] overflow-hidden rounded-xl bg-white dark:bg-[#1c2430] shadow-2xl ring-1 ring-slate-900/5 transition-all">
          
          {/* Card header — branded image area */}
          <div className="relative h-48 w-full bg-primary/10 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[#1358b2]/80 mix-blend-multiply" />
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')",
              }}
            />
            <div className="relative z-10 flex flex-col items-center">
              <Image src="/logo-light.svg" alt="MUVISA Logo" width={200} height={45} className="h-[50px] w-auto object-contain drop-shadow-lg hidden md:block dark:hidden mb-2" priority />
              <Image src="/logo-dark.svg" alt="MUVISA Logo" width={200} height={45} className="h-[50px] w-auto object-contain drop-shadow-lg hidden dark:md:block mb-2" priority />
              <Image src="/logo-mobile.svg" alt="MUVISA Logo" width={150} height={35} className="h-[40px] w-auto object-contain drop-shadow-lg block md:hidden mb-2" priority />
              <p className="text-white text-[11px] font-bold uppercase tracking-widest drop-shadow-md">Admin Portal</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 px-8 py-8 md:px-10">
            {!isSuccess ? (
              <>
                <div className="text-center">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Redefinir senha
                  </h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Crie uma nova senha de acesso para sua conta corporativa.
                  </p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  {/* Nova Senha */}
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">
                      Nova Senha
                    </span>
                    <div className="relative flex items-center text-slate-400 focus-within:text-[#1358b2] transition-colors">
                      <Lock className="absolute left-4" size={20} />
                      <input
                        required
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111821] py-3 pl-11 pr-11 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#1358b2] focus:bg-white dark:focus:bg-[#111821] focus:outline-none focus:ring-1 focus:ring-[#1358b2] transition"
                        placeholder="••••••••"
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </label>

                  {/* Confirmar Senha */}
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">
                      Confirmar Nova Senha
                    </span>
                    <div className="relative flex items-center text-slate-400 focus-within:text-[#1358b2] transition-colors">
                      <Lock className="absolute left-4" size={20} />
                      <input
                        required
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111821] py-3 pl-11 pr-11 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#1358b2] focus:bg-white dark:focus:bg-[#111821] focus:outline-none focus:ring-1 focus:ring-[#1358b2] transition"
                        placeholder="••••••••"
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                      />
                    </div>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1358b2] py-3 text-sm font-bold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#1358b2] focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <KeyRound size={18} />
                    )}
                    {isSubmitting ? 'Alterando...' : 'Redefinir Senha'}
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center text-center py-4">
                <div className="mb-4 rounded-full bg-emerald-100 dark:bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-400 ring-8 ring-emerald-50 dark:ring-emerald-500/5">
                  <CheckCircle2 size={48} strokeWidth={1.5} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Senha alterada!
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Sua nova senha foi configurada com sucesso. Você já pode acessar a plataforma.
                </p>
                <Link
                  href="/auth-admin/login"
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 dark:bg-white py-3 text-sm font-bold text-white dark:text-slate-900 shadow-md hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                >
                  Ir para o Login
                </Link>
              </div>
            )}

            <div className="flex flex-col items-center gap-4 border-t border-slate-100 dark:border-slate-700/50 pt-6">
              <Link
                href="/auth-admin/login"
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-[#1358b2] dark:hover:text-blue-400 flex items-center gap-2 transition-colors font-medium"
              >
                <ArrowLeft size={16} />
                Voltar ao login
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
