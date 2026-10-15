import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UnityPrismFold } from "./components/UnityPrismFold";
import { RoleLensSwitcherFold } from "./components/RoleLensSwitcherFold";
import { SharedValueBusinessCaseFold } from "./components/SharedValueBusinessCaseFold";
import { EnterpriseCaseStudyFold } from "./components/EnterpriseCaseStudyFold";
import { ScrutinyProgressionFold } from "./components/ScrutinyProgressionFold";
import { EnterpriseExecutiveCTAFold } from "./components/EnterpriseExecutiveCTAFold";

export const metadata: Metadata = {
  title: "Solutions for Enterprises | MeshDefend",
  description:
    "One enterprise. Different teams. One shared view of resilience. MeshDefend aligns security, infrastructure, operations, and compliance without separate sources of truth.",
  openGraph: {
    title: "Solutions for Enterprises | MeshDefend",
    description:
      "Security wants resilience. Operations wants efficiency. Leadership wants less risk. One investment answers all three with verified recovery posture.",
    siteName: "MeshDefend",
  },
};

export default function EnterprisesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* FOLD 1: ALIGN THE ENTERPRISE, NOT JUST THE TECHNOLOGY (The Unity Prism) */}
        <UnityPrismFold />

        {/* FOLD 2: ONE REALITY, DIFFERENT VIEWS (Role Lens Switcher) */}
        <RoleLensSwitcherFold />

        {/* FOLD 3: MAKE THE INTERNAL CASE (Shared-Value Business Case) */}
        <SharedValueBusinessCaseFold />

        {/* FOLD 4: GIVE THE INTERNAL CASE REAL PROOF (Enterprise Case Study) */}
        <EnterpriseCaseStudyFold />

        {/* FOLD 5: FROM BUSINESS CASE TO ENTERPRISE SCRUTINY (Continuity Pipeline) */}
        <ScrutinyProgressionFold />

        {/* FOLD 6: CTA (Executive Briefing & Next Steps) */}
        <EnterpriseExecutiveCTAFold />
      </main>
      <Footer />
    </>
  );
}
