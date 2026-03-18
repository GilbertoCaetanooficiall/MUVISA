'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  universityName?: string;
}

const costData: Record<string, string> = {
  'Lisboa': '950 €/mês',
  'Porto': '850 €/mês',
  'Coimbra': '700 €/mês',
  'Braga': '750 €/mês',
  'Aveiro': '720 €/mês',
  'Faro': '800 €/mês'
};

export default function ApplicationFormModal({ isOpen, onClose, universityName = 'Universidade de Lisboa' }: ApplicationFormModalProps) {
  const [selectedCity, setSelectedCity] = useState('');

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[600px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl border border-gray-100 relative transform transition-all duration-300 scale-100 opacity-100 animate-[fade-in_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
        data-purpose="registration-card"
      >
        {/* Close Button X */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] rounded-full p-1 transition-colors z-10 bg-white shadow-sm border border-gray-100"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* BEGIN: Header Section */}
        <header className="bg-white px-8 pt-10 pb-6 text-center">
          <div className="mb-4 inline-block">
            {/* MUVISA Logo Placeholder */}
            <Image 
              alt="MUVISA Logo" 
              className="h-10 mx-auto w-auto" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsHaZ3XdIPu2mQqwEFD5LCfKrJOlrkRc_ZooMk4O9DnRndvAQ4MtqSe8IOEwMS52rUcLqbpzkKCoRba4lhUu1MZQkOs210g2sNhMNQANvmRg4GbAvy4spqaiYLH5KxU6bdEVn_P9MTIEf2J5u0A4oOT9NefDbAbpfUrupc335vSRDqA24MWuF2lB-FwAtsEzece618OmtCSnavFpuCIX_IxsLujvKixFAsCSjs9yj33wQL3hZFh8NbFTGaplXMFjPZNPRaBxYsB8rn" 
              width={150}
              height={40}
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Crie sua Conta de Estudante</h1>
          <p className="text-gray-500 mt-2">Dê o próximo passo para sua carreira internacional em Portugal.</p>
        </header>
        {/* END: Header Section */}

        {/* BEGIN: Registration Form */}
        <form className="px-8 pb-10 space-y-5" id="registrationForm" onSubmit={(e) => e.preventDefault()}>
          {/* Contextual Info (University) */}
          <div className="bg-blue-50 border-l-4 border-[#1E40AF] p-4 rounded-r-lg mb-6" data-purpose="selected-university-info">
            <p className="text-sm text-[#1E40AF] font-semibold">Universidade Selecionada:</p>
            <p className="text-gray-700 font-medium italic" id="universityDisplay">{universityName}</p>
            <input name="selected_university" type="hidden" value={universityName} />
          </div>

          {/* Row 1: Full Name */}
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700" htmlFor="fullName">Nome Completo</label>
            <input 
              className="w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-[#1E40AF] focus:border-[#1E40AF] transition-all duration-200" 
              id="fullName" 
              name="fullName" 
              placeholder="Digite seu nome completo" 
              required 
              type="text" 
            />
          </div>

          {/* Row 2: Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700" htmlFor="email">E-mail</label>
              <input 
                className="w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-[#1E40AF] focus:border-[#1E40AF] transition-all duration-200" 
                id="email" 
                name="email" 
                placeholder="seu@email.com" 
                required 
                type="email" 
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700" htmlFor="whatsapp">WhatsApp</label>
              <input 
                className="w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-[#1E40AF] focus:border-[#1E40AF] transition-all duration-200" 
                id="whatsapp" 
                name="whatsapp" 
                placeholder="+55 (00) 00000-0000" 
                required 
                type="tel" 
              />
            </div>
          </div>

          {/* Row 3: Country and City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700" htmlFor="country">País de Origem</label>
              <input 
                className="w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-[#1E40AF] focus:border-[#1E40AF] transition-all duration-200" 
                id="country" 
                name="country" 
                placeholder="Ex: Brasil" 
                required 
                type="text" 
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700" htmlFor="studyCity">Cidade de Estudo</label>
              <select 
                className="w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-[#1E40AF] focus:border-[#1E40AF] transition-all duration-200 bg-white" 
                id="studyCity" 
                name="studyCity" 
                required
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option disabled value="">Selecione a cidade</option>
                <option value="Lisboa">Lisboa</option>
                <option value="Porto">Porto</option>
                <option value="Coimbra">Coimbra</option>
                <option value="Braga">Braga</option>
                <option value="Aveiro">Aveiro</option>
                <option value="Faro">Faro</option>
              </select>
            </div>
          </div>

          {/* BEGIN: Dynamic Cost Display */}
          {selectedCity && costData[selectedCity] && (
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg flex items-center gap-3 animate-[fade-in_0.3s_ease-out]" data-purpose="dynamic-cost-info" id="costEstimateBox">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-gray-500">Estimativa de Custos</span>
                <p className="text-sm font-semibold text-gray-700">Custo médio estimado de vida: <span className="text-green-600 font-bold">{costData[selectedCity]}</span></p>
              </div>
            </div>
          )}
          {/* END: Dynamic Cost Display */}

          {/* Row 4: Course and Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700" htmlFor="targetCourse">Curso Pretendido</label>
              <input 
                className="w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-[#1E40AF] focus:border-[#1E40AF] transition-all duration-200" 
                id="targetCourse" 
                name="targetCourse" 
                placeholder="Ex: Engenharia" 
                required 
                type="text" 
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700" htmlFor="studyLevel">Nível de Estudo</label>
              <select 
                className="w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-[#1E40AF] focus:border-[#1E40AF] transition-all duration-200 bg-white" 
                id="studyLevel" 
                name="studyLevel" 
                required
                defaultValue=""
              >
                <option disabled value="">Selecione o nível</option>
                <option value="Licenciatura">Licenciatura</option>
                <option value="Mestrado">Mestrado</option>
                <option value="Doutoramento">Doutoramento</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              className="w-full bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-bold py-4 rounded-xl shadow-lg transform transition active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-300" 
              type="submit"
            >
              Criar conta
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            Ao clicar em &quot;Criar conta&quot;, você concorda com nossos Termos de Serviço e Política de Privacidade.
          </p>
        </form>
        {/* END: Registration Form */}
        
        {/* Footer Help */}
        <div className="pb-8 text-center bg-white pt-2 border-t border-gray-100">
          <p className="text-sm pt-4 text-gray-500">Já tem uma conta? <a className="text-[#1E40AF] font-semibold hover:underline" href="#">Entre aqui</a></p>
        </div>
      </div>
    </div>
  );
}
