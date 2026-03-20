'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Remove classes primeiro para poder re-triggar a animação
    el.classList.remove('page-enter');
    // Force reflow para garantir que a animação recomece
    void el.offsetHeight;
    el.classList.add('page-enter');
  }, [pathname]);

  return (
    <div ref={containerRef} className="page-enter">
      {children}
    </div>
  );
}
