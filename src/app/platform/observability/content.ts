/**
 * Observability Page Content Data
 * 
 * Strict compliance rules:
 * - Approved vendors ONLY: Commvault, Veeam, Dell PowerProtect Data Manager,
 *   Dell NetWorker, Dell PowerProtect DataDomain, ServiceNow.
 * - No unverified claims or percentages.
 * - All labels sentence-case Inter (13-14px) except time ticks and figure captions.
 */

export interface ConsoleEvent {
  source: string;
  vendor: string;
  time: string;
  status: string;
  isWarning?: boolean;
}

export interface SeparateTile {
  vendor: string;
  status: string;
  note: string;
  percent?: number;
}

export interface UnifiedLens {
  lens: string;
  title: string;
  desc: string;
  highlight?: boolean;
}

export interface ReportItem {
  id: string;
  title: string;
  audience: string;
  time: string;
  estateHealth: string;
  exceptions: string;
  recoveryReadiness: string;
  actionsTaken: string;
  evidence: string;
}

export const OBSERVABILITY_CONTENT = {
  header: {
    eyebrow: "Platform · Unified Resilience Observability",
  },

  // Folds 1–3: The Stage (400vh sticky)
  stage: {
    beat1: {
      figCaption: "FIG. 1 — SIX CONSOLES, ONE NIGHT (ILLUSTRATIVE)",
      h1: "Resilience visibility is fragmented.",
      hook: "The morning routine: open the backup console, then storage, then cloud, then the ITSM queue, and try to piece together what happened overnight.",
      body: "Hybrid enterprises rely on multiple backup, storage, cloud, ITSM, CMDB, and security systems, each with its own console, data model, and terminology.",
      consoles: [
        { source: "Backup", vendor: "Veeam", time: "02:31", status: "Job completed with warnings", isWarning: true },
        { source: "Storage", vendor: "Dell PowerProtect DataDomain", time: "02:28", status: "Replication lag · within threshold" },
        { source: "Cloud", vendor: "Cloud snapshot", time: "02:05", status: "Snapshot completed" },
        { source: "ITSM", vendor: "ServiceNow", time: "02:14", status: "Change approved · config update" },
        { source: "CMDB", vendor: "Configuration baseline", time: "01:45", status: "payments-db · 3 dependent applications" },
        { source: "Security", vendor: "Posture scanner", time: "00:12", status: "Scan completed · no findings" },
      ] as ConsoleEvent[],
      synthesis: {
        label: "Joined result",
        flow: "payments-db: config changed 02:14 → backup warning 02:31 → replication lag rising → recovery risk: at risk",
      },
    },

    beat2: {
      figCaption: "FIG. 2 — UNIFIED RESILIENCE OBSERVABILITY (ILLUSTRATIVE)",
      h2: "Unified Resilience Observability",
      openingFact: "Every platform says healthy. One is drifting toward its threshold.",
      body: "MeshDefend unifies these fragmented views into a common resilience view, giving business, infrastructure, and security teams shared visibility to see risk clearly, coordinate faster, and act with confidence.",
      toggle: {
        separate: "Separate consoles",
        unified: "Unified view",
      },
      separateTiles: [
        { vendor: "Commvault", status: "Healthy", note: "All jobs completed within SLA" },
        {
          vendor: "Veeam",
          status: "Healthy",
          note: "Backup window · rising 3 nights · still within SLA",
          percent: 82, // 82% filled, threshold at 100%, orange only last 8%
        },
        { vendor: "Dell PowerProtect", status: "Healthy", note: "Storage deduplication normal" },
      ] as SeparateTile[],
      unifiedLenses: [
        {
          lens: "Business lens",
          title: "payments-db",
          desc: "3 critical dependent customer-facing applications affected",
        },
        {
          lens: "Infrastructure lens",
          title: "Backup window rising · 3 nights consecutive",
          desc: "Projected threshold breach tonight without storage rebalance",
          highlight: true,
        },
        {
          lens: "Security lens",
          title: "Configuration delta verified",
          desc: "Matched to approved ServiceNow change request",
        },
      ] as UnifiedLens[],
    },

    beat3: {
      leadIn: "More visibility should not mean more noise.",
      h2: "Start the day with what needs action, not another wall of alerts.",
      body: "Every platform keeps reporting. MeshDefend correlates those signals first, so normal activity stays quiet and you see only the exceptions that need a decision, each with the reason attached.",
      annotations: [
        { title: "Backup warning · payments-db", reason: "Duration threshold reached +18m · storage IO saturation" },
        { title: "Replication lag trending", reason: "Target storage link throughput reduced" },
      ],
      quietLine: "Everything else: normal, no action.",
      totalSignals: 612,
      quietSignals: 610,
    },
  },

  // Fold 4: The Index (12-column editorial report library)
  index: {
    figCaption: "FIG. 3 — EDITORIAL REPORT INDEX (ILLUSTRATIVE)",
    h2: "The report doesn't start when someone asks for it. It's already current.",
    body: "Operational data from every platform becomes reports for operations, leadership, compliance and auditors, on a schedule, without anyone compiling it by hand.",
    reports: [
      {
        id: "daily-brief",
        title: "Daily protection brief",
        audience: "Operations",
        time: "ready 06:00",
        estateHealth: "Protected across tier-1 workloads within recovery point objective",
        exceptions: "2 flagged: payments-db backup SLA drift; replication lag",
        recoveryReadiness: "Production tier-1 instant recovery validated",
        actionsTaken: "1 automated restart proposal pending approval",
        evidence: "Immutable job logs signed across Commvault, Veeam, Dell PowerProtect",
      },
      {
        id: "weekly-posture",
        title: "Weekly resilience posture",
        audience: "Leadership",
        time: "Monday 08:00",
        estateHealth: "Zero critical recovery time breaches across 7 continuous days",
        exceptions: "3 anomalies caught and reconciled before SLA breach",
        recoveryReadiness: "Multi-region failover dry-run passed",
        actionsTaken: "Configuration changes approved and cross-referenced to ServiceNow",
        evidence: "Cross-vendor telemetry audit trail archived",
      },
      {
        id: "compliance-pack",
        title: "Compliance evidence pack",
        audience: "Compliance and audit",
        time: "always current",
        estateHealth: "Policy-bound coverage across tier-1 databases",
        exceptions: "Zero unapproved configuration modifications",
        recoveryReadiness: "Cryptographic immutability attested across target storage",
        actionsTaken: "Human sign-offs logged with dual-custody verification",
        evidence: "Audit-ready mapping ledger maintained continuously",
      },
      {
        id: "board-summary",
        title: "Board summary",
        audience: "Board",
        time: "monthly",
        estateHealth: "Enterprise resilience index: low systemic risk",
        exceptions: "Critical applications meet recovery commitments",
        recoveryReadiness: "Isolated air-gap clean room restore verified",
        actionsTaken: "Annual business continuity milestone achieved",
        evidence: "Board-level compliance declaration signed",
      },
    ] as ReportItem[],
    process: {
      manualSteps: [
        "Export from each console",
        "Reconcile in a spreadsheet",
        "Format",
        "Send",
      ],
      automatedResult: "Ready",
    },
    sourceLine: "Generated from live data across Commvault, Veeam, Dell PowerProtect (sample)",
  },

  // Fold 6: The Handoff (Full-bleed ink band #221f22)
  handoff: {
    strip: [
      { label: "See what matters", active: true },
      { label: "Resolve what needs action", active: false },
      { label: "Learn from what happened", active: false },
    ],
    h2Line1: "You've found what needs attention.",
    h2Line2: "What happens next?",
    linkTitle: "Incident Resolution",
    sentence: "Agentic root cause isolation, human-approved fix proposals.",
    linkText: "See how MeshDefend takes action",
    linkHref: "/platform#incident-resolution",
  },

  // Fold 7: The Ask (Paper section)
  ask: {
    h2: "See your own estate in one view.",
    body: "Bring the consoles you check every morning. We will show you the same overnight story as one view, and the report that comes with it.",
    primaryCta: { label: "Book a demo", href: "/demo" },
    secondaryCta: { label: "See your estate in one view", href: "/demo" },
    approvedVendors: [
      "Commvault",
      "Veeam",
      "Dell PowerProtect Data Manager",
      "Dell NetWorker",
      "Dell PowerProtect DataDomain",
      "ServiceNow",
    ],
  },
} as const;
