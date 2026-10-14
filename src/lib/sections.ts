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
  eyebrow: "03 // RESILIENCE OPERATIONS CENTER",
  headline: "ResOC: Resilience Operations Center",
  lede: "A Resilience Operations Center that unifies visibility, operations, automation, and recovery across heterogeneous environments.",
  items: [
    {
      num: "01",
      capability: "Unified Resilience Observability",
      solves: "Solves fragmented visibility across tools, vendors, and environments",
      href: "/platform/observability",
    },
    {
      num: "02",
      capability: "Backup and Recovery Operations",
      solves: "Solves manual operations and repetitive L1/L2 work",
      href: "/platform/backup-operations",
    },
    {
      num: "03",
      capability: "Agentic Incident Resolution",
      solves: "Solves slow diagnosis, lost context, and specialist dependency",
      href: "/platform/incident-resolution",
    },
    {
      num: "04",
      capability: "Agentic Automation",
      solves: "Solves brittle scripts and maintenance-heavy workflows",
      href: "/platform/built-for-flexibility",
    },
    {
      num: "05",
      capability: "Cyber Recovery",
      solves: "Solves uncertain recovery readiness and unproven RTO/RPO",
      href: "/platform/cyber-resilience",
    },
  ],
};

export const IMPACT = {
  eyebrow: "04 // PROVEN ENTERPRISE ROI",
  headline: "Measurable Impact Across Resilience Operations",
  openingLine:
    "From day-to-day operations to executive confidence, ResOC delivers measurable operational and business value.",
  stats: [
    {
      value: "30–50%",
      label: "More Infrastructure Managed",
      desc: "Manage 30–50% more infrastructure with the same team.",
    },
    {
      value: "Up to 80%",
      label: "Lower MTTR",
      desc: "Accelerates investigation, diagnosis, and remediation to restore services faster. Offload repetitive tasks to MeshDefend's Agent Mesh with HITL/HIOL.",
    },
    {
      value: "Up to 60%",
      label: "Less Handoff Effort",
      desc: "Preserve context across L1, L2, L3, and specialist teams to reduce repeated investigation.",
    },
  ],
  costOptimization: {
    title: "Cost & Spend Optimization",
    points: [
      {
        title: "Optimize Infrastructure Spend and Costs for resilience.",
        desc: "Reclaim storage from stale and redundant copies of data; optimize cyber scanning cost and coverage.",
      },
      {
        title: "Lower Cyber Insurance Costs.",
        desc: "Reduce recovery time by hours when outages can cost $5K–$15K per minute.",
      },
    ],
  },
  resiliencePosture: {
    title: "Stronger Resilience Posture",
    points: [
      "Unify business, IT infrastructure and security teams with a single pane of glass for establishing and managing resilience posture",
      "Reduce operational and cyber risks with Minimum Viable Company (MVC) mapping and live system dependencies",
      "Ensure business recovery, not just data recovery, across hybrid cloud and heterogeneous vendors.",
      "Improved compliance and audit-ready evidence",
      "Continuous business resilience posture with always-on observability, validation and readiness",
    ],
  },
};

export const AUDIENCE = {
  eyebrow: "05 // BUILT FOR ENTERPRISE RESILIENCE",
  headline: "Built for the Teams Accountable for Resilience",
  segments: [
    {
      id: "si",
      num: "01",
      title: "Systems Integrators",
      desc: "Build repeatable assessment, implementation, integration, and managed-service offerings around resilience.",
      href: "/solutions/system-integrators",
    },
    {
      id: "msp",
      num: "02",
      title: "Managed Service Providers",
      desc: "Scale resilience services, improve margins, and support more customers without linear headcount growth.",
      href: "/solutions/managed-services",
    },
    {
      id: "advisory",
      num: "03",
      title: "Advisory and Consulting",
      desc: "Turn resilience assessments into actionable roadmaps, measurable outcomes, and ongoing improvement programs.",
      href: "/solutions/advisory-consulting",
    },
    {
      id: "enterprises",
      num: "04",
      title: "Enterprises",
      desc: "Reduce recovery uncertainty, operational complexity, and risk across large heterogeneous environments.",
      href: "/solutions/enterprises",
    },
  ],
};

export const FINAL_CTA = {
  eyebrow: "06 // GET STARTED",
  headline: "Don't Wait for the Next Incident to Test Your Resilience",
  lede: "Modern resilience requires continuous visibility, readiness, and action. Recovery plans tested only after failure are no longer enough.",
  ctaPrimary: "Book a Demo",
  ctaSecondary: "See ResOC in action",
};

