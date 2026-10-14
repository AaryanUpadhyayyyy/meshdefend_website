"use client";

interface BackupStageBeatsProps {
  currentBeat: 1 | 2 | 3;
  activeMorningStep: number;
  onSelectMorningStep: (step: number) => void;
  hoveredMilestone?: number;
  onHoverMilestone?: (milestone: number) => void;
}

const SCOPE_ITEMS = [
  { index: "01", label: "Health", desc: "Job completion status & SLAs across all engines" },
  { index: "02", label: "Exceptions", desc: "Upstream failure & drift correlation" },
  { index: "03", label: "Triage", desc: "Context-assembled root cause diagnostics" },
  { index: "04", label: "Remediation", desc: "Policy-governed corrective actions" },
  { index: "05", label: "Reporting", desc: "Audit-ready operational trace & posture" },
  { index: "06", label: "Recovery Readiness", desc: "Verified restore points & dependencies" },
];

const MORNING_STEPS = [
  { id: 0, label: "07:45 What changed" },
  { id: 1, label: "07:52 What needs attention" },
  { id: 2, label: "08:00 What needs action" },
];

export function BackupStageBeats({
  currentBeat,
  activeMorningStep,
  onSelectMorningStep,
  hoveredMilestone = -1,
  onHoverMilestone,
}: BackupStageBeatsProps) {
  const getBeatState = (beatIndex: 1 | 2 | 3) => {
    if (currentBeat === beatIndex) {
      return {
        opacity: 1,
        pointerEvents: "auto" as const,
        visibility: "visible" as const,
        transform: "translateY(0)",
      };
    }
    if (currentBeat > beatIndex) {
      return {
        opacity: 0,
        pointerEvents: "none" as const,
        visibility: "hidden" as const,
        transform: "translateY(-24px)",
      };
    }
    return {
      opacity: 0,
      pointerEvents: "none" as const,
      visibility: "hidden" as const,
      transform: "translateY(24px)",
    };
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 480,
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ─── BEAT 1: CLARIFY MESHDEFEND'S ROLE (FOLD 1) ─── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          transition: "opacity 380ms cubic-bezier(0.16, 1, 0.3, 1), transform 440ms cubic-bezier(0.16, 1, 0.3, 1)",
          ...getBeatState(1),
        }}
        aria-hidden={currentBeat !== 1}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "var(--muted)",
            textTransform: "uppercase",
            marginBottom: 14,
            fontWeight: 600,
          }}
        >
          FIG. 1 — ONE OPERATIONAL LAYER ACROSS HETEROGENEOUS BACKUP ENGINES
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
            fontSize: "clamp(36px, 3.8vw, 54px)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: "var(--ink)",
            fontWeight: 400,
            margin: "0 0 16px 0",
          }}
        >
          Stop jumping between consoles and second-guessing your recovery readiness.
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body), Inter, sans-serif",
            fontSize: 17,
            fontWeight: 500,
            lineHeight: 1.5,
            color: "var(--ink)",
            margin: "0 0 12px 0",
          }}
        >
          MeshDefend does not replace the backup engines you already trust. It operates the space between them—turning separate job monitors into one governed workflow.
        </p>

        <p
          style={{
            fontFamily: "var(--font-body), Inter, sans-serif",
            fontSize: 14.5,
            lineHeight: 1.6,
            color: "var(--muted)",
            margin: "0 0 20px 0",
          }}
        >
          Bring Commvault, Veeam, Dell PowerProtect Data Manager, and Dell NetWorker into one operational layer covering health, exceptions, triage, remediation, reporting, and recovery readiness.
        </p>

        {/* Linear-Style 6-Item Typographic Scope Index */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: 12,
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "8px 18px",
          }}
          role="region"
          aria-label="Scope milestones"
        >
          {SCOPE_ITEMS.map((item, idx) => {
            const isHovered = hoveredMilestone === idx;

            return (
              <div
                key={item.index}
                onMouseEnter={() => onHoverMilestone?.(idx)}
                onMouseLeave={() => onHoverMilestone?.(-1)}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  padding: "5px 0",
                  cursor: "pointer",
                  transition: "transform 0.18s ease, color 0.18s ease",
                  transform: isHovered ? "translateX(4px)" : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                    fontSize: 10,
                    color: isHovered ? "var(--orange)" : "var(--muted)",
                    fontWeight: 600,
                  }}
                >
                  {item.index}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body), Inter, sans-serif",
                    fontSize: 13,
                    fontWeight: isHovered ? 600 : 500,
                    color: isHovered ? "var(--orange)" : "var(--ink)",
                    transition: "color 0.18s ease",
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── BEAT 2: MORNING OPERATIONS WORKFLOW (FOLD 2) ─── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          transition: "opacity 380ms cubic-bezier(0.16, 1, 0.3, 1), transform 440ms cubic-bezier(0.16, 1, 0.3, 1)",
          ...getBeatState(2),
        }}
        aria-hidden={currentBeat !== 2}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "var(--muted)",
            textTransform: "uppercase",
            marginBottom: 14,
            fontWeight: 600,
          }}
        >
          FIG. 2 — START-OF-DAY OPERATIONAL SEQUENCE
        </div>

        {/* Interactive Segmented Step Selector */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: 3,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 4,
            marginBottom: 18,
            width: "fit-content",
          }}
          role="tablist"
        >
          {MORNING_STEPS.map((s) => {
            const isActive = activeMorningStep === s.id;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectMorningStep(s.id)}
                style={{
                  padding: "6px 12px",
                  background: isActive ? "var(--bg)" : "transparent",
                  border: isActive ? "1px solid var(--border)" : "1px solid transparent",
                  borderRadius: 3,
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: 11,
                  color: isActive ? "var(--orange)" : "var(--muted)",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
            fontSize: "clamp(34px, 3.6vw, 50px)",
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            color: "var(--ink)",
            fontWeight: 400,
            margin: "0 0 14px 0",
          }}
        >
          Know what changed before the first escalation arrives.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body), Inter, sans-serif",
            fontSize: 16.5,
            fontWeight: 500,
            lineHeight: 1.5,
            color: "var(--ink)",
            margin: "0 0 12px 0",
          }}
        >
          Start the morning with a single operational sequence: what changed overnight, what needs attention, and what needs action.
        </p>

        <p
          style={{
            fontFamily: "var(--font-body), Inter, sans-serif",
            fontSize: 14.5,
            lineHeight: 1.6,
            color: "var(--muted)",
            margin: 0,
          }}
        >
          ServiceNow change RFC-88421 modified storage volume mapping on payments-db overnight; Veeam backup duration extended and DataDomain replication lag is trending toward RPO; 1 guided remediation is staged for operator approval.
        </p>
      </div>

      {/* ─── BEAT 3: EXCEPTION-DRIVEN OPERATIONS (FOLD 3) ─── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          transition: "opacity 380ms cubic-bezier(0.16, 1, 0.3, 1), transform 440ms cubic-bezier(0.16, 1, 0.3, 1)",
          ...getBeatState(3),
        }}
        aria-hidden={currentBeat !== 3}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "var(--muted)",
            textTransform: "uppercase",
            marginBottom: 14,
            fontWeight: 600,
          }}
        >
          FIG. 3 — CORRELATED EXCEPTIONS OVER REPETITIVE CHECKING
        </div>

        <div
          style={{
            fontFamily: "var(--font-body), Inter, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "color-mix(in srgb, var(--ink) 70%, transparent)",
            marginBottom: 8,
          }}
        >
          Selective attention over repetitive checking.
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display), "Instrument Serif", Georgia, serif',
            fontSize: "clamp(34px, 3.6vw, 50px)",
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            color: "var(--ink)",
            fontWeight: 400,
            margin: "0 0 14px 0",
          }}
        >
          Your team shouldn’t have to check what’s already working.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body), Inter, sans-serif",
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--muted)",
            margin: "0 0 20px 0",
          }}
        >
          Operators shouldn&apos;t spend mornings verifying routine successful jobs. MeshDefend correlates backup, storage, and infrastructure signals upstream—keeping normal activity quiet and surfacing only the exceptions that require a decision.
        </p>

        {/* Quiet Note at Bottom (No fake metrics) */}
        <div
          style={{
            padding: "12px 16px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderLeft: "2px solid var(--orange)",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)" }} />
          <span
            style={{
              fontFamily: "var(--font-body), Inter, sans-serif",
              fontSize: 13.5,
              color: "var(--ink)",
              fontWeight: 500,
            }}
          >
            Routine overnight jobs stay quiet · 2 correlated exceptions surfaced for action.
          </span>
        </div>
      </div>
    </div>
  );
}
