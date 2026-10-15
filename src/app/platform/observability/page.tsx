import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Stage } from "./components/Stage";
import { ReportIndex } from "./components/ReportIndex";
import { Handoff } from "./components/Handoff";
import { Ask } from "./components/Ask";
import "./observability.css";

export const metadata: Metadata = {
  title: "Unified Resilience Observability | MeshDefend",
  description:
    "Unified Resilience Observability across Commvault, Veeam, Dell PowerProtect, and ServiceNow. Correlate overnight signals, eliminate alert fatigue, and generate audit-ready reports automatically.",
  openGraph: {
    title: "Unified Resilience Observability | MeshDefend",
    description:
      "Can I see everything in one place, and can I hand something credible to compliance or leadership without compiling it by hand?",
    siteName: "MeshDefend",
  },
};

export default function ObservabilityPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* F1-F3: THE STAGE (Paper) — 400vh tall sticky stage */}
        <Stage />

        {/* F4: THE INDEX (Paper) — 12-column editorial report library */}
        <ReportIndex />

        {/* F6: THE HANDOFF (Ink) — Full-bleed #221f22 band */}
        <Handoff />

        {/* F7: THE ASK (Paper) — Conversion CTA with plain vendor row */}
        <Ask />
      </main>
      <Footer />
    </>
  );
}
