export default function SupportHero() {
    return (
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform origin-top-right"></div>
            <div className="relative z-10 max-w-lg">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">Como podemos te ajudar hoje?</h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Digite sua dúvida ou problema..."
                        className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3.5 pl-12 text-white placeholder-white/70 focus:bg-white/30 focus:ring-0 focus:border-white/50 transition-all outline-none"
                    />
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/80">search</span>
                </div>
            </div>
        </div>
    );
}
