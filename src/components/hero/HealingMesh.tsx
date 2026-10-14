"use client";

import { useEffect, useRef, useState } from "react";
import { useHeroState } from "@/lib/heroState";

interface ClusterNode {
  id: string;
  cluster: "Backup" | "Storage" | "Apps" | "Security" | "ITSM" | "Cloud";
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  isTarget?: boolean;
}

interface ChevronAgent {
  x: number;
  y: number;
  fromCluster: number;
  toCluster: number;
  progress: number;
  speed: number;
  rotation: number;
}

export function HealingMesh() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasFarRef = useRef<HTMLCanvasElement>(null);
  const canvasNearRef = useRef<HTMLCanvasElement>(null);
  const { state } = useHeroState();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvasFar = canvasFarRef.current;
    const canvasNear = canvasNearRef.current;
    if (!container || !canvasFar || !canvasNear) return;

    const ctxFar = canvasFar.getContext("2d");
    const ctxNear = canvasNear.getContext("2d");
    if (!ctxFar || !ctxNear) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    let isVisible = true;

    // IntersectionObserver to pause rendering when offscreen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    // 6 loose cluster center coordinates (percentages of canvas)
    const CLUSTERS = [
      { name: "Backup" as const, cx: 0.16, cy: 0.28 },
      { name: "Storage" as const, cx: 0.12, cy: 0.62 },
      { name: "Apps" as const, cx: 0.82, cy: 0.22, isTargetCluster: true }, // Upper Right target cluster
      { name: "Security" as const, cx: 0.88, cy: 0.58 },
      { name: "ITSM" as const, cx: 0.68, cy: 0.82 },
      { name: "Cloud" as const, cx: 0.38, cy: 0.78 },
    ];

    let nodesFar: ClusterNode[] = [];
    let nodesNear: ClusterNode[] = [];
    let agents: ChevronAgent[] = [];

    const initNodes = () => {
      nodesFar = [];
      nodesNear = [];
      agents = [];

      const isMobile = width < 768;
      const countPerCluster = isMobile ? 4 : 8; // Max 48-60 nodes total (within 80 node budget)

      CLUSTERS.forEach((cluster, cIdx) => {
        const clusterX = cluster.cx * width;
        const clusterY = cluster.cy * height;
        const clusterRadius = isMobile ? 45 : 75;

        // Generate nodes per cluster
        for (let i = 0; i < countPerCluster; i++) {
          const angle = (Math.PI * 2 * i) / countPerCluster + Math.random() * 0.4;
          const dist = 20 + Math.random() * clusterRadius;
          const x = clusterX + Math.cos(angle) * dist;
          const y = clusterY + Math.sin(angle) * dist;

          const isTargetNode = cluster.isTargetCluster && i === 0;

          // Far layer nodes
          nodesFar.push({
            id: `far-${cIdx}-${i}`,
            cluster: cluster.name,
            x: x + (Math.random() - 0.5) * 30,
            y: y + (Math.random() - 0.5) * 30,
            baseX: x,
            baseY: y,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            radius: 2,
          });

          // Near layer nodes
          nodesNear.push({
            id: `near-${cIdx}-${i}`,
            cluster: cluster.name,
            x,
            y,
            baseX: x,
            baseY: y,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            radius: isTargetNode ? 4.5 : 2.5,
            isTarget: isTargetNode,
          });
        }
      });

      // Spawn traveling chevron agents along cluster links
      const agentCount = isMobile ? 3 : 6;
      for (let a = 0; a < agentCount; a++) {
        const fromC = Math.floor(Math.random() * CLUSTERS.length);
        const toC = (fromC + 1 + Math.floor(Math.random() * (CLUSTERS.length - 1))) % CLUSTERS.length;
        agents.push({
          x: CLUSTERS[fromC].cx * width,
          y: CLUSTERS[fromC].cy * height,
          fromCluster: fromC,
          toCluster: toC,
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.004,
          rotation: 0,
        });
      }
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      [canvasFar, canvasNear].forEach((c) => {
        c.width = width * dpr;
        c.height = height * dpr;
        c.style.width = `${width}px`;
        c.style.height = `${height}px`;
      });

      ctxFar.setTransform(1, 0, 0, 1, 0, 0);
      ctxFar.scale(dpr, dpr);
      ctxNear.setTransform(1, 0, 0, 1, 0, 0);
      ctxNear.scale(dpr, dpr);

      initNodes();
    };

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctxFar.clearRect(0, 0, width, height);
      ctxNear.clearRect(0, 0, width, height);

      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      const inkColor = isDark ? "254, 253, 253" : "34, 31, 34";
      const orangeColor = "244, 85, 50";

      // ─── 1. RENDER FAR LAYER (blurred, ~6% opacity) ───
      ctxFar.strokeStyle = `rgba(${inkColor}, 0.06)`;
      ctxFar.lineWidth = 0.7;

      for (let i = 0; i < nodesFar.length; i++) {
        const n = nodesFar[i];
        if (!reducedMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (Math.hypot(n.x - n.baseX, n.y - n.baseY) > 20) {
            n.vx *= -1;
            n.vy *= -1;
          }
        }

        // Draw sparse hairlines within cluster
        for (let j = i + 1; j < nodesFar.length; j++) {
          const nb = nodesFar[j];
          if (n.cluster === nb.cluster && Math.hypot(n.x - nb.x, n.y - nb.y) < 85) {
            ctxFar.beginPath();
            ctxFar.moveTo(n.x, n.y);
            ctxFar.lineTo(nb.x, nb.y);
            ctxFar.stroke();
          }
        }
      }

      // ─── 2. RENDER NEAR LAYER (crisp, ~14% opacity) ───
      ctxNear.strokeStyle = `rgba(${inkColor}, 0.14)`;
      ctxNear.lineWidth = 1;

      // Draw cluster inter-links (soft curves between clusters, not triangulated)
      for (let c = 0; c < CLUSTERS.length; c++) {
        const nextC = (c + 1) % CLUSTERS.length;
        const c1 = CLUSTERS[c];
        const c2 = CLUSTERS[nextC];
        const x1 = c1.cx * width;
        const y1 = c1.cy * height;
        const x2 = c2.cx * width;
        const y2 = c2.cy * height;
        const midX = (x1 + x2) / 2 + (c % 2 === 0 ? 30 : -30);
        const midY = (y1 + y2) / 2 + (c % 2 === 0 ? -25 : 25);

        ctxNear.beginPath();
        ctxNear.moveTo(x1, y1);
        ctxNear.quadraticCurveTo(midX, midY, x2, y2);
        ctxNear.strokeStyle = `rgba(${inkColor}, 0.09)`;
        ctxNear.stroke();
      }

      // Find target node in upper right (payments-db in Apps cluster)
      const targetNode = nodesNear.find((n) => n.isTarget);

      // Draw near nodes and intra-cluster connections
      for (let i = 0; i < nodesNear.length; i++) {
        const n = nodesNear[i];
        if (!reducedMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (Math.hypot(n.x - n.baseX, n.y - n.baseY) > 16) {
            n.vx *= -1;
            n.vy *= -1;
          }
        }

        for (let j = i + 1; j < nodesNear.length; j++) {
          const nb = nodesNear[j];
          const dist = Math.hypot(n.x - nb.x, n.y - nb.y);
          if (n.cluster === nb.cluster && dist < 95) {
            ctxNear.beginPath();
            ctxNear.moveTo(n.x, n.y);
            ctxNear.lineTo(nb.x, nb.y);

            // In failed/proposed states, lines around target node turn orange and snap
            if (
              (state === "failed" || state === "proposed") &&
              (n.isTarget || nb.isTarget)
            ) {
              ctxNear.strokeStyle = `rgba(${orangeColor}, 0.6)`;
              ctxNear.lineWidth = 1.4;
            } else {
              ctxNear.strokeStyle = `rgba(${inkColor}, 0.14)`;
              ctxNear.lineWidth = 0.8;
            }
            ctxNear.stroke();
          }
        }

        // Draw node point
        ctxNear.beginPath();
        ctxNear.arc(n.x, n.y, n.radius, 0, Math.PI * 2);

        if (n.isTarget) {
          // TARGET NODE STATE MACHINE BEHAVIOR
          if (state === "failed") {
            ctxNear.fillStyle = `rgb(${orangeColor})`;
            ctxNear.fill();
            // Pulse ring
            ctxNear.beginPath();
            ctxNear.arc(n.x, n.y, 14, 0, Math.PI * 2);
            ctxNear.strokeStyle = `rgba(${orangeColor}, 0.4)`;
            ctxNear.stroke();
          } else if (state === "proposed") {
            ctxNear.fillStyle = `rgb(${orangeColor})`;
            ctxNear.fill();
            // Proposed badge
            ctxNear.font = "10px 'JetBrains Mono', monospace";
            ctxNear.fillStyle = `rgb(${orangeColor})`;
            ctxNear.fillText("PROPOSED FIX", n.x + 12, n.y - 6);
          } else if (state === "approved") {
            ctxNear.fillStyle = isDark ? "#fefdfd" : "#221f22";
            ctxNear.fill();
            ctxNear.font = "10px 'JetBrains Mono', monospace";
            ctxNear.fillStyle = `rgb(${orangeColor})`;
            ctxNear.fillText("REPAIRING...", n.x + 12, n.y - 6);
          } else if (state === "verified") {
            // Solid ink node with check and VERIFIED badge
            ctxNear.fillStyle = isDark ? "#fefdfd" : "#221f22";
            ctxNear.fill();
            ctxNear.font = "10px 'JetBrains Mono', monospace";
            ctxNear.fillStyle = isDark ? "#fefdfd" : "#221f22";
            ctxNear.fillText("✓ VERIFIED", n.x + 12, n.y - 6);
          } else {
            // Idle
            ctxNear.fillStyle = `rgba(${inkColor}, 0.5)`;
            ctxNear.fill();
          }
        } else {
          ctxNear.fillStyle = `rgba(${inkColor}, 0.35)`;
          ctxNear.fill();
        }
      }

      // Draw Cluster Labels
      ctxNear.font = "9.5px 'JetBrains Mono', monospace";
      ctxNear.fillStyle = `rgba(${inkColor}, 0.45)`;
      CLUSTERS.forEach((c) => {
        ctxNear.fillText(c.name.toUpperCase(), c.cx * width - 16, c.cy * height - 34);
      });

      // ─── 3. DOTTED ORANGE LINE TO DASHBOARD (In failed/proposed state) ───
      if ((state === "failed" || state === "proposed") && targetNode) {
        ctxNear.save();
        ctxNear.setLineDash([4, 4]);
        ctxNear.strokeStyle = `rgba(${orangeColor}, 0.55)`;
        ctxNear.lineWidth = 1.2;
        ctxNear.beginPath();
        ctxNear.moveTo(targetNode.x, targetNode.y);

        // Connect down toward dashboard center-right failure location
        const dashTargetX = width * 0.55;
        const dashTargetY = height * 0.72;
        ctxNear.quadraticCurveTo(width * 0.75, height * 0.48, dashTargetX, dashTargetY);
        ctxNear.stroke();
        ctxNear.restore();
      }

      // ─── 4. CHEVRON AGENTS TRAVELING ON NEAR LAYER ───
      agents.forEach((agent) => {
        if (!reducedMotion) {
          // If in failed/proposed state, agents converge toward target cluster
          if ((state === "failed" || state === "proposed") && targetNode) {
            const dx = targetNode.x - agent.x;
            const dy = targetNode.y - agent.y;
            const dist = Math.hypot(dx, dy);
            if (dist > 30) {
              agent.x += (dx / dist) * 1.5;
              agent.y += (dy / dist) * 1.5;
              agent.rotation = Math.atan2(dy, dx);
            }
          } else {
            agent.progress += agent.speed;
            if (agent.progress >= 1) {
              agent.progress = 0;
              agent.fromCluster = agent.toCluster;
              agent.toCluster = (agent.toCluster + 1 + Math.floor(Math.random() * 3)) % CLUSTERS.length;
            }

            const c1 = CLUSTERS[agent.fromCluster];
            const c2 = CLUSTERS[agent.toCluster];
            const x1 = c1.cx * width;
            const y1 = c1.cy * height;
            const x2 = c2.cx * width;
            const y2 = c2.cy * height;

            const prevX = agent.x;
            const prevY = agent.y;
            agent.x = x1 + (x2 - x1) * agent.progress;
            agent.y = y1 + (y2 - y1) * agent.progress;
            agent.rotation = Math.atan2(agent.y - prevY, agent.x - prevX);
          }
        }

        // Draw Chevron Agent (Logo chevron shape, 13px)
        ctxNear.save();
        ctxNear.translate(agent.x, agent.y);
        ctxNear.rotate(agent.rotation);

        ctxNear.beginPath();
        ctxNear.moveTo(6, 0);
        ctxNear.lineTo(-5, -4.5);
        ctxNear.lineTo(-2, 0);
        ctxNear.lineTo(-5, 4.5);
        ctxNear.closePath();
        ctxNear.fillStyle = `rgb(${orangeColor})`;
        ctxNear.fill();

        ctxNear.restore();
      });

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [state, reducedMotion]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* ─── LAYER 1: SOFT FOG LAYER ─── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle 600px at 80% 25%, rgba(244, 85, 50, 0.04) 0%, transparent 70%),
            radial-gradient(circle 500px at 20% 40%, rgba(34, 31, 34, 0.03) 0%, transparent 60%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* ─── LAYER 2: FAR MESH CANVAS (Blurred, ~6% opacity) ─── */}
      <canvas
        ref={canvasFarRef}
        style={{
          position: "absolute",
          inset: 0,
          filter: "blur(3.5px)",
          opacity: 0.8,
        }}
      />

      {/* ─── LAYER 3: NEAR MESH CANVAS (Crisp, ~14% opacity) ─── */}
      <canvas
        ref={canvasNearRef}
        style={{
          position: "absolute",
          inset: 0,
        }}
      />

      {/* Bottom Gradient Fade — connects seamlessly into page, never a hard cut */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 180,
          background: "linear-gradient(to bottom, transparent, var(--bg))",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
