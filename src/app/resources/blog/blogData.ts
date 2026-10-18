export interface BlogPost {
  id: string;
  slug: string;
  isFeatured: boolean;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  content: string[];
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  image: string;
  readTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "rto-vs-reality-why-immutable-backups-arent-enough",
    isFeatured: true,
    date: "Oct 12, 2026",
    category: "Cyber Resilience",
    title: "RTO vs. Reality: Why Immutable Backups Aren't Enough",
    excerpt:
      "A successful backup does not equal a successful recovery. We explore the critical gap between storage integrity and actual application readiness in modern hybrid environments.",
    authorName: "Tejas Pandit",
    authorRole: "Co-Founder & CEO",
    image: "/images/blog-1.jpg",
    readTime: "6 MIN READ",
    content: [
      "Every morning, enterprise infrastructure teams review their backup dashboards. Green lights flash across Commvault, Veeam, and Rubrik consoles: 100% job completion. Storage immutability policies are locked. Snapshots are cryptographically sealed in S3 Object Lock or Dell DataDomain Retention Lock.",
      "Yet when enterprise recovery exercises are executed—or worse, when active ransomware strikes—the average enterprise takes between 3 to 14 days to fully restore core production applications. How does a 100% successful backup estate yield a multi-day recovery catastrophe?",
      "The answer lies in the fundamental distinction between storage integrity and operational recoverability. A backup job verifies only that bits were copied from point A to point B without transport error. It does not verify that database transaction logs match the application state checkpoint, that encryption keys are available in an isolated recovery enclave, or that IAM service accounts can mount the reconstituted volumes.",
      "To achieve genuine cyber resilience, enterprises must move beyond passive storage metrics. Recoverability must be continuously proven through automated cleanroom validation, dependency mapping across multi-vendor fabrics, and real-time posture drift detection.",
    ],
  },
  {
    id: "post-2",
    slug: "agentic-operations-end-of-manual-runbooks",
    isFeatured: false,
    date: "Sep 28, 2026",
    category: "Engineering",
    title: "Agentic Operations: The End of Manual Runbooks",
    excerpt:
      "How Human-in-the-Loop (HITL) agentic workflows are replacing static recovery runbooks to reduce MTTR by up to 80%.",
    authorName: "Ravi Chitloor",
    authorRole: "Co-Founder & CTO",
    image: "/images/blog-2.jpg",
    readTime: "8 MIN READ",
    content: [
      "When a critical storage node fails or an incident strikes at 2:00 AM, the standard operating procedure at most Global 2000 enterprises is startlingly manual: engineers page on-call architects, locate a 60-page PDF runbook written nine months ago, and manually issue CLI commands across heterogeneous consoles.",
      "By the time the initial diagnostic triage is completed, hours have elapsed. If a junior engineer enters an incorrect syntax or misidentifies a volume snapshot dependency, the incident duration triples.",
      "Agent Mesh™ replaces static documentation with deterministic, Human-in-the-Loop agentic coordination. Specialized operational agents continuously monitor recovery readiness, correlate multi-vendor topology, and synthesize precision remediation plans in seconds.",
      "Crucially, the platform operates on an explicit boundary model: read-only telemetry analysis is completely autonomous, while state-altering infrastructure actions require one-click cryptographic authorization from human operators.",
    ],
  },
  {
    id: "post-3",
    slug: "air-gapped-telemetry-secure-recovery-patterns",
    isFeatured: false,
    date: "Sep 15, 2026",
    category: "Architecture",
    title: "Air-Gapped Telemetry: Secure Recovery Patterns",
    excerpt:
      "Maintaining continuous operational visibility and cryptographic verification without breaching physical network perimeters.",
    authorName: "Marcus Vane",
    authorRole: "Head of Security Architecture",
    image: "/images/blog-3.jpg",
    readTime: "5 MIN READ",
    content: [
      "The fundamental paradox of cyber recovery is that the more isolated and secure a backup vault is, the harder it is to monitor its operational health. Traditional monitoring agents require bi-directional network connectivity—which compromises the air-gap perimeter and creates an ingress vector for attackers.",
      "MeshDefend resolves this architectural challenge through an optical unidirectional diode pattern and local edge telemetry synthesizers.",
      "In air-gapped enclave mode, zero telemetry ever leaves the customer's security boundary. All metric correlation, posture scoring, and anomaly detection execute locally using containerized quantized models running on customer hardware.",
      "The result is verifiable operational visibility across isolated recovery vaults without introducing a single inbound listening port or outbound internet connection.",
    ],
  },
  {
    id: "post-4",
    slug: "silent-recovery-failures-false-green-epidemic",
    isFeatured: false,
    date: "Sep 02, 2026",
    category: "Cyber Resilience",
    title: "Silent Recovery Failures: Eliminating False Greens in Backup Estates",
    excerpt:
      "Why 68% of enterprise backup estates pass daily morning checks while harboring broken mounts, missing encryption keys, and corrupted transaction logs.",
    authorName: "Ravi Chitloor",
    authorRole: "Co-Founder & CTO",
    image: "/images/blog-4.jpg",
    readTime: "7 MIN READ",
    content: [
      "Our analysis of over 14,000 enterprise backup jobs across diverse industry estates revealed a startling reality: nearly 7 in 10 backup configurations that report successful completion harbor latent recovery defects.",
      "These 'false greens' fall into four primary failure classes: volume mount timeouts, missing KMS encryption keys during enclave reconstitution, out-of-sequence database transaction logs, and unverified IAM role delegations.",
      "Because traditional backup software terminates its evaluation the moment bits are written to disk, these errors remain completely invisible until an actual recovery is attempted under live disaster conditions.",
      "By instituting automated cleanroom spin-ups and synthetic application mounting, MeshDefend surfaces these silent recovery failures immediately, allowing infrastructure teams to remediate posture drift before it threatens business continuity.",
    ],
  },
];
