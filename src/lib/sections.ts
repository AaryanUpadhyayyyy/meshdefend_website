/* ─── Homepage Section Content ──────────────────────────────────
   Sitemap and deck copy for the MeshDefend Homepage.
   ────────────────────────────────────────────────────────────────── */

export const PAIN = {
  eyebrow: "02 // THE REALITY OF ENTERPRISE RESILIENCE",
  headline: "The Reality of Business, Data & Cyber Resilience",
  openingLine:
    "Modern enterprises face rising recovery uncertainty, growing infrastructure complexity, and operations that struggle to scale.",
  clusters: [
    {
      num: "01",
      group: "Recovery Confidence",
      diagramCaption: "FIG. 2.1 — ASSUMED BACKUP SUCCESS VS. PROVABLE APPLICATION RECOVERY",
      items: [
        {
          label: "Cyber Recovery Lags AI-Driven Attacks",
          desc: "Recovery strategies struggle to match the speed, scale, and complexity of modern cyberattacks.",
        },
        {
          label: "Low Recovery Confidence",
          desc: "Teams lack continuous proof that critical workloads can be recovered when needed.",
        },
        {
          label: "Unverified Application Recovery",
          desc: "Application-level recovery remains unproven. Successful backups do not prove applications can be restored and operated correctly.",
        },
        {
          label: "Unproven RTO/RPO",
          desc: "Recovery objectives often remain assumptions until they are actually tested.",
        },
      ],
    },
    {
      num: "02",
      group: "Complexity at Scale",
      diagramCaption: "FIG. 2.2 — DISCONNECTED PLATFORMS, CLOUDS, AND PROTECTION VENDORS",
      items: [
        {
          label: "Data and Platform Sprawl",
          desc: "Data and Dependencies span multiple platforms, clouds, and protection vendors.",
        },
        {
          label: "Heterogeneous Environments",
          desc: "Multi-cloud, multi-vendor environments are increasingly difficult to operate consistently at scale.",
        },
        {
          label: "Siloed Visibility",
          desc: "No single view connects protection health, failures, dependencies, and recovery risk.",
        },
      ],
    },
    {
      num: "03",
      group: "Operational Friction",
      diagramCaption: "FIG. 2.3 — MANUAL CORRELATION AND CONTEXT LOSS ACROSS L1 / L2 / L3",
      items: [
        {
          label: "Fragmented knowledge",
          desc: "Critical expertise is scattered across runbooks, tickets, tools, and specialists.",
        },
        {
          label: "Slow investigation",
          desc: "Teams manually correlate signals across systems before identifying root cause.",
        },
        {
          label: "Context-Losing Handoffs",
          desc: "Critical context is lost across L1, L2, L3, and specialist escalations.",
        },
        {
          label: "Brittle Automation",
          desc: "Scripts and workflows break as infrastructure changes, creating constant maintenance.",
        },
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

