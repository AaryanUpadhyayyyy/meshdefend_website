"use client";

import React, { useEffect, useRef } from "react";
import type { MeshState, TargetCluster } from "./SupportMesh3D";

interface SupportMeshFallbackProps {
  state: MeshState;
  targetCluster: TargetCluster;
  isPaused?: boolean;
}

export function SupportMeshFallback({
  state,
  targetCluster,
  isPaused = false,
}: SupportMeshFallbackProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;

    const CLUSTERS = [
      { name: "Backup", xRatio: 0.25, yRatio: 0.3 },
      { name: "Storage", xRatio: 0.2, yRatio: 0.65 },
      { name: "Business apps", xRatio: 0.75, yRatio: 0.28 },
      { name: "Security", xRatio: 0.8, yRatio: 0.68 },
      { name: "ITSM", xRatio: 0.55, yRatio: 0.8 },
      { name: "Cloud", xRatio: 0.45, yRatio: 0.45 },
    ];

    interface NodeItem {
      x: number;
      y: number;
      cluster: string;
      baseX: number;
      baseY: number;
      radius: number;
    }

    let nodes: NodeItem[] = [];

    const initNodes = () => {
      nodes = [];
      CLUSTERS.forEach((cluster) => {
        const cx = cluster.xRatio * width;
        const cy = cluster.yRatio * height;
        for (let i = 0; i < 7; i++) {
          const angle = (Math.PI * 2 * i) / 7 + i * 0.3;
          const dist = 18 + (i % 3) * 18;
          const nx = cx + Math.cos(angle) * dist;
          const ny = cy + Math.sin(angle) * dist;
          nodes.push({
            x: nx,
            y: ny,
            cluster: cluster.name,
            baseX: nx,
            baseY: ny,
            radius: i === 0 ? 3.8 : 2.2,
          });
        }
      });
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initNodes();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw intra-cluster lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 0.8;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          if (n1.cluster === n2.cluster) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Draw cluster inter-links
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      for (let c = 0; c < CLUSTERS.length; c++) {
        const next = (c + 1) % CLUSTERS.length;
        ctx.beginPath();
        ctx.moveTo(CLUSTERS[c].xRatio * width, CLUSTERS[c].yRatio * height);
        ctx.lineTo(CLUSTERS[next].xRatio * width, CLUSTERS[next].yRatio * height);
        ctx.stroke();
      }

      // Draw nodes
      nodes.forEach((n) => {
        const isTarget = n.cluster === targetCluster;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);

        if (state === "receiving" && isTarget) {
          ctx.fillStyle = "#fd4703";
          ctx.fill();
        } else if (state === "verified" && isTarget) {
          ctx.fillStyle = "#3dbe7a";
          ctx.fill();
          // Small pulse ring
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 8, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(61, 190, 122, 0.5)";
          ctx.stroke();
        } else {
          ctx.fillStyle = isTarget ? "#fefdfd" : "rgba(255, 255, 255, 0.4)";
          ctx.fill();
        }
      });

      // Cluster labels
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
      CLUSTERS.forEach((c) => {
        ctx.fillText(c.name.toUpperCase(), c.xRatio * width - 18, c.yRatio * height - 26);
      });

      if (!isPaused) {
        animId = requestAnimationFrame(render);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [state, targetCluster, isPaused]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}
