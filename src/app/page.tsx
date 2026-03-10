import Footer from "@/components/Footer";
import WelcomeSection from "@/components/WelcomeSection";
import ProcessStepper from "@/components/ProcessStepper";
import NextSteps from "@/components/NextSteps";
import PendingDocuments from "@/components/PendingDocuments";
import Timeline from "@/components/Timeline";
import ConsultantWidget from "@/components/ConsultantWidget";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <WelcomeSection />
      <ProcessStepper />

      {/* Middle Section: Next Steps & Pending Docs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NextSteps />
        <PendingDocuments />
      </div>

      {/* Bottom Section: Timeline & Consultant */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Timeline />
        <ConsultantWidget />
      </div>

      <Footer />
    </div>
  );
}
