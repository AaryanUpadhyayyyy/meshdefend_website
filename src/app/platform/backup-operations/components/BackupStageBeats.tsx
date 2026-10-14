"use client";

interface BackupStageBeatsProps {
  currentBeat: 1 | 2 | 3;
  activeMorningStep: number;
  onSelectMorningStep: (step: number) => void;
}

const SCOPE_CHIPS = [
  "Health",
  "Exceptions",
  "Triage",
  "Remediation",
  "Reporting",
  "Recovery Readiness",
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
}: BackupStageBeatsProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 460,
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
          opacity: currentBeat === 1 ? 1 : 0,
          pointerEvents: currentBeat === 1 ? "auto" : "none",
          transform: currentBeat === 1 ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 0.28s ease, transform 0.28s ease",
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
            marginBottom: 16,
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
            margin: "0 0 14px 0",
          }}
        >
          MeshDefend does not replace the backup engines you already trust. It operates the space between them—turning separate job monitors into one governed workflow.
        </p>

        <p
          style={{
            fontFamily: "var(--font-body), Inter, sans-serif",
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--muted)",
            margin: "0 0 24px 0",
          }}
        >
          Bring Commvault, Veeam, Dell PowerProtect Data Manager, and Dell NetWorker into one operational layer covering health, exceptions, triage, remediation, reporting, and recovery readiness.
        </p>

        {/* 6 Clean Hairline Chips Matching Sitemap Row 7 Verbatim */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
          }}
        >
          {SCOPE_CHIPS.map((chip, idx) => (
            <div
              key={chip}
              style={{
                padding: "8px 12px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 3,
                fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                fontSize: 11,
                color: idx === 1 ? "var(--orange)" : "var(--ink)",
                fontWeight: 600,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {chip}
            </div>
          ))}
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
          opacity: currentBeat === 2 ? 1 : 0,
          pointerEvents: currentBeat === 2 ? "auto" : "none",
          transform: currentBeat === 2 ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 0.28s ease, transform 0.28s ease",
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
            marginBottom: 16,
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
            marginBottom: 20,
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
            margin: "0 0 14px 0",
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
          opacity: currentBeat === 3 ? 1 : 0,
          pointerEvents: currentBeat === 3 ? "auto" : "none",
          transform: currentBeat === 3 ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 0.28s ease, transform 0.28s ease",
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
            marginBottom: 16,
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
            marginBottom: 10,
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
            margin: "0 0 16px 0",
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
            margin: "0 0 24px 0",
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
