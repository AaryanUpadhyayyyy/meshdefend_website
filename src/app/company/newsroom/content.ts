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

/* ─── 1. PRESS RELEASES: What MeshDefend Releases as News ─── */
export const SAMPLE_PRESS_RELEASES: PressReleaseItem[] = [
  {
    id: "kalaari-seed-funding",
    title: "MeshDefend Secures $2.3M Seed Financing Led by Kalaari Capital to Advance Agentic IT & Data Resilience",
    date: "October 14, 2026",
    url: "https://economictimes.indiatimes.com/tech/funding/ai-enterprise-ops-startup-meshdefend-raises-2-3-million-in-round-led-by-kalaari-capital/articleshow/125111852.cms",
  },
  {
    id: "agent-mesh-launch",
    title: "MeshDefend Emerges from Stealth with Agent Mesh™: Autonomous Operations Engine for Enterprise Data Estates",
    date: "September 18, 2026",
    url: "https://mediabrief.com/meshdefend-emerges-from-stealth-with-2-3-million-pre-seed-funding/",
  },
  {
    id: "resilience-report-2026",
    title: "MeshDefend Architecture Brief: Addressing Silent Recovery Failures and Eliminating False Greens",
    date: "August 25, 2026",
    url: "/platform/cyber-resilience",
  },
  {
    id: "heterogeneous-connectors",
    title: "MeshDefend Expands Heterogeneous Ecosystem with Certified AWS, Azure, and Dell Storage Telemetry Connectors",
    date: "July 12, 2026",
    url: "/platform/integrations",
  },
  {
    id: "cleanroom-automation",
    title: "MeshDefend Introduces Deterministic Cleanroom Verification for Automated Disaster Recovery Validation",
    date: "May 28, 2026",
    url: "/platform/enterprise-readiness",
  },
  {
    id: "leadership-appointments",
    title: "MeshDefend Expands Technical Advisory Board with Enterprise Storage and Infrastructure Veterans",
    date: "March 15, 2026",
    url: "/company/about",
  },
];

/* ─── 2. IN THE NEWS: Independent Coverage ─── */
export const SAMPLE_IN_THE_NEWS: InTheNewsItem[] = [
  {
    id: "news-economic-times",
    title: "The Economic Times: AI enterprise ops startup MeshDefend raises $2.3 million in round led by Kalaari Capital",
    date: "October 14, 2026",
    publication: "THE ECONOMIC TIMES",
    url: "https://economictimes.indiatimes.com/tech/funding/ai-enterprise-ops-startup-meshdefend-raises-2-3-million-in-round-led-by-kalaari-capital/articleshow/125111852.cms",
  },
  {
    id: "news-business-standard",
    title: "Business Standard: MeshDefend raises $2.3 million to bring AI intelligence to enterprise data",
    date: "October 14, 2026",
    publication: "BUSINESS STANDARD",
    url: "https://www.business-standard.com/companies/start-ups/meshdefend-raises-2-3-million-to-bring-ai-intelligence-to-enterprise-data-125110501583_1.html",
  },
  {
    id: "news-bw-disrupt",
    title: "BW Disrupt: MeshDefend Raises $2.3 Mn In Its Maiden External Funding Round",
    date: "October 14, 2026",
    publication: "BW DISRUPT",
    url: "https://www.bwdisrupt.com/article/meshdefend-raises-2-3-mn-in-its-maiden-external-funding-round-578586",
  },
  {
    id: "news-mediabrief",
    title: "MediaBrief: MeshDefend emerges from stealth with $2.3 million pre-seed funding to pioneer Agent Mesh™",
    date: "October 14, 2026",
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
    date: "October 14, 2026",
    publication: "INDIAN STARTUP NEWS",
    url: "https://indianstartupnews.com/funding/bengaluru-based-meshdefend-raises-23-million-from-kalaari-capital-others-10626680",
  },
];
