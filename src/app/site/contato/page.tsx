'use client';

import { useState } from 'react';
import { ArrowRight, Mail, CheckCircle, Loader2, AlertCircle, MessageSquare, User, Tag } from 'lucide-react';

type FormData = {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  nome: '',
  email: '',
  assunto: '',
  mensagem: '',
};

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!form.nome.trim()) errors.nome = 'Por favor, indique o seu nome.';
  if (!form.email.trim()) {
    errors.email = 'O e-mail é obrigatório.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Introduza um e-mail válido.';
  }
  if (!form.assunto.trim()) errors.assunto = 'O assunto é obrigatório.';
  if (!form.mensagem.trim()) errors.mensagem = 'A mensagem não pode estar vazia.';
  return errors;
}

export default function SiteContatoPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // 1. Valida os campos no cliente antes de enviar para o servidor
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      // 2. Envia os dados para a API Route que usa o Resend para enviar o e-mail
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        // Se o servidor retornar erro, mostra a mensagem de erro
        throw new Error(data.error || 'Ocorreu um erro ao enviar a sua mensagem.');
      }

      // 3. Sucesso: mostra o estado de confirmação
      setSubmitted(true);

    } catch (err: unknown) {
      // Captura erros de rede ou da API e mostra ao utilizador
      const message = err instanceof Error ? err.message : 'Erro desconhecido. Tente novamente.';
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full rounded-xl border ${errors[field] ? 'border-red-400 dark:border-red-500 focus:ring-red-300' : 'border-slate-200 dark:border-slate-700/50 focus:border-primary focus:ring-primary'} bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white shadow-sm py-3.5 px-4 placeholder:text-slate-500 focus:outline-none focus:ring-1 transition-all font-display text-sm`;

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[0%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-12 lg:gap-24 items-center mx-auto py-20 px-6">
        
        {/* Left Content */}
        <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
               Central de Atendimento
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight font-serif tracking-tight">
              Ficou com alguma dúvida?
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-lg font-display">
              Estamos aqui para simplificar a sua mobilidade acadêmica. Envie-nos o seu pedido e a nossa equipa entrará em contacto por e-mail rapidamente.
            </p>
          </div>

          <div className="space-y-6 pt-4">
             <div className="flex items-center gap-4 group">
                <div className="size-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                   <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display">E-mail Corporativo</p>
                  <p className="text-slate-900 dark:text-white font-bold font-display">muvisaintercambio@gmail.com</p>
                </div>
             </div>
             
             <div className="flex items-center gap-4 group">
                <div className="size-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                   <MessageSquare size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display">Suporte Directo</p>
                  <p className="text-slate-900 dark:text-white font-bold font-display">9h - 18h (Dias Úteis)</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 w-full max-w-lg animate-in fade-in slide-in-from-right-4 duration-1000">
          <div className="bg-white dark:bg-[#12141C] rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] border border-slate-100 dark:border-slate-800/50 transition-all">
            
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center gap-6 animate-in zoom-in-95 duration-500">
                <div className="size-20 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="text-green-600 dark:text-green-400 size-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Mensagem Enviada!</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed font-display">
                    Obrigado pelas suas palavras, <strong>{form.nome}</strong>. Verifique o seu e-mail <strong>{form.email}</strong> nas próximas horas para a nossa resposta.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setForm(initialForm); }}
                  className="px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white font-serif tracking-tight">Formulário de Contato</h2>
                  <p className="text-xs text-slate-500 font-medium font-display uppercase tracking-widest">Resposta ágil em até 24h.</p>
                </div>

                <div className="space-y-5 pt-2">
                  {/* Nome e Email em Grid para ocupar menos espaço vertical */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {/* Nome */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 pl-1 flex items-center gap-2">
                         <User size={12} className="text-primary" /> Nome
                      </label>
                      <input 
                        name="nome" 
                        value={form.nome} 
                        onChange={handleChange} 
                        className={inputClass('nome')} 
                        placeholder="Seu nome" 
                        type="text" 
                      />
                      {errors.nome && <p className="flex items-center gap-1 text-[11px] font-bold text-red-500 mt-1 pl-1"><AlertCircle size={12}/> {errors.nome}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 pl-1 flex items-center gap-2">
                         <Mail size={12} className="text-primary" /> E-mail
                      </label>
                      <input 
                        name="email" 
                        value={form.email} 
                        onChange={handleChange} 
                        className={inputClass('email')} 
                        placeholder="seu@e-mail.com" 
                        type="email" 
                      />
                      {errors.email && <p className="flex items-center gap-1 text-[11px] font-bold text-red-500 mt-1 pl-1"><AlertCircle size={12}/> {errors.email}</p>}
                    </div>
                  </div>

                  {/* Assunto */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 pl-1 flex items-center gap-2">
                       <Tag size={12} className="text-primary" /> Assunto
                    </label>
                    <input 
                      name="assunto" 
                      value={form.assunto} 
                      onChange={handleChange} 
                      className={inputClass('assunto')} 
                      placeholder="Ex: Informação sobre Vistos" 
                      type="text" 
                    />
                    {errors.assunto && <p className="flex items-center gap-1 text-[11px] font-bold text-red-500 mt-1 pl-1"><AlertCircle size={12}/> {errors.assunto}</p>}
                  </div>

                  {/* Mensagem */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 pl-1 flex items-center gap-2">
                       <MessageSquare size={12} className="text-primary" /> Mensagem
                    </label>
                    <textarea 
                      name="mensagem" 
                      rows={4}
                      value={form.mensagem} 
                      onChange={handleChange} 
                      className={`${inputClass('mensagem')} resize-none`} 
                      placeholder="Escreva aqui as suas dúvidas..." 
                    />
                    {errors.mensagem && <p className="flex items-center gap-1 text-[11px] font-bold text-red-500 mt-1 pl-1"><AlertCircle size={12}/> {errors.mensagem}</p>}
                  </div>
                </div>

                {/* Erro vindo do servidor (ex: falha no Resend ou falta de API key) */}
                {serverError && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50 rounded-xl animate-in fade-in duration-300">
                    <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={16} />
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">{serverError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-primary hover:bg-primary-hover text-white font-black rounded-2xl transition-all shadow-[0_10px_25px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.5)] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group/btn"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      Enviar agora
                      <ArrowRight className="size-5 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

            )}
          </div>
        </div>
      </div>
    </>
  );
}
