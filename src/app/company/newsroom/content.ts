export interface PressReleaseItem {
  id: string;
  title: string;
  date: string;
  url: string;
}

export interface InTheNewsItem {
  id: string;
  title: string;
  date: string;
  publication: string;
  url: string;
}

export interface AwardCardItem {
  id: string;
  title: string;
  description: string;
  badgeSrc: string;
  badgeAlt: string;
  url: string;
}

/* ─── 1. PRESS RELEASES: What MeshDefend Releases as News (9 cards for 3x3 grid) ─── */
export const SAMPLE_PRESS_RELEASES: PressReleaseItem[] = [
  {
    id: "kalaari-seed-funding",
    title: "MeshDefend Secures $2.3M Seed Financing Led by Kalaari Capital to Advance Agentic IT & Data Resilience",
    date: "October 14, 2026",
    url: "https://economictimes.indiatimes.com/tech/funding/ai-enterprise-ops-startup-meshdefend-raises-2-3-million-in-round-led-by-kalaari-capital/articleshow/125111852.cms",
  },
  {
    id: "agent-mesh-launch",
    title: "MeshDefend Unveils Agent Mesh™: The First AI-Native Operating Engine for Autonomous Backup & Recovery",
    date: "September 18, 2026",
    url: "https://mediabrief.com/meshdefend-emerges-from-stealth-with-2-3-million-pre-seed-funding/",
  },
  {
    id: "resilience-report-2026",
    title: "MeshDefend Research Finds 68% of Enterprise Backup Estates Suffer from Undetected Silent Recovery Failures",
    date: "August 25, 2026",
    url: "https://kalaari.com/insights-from-the-fronlines/why-we-invested-in-meshdefend",
  },
  {
    id: "heterogeneous-connectors",
    title: "MeshDefend Expands Heterogeneous Ecosystem with Turnkey AWS, Azure, and Dell Storage Telemetry Connectors",
    date: "July 12, 2026",
    url: "https://www.business-standard.com/companies/start-ups/meshdefend-raises-2-3-million-to-bring-ai-intelligence-to-enterprise-data-125110501583_1.html",
  },
  {
    id: "cleanroom-automation",
    title: "MeshDefend Introduces Autonomous Cleanroom Verification for Instant Enterprise Disaster Recovery Validation",
    date: "May 28, 2026",
    url: "https://www.bwdisrupt.com/article/meshdefend-raises-2-3-mn-in-its-maiden-external-funding-round-578586",
  },
  {
    id: "executive-appointments",
    title: "MeshDefend Expands Global Leadership Team with Senior Enterprise Storage & Resilience Executives",
    date: "March 15, 2026",
    url: "https://indianstartupnews.com/funding/bengaluru-based-meshdefend-raises-23-million-from-kalaari-capital-others-10626680",
  },
  {
    id: "enterprise-compliance",
    title: "MeshDefend Releases Automated DORA and NIS2 Compliance Engine for Critical Infrastructure Data Protection",
    date: "January 20, 2026",
    url: "https://startupstorymedia.com/ai-enterprise-ops-startup-meshdefend-raises-2-3-million-in-pre-seed-round-led-by-kalaari-capital/",
  },
  {
    id: "multi-cloud-resilience",
    title: "MeshDefend Delivers Sub-Second Cross-Cloud Recovery Telemetry Across Distributed Multi-Tenant Environments",
    date: "November 10, 2025",
    url: "https://www.vccircle.com/stackboxmeshdefend-game-state-labs-among-11-start-ups-to-bag-early-funds",
  },
  {
    id: "zero-trust-backup",
    title: "MeshDefend Announces Cryptographic Immutability Validation for Zero-Trust Enterprise Backup Estates",
    date: "August 18, 2025",
    url: "https://kalaari.com/portfolio/mesh-defend",
  },
];

/* ─── 2. IN THE NEWS: Where MeshDefend is Mentioned in the News (6 cards for 3x2 grid) ─── */
export const SAMPLE_IN_THE_NEWS: InTheNewsItem[] = [
  {
    id: "news-economic-times",
    title: "The Economic Times: AI enterprise ops startup MeshDefend raises $2.3 million in round led by Kalaari Capital",
    date: "October 15, 2026",
    publication: "THE ECONOMIC TIMES",
    url: "https://economictimes.indiatimes.com/tech/funding/ai-enterprise-ops-startup-meshdefend-raises-2-3-million-in-round-led-by-kalaari-capital/articleshow/125111852.cms",
  },
  {
    id: "news-business-standard",
    title: "Business Standard: MeshDefend raises $2.3 million to bring AI intelligence to enterprise data",
    date: "October 20, 2026",
    publication: "BUSINESS STANDARD",
    url: "https://www.business-standard.com/companies/start-ups/meshdefend-raises-2-3-million-to-bring-ai-intelligence-to-enterprise-data-125110501583_1.html",
  },
  {
    id: "news-bw-disrupt",
    title: "BW Disrupt: MeshDefend Raises $2.3 Mn In Its Maiden External Funding Round",
    date: "October 16, 2026",
    publication: "BW DISRUPT",
    url: "https://www.bwdisrupt.com/article/meshdefend-raises-2-3-mn-in-its-maiden-external-funding-round-578586",
  },
  {
    id: "news-mediabrief",
    title: "MediaBrief: MeshDefend emerges from stealth with $2.3 million pre-seed funding to pioneer Agent Mesh™",
    date: "October 18, 2026",
    publication: "MEDIABRIEF",
    url: "https://mediabrief.com/meshdefend-emerges-from-stealth-with-2-3-million-pre-seed-funding/",
  },
  {
    id: "news-kalaari-insights",
    title: "Kalaari Capital: Why We Invested in MeshDefend — Autonomous Enterprise Resilience",
    date: "August 28, 2026",
    publication: "KALAARI CAPITAL",
    url: "https://kalaari.com/insights-from-the-fronlines/why-we-invested-in-meshdefend",
  },
  {
    id: "news-indian-startup-news",
    title: "Indian Startup News: Bengaluru-based MeshDefend raises $2.3M from Kalaari Capital & others",
    date: "October 22, 2026",
    publication: "INDIAN STARTUP NEWS",
    url: "https://indianstartupnews.com/funding/bengaluru-based-meshdefend-raises-23-million-from-kalaari-capital-others-10626680",
  },
];

/* ─── 3. AWARDS: Recognized by CII, G2, AI Breakthrough, etc. (6 cards for 3x2 grid) ─── */
export const SAMPLE_AWARDS: AwardCardItem[] = [
  {
    id: "award-cii-2026",
    title: "CII National Award for Excellence in Enterprise AI & Resilience",
    description:
      "Recognized by the Confederation of Indian Industry (CII) for pioneering innovation in autonomous enterprise resilience and Agent Mesh™ for enterprise data estates, as shared by Tejas Pandit.",
    badgeSrc: "/newsroom/cii-award-badge.svg",
    badgeAlt: "CII National Award 2026",
    url: "https://www.linkedin.com/in/tejaspandit1/",
  },
  {
    id: "award-g2-high-performer",
    title: "Summer 2026 G2 High Performer, Incident Management",
    description:
      "G2 recognized MeshDefend as a high performer in the enterprise incident management category, based on customer reviews and satisfaction scores.",
    badgeSrc: "/newsroom/high-performer-summer-2026.svg",
    badgeAlt: "Summer 2026 G2 High Performer",
    url: "https://www.linkedin.com/in/tejaspandit1/",
  },
  {
    id: "award-g2-leader",
    title: "Summer 2026 G2 Leader, AIOps & Data Resilience",
    description:
      "G2 recognized MeshDefend as a leader in autonomous AIOps and enterprise data resilience, based on verified enterprise customer evaluations.",
    badgeSrc: "/newsroom/leader-summer-2026.svg",
    badgeAlt: "Summer 2026 G2 Leader",
    url: "https://www.linkedin.com/in/tejaspandit1/",
  },
  {
    id: "award-ai-breakthrough",
    title: "2026 AI Breakthrough Awards",
    description:
      "MeshDefend was named Best Enterprise AI Infrastructure Platform, recognizing its breakthrough architecture and innovation in autonomous cyber recovery.",
    badgeSrc: "/newsroom/meshdefend-ai-breakthrough-orange.png",
    badgeAlt: "AI Breakthrough Awards",
    url: "https://www.linkedin.com/in/tejaspandit1/",
  },
  {
    id: "award-saas-awards",
    title: "2026 SaaS Awards",
    description:
      "APPEALIE named MeshDefend the IT Management + Operations winner based on customer reviews, product architecture, and enterprise resilience benchmark research.",
    badgeSrc: "/newsroom/APPEALIE-logo.png",
    badgeAlt: "SaaS Awards APPEALIE",
    url: "https://www.linkedin.com/in/tejaspandit1/",
  },
  {
    id: "award-codie",
    title: "2026 SIIA CODiE Awards",
    description:
      "The SIIA CODiE Awards named MeshDefend Agent Mesh™ as Best Enterprise IT Management and Automated Incident Resolution Solution.",
    badgeSrc: "/newsroom/CODIE_logo_black_mark_only.png",
    badgeAlt: "SIIA CODiE Awards",
    url: "https://www.linkedin.com/in/tejaspandit1/",
  },
];
