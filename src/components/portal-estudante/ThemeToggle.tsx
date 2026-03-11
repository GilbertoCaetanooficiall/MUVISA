"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center justify-center sm:gap-2 w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
      aria-label="Trocar Tema"
    >
      <span className="material-symbols-outlined text-[18px]">
        {!mounted ? "light_mode" : theme === "dark" ? "light_mode" : "dark_mode"}
      </span>
      <span className="hidden sm:inline">Modo {theme === "dark" ? "Claro" : "Escuro"}</span>
    </button>
  );
}
