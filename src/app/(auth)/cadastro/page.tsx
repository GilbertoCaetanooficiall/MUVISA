'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  PlaneTakeoff, 
  Lock, 
  Check, 
  Info, 
  IdCard, 
  Mail, 
  Smartphone, 
  ArrowRight, 
  ChevronDown, 
  GraduationCap, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  Circle,
  MapPin,
  LucideIcon
} from 'lucide-react';

type Step = 1 | 2 | 3;

interface StepConfig {
  icon: LucideIcon;
  label: string;
  title: string;
}

const STEPS: StepConfig[] = [
  { icon: User, label: 'Dados Básicos', title: 'Comece sua jornada' },
  { icon: PlaneTakeoff, label: 'Seu Destino', title: 'Seu destino em Portugal' },
  { icon: Lock, label: 'Segurança', title: 'Segurança da Conta' },
];

const UNIVERSITIES_BY_CITY: Record<string, string[]> = {
  'Lisboa': [
    'Universidade de Lisboa',
    'Universidade Nova de Lisboa',
    'ISCTE - Instituto Universitário de Lisboa',
    'Universidade Católica Portuguesa',
    'Instituto Politécnico de Lisboa',
    'Universidade Lusíada',
    'Universidade Lusófona'
  ],
  'Porto': [
    'Universidade do Porto',
    'Instituto Politécnico do Porto',
    'Universidade Fernando Pessoa',
    'Universidade Portucalense',
    'Universidade Católica Portuguesa (Porto)',
    'Universidade Lusíada do Porto'
  ],
  'Coimbra': [
    'Universidade de Coimbra',
    'Instituto Politécnico de Coimbra'
  ],
  'Braga': [
    'Universidade do Minho',
    'Universidade Católica Portuguesa (Braga)',
    'Instituto Politécnico do Cávado e do Ave'
  ],
  'Aveiro': [
    'Universidade de Aveiro'
  ],
  'Faro (Algarve)': [
    'Universidade do Algarve'
  ]
};

export default function CadastroPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [showPassword, setShowPassword] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '',
    studyLevel: '', city: '', institution: '',
    password: '', confirmPassword: '', terms: false,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const computeStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const handlePasswordChange = (val: string) => {
    setFormData(prev => ({ ...prev, password: val }));
    setPasswordStrength(computeStrength(val));
    if (step === 3) {
        // Trigger re-render to update strength visual
    }
  };

  const strengthLabel = ['', 'Fraca', 'Média', 'Boa', 'Forte'][passwordStrength] || '';
  const strengthColor = ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'][passwordStrength] || 'bg-white/10';

  const goNext = () => setStep(s => Math.min(s + 1, 3) as Step);
  const goBack = () => setStep(s => Math.max(s - 1, 1) as Step);

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/escolha-plano');
  };

  return (
    <div className="font-sans antialiased text-white animate-fade-in w-full max-w-4xl px-4 relative z-20 my-12">
      <div className="w-full max-w-4xl bg-slate-950/60 backdrop-blur-2xl rounded-[24px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10">

        {/* ── Sidebar / Steps ── */}
        <div className="bg-black/40 w-full md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex flex-col items-start mb-10 border-b border-transparent dark:border-white/10">
              <Image src="/logo-mobile.svg" alt="MUVISA Logo" width={150} height={35} className="h-[35px] w-auto object-contain block md:hidden" priority />
              <Image src="/logo-light.svg" alt="MUVISA Logo" width={200} height={45} className="h-[45px] w-auto object-contain hidden md:block dark:hidden" priority />
              <Image src="/logo-dark.svg" alt="MUVISA Logo" width={200} height={45} className="h-[45px] w-auto object-contain hidden dark:md:block" priority />
            </div>

            <nav aria-label="Progress" className="space-y-6">
              {STEPS.map((s, idx) => {
                const num = (idx + 1) as Step;
                const isCompleted = step > num;
                const isCurrent = step === num;
                const isLast = idx === STEPS.length - 1;

                return (
                  <div key={num} className="flex items-start">
                    <div className="flex items-center h-6 relative">
                      <span className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full ring-4 ring-white/5 ${isCompleted ? 'bg-green-500/90' : isCurrent ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-black/40 border border-white/10'}`}>
                        {isCompleted ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : isCurrent ? (
                          <s.icon className="w-4 h-4 text-white" />
                        ) : (
                          <span className="text-xs font-semibold text-gray-400">{num}</span>
                        )}
                      </span>
                      {!isLast && <div className={`absolute left-4 top-8 h-10 w-0.5 -ml-px ${isCompleted ? 'bg-primary' : 'bg-white/10'}`} />}
                    </div>
                    <div className="ml-4 flex flex-col">
                      <span className={`text-sm font-semibold ${isCurrent ? 'text-primary' : isCompleted ? 'text-white' : 'text-gray-400'}`}>
                        Passo {num}
                      </span>
                      <span className={`text-sm font-medium ${isCurrent || isCompleted ? 'text-white' : 'text-gray-500'}`}>
                        {s.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="hidden md:block mt-12">
            <div className="bg-primary/20 rounded-xl p-4 border border-primary/20 backdrop-blur-md">
              <div className="flex items-start gap-3">
                <Info className="text-primary w-5 h-5 mt-0.5" />
                <p className="text-xs text-gray-300 leading-relaxed">
                  {step === 1 && 'Precisamos destas informações para personalizar seu checklist de documentos para o visto.'}
                  {step === 2 && 'A escolha da cidade influencia diretamente no custo de vida estimado para o visto.'}
                  {step === 3 && 'Seus dados são criptografados e armazenados com segurança seguindo as normas da LGPD.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Form Panel ── */}
        <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <header className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{STEPS[step - 1].title}</h1>
              <p className="text-gray-400">
                {step === 1 && 'Preencha seus dados para criar sua conta gratuita.'}
                {step === 2 && 'Para onde você vai e qual o seu objetivo?'}
                {step === 3 && 'Crie uma senha forte para proteger seus dados e documentos.'}
              </p>
            </header>

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <form className="space-y-6" onSubmit={e => { e.preventDefault(); goNext(); }}>
                <div className="space-y-5 animate-fade-in">
                  {[
                    { id: 'fullName', label: 'Nome Completo', placeholder: 'Maria Silva', type: 'text', icon: User, key: 'fullName' as const },
                    { id: 'email', label: 'Email', placeholder: 'maria@exemplo.com', type: 'email', icon: Mail, key: 'email' as const },
                    { id: 'phone', label: 'Telefone / WhatsApp', placeholder: '(11) 99999-9999', type: 'tel', icon: Smartphone, key: 'phone' as const },
                  ].map(field => (
                    <div key={field.id} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300" htmlFor={field.id}>{field.label}</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <field.icon className="text-gray-500 group-focus-within:text-primary transition-colors w-5 h-5" />
                        </div>
                        <input
                          className="appearance-none block w-full pl-10 px-4 py-3 border border-white/10 rounded-xl bg-black/40 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all sm:text-sm"
                          id={field.id} placeholder={field.placeholder} type={field.type} required
                          value={formData[field.key]}
                          onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-6 flex items-center justify-between gap-4">
                  <span className="invisible px-4 py-2 text-sm">Voltar</span>
                  <button className="group relative flex justify-center py-3.5 px-8 border border-transparent text-sm font-semibold rounded-xl text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary transition-all duration-200 shadow-sm transform hover:scale-[1.02]" type="submit">
                    Continuar
                    <ArrowRight className="text-white/80 group-hover:text-white ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-sm text-gray-400">
                    Já tem uma conta?{' '}
                    <Link className="font-medium text-primary hover:text-primary-hover transition-colors" href="/login">Fazer login</Link>
                  </p>
                </div>
              </form>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <form className="space-y-6" onSubmit={e => { e.preventDefault(); goNext(); }}>
                <div className="space-y-5 animate-fade-in">
                  {/* Nível de Estudo */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300" htmlFor="studyLevel">Nível de Estudo</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IdCard className="text-gray-500 group-focus-within:text-primary transition-colors w-5 h-5" />
                      </div>
                      <select
                        className="appearance-none block w-full pl-10 px-4 py-3 border border-white/10 rounded-xl bg-black/40 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all sm:text-sm [&>option]:bg-slate-900"
                        id="studyLevel" required value={formData.studyLevel}
                        onChange={e => setFormData(prev => ({ ...prev, studyLevel: e.target.value }))}
                      >
                        <option value="" disabled>Selecione o nível de estudo</option>
                        <option value="Licenciatura">Licenciatura</option>
                        <option value="Mestrado">Mestrado</option>
                        <option value="Ctesp">Ctesp</option>
                        <option value="Doutoramento">Doutoramento</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown className="text-gray-500 w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Cidade */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300" htmlFor="city">Cidade de Destino</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="text-gray-500 group-focus-within:text-primary transition-colors w-5 h-5" />
                      </div>
                      <select
                        className="appearance-none block w-full pl-10 px-4 py-3 border border-white/10 rounded-xl bg-black/40 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all sm:text-sm [&>option]:bg-slate-900"
                        id="city" required value={formData.city}
                        onChange={e => setFormData(prev => ({ ...prev, city: e.target.value, institution: '' }))}
                      >
                        <option value="" disabled>Selecione a cidade</option>
                        {['Lisboa', 'Porto', 'Coimbra', 'Braga', 'Aveiro', 'Faro (Algarve)', 'Outra'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown className="text-gray-500 w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Instituição */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300" htmlFor="institution">Instituição de Ensino / Universidade</label>
                    {formData.city && UNIVERSITIES_BY_CITY[formData.city] && UNIVERSITIES_BY_CITY[formData.city].length > 0 ? (
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <GraduationCap className="text-gray-500 group-focus-within:text-primary transition-colors w-5 h-5" />
                        </div>
                        <select
                          className="appearance-none block w-full pl-10 px-4 py-3 border border-white/10 rounded-xl bg-black/40 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all sm:text-sm [&>option]:bg-slate-900"
                          id="institution" required value={formData.institution}
                          onChange={e => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                        >
                          <option value="" disabled>Selecione a instituição</option>
                          {UNIVERSITIES_BY_CITY[formData.city].map(u => (
                            <option key={u} value={u}>{u}</option>
                          ))}
                          <option value="Outra Instituição">Outra Instituição</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ChevronDown className="text-gray-500 w-5 h-5" />
                        </div>
                      </div>
                    ) : (
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <GraduationCap className="text-gray-500 group-focus-within:text-primary transition-colors w-5 h-5" />
                        </div>
                        <input
                          className="appearance-none block w-full pl-10 px-4 py-3 border border-white/10 rounded-xl bg-black/40 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all sm:text-sm"
                          id="institution" placeholder="Ex: Universidade de Lisboa" type="text" required
                          value={formData.institution}
                          onChange={e => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between gap-4">
                  <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors" type="button" onClick={goBack}>Voltar</button>
                  <button className="group relative flex justify-center py-3.5 px-8 border border-transparent text-sm font-semibold rounded-xl text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary transition-all duration-200 shadow-sm transform hover:scale-[1.02]" type="submit">
                    Continuar
                    <ArrowRight className="text-white/80 group-hover:text-white ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-sm text-gray-400">
                    Não encontrou sua cidade?{' '}
                    <Link className="font-medium text-primary hover:text-primary-hover transition-colors" href="/site/contato">Fale com um consultor</Link>
                  </p>
                </div>
              </form>
            )}

            {/* ── STEP 3 ── */}
            {step === 3 && (
              <form className="space-y-6" onSubmit={handleFinish}>
                <div className="space-y-5 animate-fade-in">
                  {/* Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300" htmlFor="password">Senha</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="text-gray-500 group-focus-within:text-primary transition-colors w-5 h-5" />
                      </div>
                      <input
                        className="appearance-none block w-full pl-10 pr-11 px-4 py-3 border border-white/10 rounded-xl bg-black/40 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all sm:text-sm"
                        id="password" placeholder="••••••••" type={showPassword ? 'text' : 'password'} required
                        value={formData.password}
                        onChange={e => handlePasswordChange(e.target.value)}
                      />
                      <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white focus:outline-none transition-colors" type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300" htmlFor="confirmPassword">Confirmar Senha</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="text-gray-500 group-focus-within:text-primary transition-colors w-5 h-5" />
                      </div>
                      <input
                        className="appearance-none block w-full pl-10 px-4 py-3 border border-white/10 rounded-xl bg-black/40 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all sm:text-sm"
                        id="confirmPassword" placeholder="••••••••" type="password" required
                        value={formData.confirmPassword}
                        onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Strength meter */}
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>Força da senha</span>
                        <span className="font-medium text-primary">{strengthLabel}</span>
                      </div>
                      <div className="flex gap-1 h-1.5 w-full">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className={`h-full w-1/4 rounded-full transition-colors ${i < passwordStrength ? strengthColor : 'bg-white/10'}`} />
                        ))}
                      </div>
                      <ul className="space-y-1 mt-3">
                        {[
                          { ok: formData.password.length >= 8, label: 'Mínimo 8 caracteres' },
                          { ok: /[A-Z]/.test(formData.password), label: 'Letra maiúscula' },
                          { ok: /[0-9]/.test(formData.password), label: 'Número' },
                        ].map(req => (
                          <li key={req.label} className={`flex items-center gap-2 text-xs ${req.ok ? 'text-primary' : 'text-gray-500'}`}>
                            {req.ok ? <CheckCircle className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                            <span>{req.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {!formData.password && (
                    <div className="text-xs text-gray-400 flex items-start gap-1.5 mt-2">
                       <Info className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>Mínimo de 8 caracteres, deve conter letras maiúsculas, minúsculas e números.</span>
                    </div>
                  )}

                  {/* Terms */}
                  <div className="flex items-start pt-2">
                    <div className="flex h-6 items-center">
                      <input
                        className="h-4 w-4 bg-black/40 border-white/20 rounded text-primary focus:ring-primary focus:ring-offset-background-dark"
                        id="terms" type="checkbox" required
                        checked={formData.terms}
                        onChange={e => setFormData(prev => ({ ...prev, terms: e.target.checked }))}
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label className="font-medium text-gray-300" htmlFor="terms">
                        Eu li e aceito os{' '}
                        <Link className="text-primary hover:text-primary-hover underline" href="/termos">Termos de Uso</Link>{' '}
                        e{' '}
                        <Link className="text-primary hover:text-primary-hover underline" href="/privacidade">Política de Privacidade</Link>.
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between gap-4">
                  <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors" type="button" onClick={goBack}>Voltar</button>
                  <button className="group relative flex justify-center py-3.5 px-8 border border-transparent text-sm font-semibold rounded-xl text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary transition-all duration-200 shadow-sm transform hover:scale-[1.02]" type="submit">
                    Finalizar
                    <CheckCircle className="text-white/80 group-hover:text-white ml-2 w-5 h-5" />
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-sm text-gray-400">
                    Precisa de ajuda com o cadastro?{' '}
                    <Link className="font-medium text-primary hover:text-primary-hover transition-colors" href="/site/contato">Contate o suporte</Link>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      
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
