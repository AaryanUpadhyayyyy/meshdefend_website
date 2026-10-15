import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FalseGreenFold } from "./components/FalseGreenFold";
import { DependencyDAGFold } from "./components/DependencyDAGFold";
import { PostureSplitFold } from "./components/PostureSplitFold";
import { ResOCTableFold } from "./components/ResOCTableFold";
import { ResilienceBridgeFold } from "./components/ResilienceBridgeFold";
import { CyberResilienceCTA } from "./components/CyberResilienceCTA";

export const metadata: Metadata = {
  title: "Cyber Resilience | MeshDefend",
  description:
    "Is your data safe to restore after an attack, not just a hardware failure? Move beyond traditional backup success to verified application recovery posture with ResOC.",
  openGraph: {
    title: "Cyber Resilience & ResOC | MeshDefend",
    description:
      "A completed backup does not mean a safe recovery point. Continuous clean-point validation, dependency mapping, and recovery posture management across Commvault, Veeam, Dell, and ServiceNow.",
    siteName: "MeshDefend",
  },
};

export default function CyberResiliencePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* FOLD 1: DEFINE RECOVERY SAFETY (The False Green Illusion) */}
        <FalseGreenFold />

        {/* FOLD 2: UNDERSTAND WHAT RECOVERY DEPENDS ON (Dependency DAG Plexus) */}
        <DependencyDAGFold />

        {/* FOLD 3: FROM BACKUP POSTURE TO RECOVERY POSTURE (The Contrast Effect) */}
        <PostureSplitFold />

        {/* FOLD 4: OPERATIONALIZE RESILIENCE WITH RESOC (Continuous Posture Table) */}
        <ResOCTableFold />

        {/* FOLD 5: FROM READINESS TO ACTION & TRUST (The Progressive Branching Rail) */}
        <ResilienceBridgeFold />

        {/* FOLD 6: RESILIENCE-SPECIFIC CTA */}
        <CyberResilienceCTA />
      </main>
      <Footer />
    </>
  );
}
