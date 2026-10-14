/**
 * Content Claims Register
 * Status:
 *   - "verified": Approved brand copy, verified partners, or allowed standard claims.
 *   - "verify": Requires factual verification with the company; hidden in production or tagged [VERIFY].
 *   - "illustrative": Synthetic scenario or sample metrics for UI demonstration, visibly labelled.
 */

export interface ClaimEntry {
  id: string;
  claim: string;
  location: string;
  status: "verified" | "verify" | "illustrative";
  category: "metrics" | "governance" | "credentials" | "partners" | "company" | "testimonial";
  notes: string;
  hiddenInProduction?: boolean;
}

export const CLAIMS_REGISTER: ClaimEntry[] = [
  // ─── 1. TESTIMONIALS & METHODOLOGY (Task 1) ───────────────────────
  {
    id: "quote-logging-four-things",
    claim: "I stopped starting the day by logging into four things. — Backup Operations Lead · Financial Services · 3,400 Protected Assets",
    location: "src/components/sections/ImpactSection.tsx",
    status: "verify",
    category: "testimonial",
    notes: "Removed from live site per Content Rules. Unverified customer attribution.",
    hiddenInProduction: true,
  },
  {
    id: "methodology-seven-environments",
    claim: "Measured across seven enterprise customer environments (890–4,100 protected assets each) over 90 days post-deployment. MTTR excludes vendor ticket escalations.",
    location: "src/components/sections/ImpactSection.tsx",
    status: "verify",
    category: "metrics",
    notes: "Removed from live site per Content Rules. Unverified study methodology.",
    hiddenInProduction: true,
  },

  // ─── 2. SOLUTION CONSOLE SCENARIO (Task 2) ────────────────────────
  {
    id: "solution-console-heading",
    claim: "Heading: ENTERPRISE VERIFICATION EVIDENCE",
    location: "src/components/sections/SolutionSection.tsx",
    status: "illustrative",
    category: "metrics",
    notes: "Replaced with 'ILLUSTRATIVE SCENARIO'.",
  },
  {
    id: "solution-console-workloads",
    claim: "4,820 workloads mapped · 0 blind spots",
    location: "src/components/sections/SolutionSection.tsx",
    status: "illustrative",
    category: "metrics",
    notes: "Visibly tagged as illustrative sample scenario.",
  },
  {
    id: "solution-console-coverage",
    claim: "Cross-Stack Coverage: 100%, Platforms Reconciled: 5 Vendors, Telemetry Latency: < 2s",
    location: "src/components/sections/SolutionSection.tsx",
    status: "illustrative",
    category: "metrics",
    notes: "Visibly tagged as illustrative sample data.",
  },
  {
    id: "solution-console-proofpoints",
    claim: "Commvault (1,840 VMs), Veeam (1,210 DBs) & NetWorker unified",
    location: "src/components/sections/SolutionSection.tsx",
    status: "illustrative",
    category: "metrics",
    notes: "Visibly tagged as illustrative sample data.",
  },

  // ─── 3. TRUST CHIPS & FOOTER BADGES (Task 3) ──────────────────────
  {
    id: "trust-chip-zero-write",
    claim: "Zero-Write Read-Only Ingestion",
    location: "src/components/sections/TrustSection.tsx",
    status: "verify",
    category: "credentials",
    notes: "Marked [VERIFY] in code. Hidden in production until verified.",
    hiddenInProduction: true,
  },
  {
    id: "trust-chip-policy-signoff",
    claim: "100% Policy-Governed Human Sign-Off",
    location: "src/components/sections/TrustSection.tsx",
    status: "verify",
    category: "governance",
    notes: "Marked [VERIFY] in code. Hidden in production until verified.",
    hiddenInProduction: true,
  },
  {
    id: "trust-chip-worm-records",
    claim: "Cryptographic WORM Audit Records",
    location: "src/components/sections/TrustSection.tsx",
    status: "verify",
    category: "credentials",
    notes: "Marked [VERIFY] in code. Hidden in production until verified.",
    hiddenInProduction: true,
  },
  {
    id: "trust-chip-cloud-support",
    claim: "Enterprise Cloud & On-Prem Support",
    location: "src/components/sections/TrustSection.tsx",
    status: "verify",
    category: "credentials",
    notes: "Marked [VERIFY] in code. Hidden in production until verified.",
    hiddenInProduction: true,
  },
  {
    id: "footer-badge-soc2",
    claim: "SOC 2 Type II Ready",
    location: "src/components/layout/Footer.tsx",
    status: "verify",
    category: "credentials",
    notes: "Marked [VERIFY] in code. Hidden in production until verified.",
    hiddenInProduction: true,
  },
  {
    id: "footer-badge-runtime-overhead",
    claim: "Zero Runtime Overhead",
    location: "src/components/layout/Footer.tsx",
    status: "verify",
    category: "credentials",
    notes: "Marked [VERIFY] in code. Hidden in production until verified.",
    hiddenInProduction: true,
  },
  {
    id: "footer-badge-approval-gate",
    claim: "Human Approval Gate",
    location: "src/components/layout/Footer.tsx",
    status: "verify",
    category: "governance",
    notes: "Marked [VERIFY] in code. Hidden in production until verified.",
    hiddenInProduction: true,
  },
  {
    id: "footer-badge-multicloud",
    claim: "Multi-Cloud & On-Prem",
    location: "src/components/layout/Footer.tsx",
    status: "verify",
    category: "credentials",
    notes: "Marked [VERIFY] in code. Hidden in production until verified.",
    hiddenInProduction: true,
  },

  // ─── 4. GOVERNANCE MANDATE (Task 4) ───────────────────────────────
  {
    id: "gov-policy-autonomy",
    claim: "policy-governed autonomy: human in the loop and human on the loop",
    location: "Universal across Hero, Pain, Solution, AgentMesh, FinalCTA, and Content",
    status: "verified",
    category: "governance",
    notes: "Mandatory replacement for 'human approval on every action' and '100% policy-enforced human approval'.",
  },

  // ─── 5. PARTNERS & BACKING (Task 5) ───────────────────────────────
  {
    id: "partners-backed-by",
    claim: "Backed by Kalaari Capital, Kettleborough VC, Enterprise CXOs and Founders. Partners: Dell Technologies, HCLTech, IT Simple, Sapta Tunas Teknologi, Microsoft, AWS.",
    location: "src/components/sections/TrustSection.tsx",
    status: "verified",
    category: "partners",
    notes: "Converted to SVG logos / placeholder boxes with required trademark footnote.",
  },

  // ─── 6. IMPACT STATS (Task 6) ─────────────────────────────────────
  {
    id: "stat-infrastructure-managed",
    claim: "30–50% more infrastructure managed with the same team",
    location: "src/lib/sections.ts, src/components/sections/ImpactSection.tsx",
    status: "verified",
    category: "metrics",
    notes: "Explicitly kept visible on the live site per Task 6.",
  },
  {
    id: "stat-mttr-reduction",
    claim: "Up to 80% lower MTTR",
    location: "src/lib/sections.ts, src/components/sections/ImpactSection.tsx",
    status: "verify",
    category: "metrics",
    notes: "Marked [VERIFY] in code; hidden in production until verified.",
    hiddenInProduction: true,
  },
  {
    id: "stat-handoff-effort",
    claim: "Up to 60% less handoff effort",
    location: "src/lib/sections.ts, src/components/sections/ImpactSection.tsx",
    status: "verify",
    category: "metrics",
    notes: "Marked [VERIFY] in code; hidden in production until verified.",
    hiddenInProduction: true,
  },

  // ─── 7. WHY TRUST US (Task 7) ─────────────────────────────────────
  {
    id: "trust-funding",
    claim: "$2.3M pre-seed led by Kalaari Capital (press coverage: ET Tech, YourStory, Business Standard)",
    location: "src/components/sections/TrustSection.tsx",
    status: "verify",
    category: "company",
    notes: "Fact marked [VERIFY WITH COMPANY] on live site.",
  },
  {
    id: "trust-founders",
    claim: "Founders with 35+ years in data protection, storage and cyber resilience (Data Domain, EMC, Dell Tech)",
    location: "src/components/sections/TrustSection.tsx",
    status: "verify",
    category: "company",
    notes: "Fact marked [VERIFY WITH COMPANY] on live site.",
  },
  {
    id: "trust-products-built",
    claim: "4 enterprise products built",
    location: "src/components/sections/TrustSection.tsx",
    status: "verify",
    category: "company",
    notes: "Fact marked [VERIFY WITH COMPANY] on live site.",
  },
  {
    id: "trust-patents-trademarks",
    claim: "9 patents and 3 trademarks",
    location: "src/components/sections/TrustSection.tsx",
    status: "verify",
    category: "company",
    notes: "Fact marked [VERIFY WITH COMPANY] on live site.",
  },

  // ─── 8. FOOTER ITEMS (Task 8) ─────────────────────────────────────
  {
    id: "footer-legal-entity",
    claim: "MeshDefend Inc.",
    location: "src/components/layout/Footer.tsx",
    status: "verify",
    category: "company",
    notes: "Legal entity name marked [VERIFY] in code.",
  },
  {
    id: "footer-we-are-hiring",
    claim: "We are hiring badge",
    location: "src/components/layout/Footer.tsx",
    status: "verify",
    category: "company",
    notes: "Hiring status marked [VERIFY] in code.",
  },
  {
    id: "footer-status-page",
    claim: "https://status.meshdefend.ai",
    location: "src/components/layout/Footer.tsx",
    status: "verify",
    category: "credentials",
    notes: "Status sub-domain marked [VERIFY] in code.",
  },
];
