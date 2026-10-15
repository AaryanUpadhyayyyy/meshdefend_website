import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IncidentCanvasFold } from "./components/IncidentCanvasFold";
import { HumanControlFold } from "./components/HumanControlFold";
import { ResolutionImpactFold } from "./components/ResolutionImpactFold";
import { ProgressiveBridgeFold } from "./components/ProgressiveBridgeFold";
import { IncidentResolutionCTA } from "./components/IncidentResolutionCTA";

export const metadata: Metadata = {
  title: "Incident Resolution | MeshDefend",
  description:
    "From detection to correlation, proposed action, and human approval. MeshDefend draws a sharp line between finding a backup failure and resolving it.",
  openGraph: {
    title: "Incident Resolution | MeshDefend",
    description:
      "Autonomous where you allow it. Human-controlled where it matters. Explore the forensic resolution pipeline across Commvault, Veeam, Dell DataDomain, and ServiceNow.",
    siteName: "MeshDefend",
  },
};

export default function IncidentResolutionPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* FOLDS 1 & 2: THE FORENSIC INVESTIGATION CANVAS (Dark Mode Node-Graph) */}
        <IncidentCanvasFold />

        {/* FOLD 3: ESTABLISH HUMAN CONTROL (Structural Authority Matrix) */}
        <HumanControlFold />

        {/* FOLD 4: PROVE RESOLUTION IMPACT (Asymmetric Metric Block) */}
        <ResolutionImpactFold />

        {/* FOLD 5: CONNECT TO WHAT COMES NEXT (Progressive Bridge) */}
        <ProgressiveBridgeFold />

        {/* FOLD 6: CAPABILITY-SPECIFIC CTA */}
        <IncidentResolutionCTA />
      </main>
      <Footer />
    </>
  );
}
