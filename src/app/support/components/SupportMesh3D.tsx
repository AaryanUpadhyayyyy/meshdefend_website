"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type MeshState = "idle" | "receiving" | "verified";
export type TargetCluster = "Backup" | "Storage" | "Business apps" | "Security" | "ITSM" | "Cloud";

interface SupportMesh3DProps {
  state: MeshState;
  targetCluster: TargetCluster;
  isPaused?: boolean;
}

// 6 Cluster definitions around the sphere
const CLUSTER_CENTERS: Record<TargetCluster, [number, number, number]> = {
  Backup: [1.3, 1.1, 1.2],
  Storage: [1.7, -1.0, 0.8],
  "Business apps": [-1.1, 1.5, 1.1],
  Security: [-1.6, -0.7, 1.2],
  ITSM: [0.5, -1.8, 0.9],
  Cloud: [-0.6, -1.1, 1.7],
};

const CLUSTER_NAMES: TargetCluster[] = [
  "Backup",
  "Storage",
  "Business apps",
  "Security",
  "ITSM",
  "Cloud",
];

// Precompute Fibonacci sphere nodes (120 nodes)
function generateSphereData(count = 120, radius = 2.1) {
  const nodes: { position: [number, number, number]; cluster: TargetCluster }[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    // Small jitter for organic mesh feeling
    const pos: [number, number, number] = [
      x * radius + (Math.random() - 0.5) * 0.08,
      y * radius + (Math.random() - 0.5) * 0.08,
      z * radius + (Math.random() - 0.5) * 0.08,
    ];

    // Find nearest cluster center
    let closestCluster: TargetCluster = "Backup";
    let minDist = Infinity;

    CLUSTER_NAMES.forEach((cName) => {
      const c = CLUSTER_CENTERS[cName];
      const d = Math.hypot(pos[0] - c[0], pos[1] - c[1], pos[2] - c[2]);
      if (d < minDist) {
        minDist = d;
        closestCluster = cName;
      }
    });

    nodes.push({ position: pos, cluster: closestCluster });
  }

  // Find 3 nearest neighbours for each node to build LineSegments
  const linePositions: number[] = [];
  const edgeSet = new Set<string>();

  for (let i = 0; i < count; i++) {
    const p1 = nodes[i].position;
    const distances: { index: number; dist: number }[] = [];

    for (let j = 0; j < count; j++) {
      if (i === j) continue;
      const p2 = nodes[j].position;
      const d = Math.hypot(p1[0] - p2[0], p1[1] - p2[1], p1[2] - p2[2]);
      distances.push({ index: j, dist: d });
    }

    distances.sort((a, b) => a.dist - b.dist);
    // 3 nearest neighbours
    for (let k = 0; k < 3; k++) {
      const j = distances[k].index;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        const p2 = nodes[j].position;
        linePositions.push(p1[0], p1[1], p1[2], p2[0], p2[1], p2[2]);
      }
    }
  }

  return { nodes, linePositions: new Float32Array(linePositions) };
}

function MeshScene({
  state,
  targetCluster,
  isPaused,
}: {
  state: MeshState;
  targetCluster: TargetCluster;
  isPaused: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);

  // Parallax pointer tracking
  const pointerPos = useRef({ x: 0, y: 0 });

  // Sphere data
  const { nodes, linePositions } = useMemo(() => generateSphereData(120, 2.15), []);

  // Three.js geometries & materials for clean lifecycle disposal
  const sphereGeo = useMemo(() => new THREE.SphereGeometry(0.048, 8, 8), []);
  const nodeMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.95,
      }),
    []
  );

  const linesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return geo;
  }, [linePositions]);

  const linesMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.14,
      }),
    []
  );

  const ringGeo = useMemo(() => new THREE.RingGeometry(0.08, 0.12, 32), []);
  const ringMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      sphereGeo.dispose();
      nodeMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      ringGeo.dispose();
    };
  }, [sphereGeo, nodeMaterial, linesGeometry, linesMaterial, ringGeo]);

  // Set up instance matrices and initial colors
  useEffect(() => {
    if (!instancedMeshRef.current) return;
    const mesh = instancedMeshRef.current;
    const tempMatrix = new THREE.Matrix4();

    nodes.forEach((node, idx) => {
      tempMatrix.setPosition(...node.position);
      mesh.setMatrixAt(idx, tempMatrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  }, [nodes]);

  // Update node colors based on state and cluster
  useEffect(() => {
    if (!instancedMeshRef.current) return;
    const mesh = instancedMeshRef.current;

    const baseColor = new THREE.Color(0xa09a9c);
    const idleHighlight = new THREE.Color(0xfefdfd);
    const orangeColor = new THREE.Color(0xfd4703);
    const verifiedColor = new THREE.Color(0x3dbe7a);

    nodes.forEach((node, idx) => {
      const isTarget = node.cluster === targetCluster;
      let c = baseColor;

      if (state === "receiving") {
        c = isTarget ? orangeColor : baseColor;
      } else if (state === "verified") {
        c = isTarget ? verifiedColor : baseColor;
      } else {
        // Idle state: target cluster subtly elevated
        c = isTarget ? idleHighlight : baseColor;
      }

      mesh.setColorAt(idx, c);
    });

    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  }, [state, targetCluster, nodes]);

  // Pointer move handler for subtle parallax
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      pointerPos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerPos.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Rotation target calculation based on active cluster
  const targetRotation = useMemo(() => {
    const center = CLUSTER_CENTERS[targetCluster];
    // Calculate azimuth and elevation to rotate the cluster toward camera [+Z]
    const theta = Math.atan2(center[0], center[2]);
    const phi = -Math.atan2(center[1], Math.hypot(center[0], center[2]));
    return { x: phi, y: -theta };
  }, [targetCluster]);

  // Animation frame loop
  useFrame((_, delta) => {
    if (isPaused || !groupRef.current) return;

    const group = groupRef.current;

    // Slow auto-rotation when idle, or smooth lerp toward target cluster
    if (state === "idle") {
      group.rotation.y += delta * 0.25;
      group.rotation.x = THREE.MathUtils.lerp(
        group.rotation.x,
        targetRotation.x + pointerPos.current.y * 0.15,
        0.05
      );
    } else {
      // Rotate toward the target cluster smoothly
      group.rotation.y = THREE.MathUtils.lerp(
        group.rotation.y,
        targetRotation.y + pointerPos.current.x * 0.15,
        0.08
      );
      group.rotation.x = THREE.MathUtils.lerp(
        group.rotation.x,
        targetRotation.x + pointerPos.current.y * 0.15,
        0.08
      );
    }

    // Pulse ring animation when state === "verified"
    if (pulseRingRef.current) {
      const ring = pulseRingRef.current;
      if (state === "verified") {
        ring.visible = true;
        const scale = 1 + ((Date.now() % 1600) / 1600) * 2.8;
        const opacity = Math.max(0, 1 - (scale - 1) / 2.8);
        ring.scale.set(scale, scale, 1);
        if (ringMaterialRef.current) {
          ringMaterialRef.current.opacity = opacity * 0.85;
        }

        // Position ring at target cluster
        const c = CLUSTER_CENTERS[targetCluster];
        ring.position.set(c[0] * 1.05, c[1] * 1.05, c[2] * 1.05);
        ring.lookAt(0, 0, 0);
      } else {
        ring.visible = false;
        if (ringMaterialRef.current) {
          ringMaterialRef.current.opacity = 0;
        }
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. All Nodes as ONE InstancedMesh (Draw Call #1) */}
      <instancedMesh
        ref={instancedMeshRef}
        args={[sphereGeo, nodeMaterial, nodes.length]}
      />

      {/* 2. All Edges as ONE LineSegments (Draw Call #2) */}
      <lineSegments geometry={linesGeometry} material={linesMaterial} />

      {/* 3. Verification Pulse Ring (Draw Call #3, emissive) */}
      <mesh ref={pulseRingRef} geometry={ringGeo} visible={false}>
        <meshBasicMaterial
          ref={ringMaterialRef}
          color={0x3dbe7a}
          side={THREE.DoubleSide}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}

export function SupportMesh3D({
  state,
  targetCluster,
  isPaused = false,
}: SupportMesh3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // IntersectionObserver to pause rendering when scrolled offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <MeshScene
          state={state}
          targetCluster={targetCluster}
          isPaused={isPaused || !isVisible}
        />
      </Canvas>
    </div>
  );
}
