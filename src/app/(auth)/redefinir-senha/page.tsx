'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, Save, ArrowLeft, CheckCircle2, ShieldCheck, Building2, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function RedefinirSenhaPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);
    setError(null);

    const { error: updateError } = await supabase.auth.updateUser({
      password: password
    });

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess(true);
    }
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
          {success ? 'Senha Redefinida!' : 'Nova Senha'}
        </h1>
        <p className="text-gray-300 mt-2 max-w-sm mx-auto">
          {success
            ? 'Sua senha foi alterada com sucesso. Agora você pode acessar sua conta.'
            : 'Crie uma nova senha forte para proteger seu acesso ao portal.'}
        </p>
      </div>

      <div className="w-full max-w-md bg-slate-950/60 backdrop-blur-2xl rounded-[24px] shadow-2xl border border-white/10 p-8 sm:p-10 animate-fade-in">
        {!success ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200" htmlFor="password">Nova Senha</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400 group-focus-within:text-primary transition-colors w-5 h-5" />
                </div>
                <input
                  className="appearance-none block w-full pl-10 pr-10 py-3 border border-white/10 rounded-xl bg-black/40 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all sm:text-sm shadow-inner"
                  id="password" placeholder="••••••••" type={showPassword ? 'text' : 'password'} required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200" htmlFor="confirmPassword">Confirmar Senha</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400 group-focus-within:text-primary transition-colors w-5 h-5" />
                </div>
                <input
                  className="appearance-none block w-full pl-10 pr-10 py-3 border border-white/10 rounded-xl bg-black/40 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all sm:text-sm shadow-inner"
                  id="confirmPassword" placeholder="••••••••" type={showPassword ? 'text' : 'password'} required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-200 text-sm animate-shake">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <button
              className="w-full group relative flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary transition-all duration-200 shadow-sm transform hover:scale-[1.02] mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Salvando nova senha...
                </>
              ) : (
                <>
                  Redefinir Senha
                  <Save className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-all" />
                </>
              )}
            </button>

            <div className="text-center pt-4 border-t border-white/10">
              <Link className="text-sm font-medium text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group" href="/login">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Voltar ao login
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative z-10 w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center ring-4 ring-green-500/20 border border-green-500/30">
                <CheckCircle2 className="text-green-400 w-12 h-12" />
              </div>
            </div>
            <p className="text-sm text-gray-300">
              Sua senha foi redefinida. Agora você pode usar sua nova senha para entrar na sua conta.
            </p>
            <div className="pt-2">
                <Link
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary transition-all duration-200"
                href="/login"
                >
                Entrar agora
                </Link>
            </div>
          </div>
        )}
      </div>

      {/* Security badges */}
      <div className="mt-12 grid grid-cols-2 gap-8 md:gap-16 text-center max-w-xl w-full animate-fade-in px-4">
        {[
          { icon: ShieldCheck, title: 'Conexão Segura', text: 'Seus novos dados são protegidos por criptografia SSL.' },
          { icon: Building2, title: 'Acesso Restrito', text: 'Apenas você tem controle sobre sua nova credencial.' },
        ].map(item => (
          <div key={item.title} className="flex flex-col items-center group cursor-default">
            <div className="h-14 w-14 rounded-full bg-black/40 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300 shadow-lg">
              <item.icon className="text-white/80 group-hover:text-primary w-6 h-6 transition-colors" />
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
            <Link className="hover:text-white transition-colors" href="/termos">Terms</Link>
        </span>
      </p>
    </div>
  );
}
