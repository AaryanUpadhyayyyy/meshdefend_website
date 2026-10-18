import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RollupConsoleHeroFold } from "./components/RollupConsoleHeroFold";
import { RollupIsolationDrillDownFold } from "./components/RollupIsolationDrillDownFold";
import { MarginCurveEconomicsFold } from "./components/MarginCurveEconomicsFold";
import { TenXRatioVisualizerFold } from "./components/TenXRatioVisualizerFold";
import { MspStoriesPreviewFold } from "./components/MspStoriesPreviewFold";
import { MspPartnerApplicationCTAFold } from "./components/MspPartnerApplicationCTAFold";

export const metadata: Metadata = {
  title: "Solutions for Managed Service Providers (MSPs) | MeshDefend",
  description:
    "One console. Every client. Not a login per account. MeshDefend is built for the ratio that matters: more clients per technician with multi-tenancy, cryptographic per-client isolation, and rollup visibility.",
  openGraph: {
    title: "Solutions for Managed Service Providers (MSPs) | MeshDefend",
    description:
      "Help every operator manage 10× more clients. Turn multi-tenant backup operations into a high-margin cyber resilience service line.",
    siteName: "MeshDefend",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "MeshDefend - Managed Services Solutions",
      },
    ],
  },
};

export default function ManagedServicesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* FOLD 1: BUILT TO OPERATE ACROSS CLIENTS (The Rollup Console) */}
        <RollupConsoleHeroFold />

        {/* FOLD 2: PROVE MULTI-TENANCY IN OPERATION (Rollup-to-Isolation Drill-Down) */}
        <RollupIsolationDrillDownFold />

        {/* FOLD 3: MAKE THE ECONOMICS WORK AT SCALE (The Margin Curve) */}
        <MarginCurveEconomicsFold />

        {/* FOLD 4: PROVE OPERATING LEVERAGE (The 10× Ratio Visualizer) */}
        <TenXRatioVisualizerFold />

        {/* FOLD 5: SEE HOW OTHER MSPS SCALE (MSP Case-Study Previews) */}
        <MspStoriesPreviewFold />

        {/* FOLD 6: BECOME A MESHDEFEND PARTNER (Partner Application & Stepper) */}
        <MspPartnerApplicationCTAFold />
      </main>
      <Footer />
    </>
  );
}
