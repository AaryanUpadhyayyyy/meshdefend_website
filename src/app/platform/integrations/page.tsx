import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IntegrationsDirectory } from "./components/IntegrationsDirectory";
import { IntegrationsCTA } from "./components/IntegrationsCTA";

export const metadata: Metadata = {
  title: "Integrations & Ecosystem Support | MeshDefend",
  description:
    "Everything we support, in one place. Confirm compatibility fast across backup engines, storage arrays, cloud infrastructure, security posture, and ITSM workflows.",
  openGraph: {
    title: "Platform Integrations Directory | MeshDefend",
    description:
      "Find support the way you manage your stack. Native API connectors for Commvault, Veeam, Dell, NetApp, Pure Storage, AWS, Azure, CrowdStrike, and ServiceNow.",
    siteName: "MeshDefend",
  },
};

export default function IntegrationsPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* FOLDS 1, 2, & 3: DIRECT ANSWER ENTRY, SIDEBAR & GRID MATRIX, NO-MATCH FALLBACK */}
        <IntegrationsDirectory />

        {/* FOLD 4: ECOSYSTEM CONNECTIVITY CTA */}
        <IntegrationsCTA />
      </main>
      <Footer />
    </>
  );
}
