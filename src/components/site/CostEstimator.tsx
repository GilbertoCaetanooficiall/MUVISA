"use client";

import { useState } from 'react';

const TUITION_PER_YEAR = 3000;
const LIVING_COST_PER_MONTH = 850;
const MUVISA_SERVICE_FEE = 1500;

export function CostEstimator() {
    const [university, setUniversity] = useState('');
    const [degree, setDegree] = useState('Licenciatura');
    const [academicYear, setAcademicYear] = useState('2025/2026');
    const [duration, setDuration] = useState('3');
    const [city, setCity] = useState('');

    const [calculated, setCalculated] = useState(false);
    const [totalCost, setTotalCost] = useState(0);

    const calculateCost = (e: React.FormEvent) => {
        e.preventDefault();
        const years = parseInt(duration) || 3;
        const totalTuition = TUITION_PER_YEAR * years;
        const totalLivingCost = LIVING_COST_PER_MONTH * 12 * years;
        const total = totalTuition + totalLivingCost + MUVISA_SERVICE_FEE;
        setTotalCost(total);
        setCalculated(true);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start text-left">
            {/* FORMULÁRIO */}
            <div className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                <form onSubmit={calculateCost} className="flex flex-col gap-6">

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 font-display">Universidade Desejada</label>
                        <select
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                            className="w-full h-12 px-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-display"
                            required
                        >
                            <option value="" disabled>Selecione a universidade</option>
                            <option value="Universidade de Lisboa">Universidade de Lisboa</option>
                            <option value="Universidade do Porto">Universidade do Porto</option>
                            <option value="Universidade de Coimbra">Universidade de Coimbra</option>
                            <option value="Universidade de Aveiro">Universidade de Aveiro</option>
                            <option value="Universidade do Minho">Universidade do Minho</option>
                            <option value="Universidade Nova de Lisboa">Universidade Nova de Lisboa</option>
                            <option value="Outra">Outra</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 font-display">Grau Acadêmico</label>
                            <select
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                                className="w-full h-12 px-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none font-display"
                            >
                                <option value="Licenciatura">Licenciatura</option>
                                <option value="Mestrado">Mestrado</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 font-display">Ano Letivo</label>
                            <select
                                value={academicYear}
                                onChange={(e) => setAcademicYear(e.target.value)}
                                className="w-full h-12 px-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none font-display"
                            >
                                <option value="2025/2026">2025/2026</option>
                                <option value="2026/2027">2026/2027</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 font-display">Duração (Anos)</label>
                            <input
                                type="number"
                                min="1" max="6"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full h-12 px-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none font-display"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 font-display">Cidade de residência</label>
                            <input
                                type="text"
                                placeholder="Ex: Lisboa"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full h-12 px-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none font-display"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 mt-2 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 font-display"
                    >
                        Calcular custo
                    </button>
                </form>
            </div>

            {/* RESULTADO (CARD DIR) */}
            <div className="bg-white dark:bg-card-dark p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 font-display border-b border-slate-100 dark:border-slate-800 pb-4">
                    Estimativa de Investimento
                </h3>

                {!calculated ? (
                    <div className="h-48 flex items-center justify-center text-center">
                        <p className="text-slate-500 dark:text-slate-400 font-display">
                            Preencha o formulário e clique em <br /> <strong className="text-primary">Calcular custo</strong> para ver os resultados.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-center text-sm md:text-base">
                            <span className="text-slate-600 dark:text-slate-400 font-display">Propinas (Anual)</span>
                            <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(TUITION_PER_YEAR)}</span>
                        </div>

                        <div className="flex justify-between items-center text-sm md:text-base">
                            <span className="text-slate-600 dark:text-slate-400 font-display">Custo de Vida (Mensal)</span>
                            <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(LIVING_COST_PER_MONTH)}</span>
                        </div>

                        <div className="flex justify-between items-center text-sm md:text-base">
                            <span className="text-slate-600 dark:text-slate-400 font-display">Taxa de Serviço MUViSA</span>
                            <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(MUVISA_SERVICE_FEE)}</span>
                        </div>

                        <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 bg-primary/5 dark:bg-primary/10 rounded-lg p-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-bold text-primary uppercase tracking-wider font-display">Total Estimado</span>
                                <span className="text-4xl lg:text-5xl font-black text-primary tracking-tight">
                                    {formatCurrency(totalCost)}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-display mt-2">
                                    * Valores estimados para {duration} {parseInt(duration) === 1 ? 'ano' : 'anos'} de duração com base nos dados fornecidos.
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
