/* ─── MeshDefend Content Data ────────────────────────────────────
   All copy, metrics, and navigation structure. 
   Pulled from the brief and user decisions. ────────────────────── */

export const SITE = {
  name: "MeshDefend",
  product: "Resilience Operations Center",
  productShort: "ResOC",
  agentMesh: "Agent Mesh™",
  tagline: "Recovery you can prove. Operations without human error.",
  email: "hello@meshdefend.ai",
  url: "https://www.meshdefend.ai",
} as const;

export const HERO = {
  eyebrow: "Introducing Resilience Operations Center (ResOC)",
  headlines: [
    { line1: "Recovery you can prove.", line2: "Operations without human error." },
    { line1: "Your backups work.", line2: "Can your business recover?" },
  ],
  headlineLine1: "Recovery you can prove.",
  headlineLine2: "Operations without human error.",
  paragraph:
    "An agentic OS for enterprise Resilience Operations, powered by Agent Mesh™. ResOC unifies business, infrastructure and security to deliver continuous resilience.",
  ctaPrimary: "Book a demo",
  ctaSecondary: "See ResOC in action",
  trustRow: [
    "Policy-governed autonomy: human in the loop and human on the loop",
    "Policy-bound",
    "Audit-ready evidence",
  ],
} as const;

export const NAV = {
  platform: {
    label: "Platform",
    groups: [
      {
        title: "Product (What it is)",
        items: [
          { label: "Unified Resilience Observability", href: "/platform/observability" },
          { label: "Backup Operations", href: "/platform/backup-operations" },
          { label: "Incident Resolution", href: "/platform/incident-resolution" },
          { label: "Cyber Resilience", desc: "Resiliency Operations Centre", href: "/platform/cyber-resilience" },
          { label: "Integrations", desc: "Commvault, Veeam, Dell PowerProtect Data Manager, Dell NetWorker, Dell PowerProtect DataDomain, ServiceNow", href: "/platform/integrations" },
        ],
      },
      {
        title: "Platform capabilities (How it is built)",
        items: [
          { label: "Enterprise readiness", desc: "Security (Includes AI also), Scale", href: "/platform/enterprise-readiness" },
          { label: "Deploy", desc: "On-Premises, Cloud, Hybrid, Multi-Cloud", href: "/platform/deploy" },
          { label: "Built for Flexibility", desc: "Bring your own Models, Backup softwares, Storage, Vendor Integration, ITSM Integration", href: "/platform/built-for-flexibility" },
        ],
      },
    ],
  },
  solutions: {
    label: "Solutions",
    items: [
      { label: "System Integrators", href: "/solutions/system-integrators" },
      { label: "Managed Services", href: "/solutions/managed-services" },
      { label: "Advisory / Consulting", href: "/solutions/advisory-consulting" },
      { label: "Enterprises", href: "/solutions/enterprises" },
    ],
  },
  resources: {
    label: "Resources",
    items: [
      { label: "Newsletter", href: "/resources/newsletter" },
      { label: "Podcast", href: "/resources/podcast" },
      { label: "Blog", href: "/resources/blog" },
      { label: "FAQ", href: "/resources/faq" },
    ],
  },
  company: {
    label: "Company",
    items: [
      { label: "About Us", desc: "Mission/Vision, Leadership", href: "/company/about" },
      { label: "Investors & Partners", href: "/company/investors-partners" },
      { label: "Careers", href: "/company/careers" },
      { label: "Newsroom", href: "/company/newsroom" },
      { label: "Contact us", href: "/company/contact" },
    ],
  },
} as const;

/* ─── Dashboard Data ─────────────────────────────────────────────
   All content for the hero dashboard preview.
   Per-tab sidebars: Tab 1 estate, Tab 2 briefs, Tab 3 queue.
   ────────────────────────────────────────────────────────────────── */

interface SidebarItem {
  label: string;
  children?: string[];
  active?: boolean;
  badge?: number;
  muted?: boolean;
}

export const DASHBOARD = {
  statusBar: {
    left: "ResOC · One console · Every vendor",
    chips: ["Auto 5s", "Telemetry stream", "Policy-governed autonomy"],
  },
  tabs: [
    {
      id: "backup-admin",
      label: "BACKUP ADMIN",
      sublabel: "ResOC console, exceptions",
      titleBar: { left: "Exceptions feed", right: "5 consoles · 1 gap" },
    },
    {
      id: "ciso",
      label: "CISO",
      sublabel: "Recovery readiness brief, Monday 08:00",
      titleBar: { left: "Recovery readiness", right: "last 7 days · 14 applications" },
    },
    {
      id: "itsm",
      label: "YOUR ITSM",
      sublabel: "ServiceNow ticket, sample",
      titleBar: { left: "Ticket detail", right: "INC0041892 · P2" },
    },
  ],
  /* Tab 1: Estate sidebar */
  sidebarTab1: {
    org: "Acme · Prod",
    title: "ESTATE",
    items: [
      { label: "Backup", children: ["Commvault", "Veeam", "NetWorker"], active: true },
      { label: "Storage", children: ["DataDomain"] },
      { label: "Applications", badge: 14 },
      { label: "Security" },
      { label: "ITSM" },
      { label: "Cloud" },
    ] as SidebarItem[],
  },
  /* Tab 2: Briefs sidebar */
  sidebarTab2: {
    org: "Acme · Prod",
    title: "BRIEFS",
    items: [
      { label: "Recovery readiness", active: true },
      { label: "Backup coverage" },
      { label: "SLA compliance" },
      { label: "Open gaps" },
      { label: "Weekly summary" },
    ] as SidebarItem[],
  },
  /* Tab 3: Queue sidebar */
  sidebarTab3: {
    org: "Acme · Prod",
    title: "QUEUE",
    items: [
      { label: "INC0041892", active: true, children: ["Recovery test failure"] },
      { label: "INC0041877", children: ["Replication lag alert"] },
      { label: "CHG0019204", children: ["Config restore staged"], muted: true },
    ] as SidebarItem[],
  },
  feed: [
    {
      type: "system" as const,
      text: "Backup job completed 02:00",
      time: "02:00",
    },
    {
      type: "alert" as const,
      text: "Recovery test failed 02:41",
      time: "02:41",
    },
    {
      type: "agent" as const,
      title: "Agent Mesh™",
      rows: [
        { label: "ROOT CAUSE", value: "Config drift on payments-db · restore test failed" },
        { label: "EVIDENCE", value: "backup success · 2 changes since last test · cited" },
        { label: "BLAST RADIUS", value: "payments, ledger, checkout · 3 of 14 applications" },
        { label: "PROPOSED FIX", value: "Restore config snapshot 02:14, re-run restore test · awaiting approval" },
      ],
      chips: ["REQUIRES · BACKUP LEAD", "POLICY · RECOMMEND"],
      actions: { approve: "Approve fix", review: "Review evidence" },
    },
  ],
  feedCaption: "Config drift detected at 02:41 · agent proposed fix · awaiting backup lead approval",
  typing: "Backup lead is typing…",
  footer: "seen before · 2 prior fixes",
  /* Tab 2 CISO: wide readiness bar + 3 small metrics */
  cisoReadiness: [
    { app: "payments-db", tested: false, lastTest: "—" },
    { app: "ledger-svc", tested: true, lastTest: "6h ago" },
    { app: "checkout-api", tested: false, lastTest: "—" },
    { app: "auth-gateway", tested: true, lastTest: "2h ago" },
    { app: "user-profiles", tested: true, lastTest: "12h ago" },
    { app: "order-history", tested: true, lastTest: "4h ago" },
    { app: "notification-svc", tested: true, lastTest: "1h ago" },
    { app: "inventory-mgr", tested: true, lastTest: "8h ago" },
    { app: "analytics-pipe", tested: true, lastTest: "3h ago" },
    { app: "cdn-origin", tested: true, lastTest: "5h ago" },
    { app: "search-index", tested: true, lastTest: "7h ago" },
    { app: "config-store", tested: false, lastTest: "—" },
    { app: "session-cache", tested: true, lastTest: "2h ago" },
    { app: "msg-broker", tested: true, lastTest: "9h ago" },
  ],
  cisoSmallMetrics: [
    { label: "Tested", value: "11", sub: "of 14" },
    { label: "Open gaps", value: "3" },
    { label: "Human-approved", value: "47" },
  ],
  cisoCaption: "3 applications have no recent restore test · payments-db, checkout-api, config-store",
  itsmTicket: {
    number: "INC0041892",
    short: "Recovery test failure — payments-db",
    priority: "P2",
    state: "In Progress",
    workNote: "Agent Mesh™ identified config drift on payments-db after infrastructure change at 01:47. Staged config snapshot restore (02:14) and re-test. Awaiting human approval before execution.",
    change: "CHG0019204 — Staged, awaiting approval",
  },
  itsmCaption: "Agent staged change CHG0019204 · awaiting backup lead approval",
  memory: {
    title: "AGENT MESH™ MEMORY",
    tiles: [
      { label: "Readiness", value: "78%" },
      { label: "Tests / week", value: "23" },
    ],
    items: [
      { id: "MEM-0041", conclusion: "payments-db config drifted after infra change" },
      { id: "MEM-0040", conclusion: "ledger restore validated in 4m 12s" },
      { id: "MEM-0039", conclusion: "checkout dependency on payments-db confirmed" },
      { id: "MEM-0038", conclusion: "Veeam job 1847 completed, no exceptions" },
      { id: "MEM-0037", conclusion: "NetWorker retention policy aligned to SLA" },
      { id: "MEM-0036", conclusion: "DataDomain replication lag within threshold" },
      { id: "MEM-0035", conclusion: "3 applications missing restore test this week" },
      { id: "MEM-0034", conclusion: "ITSM ticket auto-created for prior gap" },
    ],
  },
  auditTicker: [
    "restore test failed · payments-db",
    "agent traced dependency · checkout → payments-db",
    "policy: Recommend · config snapshot restore",
    "fix staged awaiting approval · backup lead",
    "owner: backup lead · SLA: 4h",
  ],
  integrationsTicker: [
    "commvault",
    "veeam",
    "dell powerprotect",
    "networker",
    "servicenow",
    "every action needs approval",
  ],
};

export const TRUST = {
  bannerSrc: "/trust-banner.png",
  bannerAlt: "Backed by Kalaari Capital, Kettleborough VC, Enterprise CXOs and Founders. Partners: Sapta Tunas Teknologi, NVIDIA Inception Program, Microsoft, AWS, OpenAI, Anthropic, Azure AI Foundry, Dell Technologies.",
  partners: [
    "Dell Technologies",
    "HCLTech",
    "IT Simple",
    "Sapta Tunas Teknologi",
    "Microsoft",
    "AWS",
  ],
  backedBy: [
    "Kalaari Capital",
    "Kettleborough VC",
    "Enterprise CXOs and Founders",
  ],
} as const;

export const AGENT_MESH = {
  eyebrow: "POWERED BY AGENT MESH™",
  headline: "The intelligence to act. The discipline to stop.",
  lede: "ResOC is the unified operations center teams use daily; Agent Mesh™ is the autonomous intelligence engine beneath it. It continuously ingests telemetry across vendors, maps Multi-Vendor Cleanroom (MVC) dependencies, and automates remediation with strict Human-in-the-Loop (HITL) and Human-on-the-Loop (HIOL) governance.",
  beats: [
    {
      num: "01",
      title: "Learn",
      badge: "OBSERVES · NO CHANGES",
      desc: "Ingests configurations, backup streams, and storage telemetry across vendors into Agent Mesh memory.",
      meta: "Continuous ingestion · Read-only access · Zero writes",
    },
    {
      num: "02",
      title: "Reason",
      badge: "RECOMMENDS · NO CHANGES",
      desc: "Traces cross-tool dependencies, detects configuration drift, evaluates blast radius, and drafts deterministic remediation.",
      meta: "Context correlation · Deterministic planning · Staged diff",
    },
    {
      num: "03",
      title: "Act",
      badge: "REQUIRES HUMAN APPROVAL",
      desc: "Holds until authorized by designated backup/infrastructure lead. Executes policy-bound changes with an immutable audit hash.",
      meta: "Role-based authorization · Policy guardrails · Attestable proof",
    },
  ],
  /* Hub-and-spoke: Agent Mesh connects to these 5 source systems */
  hubSources: [
    { id: "apps", label: "Business Applications", desc: "Application and business-service context", angle: 270 },
    { id: "backup", label: "Backup Platforms", desc: "Assets, Jobs, Policies, Copies", angle: 198 },
    { id: "storage", label: "Storage Systems", desc: "Capacity, snapshots, replication", angle: 126 },
    { id: "security", label: "Security", desc: "Threat signals, incident context, ransomware indicators", angle: 54 },
    { id: "itsm", label: "ITSM", desc: "Tickets, CMDB, SOPs, knowledge", angle: 342 },
  ],
  /* Agent Mesh delivers these 5 capabilities */
  capabilities: [
    { icon: "search", title: "Unified Observability", desc: "Cross-stack visibility, alerts, deviations" },
    { icon: "shield", title: "Resilience Posture", desc: "Continuous readiness and proactive posture management" },
    { icon: "bot", title: "Agentic Operations", desc: "Guided triage, remediation and Day-2 operations" },
    { icon: "check", title: "Recovery Readiness", desc: "Recovery validation, restoration audits, recovery orchestration" },
    { icon: "file", title: "Attestable Proofs", desc: "Compliance evidence, service-level and board-level reporting" },
  ],
  bottomBanner: [
    { icon: "zap", label: "Reduce Risk" },
    { icon: "users", label: "Recover Faster" },
    { icon: "chart", label: "Enterprise Scale" },
  ],
  pillars: [
    { title: "Resilience Posture", desc: "Identify posture and proactively manage recoverability across multi-vendor estates." },
    { title: "Unified Observability", desc: "Detects, alerts and fixes deviations and failures across backup, storage, cloud, and security." },
    { title: "Agentic Operations", desc: "Reduces repetitive Day-2 work with guided triage, remediation and operations." },
    { title: "Recovery Readiness", desc: "Restoration audits and agentic recovery for MVC — continuous proof that applications can restore." },
    { title: "Attestable Proofs", desc: "Board level compliance reports with cryptographically verifiable audit records." },
  ],
} as const;

export const INSIGHTS = {
  eyebrow: "RESOURCES & DISPATCHES",
  headline: "Operational thinking from the resilience frontier.",
  shelfItems: [
    {
      type: "PODCAST",
      title: "Episode 12: Why Backups Succeed While Recovery Fails",
      desc: "A deep dive with enterprise infrastructure architects into unowned handoff gaps.",
      duration: "34 min",
      href: "/resources/podcast",
    },
    {
      type: "BLOG",
      title: "Configuration Drift: The Silent Killer of Application RTO",
      desc: "How subtle changes in storage mapping invalidate months of successful backup tests.",
      duration: "6 min read",
      href: "/resources/blogs",
    },
    {
      type: "PODCAST",
      title: "Episode 11: The Governance Mandate for Autonomous IT Ops",
      desc: "Designing agentic systems that refuse to act without authenticated human sign-off.",
      duration: "41 min",
      href: "/resources/podcast",
    },
    {
      type: "FIELD NOTES",
      title: "Cross-Vendor Telemetry Normalization in Heterogeneous Estates",
      desc: "Reconciling Commvault, Veeam, NetWorker, and DataDomain data into a single graph.",
      duration: "8 min read",
      href: "/resources/blogs",
    },
  ],
  newsroom: [
    {
      title: "MeshDefend Raises $2.3M Pre-Seed Led by Kalaari Capital to Build ResOC for Enterprise Resilience",
      source: "Tech in Asia",
      date: "2024",
      href: "/company/newsroom",
    },
    {
      title: "Kalaari Capital and Kettleborough Back MeshDefend's Agent Mesh™ Architecture",
      source: "Entrackr",
      date: "2024",
      href: "/company/newsroom",
    },
    {
      title: "How MeshDefend Is Creating the Resilience Operations Center Category",
      source: "Venture Insights",
      date: "2024",
      href: "/company/newsroom",
    },
  ],
} as const;

