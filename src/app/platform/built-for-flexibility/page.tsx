import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EcosystemOrbitFold } from "./components/EcosystemOrbitFold";
import { IntegrationMechanismsFold } from "./components/IntegrationMechanismsFold";
import { HotSwapMatrixFold } from "./components/HotSwapMatrixFold";
import { CrossStackTraceFold } from "./components/CrossStackTraceFold";
import { FlexibilityBridgeFold } from "./components/FlexibilityBridgeFold";
import { FlexibilityCTAFold } from "./components/FlexibilityCTAFold";

export const metadata: Metadata = {
  title: "Built for Flexibility · Vendor Agnostic Architecture | MeshDefend",
  description:
    "Your stack shouldn't have to change for MeshDefend. Bring your own models, backup software, storage arrays, and ITSM platforms. MeshDefend provides a common operational layer across the tools you already own.",
  openGraph: {
    title: "Built for Flexibility · Hot-Swappable Architecture | MeshDefend",
    description:
      "Connect what you already run. Compatible with Commvault, Veeam, NetApp, Pure Storage, Azure AI, Anthropic, and ServiceNow without vendor lock-in.",
    siteName: "MeshDefend",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "MeshDefend - Built for Flexibility",
      },
    ],
  },
};

export default function BuiltForFlexibilityPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* FOLD 1: CONFIRM TECHNOLOGY CHOICE (The Agnostic Hub) */}
        <EcosystemOrbitFold />

        {/* FOLD 2: SHOW HOW YOUR STACK CONNECTS (Integration Mechanisms) */}
        <IntegrationMechanismsFold />

        {/* FOLD 3: PROVE FLEXIBILITY ISN'T LOCK-IN (The Hot-Swap Matrix) */}
        <HotSwapMatrixFold />

        {/* FOLD 4: PROVE IT ACROSS A REAL STACK (Multi-Vendor Workflow Trace) */}
        <CrossStackTraceFold />

        {/* FOLD 5: PROGRESSIVE DISCLOSURE (Deploy & Enterprise Readiness) */}
        <FlexibilityBridgeFold />

        {/* FOLD 6: INTEROPERABILITY VALIDATION CTA */}
        <FlexibilityCTAFold />
      </main>
      <Footer />
    </>
  );
}
