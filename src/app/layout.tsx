import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// Importação de componentes - o '@' é um atalho (alias) para a pasta 'src'
import { ThemeProvider } from "@/components/portal-estudante/ThemeProvider";

// Configuração de fontes locais para melhor performance e controle visual
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// O objeto 'metadata' é usado pelo Next.js para preencher as tags <head> (SEO)
// Ele define o título e a descrição que aparecem nas abas do navegador e no Google.
export const metadata: Metadata = {
  title: "MUVISA",
  description: "Agência Muvisa",
};

// O RootLayout é o 'casulo' principal de toda a sua aplicação.
// Tudo o que você colocar aqui (como Fontes, Contextos, Providers) 
// estará disponível em todas as páginas do projeto.
//
// Conceitos importantes do Next.js (App Router):
// 1. Root Layout (app/layout.tsx): Este arquivo define a estrutura HTML base para toda a aplicação.
//    Ele envolve todas as páginas e outros layouts aninhados. É o único layout que não pode ser aninhado.
//    Aqui você define elementos globais como <html lang="...">, <head>, <body>, provedores de contexto,
//    fontes globais e estilos CSS.
//
// 2. Layouts Aninhados (Nested Layouts): Você pode criar layouts específicos para segmentos de rota.
//    Por exemplo, app/dashboard/layout.tsx criaria um layout para todas as rotas dentro de /dashboard.
//    Estes layouts recebem o 'children' que são as páginas ou outros layouts aninhados abaixo deles.
//    Eles permitem compartilhar UI entre rotas sem re-renderizar o estado.
//
// 3. Páginas (Pages - app/page.tsx, app/dashboard/page.tsx): São os componentes que renderizam o conteúdo
//    específico de uma rota. Eles são o 'children' final que os layouts recebem.
//
// 4. Redirecionamentos (Redirects): No Next.js, você pode redirecionar usuários programaticamente
//    usando a função `redirect` de 'next/navigation'. Isso é útil para autenticação,
//    rotas legadas ou para direcionar o usuário para uma página padrão ao acessar a raiz,
//    como no exemplo de `app/page.tsx` que redireciona para `/site`.
//    `import { redirect } from "next/navigation";`
//    `export default function RootPage() { redirect("/site"); }`
//    (Este exemplo de redirecionamento seria em `app/page.tsx`, não neste `layout.tsx`)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Links externos de fontes e ícones - carregados em todo o app */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        {/* Material Symbols – used by admin dashboard icons */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ThemeProvider gerencia o modo claro/escuro (dark mode) da aplicação */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
          {/* 'children' representa o conteúdo da página que está sendo acessada no momento */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
