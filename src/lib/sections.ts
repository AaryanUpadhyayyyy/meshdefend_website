/* ─── Homepage Section Content ──────────────────────────────────
   Exact client-approved sitemap copy for the MeshDefend Homepage.
   ────────────────────────────────────────────────────────────────── */

// Keep the Agent Mesh section available in code and CMS, but hidden on the homepage for now.
export const HOME_AGENT_MESH_SECTION_VISIBLE = false;

export const PAIN = {
  eyebrow: "",
  headline: "The Reality of Business Recovery",
  subheadline: "A Successful Backup Doesn't Mean Your Business Can Recover.",
  openingLine:
    "MeshDefend helps enterprises bridge the gap between data restoration and business recovery by connecting critical services, infrastructure, security, and recovery operations.",
  clusters: [
    {
      num: "01",
      group: "Recovery Confidence",
      tag: "RECOVERY CONFIDENCE",
      items: [
        {
          label: "Recovery Readiness Lags Evolving Threats",
          desc: "AI-driven attacks are advancing faster than traditional recovery strategies, leaving businesses uncertain whether they can recover critical operations after a disruption.",
        },
        {
          label: "Unverified Business Recovery",
          desc: "Successful backups don't guarantee that applications, infrastructure, and dependencies will function after restoration. Without continuous testing, recovery confidence and RTO/RPO targets remain unproven.",
        },
      ],
    },
    {
      num: "02",
      group: "Fragmented Recovery Operations",
      tag: "FRAGMENTED RECOVERY OPERATIONS",
      items: [
        {
          label: "Disconnected Teams and Workflows",
          desc: "Recovery spans multiple teams, tools, vendors, and runbooks, requiring manual coordination of tasks, approvals, and dependencies during critical incidents.",
        },
        {
          label: "Human Error and Delays",
          desc: "Manual handoffs and inconsistent procedures create bottlenecks, increase human error, and make recovery outcomes unpredictable.",
        },
      ],
    },
    {
      num: "03",
      group: "Complexity at Scale",
      tag: "COMPLEXITY AT SCALE",
      items: [
        {
          label: "Sprawling, Heterogeneous Environments",
          desc: "Critical applications, data, and dependencies span multiple clouds, infrastructure platforms, and protection vendors, making consistent recovery difficult at scale.",
        },
        {
          label: "Siloed Recovery Visibility",
          desc: "Without a unified view of protection health, infrastructure dependencies, and recovery failures, teams struggle to assess business recovery risks.",
        },
      ],
    },
  ],
};

export const SOLUTION = {
  eyebrow: "",
  headline: "Introducing ResOC™: The Resilience Operations Centre",
  badge: "Powered by Agent Mesh™",
  subheading: "Keep Your Business Recovery-Ready at all times",
  lede: "MeshDefend helps enterprises continuously maintain and improve business recovery readiness. ResOC™ unifies business priorities, IT infrastructure, and security to continuously assess recovery readiness, coordinate corrective actions, and orchestrate end-to-end business recovery.",
  columns: {
    number: "#",
    col1: "ResOC Capability",
    col2: "What It Solves",
  },
  items: [
    {
      num: "01",
      capability: "Unified Resilience Observability",
      solves: "Solves fragmented visibility across tools, vendors, and environments",
      href: "/platform/observability",
    },
    {
      num: "02",
      capability: "Continuous Recovery Readiness",
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
      // TODO(content): sitemap has no Agentic Automation page, confirm target
      href: "/platform/backup-operations",
    },
    {
      num: "05",
      capability: "Agentic Recovery",
      solves: "Solves uncertain recovery readiness and unproven RTO/RPO",
      href: "/platform/cyber-resilience",
    },
  ],
};

export const IMPACT = {
  eyebrow: "",
  headline: "Measurable Impact Across Resilience Operations",
  metricPrefix: "TELEMETRY //",
  stats: [
    {
      tag: "RESILIENCY",
      value: "Up to 50%",
      label: "Improve Business Resiliency",
      desc: "Build business resiliency through continuous visibility, readiness, and coordinated response.",
    },
    {
      tag: "RECOVERY",
      value: "20%",
      label: "Faster Business Recovery",
      desc: "According to Splunk’s research, unplanned downtime costs Global 2000 organizations an average of $15,000 per minute ($600B annually).",
      sourceLabel: "Splunk: The $600 Billion Blind Spot research",
      sourceUrl: "https://discover.splunk.com/The-600-Billion-Blind-Spot-Why-Downtime-is-Now-a-Boardroom-Crisis-Sep26.html",
    },
    {
      tag: "RESOLUTION",
      value: "Up to 80%",
      label: "Lower MTTR",
      desc: "Investigate, diagnose, and remediate incidents faster. Offload repetitive tasks to MeshDefend’s Agent Mesh with HITL/HIOL.",
    },
    {
      tag: "SCALE",
      value: "30–50%",
      label: "More Infrastructure Managed",
      desc: "Manage 30–50% more infrastructure with the same team.",
    },
    {
      tag: "CONTINUITY",
      value: "Up to 60%",
      label: "Less Handoff Effort",
      desc: "Preserve context across L1, L2, L3, and specialist teams to reduce repeated investigation.",
    },
  ],
  costOptimization: {
    label: "FINANCIAL ROI",
    title: "Financial ROI",
    points: [
      {
        title: "Optimize",
        desc: "Reclaim storage and reduce scanning cost.",
      },
      {
        title: "Reduce Cyber Insurance Cost",
        desc: "Enterprises spend an average of $250,000–$500,000+ per year.",
      },
    ],
  },
  resiliencePosture: {
    label: "OPERATIONAL RESILIENCE",
    title: "Stronger Resilience Posture",
    points: [
      "Unify business, IT infrastructure and security teams with a single pane of glass for establishing and managing resilience posture.",
      "Reduce operational and cyber risks with Minimum Viable Company (MVC) mapping and live system dependencies.",
      "Ensure business recovery, not just data recovery, across hybrid cloud and heterogeneous vendors.",
      "Improved compliance and audit-ready evidence.",
      "Continuous business resilience posture with always-on observability, validation and readiness.",
    ],
  },
};

export const AUDIENCE = {
  eyebrow: "",
  headline: "Built for the Teams Accountable for Resilience",
  segments: [
    {
      id: "enterprises",
      num: "01",
      title: "Enterprises",
      desc: "Reduce recovery uncertainty, operational complexity, and risk across large heterogeneous environments.",
      href: "/solutions/enterprises",
    },
    {
      id: "advisory",
      num: "02",
      title: "Advisory and Consulting",
      desc: "Turn resilience assessments into actionable roadmaps, measurable outcomes, and ongoing improvement programs.",
      href: "/solutions/advisory-consulting",
    },
    {
      id: "si",
      num: "03",
      title: "Systems Integrators",
      desc: "Build repeatable assessment, implementation, integration, and managed-service offerings around resilience.",
      href: "/solutions/system-integrators",
    },
    {
      id: "msp",
      num: "04",
      title: "Managed Service Providers",
      desc: "Scale resilience services, improve margins, and support more customers without linear headcount growth.",
      href: "/solutions/managed-services",
    },
  ],
};

export const FINAL_CTA = {
  eyebrow: "",
  headline: "Don’t Wait for the Next Incident to Test Your Resilience",
  lede: "Modern resilience requires continuous visibility, readiness, and action. Recovery plans tested only after failure are no longer enough.",
  ctaPrimary: "Book a demo",
  ctaSecondary: "",
};
