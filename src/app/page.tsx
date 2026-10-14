import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { PainSection } from "@/components/sections/PainSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { AgentMeshSection } from "@/components/sections/AgentMeshSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { AudienceSection } from "@/components/sections/AudienceSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection />
        <TrustSection />
        <PainSection />
        <SolutionSection />
        <AgentMeshSection />
        <ImpactSection />
        <AudienceSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
