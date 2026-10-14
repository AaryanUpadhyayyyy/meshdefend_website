import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackupStage } from "./components/BackupStage";
import { GuidedTriageFold } from "./components/GuidedTriageFold";
import { GovernedExecutionFold } from "./components/GovernedExecutionFold";
import { OperationalEvidenceFold } from "./components/OperationalEvidenceFold";
import { BackupHandoffFold } from "./components/BackupHandoffFold";
import { BackupAskFold } from "./components/BackupAskFold";

export const metadata: Metadata = {
  title: "Backup Operations | MeshDefend",
  description:
    "Unified Backup Operations across Commvault, Veeam, Dell PowerProtect Data Manager, and NetWorker. Morning operations workflow, upstream exception correlation, context-assembled triage, and policy-governed execution.",
  openGraph: {
    title: "Backup Operations | MeshDefend",
    description:
      "Stop jumping between consoles and second-guessing your recovery readiness. One governed operational layer across heterogeneous backup engines.",
    siteName: "MeshDefend",
  },
};

export default function BackupOperationsPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* FOLDS 1–3: THE OPERATIONS CONTROL SPINE (3D WebGL Pinned Stage · Role, Morning Workflow, Exceptions) */}
        <BackupStage />

        {/* FOLD 4: GUIDED TRIAGE & REMEDIATION (Evidence Before Trust + 7/5 Asymmetric Graph) */}
        <GuidedTriageFold />

        {/* FOLD 5: GOVERNED EXECUTION (Human-in-the-Loop & Human-on-the-Loop Gate Pipeline) */}
        <GovernedExecutionFold />

        {/* FOLD 6: OPERATIONAL EVIDENCE (Make Actions Traceable + CSS-3D Archival Sheet) */}
        <OperationalEvidenceFold />

        {/* FOLD 7: RECOVERY READINESS & HANDOFF TO CYBER RESILIENCE (Full-Bleed #221f22 Ink Band) */}
        <BackupHandoffFold />

        {/* FOLD 8: CONVERSION CTA (Paper Section with Plain Vendor Row) */}
        <BackupAskFold />
      </main>
      <Footer />
    </>
  );
}
