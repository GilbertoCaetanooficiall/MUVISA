/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Save, X, Camera, User, MapPin, AlertTriangle } from "lucide-react";
import Footer from "@/components/portal-estudante/Footer";

export default function ConfiguracoesPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      {/* Toast de sucesso */}
      {saved && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg animate-fade-in">
          <Save className="w-5 h-5" />
          <span className="text-sm font-medium">Alterações guardadas com sucesso!</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dados Pessoais */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Dados Pessoais
              </h3>

              {/* Foto de Perfil */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                <div className="relative group">
                  <div className="h-28 w-28 rounded-full bg-slate-100 overflow-hidden ring-4 ring-slate-50 dark:ring-slate-800">
                    <img
                      alt="Maria Silva"
                      className="h-full w-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO4JkjzlC-Awc2Tgd_VUI2S-kSSY1I5KuUSHc6itaB_lVh_bCW9aGF55JaFusUKcuWBrTH-Px2DHldRFZYBpiCzAkx9f2Ejga32oH79VvYIgGib2kOYvR8QfQwnkNlctzEnL3VoY08p3nYUIsujI4BcPCeVAutcQLr9gufa8ViArSUUVPR0_tWnL-lwjZhxoRSnjDJxwo4xXqZrZ_3VZ6zGtLmKIksujpqhmmMZOmW-xmQke56iUcSmbOWrwEvBgZF2njCapS3E7bx"
                    />
                  </div>
                  <button
                    type="button"
                    title="Alterar foto"
                    className="absolute bottom-1 right-1 p-2 bg-primary text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Maria Silva</h2>
                  <p className="text-slate-500 text-sm">maria.silva@email.com</p>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Perfil Ativo
                  </div>
                </div>
              </div>

              {/* Campos do formulário */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    htmlFor="fullname"
                  >
                    Nome Completo
                  </label>
                  <input
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm p-2.5 outline-none transition"
                    id="fullname"
                    type="text"
                    defaultValue="Maria da Silva Santos"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    htmlFor="birthdate"
                  >
                    Data de Nascimento
                  </label>
                  <input
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm p-2.5 outline-none transition"
                    id="birthdate"
                    type="date"
                    defaultValue="1998-05-15"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    htmlFor="nationality"
                  >
                    Nacionalidade
                  </label>
                  <select
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm p-2.5 outline-none transition"
                    id="nationality"
                    defaultValue="Brasileira"
                  >
                    <option>Brasileira</option>
                    <option>Portuguesa</option>
                    <option>Espanhola</option>
                    <option>Outra</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    htmlFor="passport"
                  >
                    Número do Passaporte
                  </label>
                  <input
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm p-2.5 outline-none transition"
                    id="passport"
                    type="text"
                    defaultValue="FY123456"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    htmlFor="phone"
                  >
                    Telefone / Celular
                  </label>
                  <input
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm p-2.5 outline-none transition"
                    id="phone"
                    type="tel"
                    defaultValue="(11) 98765-4321"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Lateral */}
          <div className="space-y-6">
            {/* Endereço */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Endereço e Localização
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    htmlFor="address"
                  >
                    Endereço Residencial
                  </label>
                  <input
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm p-2.5 outline-none transition"
                    id="address"
                    type="text"
                    defaultValue="Av. Paulista, 1000 - Apt 42"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                      htmlFor="city"
                    >
                      Cidade
                    </label>
                    <input
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm p-2.5 outline-none transition"
                      id="city"
                      type="text"
                      defaultValue="São Paulo"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                      htmlFor="zip"
                    >
                      CEP
                    </label>
                    <input
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm p-2.5 outline-none transition"
                      id="zip"
                      type="text"
                      defaultValue="01310-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contato de Emergência */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Contato de Emergência
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    htmlFor="emergency-name"
                  >
                    Nome do Contato
                  </label>
                  <input
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm p-2.5 outline-none transition"
                    id="emergency-name"
                    type="text"
                    defaultValue="João Silva"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    htmlFor="emergency-phone"
                  >
                    Telefone de Emergência
                  </label>
                  <input
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm p-2.5 outline-none transition"
                    id="emergency-phone"
                    type="tel"
                    defaultValue="(11) 99999-9999"
                  />
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-primary hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Salvar Alterações
              </button>
              <button
                type="reset"
                className="w-full py-3 px-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
}
