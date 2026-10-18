import React from "react";

export type IntegrationCategory =
  | "All Integrations"
  | "Protection Engines"
  | "Storage & Infrastructure"
  | "Cloud Environments"
  | "Security Posture"
  | "ITSM & Workflows";

export type IntegrationTier = "GA" | "BETA" | "PLANNED";

export interface IntegrationItem {
  id: string;
  name: string;
  category: Exclude<IntegrationCategory, "All Integrations">;
  badge: string;
  tier: IntegrationTier;
  description: string;
  renderIcon: () => React.ReactNode;
}

export const CATEGORIES: IntegrationCategory[] = [
  "All Integrations",
  "Protection Engines",
  "Storage & Infrastructure",
  "Cloud Environments",
  "Security Posture",
  "ITSM & Workflows",
];

export const INTEGRATIONS_LIST: IntegrationItem[] = [
  // ==========================================
  // PROTECTION ENGINES (6)
  // ==========================================
  {
    id: "commvault",
    name: "Commvault",
    category: "Protection Engines",
    badge: "CATALOG & REST API",
    tier: "GA",
    description: "Read-only ingestion of Commvault Command Center jobs, media agents, and deduplication database catalog telemetry.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 6a6 6 0 1 0 6 6" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "veeam",
    name: "Veeam",
    category: "Protection Engines",
    badge: "VBR ENTERPRISE API",
    tier: "GA",
    description: "Continuous telemetry correlation across Veeam Backup & Replication jobs, SOBR repositories, and instant VM recovery logs.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l7 14L20 4" />
        <path d="M9 4l4 8 4-8" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    id: "dell-ppdm",
    name: "Dell PowerProtect Data Manager",
    category: "Protection Engines",
    badge: "PPDM TELEMETRY",
    tier: "GA",
    description: "Direct API connectivity for VM, Kubernetes, and enterprise database protection policy compliance verification.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
        <circle cx="6" cy="6" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "dell-networker",
    name: "Dell NetWorker",
    category: "Protection Engines",
    badge: "NSR METADATA SYNC",
    tier: "BETA",
    description: "Legacy and enterprise NetWorker index extraction, client save-set verification, and volume recovery status auditing.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="12" cy="18" r="3" />
        <line x1="8.5" y1="7.5" x2="15.5" y2="7.5" />
        <line x1="7.5" y1="8.5" x2="10.5" y2="15.5" />
        <line x1="16.5" y1="8.5" x2="13.5" y2="15.5" />
      </svg>
    ),
  },
  {
    id: "rubrik",
    name: "Rubrik",
    category: "Protection Engines",
    badge: "SECURITY CLOUD API",
    tier: "BETA",
    description: "SLA domain compliance mapping, immutable snapshot verification, and threat anomaly correlation.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="8" height="8" />
        <rect x="13" y="3" width="8" height="8" />
        <rect x="3" y="13" width="8" height="8" />
        <rect x="13" y="13" width="8" height="8" />
        <line x1="7" y1="7" x2="17" y2="17" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    id: "cohesity",
    name: "Cohesity",
    category: "Protection Engines",
    badge: "HELIO PLATFORM API",
    tier: "BETA",
    description: "View and policy tracking across DataProtect clusters with immutable snapshot validation and ransomware detection feeds.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },

  // ==========================================
  // STORAGE & INFRASTRUCTURE (6)
  // ==========================================
  {
    id: "dell-datadomain",
    name: "Dell PowerProtect DataDomain",
    category: "Storage & Infrastructure",
    badge: "DD OS REST / RETENTION LOCK",
    tier: "GA",
    description: "Verification of mtree capacities, deduplication ratios, and compliance-grade Retention Lock immutability timers.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="5" rx="1" />
        <rect x="2" y="10" width="20" height="5" rx="1" />
        <rect x="2" y="16" width="20" height="5" rx="1" />
        <circle cx="6" cy="6.5" r="1" fill="currentColor" />
        <circle cx="6" cy="12.5" r="1" fill="currentColor" />
        <circle cx="6" cy="18.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "pure-storage",
    name: "Pure Storage",
    category: "Storage & Infrastructure",
    badge: "FLASHARRAY SAFEBLOCK",
    tier: "BETA",
    description: "SafeMode snapshot posture telemetry, immutable volume replication, and high-performance recovery indexing.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H6" />
        <path d="M6 13h10a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H6" />
        <line x1="6" y1="3" x2="6" y2="21" />
      </svg>
    ),
  },
  {
    id: "netapp",
    name: "NetApp",
    category: "Storage & Infrastructure",
    badge: "ONTAP REST & SNAPLOCK",
    tier: "BETA",
    description: "SnapLock compliance mode validation, MetroCluster cross-site replication posture, and volume snapshot audits.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h4v16H4z" />
        <path d="M16 4h4v16h-4z" />
        <path d="M8 8h8v4H8z" />
      </svg>
    ),
  },
  {
    id: "vast-data",
    name: "VAST Data",
    category: "Storage & Infrastructure",
    badge: "VAST REST / DASE ARCH",
    tier: "PLANNED",
    description: "Universal storage cluster capacity, element snapshot immutability, and flash-speed recovery throughput indexing.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4l9 16 9-16H3z" />
        <line x1="8" y1="11" x2="16" y2="11" />
      </svg>
    ),
  },
  {
    id: "hitachi-vantara",
    name: "Hitachi Vantara",
    category: "Storage & Infrastructure",
    badge: "VSP / OPS CENTER",
    tier: "PLANNED",
    description: "Enterprise VSP storage array snapshot consistency verification, shadowimage status, and truecopy sync posture.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h6v16H4z" />
        <path d="M14 4h6v16h-6z" />
        <line x1="10" y1="12" x2="14" y2="12" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "hpe",
    name: "HPE",
    category: "Storage & Infrastructure",
    badge: "ALLETRA / STOREONCE API",
    tier: "PLANNED",
    description: "Data Services Cloud Console integration, StoreOnce Catalyst isolation checks, and Alletra snapshot integrity monitoring.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="12" rx="1" />
        <line x1="8" y1="6" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="18" />
      </svg>
    ),
  },

  // ==========================================
  // CLOUD ENVIRONMENTS (3)
  // ==========================================
  {
    id: "aws",
    name: "AWS",
    category: "Cloud Environments",
    badge: "AWS BACKUP & S3 WORM",
    tier: "GA",
    description: "Cross-region AWS Backup policy audits, S3 Object Lock compliance verification, and EBS snapshot lifecycle validation.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14c3 3 8 4 12 2 2-1 4-3 4-3" />
        <path d="M18 13l2 2-3 2" />
        <path d="M7 6l5 5 5-5" />
      </svg>
    ),
  },
  {
    id: "microsoft-azure",
    name: "Microsoft Azure",
    category: "Cloud Environments",
    badge: "AZURE BACKUP & BLOB IMMUTABILITY",
    tier: "BETA",
    description: "Recovery Services vault tracking, Azure Blob immutable storage policy audits, and multi-region replication verification.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18l5-12 5 8 5-10 3 14H3z" />
      </svg>
    ),
  },
  {
    id: "google-cloud",
    name: "Google Cloud",
    category: "Cloud Environments",
    badge: "GCP BUCKET LOCK & DISK SNAPSHOTS",
    tier: "BETA",
    description: "GCS Bucket Lock retention audits, compute engine persistent disk snapshot drift checks, and IAM access logging.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4a8 8 0 0 0-7.8 6.2A6 6 0 0 0 6 20h12a5 5 0 0 0 1-9.9A8 8 0 0 0 12 4z" />
      </svg>
    ),
  },

  // ==========================================
  // SECURITY POSTURE (5)
  // ==========================================
  {
    id: "crowdstrike",
    name: "CrowdStrike",
    category: "Security Posture",
    badge: "FALCON API TELEMETRY",
    tier: "BETA",
    description: "Live endpoint health ingestion, quarantine status correlation with backup targets, and ransomware signal alignment.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12c4-8 14-8 18 0-4 8-14 8-18 0z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 9v6" />
      </svg>
    ),
  },
  {
    id: "palo-alto-networks",
    name: "Palo Alto Networks",
    category: "Security Posture",
    badge: "PAN-OS / CORTEX XSOAR",
    tier: "BETA",
    description: "Security zone isolation triggers, automated network quarantine verification during clean-room recovery orchestration.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
  },
  {
    id: "microsoft-security",
    name: "Microsoft Security",
    category: "Security Posture",
    badge: "DEFENDER & SENTINEL",
    tier: "BETA",
    description: "Ingestion of Defender for Cloud alerts, Sentinel incident triggers, and conditional access token compliance checks.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z" />
        <path d="M12 7v10" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
  {
    id: "check-point",
    name: "Check Point",
    category: "Security Posture",
    badge: "QUANTUM / CLOUDGUARD",
    tier: "PLANNED",
    description: "Security gateway posture tracking, clean-room network policy synchronization, and threat prevention signal ingestion.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: "cisco",
    name: "Cisco",
    category: "Security Posture",
    badge: "SECUREX & ISE TELEMETRY",
    tier: "PLANNED",
    description: "Identity Services Engine policy correlation and network fabric isolation state tracking for rapid incident containment.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="16" x2="4" y2="20" strokeWidth="2.5" />
        <line x1="8" y1="12" x2="8" y2="20" strokeWidth="2.5" />
        <line x1="12" y1="8" x2="12" y2="20" strokeWidth="2.5" />
        <line x1="16" y1="12" x2="16" y2="20" strokeWidth="2.5" />
        <line x1="20" y1="16" x2="20" y2="20" strokeWidth="2.5" />
      </svg>
    ),
  },

  // ==========================================
  // ITSM & WORKFLOWS (1)
  // ==========================================
  {
    id: "servicenow",
    name: "ServiceNow",
    category: "ITSM & Workflows",
    badge: "CMDB & INCIDENT MANAGEMENT",
    tier: "GA",
    description: "Bi-directional CMDB asset relationship synchronization, automated ticket creation, and human-in-the-loop change approvals.",
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v3" />
        <path d="M12 18v3" />
        <path d="M3 12h3" />
        <path d="M18 12h3" />
      </svg>
    ),
  },
];
