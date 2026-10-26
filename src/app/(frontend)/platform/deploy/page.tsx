import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DeploymentTopologyFold } from "./components/DeploymentTopologyFold";
import { ArchitecturalFactGridFold } from "./components/ArchitecturalFactGridFold";
import { BoundaryEnforcerFold } from "./components/BoundaryEnforcerFold";
import { AirGappedProofFold } from "./components/AirGappedProofFold";
import { DeploymentPipelineFold } from "./components/DeploymentPipelineFold";
import { DeploymentCTAFold } from "./components/DeploymentCTAFold";

export const metadata: Metadata = {
  title: "Deployment Architecture & Topologies | MeshDefend",
  description:
    "Your deployment model shouldn't decide whether you can use MeshDefend. On-premises, hybrid cloud, multi-cloud, and 100% air-gapped zero-egress deployment models.",
  openGraph: {
    title: "Deployment Architecture · On-Prem, Hybrid & Air-Gapped | MeshDefend",
    description:
      "Deploy MeshDefend without redesigning the environment around it. Strict data residency, zero inbound ports, read-only metadata ingestion, and self-contained air-gapped appliances.",
    siteName: "MeshDefend",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "MeshDefend - Deployment Architecture",
      },
    ],
  },
};

export default function DeployPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* FOLD 1: DEPLOY WHERE YOUR ENVIRONMENT REQUIRES (Topology Switcher) */}
        <DeploymentTopologyFold />

        {/* FOLD 2: SHOW HOW DEPLOYMENT ACTUALLY WORKS (Architectural Fact Grid) */}
        <ArchitecturalFactGridFold />

        {/* FOLD 3: DEPLOY WITHOUT COMPROMISING YOUR CONSTRAINTS (Boundary Enforcer) */}
        <BoundaryEnforcerFold />

        {/* FOLD 4: PROVE IT IN A CONSTRAINED ENVIRONMENT (Air-Gapped Proof) */}
        <AirGappedProofFold />

        {/* FOLD 5: FROM ARCHITECTURE TO DEPLOYMENT (Horizontal Pipeline) */}
        <DeploymentPipelineFold />

        {/* FOLD 6: DEPLOYMENT CTA (Commitment Matching) */}
        <DeploymentCTAFold />
      </main>
      <Footer />
    </>
  );
}
