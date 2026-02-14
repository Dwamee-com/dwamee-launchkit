import HeroSection from "@/components/HeroSection";
import TrustedSection from "@/components/TrustedSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import ComparisonSection from "@/components/ComparisonSection";
import ShiftCalendarSection from "@/components/ShiftCalendarSection";
import PricingSection from "@/components/PricingSection";
import DownloadSection from "@/components/DownloadSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <TrustedSection />
      <ArchitectureSection />
      <ComparisonSection />
      <ShiftCalendarSection />
      <PricingSection />
      <DownloadSection />
    </div>
  );
};

export default Index;
