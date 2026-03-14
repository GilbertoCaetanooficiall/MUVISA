import { UniversityCard } from '@/components/site/UniversityCard';
import { CostEstimator } from '@/components/site/CostEstimator';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Estudar em Portugal | MUVISA',
    description: 'As melhores instituições de ensino superior aguardam por você.',
};

const UNIVERSITIES = [
    {
        name: 'Universidade de Lisboa',
        city: 'Lisboa',
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Reitoria_da_Universidade_de_Lisboa.jpg',
        description: 'A maior universidade do país, oferecendo um ensino de excelência e investigação com impacto internacional.'
    },
    {
        name: 'Universidade do Porto',
        city: 'Porto',
        image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Reitoria_da_Universidade_do_Porto_05.jpg',
        description: 'Instituição de renome na investigação científica e com a maior procura no panorama nacional.'
    },
    {
        name: 'Universidade de Coimbra',
        city: 'Coimbra',
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/University_of_Coimbra.jpg',
        description: 'A mais antiga universidade de Portugal e uma das mais antigas do mundo, Património Mundial da UNESCO.'
    },
    {
        name: 'Universidade de Aveiro',
        city: 'Aveiro',
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Campus_der_Universit%C3%A4t_Aveiro.JPG',
        description: 'Uma das universidades mais dinâmicas e inovadoras de Portugal, com infraestruturas modernas.'
    },
    {
        name: 'Universidade do Minho',
        city: 'Braga',
        image: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Universidade_do_Minho-Campus_de_Gualtar.JPG',
        description: 'Conhecida pela sua juventude e inovação, situada numa região rica em património e cultura.'
    },
    {
        name: 'Universidade Nova de Lisboa',
        city: 'Lisboa',
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Nova_SBE_Library.jpg',
        description: 'Destaca-se pelo seu perfil virado para a internacionalização e para a empregabilidade.'
    }
];

export default function EstudarEmPortugalPage() {
    return (
        <main className="flex-grow">
            <div className="py-12 lg:py-20">

                {/* SECTION 1 — UNIVERSITIES GRID */}
                <section className="container mx-auto px-4 max-w-7xl mb-24">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight font-display">
                            Universidades em <span className="text-primary">Portugal</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-display">
                            As melhores instituições de ensino superior aguardam por você.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {UNIVERSITIES.map((uni, idx) => (
                            <UniversityCard
                                key={idx}
                                name={uni.name}
                                city={uni.city}
                                image={uni.image}
                                description={uni.description}
                            />
                        ))}
                    </div>
                </section>

                {/* SECTION 2 — COST SIMULATOR */}
                <section className="bg-slate-50 dark:bg-background-dark py-20 border-y border-slate-200 dark:border-slate-800 transition-colors">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-display">
                                Simule o custo para estudar em Portugal
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 font-display max-w-2xl mx-auto">
                                Preencha os dados abaixo para uma estimativa realista dos seus investimentos em propinas e custos de vida.
                            </p>
                        </div>

                        <CostEstimator />
                    </div>
                </section>

                {/* SECTION 3 — CONSULTANT CTA */}
                <section className="container mx-auto px-4 max-w-4xl py-24 text-center">
                    <div className="bg-slate-100 dark:bg-slate-800/80 rounded-[2rem] p-10 md:p-14 border-2 border-primary/10 shadow-md transition-all duration-300">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 font-display">
                            Precisa de ajuda com a candidatura ou visto?
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-2xl mx-auto font-display">
                            Nossa equipe de especialistas está pronta para cuidar de todo o processo para você, garantindo sua aprovação.
                        </p>
                        <Link href="/site/contato">
                            <button className="h-14 px-8 rounded-xl bg-primary text-white text-lg font-bold hover:bg-primary-hover transform hover:-translate-y-1 transition-all shadow-[0_10px_25px_rgba(25,120,229,0.25)] flex items-center justify-center gap-3 mx-auto font-display">
                                Fale com um consultor
                                <MessageCircle />
                            </button>
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
