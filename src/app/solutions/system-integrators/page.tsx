import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DualEntrySplitFold } from "./components/DualEntrySplitFold";
import { EveryScaleMechanismFold } from "./components/EveryScaleMechanismFold";
import { PartnershipDeRiskFold } from "./components/PartnershipDeRiskFold";
import { DualProofBenchmarkFold } from "./components/DualProofBenchmarkFold";
import { IntegratorContinuityFold } from "./components/IntegratorContinuityFold";
import { DualCommitmentCTAFold } from "./components/DualCommitmentCTAFold";

export const metadata: Metadata = {
  title: "Solutions for System Integrators | MeshDefend",
  description:
    "Extend it yourself, or build a practice around it. A real API surface, not a black box. A partnership engineered to go beyond a single integration for boutique builders and global alliance leaders.",
  openGraph: {
    title: "Solutions for System Integrators | MeshDefend",
    description:
      "A real API surface, not a black box. A partnership designed to go beyond a single integration. Build custom client workflows in 48 hours or scale a 12-region cyber resilience practice.",
    siteName: "MeshDefend",
  },
};

export default function SystemIntegratorsPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* FOLD 1: CONFIRM BOTH PATHS (The Dual Entry) */}
        <DualEntrySplitFold />

        {/* FOLD 2: SHOW ONE MECHANISM AT EVERY SCALE (The Contrast Pairing Canvas) */}
        <EveryScaleMechanismFold />

        {/* FOLD 3: REMOVE WHAT COULD MAKE THE PARTNERSHIP FAIL (Dual De-Risking Grid) */}
        <PartnershipDeRiskFold />

        {/* FOLD 4: PROVE IT AT THE SCALE THAT MATTERS (Dual Proof Benchmark Cards) */}
        <DualProofBenchmarkFold />

        {/* FOLD 5: CONTINUE DOWN THE PATH THAT MATTERS TO YOU (Progressive Disclosure) */}
        <IntegratorContinuityFold />

        {/* FOLD 6: CTA MATCHED TO THE PARTNERSHIP (Dual Commitment) */}
        <DualCommitmentCTAFold />
      </main>
      <Footer />
    </>
  );
}
