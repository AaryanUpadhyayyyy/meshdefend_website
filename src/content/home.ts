/**
 * Exact client-approved homepage copy matching SiteMap.xlsx.
 * Follows verbatim client specifications.
 */

export const METADATA = {
  title: "MeshDefend — Resilience Operations Center (ResOC)",
  description:
    "An agentic OS for enterprise Resilience Operations, powered by Agent Mesh™. ResOC unifies business, infrastructure and security to deliver continuous resilience.",
};

export const HERO_CONTENT = {
  h1: "Introducing Resilience Operations Center (ResOC)",
  h1Prefix: "Introducing Resilience Operations Center",
  h1Accent: "(ResOC)",
  subheading:
    "An agentic OS for enterprise Resilience Operations, powered by Agent Mesh™.",
  body: "ResOC unifies business, infrastructure and security to deliver continuous resilience.",
  primaryCta: {
    label: "Book a demo",
    href: "/demo",
  },
  secondaryCta: {
    label: "See ResOC in action",
    href: "/platform/observability",
  },
};

export const CONSOLE_PREVIEW_CONTENT = {
  caption: "Illustrative product preview. Sample data.",
  integrations: [
    "Commvault",
    "Veeam",
    "Dell PowerProtect Data Manager",
    "Dell NetWorker",
    "Dell PowerProtect DataDomain",
    "ServiceNow",
  ],
};

export const TRUST_BAND_CONTENT = {
  backedByLabel: "Backed By",
  backedByCaption: "Enterprise CXOs and Founders",
  partnersLabel: "Partners",
  // TODO(content): confirm each logo is an approved partner before launch
  partners: [
    {
      name: "Sapta Tunas Teknologi",
      light: "/images/saptatuns logo.webp",
      dark: "/images/saptatuns logo.webp",
      alt: "Sapta Tunas Teknologi Logo",
    },
    {
      name: "NVIDIA Inception",
      light: "/images/nvidia-dark.png",
      dark: "/images/nvidia-light.png",
      alt: "NVIDIA Inception Program Member Logo",
    },
    {
      name: "OpenAI",
      light: "/images/openai-dark.png",
      dark: "/images/openai-light.png",
      alt: "OpenAI Logo",
    },
    {
      name: "Amazon Web Services",
      light: "/images/aws-dark.png",
      dark: "/images/aws-light.png",
      alt: "Amazon Web Services Partner Logo",
    },
    {
      name: "Microsoft",
      light: "/images/microsoft-dark.png",
      dark: "/images/microsoft-light.png",
      alt: "Microsoft Partner Logo",
    },
    {
      name: "Anthropic",
      light: "/images/logo/anthropic-com-brandmark-dark.svg",
      dark: "/images/logo/anthropic-com-brandmark.svg",
      alt: "Anthropic Claude AI Partner Logo",
    },
    {
      name: "Microsoft Azure",
      light: "/images/azure-dark.png",
      dark: "/images/azure-light.png",
      alt: "Microsoft Azure Cloud Logo",
    },
    {
      name: "Dell Technologies",
      light: "/images/dell-dark.png",
      dark: "/images/dell-light.png",
      alt: "Dell Technologies Partner Logo",
    },
  ],
};

export interface PainPointItem {
  id: string;
  num: string;
  title: string;
  desc: string;
}

export interface PainGroup {
  id: string;
  name: string;
  eyebrowPrefix: string;
  items: PainPointItem[];
}

export const PAIN_POINTS_CONTENT = {
  heading: "The Reality of Business Recovery",
  subheadline: "A Successful Backup Doesn't Mean Your Business Can Recover.",
  subtext:
    "MeshDefend helps enterprises bridge the gap between data restoration and business recovery by connecting critical services, infrastructure, security, and recovery operations.",
  groups: [
    {
      id: "recovery-confidence",
      name: "Recovery Confidence",
      eyebrowPrefix: "RECOVERY CONFIDENCE",
      items: [
        {
          id: "rc-1",
          num: "01",
          title: "Recovery Readiness Lags Evolving Threats",
          desc: "AI-driven attacks are advancing faster than traditional recovery strategies, leaving businesses uncertain whether they can recover critical operations after a disruption.",
        },
        {
          id: "rc-2",
          num: "02",
          title: "Unverified Business Recovery",
          desc: "Successful backups don't guarantee that applications, infrastructure, and dependencies will function after restoration. Without continuous testing, recovery confidence and RTO/RPO targets remain unproven.",
        },
      ],
    },
    {
      id: "fragmented-recovery-operations",
      name: "Fragmented Recovery Operations",
      eyebrowPrefix: "FRAGMENTED RECOVERY OPERATIONS",
      items: [
        {
          id: "fro-1",
          num: "01",
          title: "Disconnected Teams and Workflows",
          desc: "Recovery spans multiple teams, tools, vendors, and runbooks, requiring manual coordination of tasks, approvals, and dependencies during critical incidents.",
        },
        {
          id: "fro-2",
          num: "02",
          title: "Human Error and Delays",
          desc: "Manual handoffs and inconsistent procedures create bottlenecks, increase human error, and make recovery outcomes unpredictable.",
        },
      ],
    },
    {
      id: "complexity-at-scale",
      name: "Complexity at Scale",
      eyebrowPrefix: "COMPLEXITY AT SCALE",
      items: [
        {
          id: "cas-1",
          num: "01",
          title: "Sprawling, Heterogeneous Environments",
          desc: "Critical applications, data, and dependencies span multiple clouds, infrastructure platforms, and protection vendors, making consistent recovery difficult at scale.",
        },
        {
          id: "cas-2",
          num: "02",
          title: "Siloed Recovery Visibility",
          desc: "Without a unified view of protection health, infrastructure dependencies, and recovery failures, teams struggle to assess business recovery risks.",
        },
      ],
    },
  ] as PainGroup[],
};

export const SOLUTION_CONTENT = {
  heading: "Introducing ResOC™: The Resilience Operations Centre",
  badge: "Powered by Agent Mesh™",
  subheading: "Keep Your Business Recovery-Ready at all times",
  subtext:
    "MeshDefend helps enterprises continuously maintain and improve business recovery readiness. ResOC™ unifies business priorities, IT infrastructure, and security to continuously assess recovery readiness, coordinate corrective actions, and orchestrate end-to-end business recovery.",
  columns: {
    col1: "ResOC Capability",
    col2: "What It Solves",
  },
  rows: [
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
      // TODO(content): sitemap has no Agentic Automation page, confirm target
      href: "/platform/backup-operations",
    },
    {
      num: "05",
      capability: "Cyber Recovery",
      solves: "Solves uncertain recovery readiness and unproven RTO/RPO",
      href: "/platform/cyber-resilience",
    },
  ],
};

export const AGENT_MESH_CONTENT = {
  // TODO(content): this section is not in the sitemap. Verify all copy (especially "cryptographically verifiable audit records") against the vision deck before launch.
  eyebrow: "FOUNDATIONAL ARCHITECTURE",
  heading: "Agent Mesh™",
  subheading: "Autonomous intelligence for resilience operations",
  introParagraph:
    "ResOC is the unified operations center teams use daily; Agent Mesh™ is the autonomous intelligence engine beneath it. It continuously ingests telemetry across vendors, maps Minimum Viable Company (MVC) dependencies, and automates operations with Human-in-the-Loop (HITL) and Human-on-the-Loop (HIOL) approval gates.",
};

export const BENEFITS_CONTENT = {
  heading: "Measurable Impact Across Resilience Operations",
  impactCards: [
    {
      metric: "Up to 50%",
      label: "Improve Business Resiliency",
      detail: "Build business resiliency through continuous visibility, readiness, and coordinated response.",
    },
    {
      metric: "20%",
      label: "Faster Business Recovery",
      detail: "According to Splunk’s research, unplanned downtime costs Global 2000 organizations an average of $15,000 per minute ($600B annually).",
      source: "https://discover.splunk.com/The-600-Billion-Blind-Spot-Why-Downtime-is-Now-a-Boardroom-Crisis-Sep26.html",
    },
    {
      metric: "Up to 80%",
      label: "Lower MTTR",
      detail: "Investigate, diagnose, and remediate incidents faster. Offload repetitive tasks to MeshDefend’s Agent Mesh with HITL/HIOL.",
    },
    {
      metric: "30–50%",
      label: "More Infrastructure Managed",
      detail: "Manage 30–50% more infrastructure with the same team.",
    },
    {
      metric: "Up to 60%",
      label: "Less Handoff Effort",
      detail:
        "Preserve context across L1, L2, L3, and specialist teams to reduce repeated investigation.",
    },
  ],
  financialCard: {
    heading: "Financial ROI",
    lines: [
      "Optimize — Reclaim storage and reduce scanning cost.",
      "Reduce Cyber Insurance Cost — Enterprises spend an average of $250,000–$500,000+ per year.",
    ],
  },
  postureCard: {
    heading: "Stronger Resilience Posture",
    items: [
      "Unify business, IT infrastructure and security teams with a single pane of glass for establishing and managing resilience posture.",
      "Reduce operational and cyber risks with Minimum Viable Company (MVC) mapping and live system dependencies.",
      "Ensure business recovery, not just data recovery, across hybrid cloud and heterogeneous vendors.",
      "Improved compliance and audit-ready evidence.",
      "Continuous business resilience posture with always-on observability, validation and readiness.",
    ],
  },
};

export const AUDIENCE_CONTENT = {
  heading: "Built for the Teams Accountable for Resilience",
  audiences: [
    {
      num: "01",
      title: "Enterprises",
      desc: "Reduce recovery uncertainty, operational complexity, and risk across large heterogeneous environments.",
      href: "/solutions/enterprises",
    },
    {
      num: "02",
      title: "Advisory and Consulting",
      desc: "Turn resilience assessments into actionable roadmaps, measurable outcomes, and ongoing improvement programs.",
      href: "/solutions/advisory-consulting",
    },
    {
      num: "03",
      title: "Systems Integrators",
      desc: "Build repeatable assessment, implementation, integration, and managed-service offerings around resilience.",
      href: "/solutions/system-integrators",
    },
    {
      num: "04",
      title: "Managed Service Providers",
      desc: "Scale resilience services, improve margins, and support more customers without linear headcount growth.",
      href: "/solutions/managed-services",
    },
  ],
};

export const FINAL_CTA_CONTENT = {
  eyebrow: "",
  heading: "Don’t Wait for the Next Incident to Test Your Resilience",
  body: "Modern resilience requires continuous visibility, readiness, and action. Recovery plans tested only after failure are no longer enough.",
  primaryCta: {
    label: "Book a demo",
    href: "/demo",
  },
};

export const FOOTER_CONTENT = {
  tagline: "An agentic OS for enterprise Resilience Operations, powered by Agent Mesh™.",
  body: "ResOC unifies business, infrastructure and security to deliver continuous resilience.",
  newsletter: {
    heading: "What The Resilience - Weekly Newsletter",
    subtext: "Subscribe to WTR",
    buttonLabel: "Subscribe",
  },
};
