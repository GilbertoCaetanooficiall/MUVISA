interface WelcomeSectionProps {
  nomeCompleto: string;
  estadoProcesso: string | null;
}

const estadoLabel: Record<string, string> = {
  pendente: 'Pendente',
  em_andamento: 'Em Andamento',
  em_analise: 'Em Análise',
  aprovado: 'Aprovado',
  emitido: 'Visto Emitido',
  rejeitado: 'Rejeitado',
};

export default function WelcomeSection({ nomeCompleto, estadoProcesso }: WelcomeSectionProps) {
  const primeiroNome = nomeCompleto.split(' ')[0];
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
        Olá, {primeiroNome}! 👋
      </h1>
      <p className="text-slate-500 dark:text-slate-400">
        Acompanhe o status do seu visto e gira os seus próximos passos.
        {estadoProcesso && (
          <span className="ml-2 text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {estadoLabel[estadoProcesso] ?? estadoProcesso}
          </span>
        )}
      </p>
    </div>
  );
}
