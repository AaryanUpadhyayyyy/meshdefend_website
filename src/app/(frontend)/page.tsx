import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { PainSection } from "@/components/sections/PainSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { AgentMeshSection } from "@/components/sections/AgentMeshSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { AudienceSection } from "@/components/sections/AudienceSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { HOME_AGENT_MESH_SECTION_VISIBLE } from "@/lib/sections";
import { METADATA } from "@/content/home";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: METADATA.title,
    description: METADATA.description,
  };
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="home-page">
        <HeroSection />
        <TrustSection />
        <PainSection />
        <SolutionSection />
        {HOME_AGENT_MESH_SECTION_VISIBLE && <AgentMeshSection />}
        <ImpactSection isHomepage />
        <AudienceSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
