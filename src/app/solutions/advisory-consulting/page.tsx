import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AugmentAdvisorFold } from "./components/AugmentAdvisorFold";
import { HandoffArchitectureFold } from "./components/HandoffArchitectureFold";
import { RevenueExpansionFold } from "./components/RevenueExpansionFold";
import { AdvisorImpactFold } from "./components/AdvisorImpactFold";
import { AssessmentPathwaysFold } from "./components/AssessmentPathwaysFold";
import { AdvisoryPartnershipCTAFold } from "./components/AdvisoryPartnershipCTAFold";

export const metadata: Metadata = {
  title: "Advisory & Consulting Partners | MeshDefend",
  description:
    "Your expertise goes further when the evidence is already working for you. MeshDefend builds on your advisory findings to help visualize, analyze, solutionize, and operationalize recovery posture.",
  openGraph: {
    title: "Advisory & Consulting Practice Solutions | MeshDefend",
    description:
      "Augment the advisor, don't replace them. Turn one-off cyber resilience audits into multi-year billable implementation projects and continuous posture retainers.",
    siteName: "MeshDefend",
  },
};

export default function AdvisoryConsultingPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* FOLD 1: AUGMENT THE ADVISOR, DON’T REPLACE THEM (Value Chain Pipeline) */}
        <AugmentAdvisorFold />

        {/* FOLD 2: PUT MESHDEFEND INSIDE THE ENGAGEMENT (Handoff Architecture) */}
        <HandoffArchitectureFold />

        {/* FOLD 3: MAKE THE ADVISORY MODEL MORE VALUABLE (Commercial Model) */}
        <RevenueExpansionFold />

        {/* FOLD 4: PROVE THE ADVISORY IMPACT (Advisor Metric Bento) */}
        <AdvisorImpactFold />

        {/* FOLD 5: TAKE THE ASSESSMENT FURTHER (Progressive Disclosure) */}
        <AssessmentPathwaysFold />

        {/* FOLD 6: BUILD THE PARTNERSHIP CTA (Strategic Alliance) */}
        <AdvisoryPartnershipCTAFold />
      </main>
      <Footer />
    </>
  );
}
