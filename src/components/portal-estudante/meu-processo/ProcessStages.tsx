import { Check, CheckCircle, Circle, Hourglass } from 'lucide-react';
export default function ProcessStages() {
    return (
        <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Etapa 1 - Concluída */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-5 flex gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
                            <Check className="text-sm" />
                        </div>
                        <div className="w-0.5 h-full bg-green-500/20"></div>
                    </div>
                    <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Coleta de Dados</h3>
                            <span className="text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">Concluído</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">Formulário inicial e entrevista de perfil.</p>
                        <div className="mt-4 pl-4 border-l-2 border-slate-100 dark:border-slate-700 space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <CheckCircle className="text-green-500 text-[18px]" />
                                <span className="text-slate-600 dark:text-slate-300">Preenchimento do questionário</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <CheckCircle className="text-green-500 text-[18px]" />
                                <span className="text-slate-600 dark:text-slate-300">Entrevista com consultor</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <CheckCircle className="text-green-500 text-[18px]" />
                                <span className="text-slate-600 dark:text-slate-300">Definição da estratégia</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Etapa 2 - Concluída */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-5 flex gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
                            <Check className="text-sm" />
                        </div>
                        <div className="w-0.5 h-full bg-green-500/20"></div>
                    </div>
                    <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Documentos</h3>
                            <span className="text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">Concluído</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">Reunião e validação de documentos.</p>
                        <div className="mt-4 pl-4 border-l-2 border-slate-100 dark:border-slate-700 space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <CheckCircle className="text-green-500 text-[18px]" />
                                <span className="text-slate-600 dark:text-slate-300">Upload de passaporte</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <CheckCircle className="text-green-500 text-[18px]" />
                                <span className="text-slate-600 dark:text-slate-300">Tradução juramentada</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <CheckCircle className="text-green-500 text-[18px]" />
                                <span className="text-slate-600 dark:text-slate-300">Comprovantes financeiros validados</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Etapa 3 - Em Análise (ativa) */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-primary/30 ring-1 ring-primary/10 overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <div className="p-5 flex gap-4">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/30">
                            <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                        </div>
                        <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700"></div>
                    </div>
                    <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-primary">3. Aplicação</h3>
                            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">Em Análise</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">Submissão no portal do governo e processamento.</p>
                        <div className="mt-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 space-y-4">
                            <div className="flex items-start gap-3 text-sm">
                                <CheckCircle className="text-green-500 text-[18px] mt-0.5" />
                                <div className="flex-1">
                                    <span className="text-slate-700 dark:text-slate-200 font-medium">Preenchimento dos formulários oficiais</span>
                                    <p className="text-xs text-slate-500">Realizado em 14/10/2023</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 text-sm">
                                <Hourglass className="text-primary text-[18px] mt-0.5" />
                                <div className="flex-1">
                                    <span className="text-slate-700 dark:text-slate-200 font-medium">Revisão final do consultor</span>
                                    <p className="text-xs text-slate-500">Em andamento - Previsão: 2 dias úteis</p>
                                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-2">
                                        <div className="bg-primary h-1.5 rounded-full" style={{ width: "70%" }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 text-sm opacity-60">
                                <Circle className="text-slate-400 text-[18px] mt-0.5" />
                                <div className="flex-1">
                                    <span className="text-slate-700 dark:text-slate-200">Pagamento da taxa consular</span>
                                    <p className="text-xs text-slate-500">Aguardando revisão</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 text-sm opacity-60">
                                <Circle className="text-slate-400 text-[18px] mt-0.5" />
                                <div className="flex-1">
                                    <span className="text-slate-700 dark:text-slate-200">Submissão final</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Etapa 4 - Pendente */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden opacity-70">
                <div className="p-5 flex gap-4">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-400 flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold">4</span>
                        </div>
                        <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700"></div>
                    </div>
                    <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">4. Biometria</h3>
                            <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Pendente</span>
                        </div>
                        <p className="text-sm text-slate-400 mt-1">Agendamento e coleta de dados biométricos.</p>
                    </div>
                </div>
            </div>

            {/* Etapa 5 - Pendente */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden opacity-70">
                <div className="p-5 flex gap-4">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-400 flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold">5</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">5. Visto Emitido</h3>
                            <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Pendente</span>
                        </div>
                        <p className="text-sm text-slate-400 mt-1">Envio do passaporte para carimbo e recebimento.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
