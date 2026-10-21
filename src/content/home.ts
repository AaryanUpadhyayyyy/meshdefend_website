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
      light: "/images/anthropic-dark.png",
      dark: "/images/anthropic-light.png",
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
  heading: "The Reality of Business, Data & Cyber Resilience",
  subtext:
    "Modern enterprises face rising recovery uncertainty, growing infrastructure complexity, and operations that struggle to scale.",
  groups: [
    {
      id: "recovery-confidence",
      name: "Recovery Confidence",
      eyebrowPrefix: "RECOVERY CONFIDENCE",
      items: [
        {
          id: "rc-1",
          num: "01",
          title: "Cyber Recovery Lags AI-Driven Attacks",
          desc: "Recovery strategies struggle to match the speed, scale, and complexity of modern cyberattacks.",
        },
        {
          id: "rc-2",
          num: "02",
          title: "Low Recovery Confidence",
          desc: "Teams lack continuous proof that critical workloads can be recovered when needed.",
        },
        {
          id: "rc-3",
          num: "03",
          title: "Unverified Application Recovery",
          desc: "Application-level recovery remains unproven. Successful backups do not prove applications can be restored and operated correctly.",
        },
        {
          id: "rc-4",
          num: "04",
          title: "Unproven RTO/RPO",
          desc: "Recovery objectives often remain assumptions until they are actually tested.",
        },
      ],
    },
    {
      id: "complexity-at-scale",
      name: "Complexity at Scale",
      eyebrowPrefix: "COMPLEXITY AT SCALE",
      items: [
        {
          id: "cs-1",
          num: "01",
          title: "Data and Platform Sprawl",
          desc: "Data and Dependencies span multiple platforms, clouds, and protection vendors.",
        },
        {
          id: "cs-2",
          num: "02",
          title: "Heterogeneous Environments",
          desc: "Multi-cloud, multi-vendor environments are increasingly difficult to operate consistently at scale.",
        },
        {
          id: "cs-3",
          num: "03",
          title: "Siloed Visibility",
          desc: "No single view connects protection health, failures, dependencies, and recovery risk.",
        },
      ],
    },
    {
      id: "operational-friction",
      name: "Operational Friction",
      eyebrowPrefix: "OPERATIONAL FRICTION",
      items: [
        {
          id: "of-1",
          num: "01",
          title: "Fragmented knowledge",
          desc: "Critical expertise is scattered across runbooks, tickets, tools, and specialists.",
        },
        {
          id: "of-2",
          num: "02",
          title: "Slow investigation",
          desc: "Teams manually correlate signals across systems before identifying root cause.",
        },
        {
          id: "of-3",
          num: "03",
          title: "Context-Losing Handoffs",
          desc: "Critical context is lost across L1, L2, L3, and specialist escalations.",
        },
        {
          id: "of-4",
          num: "04",
          title: "Brittle Automation",
          desc: "Scripts and workflows break as infrastructure changes, creating constant maintenance.",
        },
      ],
    },
  ] as PainGroup[],
};

export const SOLUTION_CONTENT = {
  heading: "ResOC: Resilience Operations Center",
  subtext:
    "A Resilience Operations Center that unifies visibility, operations, automation, and recovery across heterogeneous environments.",
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
      metric: "30–50%",
      label: "More Infrastructure Managed",
      detail: "Manage 30–50% more infrastructure with the same team.",
    },
    {
      metric: "Up to 80%",
      label: "Lower MTTR",
      detail:
        "Accelerates investigation, diagnosis, and remediation to restore services faster. Offload repetitive tasks to MeshDefend’s Agent Mesh with HITL/HIOL.",
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
      "Optimize Infrastructure Spend and Costs for resilience.",
      "Lower Cyber Insurance Costs.",
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
      title: "Systems Integrators",
      desc: "Build repeatable assessment, implementation, integration, and managed-service offerings around resilience.",
      href: "/solutions/system-integrators",
    },
    {
      num: "02",
      title: "Managed Service Providers",
      desc: "Scale resilience services, improve margins, and support more customers without linear headcount growth.",
      href: "/solutions/managed-services",
    },
    {
      num: "03",
      title: "Advisory and Consulting",
      desc: "Turn resilience assessments into actionable roadmaps, measurable outcomes, and ongoing improvement programs.",
      href: "/solutions/advisory-consulting",
    },
    {
      num: "04",
      title: "Enterprises",
      desc: "Reduce recovery uncertainty, operational complexity, and risk across large heterogeneous environments.",
      href: "/solutions/enterprises",
    },
  ],
};

export const FINAL_CTA_CONTENT = {
  eyebrow: "CONTINUOUS RESILIENCE",
  heading: "Don’t Wait for the Next Incident to Test Your Resilience",
  body: "Modern resilience requires continuous visibility, readiness, and action. Recovery plans tested only after failure are no longer enough.",
  primaryCta: {
    label: "Book a demo",
    href: "/demo",
  },
  secondaryCta: {
    label: "See ResOC in action",
    href: "/platform/observability",
  },
};

export const FOOTER_CONTENT = {
  tagline: "An agentic OS for enterprise Resilience Operations, powered by Agent Mesh™.",
  body: "ResOC unifies business, infrastructure and security to deliver continuous resilience.",
  newsletter: {
    heading: "Stay informed",
    subtext: "Subscribe to the MeshDefend newsletter.",
    buttonLabel: "Subscribe",
  },
};
