"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  nx: number;
  ny: number;
  nz: number;
  fresnel: number;
  baseAlpha: number;
  size: number;
}

interface DustParticle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  alpha: number;
}

/**
 * Procedurally samples points on the surface of the Agent Mesh humanoid bust
 * with analytical normals for Fresnel silhouette rim-lighting.
 */
function generateBustPoints(count: number): Point3D[] {
  const points: Point3D[] = [];

  // 1. Head (Superellipsoid with anatomical jaw taper) — 65% of points
  const headCount = Math.floor(count * 0.65);
  const headRx = 88;
  const headRy = 118;
  const headRz = 94;

  for (let i = 0; i < headCount; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0) - Math.PI / 2.0;

    let rx = headRx;
    let rz = headRz;
    if (phi < 0) {
      const taper = 1.0 + 0.32 * Math.sin(phi);
      rx *= taper;
      rz *= taper;
    }

    let px = rx * Math.cos(phi) * Math.sin(theta);
    let py = headRy * Math.sin(phi) + 68;
    let pz = rz * Math.cos(phi) * Math.cos(theta);

    if (py > 68) {
      px *= 1.02;
      pz *= 1.04;
    }

    const nx = px / (rx * rx);
    const ny = (py - 68) / (headRy * headRy);
    const nz = pz / (rz * rz);
    const len = Math.hypot(nx, ny, nz) || 1;
    const nnx = nx / len;
    const nny = ny / len;
    const nnz = nz / len;

    const fresnel = Math.pow(1.0 - Math.min(1.0, Math.abs(nnz)), 2.2);
    const jitter = (Math.random() - 0.5) * 2.0;
    px += nnx * jitter;
    py += nny * jitter;
    pz += nnz * jitter;

    const baseAlpha = 0.12 + fresnel * 0.88;
    const size = fresnel > 0.65 ? 1.9 : 1.25;

    points.push({
      x: px,
      y: py,
      z: pz,
      nx: nnx,
      ny: nny,
      nz: nnz,
      fresnel,
      baseAlpha,
      size,
    });
  }

  // 2. Neck (Tapered Cylinder) — 12% of points
  const neckCount = Math.floor(count * 0.12);
  for (let i = 0; i < neckCount; i++) {
    const t = Math.random();
    const py = -8 - t * 62;
    const rNeck = 42 + t * 8;
    const theta = Math.random() * 2.0 * Math.PI;

    const px = rNeck * Math.sin(theta);
    const pz = (rNeck * 0.92) * Math.cos(theta);

    const nnx = Math.sin(theta);
    const nny = 0.1;
    const nnz = Math.cos(theta);
    const fresnel = Math.pow(1.0 - Math.min(1.0, Math.abs(nnz)), 2.0);
    const baseAlpha = 0.12 + fresnel * 0.86;

    points.push({
      x: px,
      y: py,
      z: pz,
      nx: nnx,
      ny: nny,
      nz: nnz,
      fresnel,
      baseAlpha,
      size: fresnel > 0.6 ? 1.8 : 1.25,
    });
  }

  // 3. Shoulders / Trapezius — 23% of points
  const shoulderCount = count - headCount - neckCount;
  for (let i = 0; i < shoulderCount; i++) {
    const t = Math.random();
    const py = -70 - t * 135;
    const theta = Math.random() * 2.0 * Math.PI;

    const spreadX = 48 + Math.pow(t, 1.15) * 230;
    const spreadZ = 38 + t * 44;

    const px = spreadX * Math.sin(theta);
    const pz = spreadZ * Math.cos(theta);

    const nnx = Math.sin(theta) * 0.9;
    const nny = -0.35;
    const nnz = Math.cos(theta) * 0.8;
    const len = Math.hypot(nnx, nny, nnz) || 1;
    const fresnel = Math.pow(1.0 - Math.min(1.0, Math.abs(nnz / len)), 1.9);
    const baseAlpha = 0.1 + fresnel * 0.86;

    points.push({
      x: px,
      y: py,
      z: pz,
      nx: nnx / len,
      ny: nny / len,
      nz: nnz / len,
      fresnel,
      baseAlpha,
      size: fresnel > 0.65 ? 1.9 : 1.25,
    });
  }

  return points;
}

function generateDust(count: number, width: number, height: number): DustParticle[] {
  const dust: DustParticle[] = [];
  for (let i = 0; i < count; i++) {
    const z = (Math.random() - 0.5) * 360;
    const isForeground = z > 50;
    dust.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z,
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16 - 0.04,
      vz: (Math.random() - 0.5) * 0.08,
      size: isForeground ? 2.0 : 1.1,
      alpha: isForeground ? 0.28 + Math.random() * 0.22 : 0.08 + Math.random() * 0.14,
    });
  }
  return dust;
}

export function HeroAgentMesh() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bustPointsRef = useRef<Point3D[]>([]);
  const dustParticlesRef = useRef<DustParticle[]>([]);
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);

  // Detect theme (dark vs light)
  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark";
      setIsDark(isDarkMode);
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseTargetRef.current = {
      x: normX * 18,
      y: normY * 18,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseTargetRef.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    bustPointsRef.current = generateBustPoints(9000);

    const resize = () => {
      if (!container) return;
      width = container.clientWidth || 460;
      height = container.clientHeight || 480;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      dustParticlesRef.current = generateDust(1200, width, height);
    };

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.016;

      // Smooth mouse damping (lerp)
      mouseCurrentRef.current.x += (mouseTargetRef.current.x - mouseCurrentRef.current.x) * 0.08;
      mouseCurrentRef.current.y += (mouseTargetRef.current.y - mouseCurrentRef.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Color Palette: Pure Vibrant Orange (#f45532 / rgb(244, 85, 50))
      const orangeR = 244;
      const orangeG = 85;
      const orangeB = 50;

      // Center coordinates
      const centerX = width * 0.50 + mouseCurrentRef.current.x;
      const centerY = height * 0.48 + mouseCurrentRef.current.y;
      const scale = Math.min(width / 340, height / 360) * 1.05;

      // ─── 1. ATMOSPHERIC ORANGE RADIAL GLOW BEHIND THE HEAD ───
      const headGlowX = centerX;
      const headGlowY = centerY - 50 * scale;
      const glowPulse = 1 + Math.sin(time * 1.5) * 0.06;

      const radialGrad = ctx.createRadialGradient(
        headGlowX,
        headGlowY,
        15,
        headGlowX,
        headGlowY,
        width * 0.44 * glowPulse
      );

      if (isDark) {
        radialGrad.addColorStop(0, `rgba(${orangeR}, ${orangeG}, ${orangeB}, 0.22)`);
        radialGrad.addColorStop(0.38, `rgba(${orangeR}, ${orangeG}, ${orangeB}, 0.08)`);
        radialGrad.addColorStop(0.75, `rgba(${orangeR}, ${orangeG}, ${orangeB}, 0.02)`);
        radialGrad.addColorStop(1, "transparent");
      } else {
        radialGrad.addColorStop(0, `rgba(${orangeR}, ${orangeG}, ${orangeB}, 0.12)`);
        radialGrad.addColorStop(0.42, `rgba(${orangeR}, ${orangeG}, ${orangeB}, 0.04)`);
        radialGrad.addColorStop(1, "transparent");
      }

      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // ─── 2. FLOATING ORANGE DUST PARTICLES ───
      const dust = dustParticlesRef.current;
      for (let i = 0; i < dust.length; i++) {
        const d = dust[i];
        d.x += d.vx + Math.sin(time * 0.4 + d.y * 0.01) * 0.14;
        d.y += d.vy + Math.cos(time * 0.4 + d.x * 0.01) * 0.08;
        d.z += d.vz;

        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height;
        if (d.y > height) d.y = 0;
        if (d.z < -180) d.z = 180;
        if (d.z > 180) d.z = -180;

        const depthFactor = (d.z + 180) / 360;
        const px = d.x + mouseCurrentRef.current.x * depthFactor * 0.6;
        const py = d.y + mouseCurrentRef.current.y * depthFactor * 0.6;

        const alpha = isDark ? d.alpha * 0.9 : d.alpha * 0.75;
        ctx.fillStyle = `rgba(${orangeR}, ${orangeG}, ${orangeB}, ${alpha})`;
        ctx.fillRect(px, py, d.size, d.size);
      }

      // ─── 3. 3D AGENT MESH BUST (HUMANOID AVATAR) ───
      const bust = bustPointsRef.current;
      // Idle natural breathing rotation + interactive mouse parallax
      const rotY = (mouseCurrentRef.current.x * 0.018) + Math.sin(time * 0.6) * 0.04;
      const rotX = (mouseCurrentRef.current.y * 0.012) + Math.cos(time * 0.8) * 0.02;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      for (let i = 0; i < bust.length; i++) {
        const p = bust[i];

        // 3D Rotation Y (yaw)
        let rx = p.x * cosY - p.z * sinY;
        let rz = p.x * sinY + p.z * cosY;

        // 3D Rotation X (pitch)
        let ry = p.y * cosX - rz * sinX;
        rz = p.y * sinX + rz * cosX;

        // Project to 2D
        const sx = centerX + rx * scale;
        const sy = centerY - ry * scale;

        if (sx < -10 || sx > width + 10 || sy < -10 || sy > height + 20) continue;

        // Orange particle color with Fresnel rim intensity
        const alpha = Math.min(1.0, Math.max(0.12, p.baseAlpha));
        
        // Intense rim points glow with warm white-amber core
        if (p.fresnel > 0.72) {
          ctx.fillStyle = isDark
            ? `rgba(255, 175, 120, ${alpha})`
            : `rgba(244, 85, 50, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(${orangeR}, ${orangeG}, ${orangeB}, ${alpha})`;
        }

        ctx.fillRect(sx, sy, p.size, p.size);
      }

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
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 480,
        height: 480,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        userSelect: "none",
        border: "none",
        boxShadow: "none",
        background: "transparent",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
