import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs gap-4">
            <p>© 2023 MUVISA Agency. Todos os direitos reservados.</p>
            <div className="flex gap-4">
                <Link className="hover:text-slate-600 dark:hover:text-slate-200" href="#">Termos de Uso</Link>
                <Link className="hover:text-slate-600 dark:hover:text-slate-200" href="#">Privacidade</Link>
                <Link className="hover:text-slate-600 dark:hover:text-slate-200" href="#">Ajuda</Link>
            </div>
        </footer>
    );
}
