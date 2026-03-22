import Footer from "@/components/portal-estudante/Footer";
import WelcomeSection from "@/components/portal-estudante/home/WelcomeSection";
import ProcessStepper from "@/components/portal-estudante/home/ProcessStepper";
import PendingDocuments from "@/components/portal-estudante/home/PendingDocuments";
import Timeline from "@/components/portal-estudante/home/Timeline";
import ConsultorCard from "@/components/portal-estudante/home/ConsultorCard";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <WelcomeSection />
      <ProcessStepper />

      {/* Middle Section: Pending Docs */}
      <div className="grid grid-cols-1 gap-6">
        <PendingDocuments />
      </div>

      {/* Bottom Section: Timeline & Consultant */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Timeline />
        <ConsultorCard />
      </div>

      <Footer />
    </div>
  );
}
