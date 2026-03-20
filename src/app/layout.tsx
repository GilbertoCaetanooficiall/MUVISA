import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";

// Importação de componentes - o '@' é um atalho (alias) para a pasta 'src'
import { ThemeProvider } from "@/components/portal-estudante/ThemeProvider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-serif',
  display: 'swap',
});

// O objeto 'metadata' é usado pelo Next.js para preencher as tags <head> (SEO)
// Ele define o título e a descrição que aparecem nas abas do navegador e no Google.
export const metadata: Metadata = {
  title: "MUVISA",
  description: "Agência Muvisa",
};

// O RootLayout é o 'casulo' principal de toda a sua aplicação.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} ${dmSerif.variable}`}>
      <head>
        {/* Prevents browser/Google Translate from translating icon names */}
        <meta name="google" content="notranslate" />
        {/* Material Symbols – used by admin dashboard icons */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans">
        {/* ThemeProvider gerencia o modo claro/escuro (dark mode) da aplicação */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
          {/* 'children' representa o conteúdo da página que está sendo acessada no momento */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
