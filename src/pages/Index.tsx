import HeroSection from "@/components/HeroSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import ComparisonSection from "@/components/ComparisonSection";
import ShiftCalendarSection from "@/components/ShiftCalendarSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ArchitectureSection />
      <ComparisonSection />
      <ShiftCalendarSection />
    </div>
  );
};

export default Index;
