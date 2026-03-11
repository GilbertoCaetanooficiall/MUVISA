import SupportHero from "@/components/portal-estudante/suporte/SupportHero";
import SupportCategories from "@/components/portal-estudante/suporte/SupportCategories";
import FaqAccordion from "@/components/portal-estudante/suporte/FaqAccordion";
import ConsultantContact from "@/components/portal-estudante/suporte/ConsultantContact";
import MyTickets from "@/components/portal-estudante/suporte/MyTickets";
import Footer from "@/components/portal-estudante/Footer";

export default function SuportePage() {
    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Left Column - Main Content */}
            <div className="flex-1 flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                    <SupportHero />
                    <SupportCategories />
                    <FaqAccordion />
                </div>
                <Footer />
            </div>

            {/* Right Column - Sidebar */}
            <div className="w-full lg:w-80 flex flex-col gap-6">
                <ConsultantContact />
                <MyTickets />
            </div>
        </div>
    );
}
