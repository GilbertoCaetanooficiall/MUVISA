export default function HelpWidget() {
    return (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
            <div className="relative z-10">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-white">help_outline</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Precisa de ajuda?</h3>
                <p className="text-white/70 text-sm mb-4">
                    Está com dificuldades para encontrar ou digitalizar seus documentos?
                </p>
                <button className="w-full py-2.5 bg-white text-slate-900 font-bold text-sm rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                    Solicitar Ajuda
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
            </div>
        </div>
    );
}
