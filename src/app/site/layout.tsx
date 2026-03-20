import SiteHeader from "@/components/site/Header";
import SiteFooter from "@/components/site/Footer";
import PageTransition from "@/components/site/PageTransition";

export const dynamic = 'force-dynamic';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
      <SiteHeader />
      <main className="flex-grow">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <SiteFooter />
    </div>
  );
}
