import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login Admin – MUVISA',
  description: 'Faça login para gerenciar vistos e processos.',
};

export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
