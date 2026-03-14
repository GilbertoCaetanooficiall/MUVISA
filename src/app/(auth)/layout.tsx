import type { Metadata } from 'next';
import AuthBackground from '@/components/auth/AuthBackground';

export const metadata: Metadata = {
  title: 'MUVISA – Acesso',
  description: 'Acesse ou crie sua conta no Portal do Estudante MUVISA.',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthBackground />
      {/* Container flex to center the card. Background elements span the hole page, so the children just need to be centered */}
      <main className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </>
  );
}
