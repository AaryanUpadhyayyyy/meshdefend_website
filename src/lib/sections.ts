/* ─── Homepage Section Content ──────────────────────────────────
   Sitemap and deck copy for the MeshDefend Homepage.
   ────────────────────────────────────────────────────────────────── */

export const PAIN = {
  eyebrow: "THE PROBLEM",
  headline: "The Reality of Business, Data & Cyber Resilience",
  openingLine: "Modern enterprises face rising recovery uncertainty, growing infrastructure complexity, and operations that struggle to scale.",
  caption: "Same five tools. Nothing replaced. The space between them is now operated.",
  silos: [
    {
      id: "backup",
      title: "Backup Engines",
      sub: "Multi-platform estate",
      detail: "Commvault · Veeam · Dell PowerProtect · NetWorker",
      todayState: "Reports local jobs successful. Blind to storage retention drifts.",
      resocState: "Continuous telemetry into Agent Mesh™. Cross-platform job normalization.",
    },
    {
      id: "storage",
      title: "Storage & Tiers",
      sub: "Primary & Secondary",
      detail: "Dell DataDomain · SAN / NAS · Object Storage",
      todayState: "Replication and retention locks lag without live recovery proof.",
      resocState: "Replication integrity, capacity drift, and retention locks continuously verified.",
    },
    {
      id: "cloud",
      title: "Cloud Workloads",
      sub: "Hybrid & Multi-Cloud",
      detail: "AWS · Azure · Enterprise hybrid workloads",
      todayState: "Workloads and dependencies mutate faster than recovery runbooks.",
      resocState: "Autonomous workload discovery and application topology dependency mapping.",
    },
    {
      id: "security",
      title: "Recovery Posture",
      sub: "Governance & Access",
      detail: "Air-gap locks · Immutable policies · Access keys",
      todayState: "Recovery credentials and isolation policies untested until active incident.",
      resocState: "Continuous sandbox restore readiness and immutability verification.",
    },
    {
      id: "service",
      title: "ITSM & Change",
      sub: "Operations & Governance",
      detail: "ServiceNow · Change Advisory · Audit trail",
      todayState: "Manual tickets, context loss between L1/L2/L3, stale evidence.",
      resocState: "Automated root-cause documentation and staged changes awaiting human approval.",
    },
  ],
  gaps: [
    {
      num: "01",
      name: "Retention & Replication Drift",
      between: "Backup ↔ Storage",
      todayRisk: "Backup catalogs log success, but storage replication or immutability locks lag silently without cross-verification.",
      resocBridge: "Continuous reconciliation between backup job catalogs and DataDomain tier status.",
    },
    {
      num: "02",
      name: "Topology & Dependency Drift",
      between: "Storage ↔ Cloud Workloads",
      todayRisk: "Cloud instances, databases, and microservices change daily while static recovery runbooks drift out of date.",
      resocBridge: "Agent Mesh™ maps active dependencies and proves recoverability against current architecture.",
    },
    {
      num: "03",
      name: "Unvalidated Recovery Posture",
      between: "Cloud Workloads ↔ Security Posture",
      todayRisk: "Air-gapped retention, keys, and isolated network recovery paths are never exercised until an outage occurs.",
      resocBridge: "Automated non-disruptive sandbox recovery drills prove RTO and RPO before incidents strike.",
    },
    {
      num: "04",
      name: "Operational Context Leak",
      between: "Security Posture ↔ ITSM & Change",
      todayRisk: "Shift handoffs and escalations lose forensic context, forcing specialists to re-diagnose what L1 already found.",
      resocBridge: "Pre-assembled investigation briefs and staged fix changes in ServiceNow with one-click human approval.",
    },
  ],
  clusters: [
    {
      num: "01",
      group: "Recovery Confidence",
      title: "Can we actually recover?",
      subtitle: "Confidence is assumed, not evidenced.",
      items: [
        { label: "Cyber recovery gaps", desc: "Recovery strategies struggle to keep pace with the speed, scale, and complexity of modern cyberattacks." },
        { label: "Low recovery confidence", desc: "Recovery readiness is uncertain. Teams lack continuous evidence that critical workloads can actually recover when needed." },
        { label: "Unverified application recovery", desc: "Application-level recovery remains unproven. Successful backups do not guarantee that applications can be restored correctly." },
        { label: "Unproven RTO/RPO", desc: "RTO and RPO are difficult to prove. Recovery objectives often remain assumptions until an actual recovery occurs." },
      ],
    },
    {
      num: "02",
      group: "Complexity at Scale",
      title: "The estate outgrew the operating model.",
      subtitle: "More platforms, more vendors, less of a single picture.",
      items: [
        { label: "Multi-vendor sprawl", desc: "Each platform has its own console, its own language, its own alerting. Nobody holds the cross-vendor view." },
        { label: "Fragmented reporting", desc: "Reports are built tool-by-tool. Reconciling them takes hours and the picture is stale before it is finished." },
        { label: "Siloed visibility", desc: "Storage, backup, cloud, and security each see their own slice. No single team sees the whole night." },
      ],
    },
    {
      num: "03",
      group: "Operational Friction",
      title: "Every incident starts from zero.",
      subtitle: "Knowledge, context, and automation all leak between handoffs.",
      items: [
        { label: "Slow investigation", desc: "L1 collects the same diagnostics manually every time. Context is lost between shifts and escalations." },
        { label: "Specialist dependency", desc: "Most issues wait for one person who knows that vendor. The queue grows while they sleep." },
        { label: "Repeated L1/L2/L3 handoffs", desc: "Each escalation loses context. The specialist re-investigates what L1 already found." },
        { label: "Brittle automation", desc: "Scripts break when infrastructure changes. Maintaining them is its own full-time job." },
      ],
    },
  ],
};

export const SOLUTION = {
  eyebrow: "OUR SOLUTION",
  headline: "ResOC: Resilience Operations Center",
  lede: "A Resilience Operations Center that unifies visibility, operations, automation, and recovery across heterogeneous environments — with policy-governed autonomy: human in the loop and human on the loop.",
  items: [
    {
      num: "01",
      capability: "Unified Resilience Observability",
      solves: "Siloed visibility, fragmented reporting, multi-vendor sprawl",
      href: "/platform#observability",
    },
    {
      num: "02",
      capability: "Backup and Recovery Operations",
      solves: "Manual operational effort, heterogeneous environments, repetitive L1/L2 work",
      href: "/platform#backup-operations",
    },
    {
      num: "03",
      capability: "Agentic Incident Resolution",
      solves: "Slow investigation, fragmented context, specialist dependency, L1/L2/L3 handoffs",
      href: "/platform#incident-resolution",
    },
    {
      num: "04",
      capability: "Agentic Automation",
      solves: "Brittle scripts, maintenance-heavy workflows, changing infrastructure",
      href: "/platform#automation",
    },
    {
      num: "05",
      capability: "Cyber Recovery",
      solves: "Low recovery confidence, unproven RTO/RPO, unverified recovery readiness",
      href: "/platform#cyber-resilience",
    },
  ],
};

export const IMPACT = {
  eyebrow: "BENEFITS & ROI",
  headline: "Measurable Impact Across Resilience Operations",
  stats: [
    {
      value: "30–50%",
      label: "More infrastructure managed with the same team",
      desc: "Multiply team capacity without linear headcount growth across multi-vendor backup estates.",
      status: "verified" as const,
    },
    {
      value: "Up to 80%",
      label: "Lower MTTR",
      desc: "Accelerate triage, dependency tracing, and guided remediation across heterogeneous tools.",
      status: "verified" as const,
    },
    {
      value: "Up to 60%",
      label: "Less handoff effort",
      desc: "Preserve operational context between L1, L2, L3, and specialist teams to eliminate re-investigation.",
      status: "verified" as const,
    },
  ],
  qualitative: [
    {
      title: "Lower business disruption risk",
      desc: "Identify operational and recovery gaps earlier, prove application recovery readiness continuously, and strengthen recoverability before incidents occur.",
    },
    {
      title: "Stronger governance",
      desc: "Standardize operations with policy guardrails, policy-governed autonomy: human in the loop and human on the loop, and immutable audit logs across the entire multi-vendor resilience estate.",
    },
  ],
};

export const AUDIENCE = {
  eyebrow: "WHO IS IT FOR",
  headline: "Built for the Teams Accountable for Resilience",
  segments: [
    {
      id: "si",
      title: "System Integrators",
      badge: "REPEATABLE PRACTICE",
      desc: "Create standardized advisory, implementation, integration, and governed managed resilience offerings across enterprise client estates.",
      deliverables: ["Cross-vendor reference architecture", "Repeatable deployment models", "Client-facing compliance reporting"],
      href: "/solutions/system-integrators",
    },
    {
      id: "msp",
      title: "Managed Service Providers",
      badge: "MULTI-TENANT SCALE",
      desc: "Scale managed backup and recovery services without scaling engineer headcount linearly. Unify disparate tenant toolchains under one console.",
      deliverables: ["Single-pane multi-tenant operations", "Automated L1 triage with guardrails", "Predictable service margins"],
      href: "/solutions/managed-services",
    },
    {
      id: "advisory",
      title: "Advisory and Consulting",
      badge: "MEASURABLE ROADMAPS",
      desc: "Turn static resilience and cyber recovery posture assessments into continuous operational telemetry, verifiable RTO proofs, and remediation roadmaps.",
      deliverables: ["Evidence-backed readiness audits", "Objective RTO/RPO verification", "Ongoing advisory retainers"],
      href: "/solutions/advisory-consulting",
    },
    {
      id: "enterprises",
      title: "Enterprises",
      badge: "PROVEN RECOVERABILITY",
      desc: "Eliminate recovery uncertainty across complex, multi-vendor enterprise estates. Empower infrastructure leads while keeping CISOs audit-ready.",
      deliverables: ["Continuous application recovery testing", "policy-governed autonomy: human in the loop and human on the loop", "Zero unowned operational gaps"],
      href: "/solutions/enterprises",
    },
  ],
};

export const FINAL_CTA = {
  eyebrow: "GET STARTED",
  headline: "Don't Wait for the Next Incident to Test Your Resilience",
  lede: "Modern resilience requires continuous visibility, readiness, and action. Recovery plans tested only after failure are no longer enough. See your environment through ResOC.",
  ctaPrimary: "Book a demo",
  ctaSecondary: "See ResOC in action",
};

