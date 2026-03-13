import { MapPin } from 'lucide-react';

interface UniversityCardProps {
    name: string;
    city: string;
    image: string;
    description: string;
}

export function UniversityCard({ name, city, image, description }: UniversityCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-card-dark shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200 dark:border-slate-800 flex flex-col h-full">
            <div className="relative h-48 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-bold text-white uppercase tracking-wider shadow-sm">
                        Candidaturas Abertas
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-display">{name}</h3>

                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-4 text-sm font-medium">
                    <MapPin size={16} />
                    <span>{city}</span>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 flex-1 font-display">
                    {description}
                </p>

                <button className="w-full h-11 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors font-display">
                    Selecionar
                </button>
            </div>
        </div>
    );
}
