export interface PodcastEpisode {
  id: string;
  episodeNumber: string;
  title: string;
  category: string;
  guest: string;
  date: string;
  duration: string;
  ytId: string;
  thumbnail: string;
  description: string;
  roman?: string;
  discipline?: string;
  binding?: string;
  color?: string;
  foil?: string;
  ink?: string;
  width?: number;
  height?: number;
  depth?: number;
  seed?: number;
}

export const PODCAST_CATEGORIES = [
  "All",
  "Autonomous Operations",
  "Agentic AI",
  "Continuous Posture",
  "Backup & Recovery",
] as const;

export interface LearnHighlight {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const LEARN_HIGHLIGHTS: LearnHighlight[] = [
  {
    id: "autonomous-recovery",
    title: "Isolated Cleanroom Recovery Verification",
    description:
      "Orchestrating deterministic recovery tests in isolated air-gapped enclaves. Verifying data integrity, database consistency, and bootability before an incident forces a live cutover.",
    icon: "/podcast/ransomeware-icon.svg",
  },
  {
    id: "silent-failure",
    title: "Silent Recovery Failure & Telemetry Drift",
    description:
      "Identifying silent corruption, expired encryption certificates, snapshot gaps, and catalog desynchronization across heterogeneous estates before recovery is attempted.",
    icon: "/podcast/threat-icon.svg",
  },
  {
    id: "heterogeneous-cloud",
    title: "Heterogeneous Estate Ingestion & Schema Alignment",
    description:
      "Normalizing disparate backup telemetry across Commvault, Veeam, Dell DataDomain, and AWS snapshots into a single unified resilience model without rip-and-replace.",
    icon: "/podcast/cloud-icon.svg",
  },
  {
    id: "agentic-ai",
    title: "Governed Execution & Authority Gates",
    description:
      "Bridging autonomous agent diagnostic pipelines with strict human-in-the-loop approvals, cryptographically signed playbooks, and immutable audit trails.",
    icon: "/podcast/ai-icon.svg",
  },
  {
    id: "dora-nis2",
    title: "DORA, SEC Rule 17a-4 & Operational Compliance",
    description:
      "Generating cryptographically verifiable recovery evidence, tamper-evident WORM audit chains, and continuous posture reporting for financial and critical infrastructure regulators.",
    icon: "/podcast/cyber-icon.svg",
  },
  {
    id: "executive-leadership",
    title: "The Minimum Viable Company (MVC) Posture",
    description:
      "Architecting prioritized recovery topologies around Tier-0 transactional dependencies, clearing operational bottlenecks to ensure core business survival during total outages.",
    icon: "/podcast/executive-iconvg.svg",
  },
];

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: "ep-01",
    episodeNumber: "01",
    title: "Everyone is talking about AI, here's what no one's saying",
    category: "Autonomous Operations",
    guest: "Tejas Pandit & Technical Leaders",
    date: "September 24, 2026",
    duration: "15 min",
    ytId: "2A46u6gUETc",
    thumbnail: "/images/yt-thumb-2A46u6gUETc.jpg",
    description:
      "A pragmatic dissection of enterprise AI data pipelines, training checkpoint persistence, and the overlooked vulnerability of recovery infrastructure supporting high-density compute clusters.",
  },
  {
    id: "ep-02",
    episodeNumber: "02",
    title: "PT. Sapta Tunas Teknologi X MeshDefend - Episode 2",
    category: "Agentic AI",
    guest: "Tejas Pandit & Felix (STT)",
    date: "September 22, 2026",
    duration: "15 min",
    ytId: "0Nth0uYx5Vk",
    thumbnail: "/images/yt-thumb-0Nth0uYx5Vk.jpg",
    description:
      "Storage engineering in banking environments: architecting automated validation loops across distributed tape, disk, and object repositories without overwhelming secondary storage I/O.",
  },
  {
    id: "ep-03",
    episodeNumber: "03",
    title: "PT. Sapta Tunas Teknologi X MeshDefend - Episode 3",
    category: "Continuous Posture",
    guest: "Tejas Pandit & Infrastructure Panel",
    date: "September 15, 2026",
    duration: "11 min",
    ytId: "P8Pb90RkOUY",
    thumbnail: "/images/yt-thumb-P8Pb90RkOUY.jpg",
    description:
      "The difference between backup completion and verifiable recovery: why successful snapshot logs routinely fail to mount during disaster drills, and how continuous posture testing prevents silent collapse.",
  },
];
