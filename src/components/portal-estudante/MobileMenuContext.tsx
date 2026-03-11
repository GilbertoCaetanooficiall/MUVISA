"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface MobileMenuContextProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  closeMenu: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextProps | undefined>(undefined);

export function MobileMenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  // Fecha o menu automaticamente quando a rota muda (ou seja, quando algo é clicado e navegamos)
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <MobileMenuContext.Provider value={{ isOpen, setIsOpen, closeMenu }}>
      {children}
    </MobileMenuContext.Provider>
  );
}

export function useMobileMenu() {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error("useMobileMenu must be used within a MobileMenuProvider");
  }
  return context;
}
