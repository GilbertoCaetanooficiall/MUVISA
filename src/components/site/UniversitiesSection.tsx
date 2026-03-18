'use client';

import React, { useState } from 'react';
import { UniversityCard } from './UniversityCard';
import ApplicationFormModal from '@/components/site/ApplicationFormModal';

interface University {
    name: string;
    city: string;
    image: string;
    description: string;
}

interface UniversitiesSectionProps {
    universities: University[];
}

export function UniversitiesSection({ universities }: UniversitiesSectionProps) {
    const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null);

    return (
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
                {universities.map((uni, idx) => (
                    <UniversityCard
                        key={idx}
                        name={uni.name}
                        city={uni.city}
                        image={uni.image}
                        description={uni.description}
                        onSelect={() => setSelectedUniversity(uni.name)}
                    />
                ))}
            </div>

            <ApplicationFormModal 
                isOpen={!!selectedUniversity} 
                onClose={() => setSelectedUniversity(null)} 
                universityName={selectedUniversity || ''} 
            />
        </section>
    );
}
