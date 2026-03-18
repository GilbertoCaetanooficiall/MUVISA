"use client";
import { GraduationCap, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/site' },
    { name: 'Estudar em Portugal', href: '/site/estudar-em-portugal' },
    { name: 'Serviços', href: '/site/servicos' },
    { name: 'Sobre nós', href: '/site/sobre' },
    { name: 'Contacto', href: '/site/contato' }
  ];

  const isActive = (path: string) => {
    if (path === '/site') return pathname === '/site';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-3 lg:px-10 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <Link href="/site" className="flex items-center">
          <Image src="/logo-mobile.svg" alt="MUVISA Logo" width={150} height={30} className="h-[35px] w-auto object-contain block md:hidden" priority />
          <Image src="/logo-light.svg" alt="MUVISA Logo" width={200} height={45} className="h-[45px] w-auto object-contain hidden md:block dark:hidden" priority />
          <Image src="/logo-dark.svg" alt="MUVISA Logo" width={200} height={45} className="h-[45px] w-auto object-contain hidden dark:md:block" priority />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex flex-1 justify-end gap-8">
        <nav className="flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors font-display ${isActive(link.href)
                  ? 'text-primary font-bold'
                  : 'text-slate-500 dark:text-slate-300 hover:text-primary'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <Link href="/login">
          <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 border border-primary text-primary text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary hover:text-white transition-colors font-display">
            <span className="truncate">Portal do Estudante</span>
          </button>
        </Link>
        <Link href="/site/contato">
          <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-hover transition-colors font-display shadow-lg shadow-primary/20">
            <span className="truncate">Agendar Consultoria</span>
          </button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden text-slate-900 dark:text-white p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-base font-medium transition-colors font-display ${isActive(link.href)
                  ? 'text-primary font-bold'
                  : 'text-slate-500 dark:text-slate-300'
                }`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/login" onClick={() => setIsMenuOpen(false)}>
            <button className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 border border-primary text-primary text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary hover:text-white transition-colors font-display mt-2">
              <span className="truncate">Portal do Estudante</span>
            </button>
          </Link>
          <Link href="/site/contato" onClick={() => setIsMenuOpen(false)}>
            <button className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-hover transition-colors font-display mt-2 shadow-lg shadow-primary/20">
              <span className="truncate">Agendar Consultoria</span>
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
