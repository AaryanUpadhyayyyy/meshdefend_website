"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LogEntry {
  id: string;
  timestamp: string;
  source: string;
  status: "OK" | "SYNC" | "VERIFIED" | "DRIFT" | "AUTONOMOUS";
  message: string;
}

const RAW_LOGS: Omit<LogEntry, "id" | "timestamp">[] = [
  {
    source: "COMMVAULT_AGENT",
    status: "OK",
    message: "Reconciled 1,840 VM snapshot catalogs against Dell DataDomain tier-1 storage.",
  },
  {
    source: "DATADOMAIN_WORM",
    status: "VERIFIED",
    message: "Cryptographic retention immutability lock confirmed. SHA-256 state match: 0x9f8b...21a",
  },
  {
    source: "VEEAM_CONNECTOR",
    status: "SYNC",
    message: "1,210 DB incremental sync completed. Backup window within SLA (42m / 60m threshold).",
  },
  {
    source: "RESILIENCE_GRAPH",
    status: "DRIFT",
    message: "payments-db SLA drift detected. Secondary replication lagging threshold by 3.2 minutes.",
  },
  {
    source: "AGENT_MESH_CORE",
    status: "AUTONOMOUS",
    message: "Root cause isolated: SAN snapshot lock contention. Staging remediation CHG-8912 for operator.",
  },
  {
    source: "AWS_BACKUP_VAULT",
    status: "VERIFIED",
    message: "Cross-region vault policy verified. Air-gap isolation health at 100%.",
  },
  {
    source: "SERVICENOW_ITSM",
    status: "OK",
    message: "Context bundle synchronized with CMDB. Dual-operator authorization gate armed.",
  },
];

export function TelemetryLogs({
  maxRows = 4,
  autoStream = true,
  interval = 3200,
  className = "",
  style = {},
}: {
  maxRows?: number;
  autoStream?: boolean;
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    const staticTimestamps = ["02:14:02.104", "02:14:04.608", "02:14:07.112", "02:14:09.616"];
    return RAW_LOGS.slice(0, maxRows).map((log, i) => ({
      id: `init-${i}`,
      timestamp: staticTimestamps[i % staticTimestamps.length],
      ...log,
    }));
  });

  const nextIdxRef = useRef(maxRows % RAW_LOGS.length);
  const isPausedRef = useRef(false);

  useEffect(() => {
    if (!autoStream) return;

    const timer = setInterval(() => {
      if (isPausedRef.current) return;

      const template = RAW_LOGS[nextIdxRef.current];
      nextIdxRef.current = (nextIdxRef.current + 1) % RAW_LOGS.length;

      const now = new Date();
      const ts = now.toTimeString().split(" ")[0] + "." + String(now.getMilliseconds()).padStart(3, "0");

      const newLog: LogEntry = {
        id: `${Date.now()}-${Math.random()}`,
        timestamp: ts,
        ...template,
      };

      setLogs((prev) => [...prev.slice(1), newLog]);
    }, interval);

    return () => clearInterval(timer);
  }, [autoStream, interval]);

  return (
    <div
      onMouseEnter={() => (isPausedRef.current = true)}
      onMouseLeave={() => (isPausedRef.current = false)}
      className={`telemetry-console ${className}`}
      style={{
        background: "#221f22",
        border: "1px solid rgba(254, 253, 253, 0.1)",
        borderRadius: 4,
        padding: "14px 18px",
        fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
        fontSize: 11.5,
        color: "#fefdfd",
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      {/* Console Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(254, 253, 253, 0.1)",
          paddingBottom: 8,
          marginBottom: 10,
          color: "#a09a9c",
          fontSize: 10.5,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#f45532",
              boxShadow: "0 0 6px rgba(244, 85, 50, 0.8)",
              display: "inline-block",
            }}
          />
          <span style={{ color: "#fefdfd", fontWeight: 600 }}>
            LIVE TELEMETRY // RESILIENCE_FABRIC_L4
          </span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <span>RATE: 2.4k EV/S</span>
          <span style={{ color: "#f45532" }}>STREAM ACTIVE</span>
        </div>
      </div>

      {/* Log Feed */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <AnimatePresence initial={false}>
          {logs.map((log) => {
            const isDrift = log.status === "DRIFT";
            const isAuto = log.status === "AUTONOMOUS";
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 10,
                  lineHeight: 1.5,
                  fontSize: 11,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {/* Timestamp */}
                <span style={{ color: "#a09a9c", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>
                  [{log.timestamp}]
                </span>

                {/* Status chip */}
                <span
                  style={{
                    padding: "1px 5px",
                    borderRadius: 2,
                    fontSize: 9.5,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    flexShrink: 0,
                    background: isDrift
                      ? "rgba(244, 85, 50, 0.2)"
                      : isAuto
                      ? "rgba(254, 253, 253, 0.15)"
                      : "rgba(254, 253, 253, 0.08)",
                    color: isDrift ? "#f45532" : "#fefdfd",
                    border: `1px solid ${
                      isDrift ? "rgba(244, 85, 50, 0.4)" : "rgba(254, 253, 253, 0.12)"
                    }`,
                  }}
                >
                  {log.status}
                </span>

                {/* Source */}
                <span
                  style={{
                    color: "#a09a9c",
                    fontWeight: 500,
                    flexShrink: 0,
                  }}
                >
                  {log.source}:
                </span>

                {/* Message */}
                <span
                  style={{
                    color: isDrift ? "#fefdfd" : "#e5e2e3",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {log.message}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Terminal prompt with blinking cursor */}
      <div
        style={{
          marginTop: 10,
          paddingTop: 8,
          borderTop: "1px solid rgba(254, 253, 253, 0.06)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: "#a09a9c",
          fontSize: 10.5,
        }}
      >
        <span style={{ color: "#f45532", fontWeight: 700 }}>&gt;</span>
        <span>resoc-agent.daemon --stream=verified</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          style={{
            display: "inline-block",
            width: 7,
            height: 12,
            background: "#f45532",
            verticalAlign: "middle",
          }}
        />
      </div>
    </div>
  );
}
