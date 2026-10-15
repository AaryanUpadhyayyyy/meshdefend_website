import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MaturityHeroFold } from "./components/MaturityHeroFold";
import { EvidenceVaultFold } from "./components/EvidenceVaultFold";
import { SecurityMatrixFold } from "./components/SecurityMatrixFold";
import { RealWorldFitFold } from "./components/RealWorldFitFold";
import { EnterpriseReadinessCTA } from "./components/EnterpriseReadinessCTA";

export const metadata: Metadata = {
  title: "Enterprise Readiness | MeshDefend",
  description:
    "Enterprise-ready means working when the environment gets complicated. Verifiable facts, operating maturity evidence, zero-trust data handling, and governed architecture.",
  openGraph: {
    title: "Enterprise Readiness & Security Architecture | MeshDefend",
    description:
      "Maturity isn't what you promise. It's what you can prove. 14,000+ assets protected, 35+ years domain engineering tenure, 9 patents pending, and strict cryptographic human-in-the-loop governance.",
    siteName: "MeshDefend",
  },
};

export default function EnterpriseReadinessPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* FOLD 1: ESTABLISH ENTERPRISE MATURITY (Falsifiable Trust) */}
        <MaturityHeroFold />

        {/* FOLD 2: OPERATING MATURITY EVIDENCE (Structural Evidence Board) */}
        <EvidenceVaultFold />

        {/* FOLD 3: ADDRESS VENDOR RISK (The Security Architecture Matrix) */}
        <SecurityMatrixFold />

        {/* FOLD 4: FROM READINESS TO REAL-WORLD FIT (Progressive Disclosure) */}
        <RealWorldFitFold />

        {/* FOLD 5: COMMITMENT CTA (Matching Evaluation Depth) */}
        <EnterpriseReadinessCTA />
      </main>
      <Footer />
    </>
  );
}
