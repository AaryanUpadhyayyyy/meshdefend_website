"use client";

import { useState } from "react";
import Link from "next/link";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "replace-backup",
    category: "Architecture & Integration",
    question: "Does MeshDefend replace our existing backup software or storage engines?",
    answer: "No. MeshDefend is not another backup target or media agent. MeshDefend operates as an intelligent resilience operations layer above your existing backup software (Veeam, Cohesity, Commvault, Rubrik, Dell, AWS Backup, Azure Backup). It unifies fragmented operational telemetry, reconciles cross-environment asset coverage, detects silent backup failures, and orchestrates incident remediation through your existing vendor APIs.",
  },
  {
    id: "safety-remediation",
    category: "Security & Control",
    question: "Does MeshDefend make autonomous changes without human approval?",
    answer: "No. MeshDefend operates on a strict 'read-only by default, changes only after approval' principle. Telemetry ingestion and policy evaluation are 100% read-only. For active incident triage or remediation actions (such as restarting failed services, clearing snapshot locks, or retrying blocked jobs), ResOC generates deterministic execution plans that require explicit human approval via the console or Slack/Teams, unless your team pre-authorizes specific low-risk runbooks.",
  },
  {
    id: "diff-itsm",
    category: "Architecture & Integration",
    question: "How does MeshDefend differ from monitoring tools like Datadog or ServiceNow?",
    answer: "Generic monitoring tools track infrastructure vitals (CPU, memory, ping) and alert after an outage occurs. ServiceNow manages ticket workflows. MeshDefend understands recovery topology: it cross-references configuration drift, snapshot immutability, RPO/RTO SLAs, dependency maps, and vendor-specific recovery paths. It answers whether an application can actually be restored to a known-clean state right now, not just whether a server is responding to ping.",
  },
  {
    id: "deployment-modes",
    category: "Deployment",
    question: "What deployment options are supported? Can MeshDefend run air-gapped?",
    answer: "MeshDefend supports three enterprise deployment topologies: (1) Sovereign Air-Gapped Mode: 100% on-premises deployment on customer hardware with zero egress and local quantized models. (2) Customer VPC Hybrid Mode: Local telemetry collectors communicate with your private VPC control plane over outbound TLS 443. (3) Multi-Tenant Enterprise SaaS: SOC 2 compliant managed control plane with private agent mesh connectors.",
  },
  {
    id: "ai-privacy",
    category: "Security & Control",
    question: "What AI models power ResOC, and is customer data used for model training?",
    answer: "MeshDefend never uses customer telemetry, incident data, or infrastructure configurations to train generalized or third-party AI models. In Air-Gapped deployments, ResOC runs locally fine-tuned, quantized models directly inside your perimeter with zero internet connectivity. In SaaS/Hybrid mode, enterprise-governed model endpoints (such as private Azure OpenAI or Anthropic VPC endpoints) are utilized under zero-data-retention agreements.",
  },
  {
    id: "recovery-proof",
    category: "Resilience & Recovery",
    question: "How does MeshDefend prove recovery readiness beyond synthetic backup logs?",
    answer: "Over 40% of backup jobs that report 'Success' fail during an actual restore drill due to corrupted deduplication tables, unmounted targets, expired encryption keys, or unbacked-up upstream dependencies. MeshDefend continuously simulates recovery dependencies, validates snapshot integrity cryptographically, checks cross-cloud replica freshness, and validates clean-room sandbox restoration drills without impacting production.",
  },
  {
    id: "permissions",
    category: "Security & Control",
    question: "What permissions does the connector require in our environment?",
    answer: "Initial deployment requires least-privilege, read-only API access to your backup management consoles and cloud provider APIs. No root access, kernel drivers, or production database write credentials are ever requested. If and when automated remediation is enabled, permissions are scoped strictly to specific non-destructive API actions on backup controllers.",
  },
  {
    id: "time-to-value",
    category: "Deployment",
    question: "How long does it take to deploy MeshDefend and see value?",
    answer: "Initial agent mesh connector deployment takes minutes using lightweight containerized agents or API-only connectors. Within the first hour, ResOC discovers your multi-vendor backup topology and flags immediate coverage gaps. Within 48 hours, the platform builds a complete topological model of your enterprise resilience posture and historical SLA trends.",
  },
  {
    id: "sla-mttr",
    category: "Resilience & Recovery",
    question: "What measurable operational impact can our team expect?",
    answer: "Based on enterprise pilot deployments, teams reduce Mean Time to Resolution (MTTR) for backup failures by up to 80% (from an average of ~47 minutes down to ~12 minutes). Operational noise from duplicate alerts is reduced by 70%, and silent unmonitored assets are eliminated before audit deadlines.",
  },
  {
    id: "audit-compliance",
    category: "Security & Control",
    question: "What compliance standards and audit reports does MeshDefend support?",
    answer: "MeshDefend generates verifiable, tamper-evident audit logs for regulatory frameworks including DORA, NIS2, SEC cyber disclosure rules, HIPAA, and ISO 27001. Every policy evaluation, drift detection, and operator approval is cryptographically logged with immutable timestamps.",
  },
];

export function FaqClient() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openItem, setOpenItem] = useState<string | null>("replace-backup");

  const categories = ["All", "Architecture & Integration", "Security & Control", "Deployment", "Resilience & Recovery"];

  const filteredFaqs = activeCategory === "All" 
    ? FAQS 
    : FAQS.filter(f => f.category === activeCategory);

  return (
    <div className="container" style={{ maxWidth: 900, margin: "0 auto", padding: "140px 24px 80px" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--orange)", letterSpacing: "0.08em", marginBottom: 16 }}>
        [ TECHNICAL KNOWLEDGEBASE // FREQUENTLY ASKED QUESTIONS ]
      </div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.1, marginBottom: 20 }}>
        Architecture &amp; Security FAQ
      </h1>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--muted)", lineHeight: 1.6, marginBottom: 36, maxWidth: 680 }}>
        Authoritative answers on multi-vendor backup integration, agent mesh security boundaries, sovereign air-gap operations, and recovery verification.
      </p>

      {/* Filter Pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "8px 16px",
              borderRadius: 4,
              fontSize: 13,
              fontFamily: "var(--font-mono)",
              cursor: "pointer",
              border: activeCategory === cat ? "1px solid var(--orange)" : "1px solid var(--border)",
              backgroundColor: activeCategory === cat ? "var(--surface-raised)" : "transparent",
              color: activeCategory === cat ? "var(--orange)" : "var(--muted)",
              transition: "all 0.15s ease",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 60 }}>
        {filteredFaqs.map((faq) => {
          const isOpen = openItem === faq.id;
          return (
            <div
              key={faq.id}
              style={{
                border: "1px solid var(--border)",
                borderRadius: 4,
                backgroundColor: isOpen ? "var(--surface-raised)" : "transparent",
                transition: "background-color 0.15s ease",
              }}
            >
              <button
                onClick={() => setOpenItem(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  gap: 16,
                  color: "inherit",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {faq.category}
                  </span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500 }}>
                    {faq.question}
                  </span>
                </div>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 18,
                  color: isOpen ? "var(--orange)" : "var(--muted)",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease, color 0.2s ease",
                  lineHeight: 1,
                }}>
                  +
                </span>
              </button>

              {isOpen && (
                <div style={{
                  padding: "0 24px 24px",
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "var(--muted)",
                  borderTop: "1px solid var(--border-subtle)",
                  marginTop: 4,
                  paddingTop: 16,
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div style={{
        padding: "32px",
        border: "1px solid var(--border)",
        backgroundColor: "var(--surface-raised)",
        borderRadius: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 20,
      }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, marginBottom: 6 }}>
            Have a specific architecture or compliance inquiry?
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--muted)", margin: 0 }}>
            Our systems engineering team conducts deep-dive technical reviews with enterprise architects.
          </p>
        </div>
        <Link
          href="/company/contact?intent=arch-review"
          className="btn-primary"
          style={{ padding: "12px 24px", fontSize: 13, textDecoration: "none" }}
        >
          Discuss with Systems Engineer →
        </Link>
      </div>
    </div>
  );
}
