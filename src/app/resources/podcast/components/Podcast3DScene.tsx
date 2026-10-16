"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { PODCAST_EPISODES, PodcastEpisode } from "../podcastData";

interface Podcast3DSceneProps {
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  mode: "hero" | "detail" | "opening" | "closing";
  onOpenDetail: () => void;
  onCloseDetail: () => void;
  hoveredIndex: number;
  setHoveredIndex: (idx: number) => void;
  pointerPos: { x: number; y: number };
  setPointerPos: (pos: { x: number; y: number }) => void;
}

export function Podcast3DScene({
  selectedIndex,
  onSelectIndex,
  mode,
  onOpenDetail,
  onCloseDetail,
  hoveredIndex,
  setHoveredIndex,
  pointerPos,
  setPointerPos,
}: Podcast3DSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const shelfStageRef = useRef<THREE.Group | null>(null);
  const videoRigsRef = useRef<any[]>([]);
  const hitTargetsRef = useRef<THREE.Mesh[]>([]);

  const modeRef = useRef<"hero" | "detail" | "opening" | "closing">(mode);
  modeRef.current = mode;

  const selectedIndexRef = useRef(selectedIndex);
  selectedIndexRef.current = selectedIndex;

  const positionRef = useRef(selectedIndex);
  const targetPositionRef = useRef(selectedIndex);
  const wheelIdleRef = useRef(0);

  // Precise stage and camera positioning: anchored at bottom baseline of viewport
  const STAGE_Y = -1.78;
  const BASE_CAM_Y = 0.65;
  const BASE_TARGET_Y = 0.20;

  const currentCamTarget = useRef(new THREE.Vector3(0, BASE_TARGET_Y, 0));
  const pointerRef = useRef(new THREE.Vector2(0, 0));
  const isPointerActive = useRef(false);
  const raycasterRef = useRef(new THREE.Raycaster());

  useEffect(() => {
    targetPositionRef.current = selectedIndex;
  }, [selectedIndex]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Transparent Scene so full widescreen backdrop is visible
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera: locked at bottom baseline
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 50);
    camera.position.set(0, BASE_CAM_Y, 6.8);
    camera.lookAt(0, BASE_TARGET_Y, 0);
    currentCamTarget.current.set(0, BASE_TARGET_Y, 0);
    cameraRef.current = camera;

    // 3. Renderer with alpha: true for transparent canvas
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // 4. Studio Lighting tuned for vibrant video screens and warm sunset ambiance
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xc8baa8, 0.95);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.25);
    sunLight.position.set(4.5, 6.5, 5.5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(2048, 2048);
    sunLight.shadow.bias = -0.00012;
    sunLight.shadow.radius = 3.0;
    scene.add(sunLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1.15);
    frontLight.position.set(0, 1.5, 6.5);
    scene.add(frontLight);

    const skyFill = new THREE.DirectionalLight(0xe8f0f8, 0.60);
    skyFill.position.set(-4.5, 4.0, 4.5);
    scene.add(skyFill);

    const rimLight = new THREE.DirectionalLight(0xffaa60, 0.75);
    rimLight.position.set(1.5, 4.2, -2.2);
    scene.add(rimLight);

    // 5. Stage group for 16:9 video cards
    const stage = new THREE.Group();
    stage.position.y = STAGE_Y;
    shelfStageRef.current = stage;
    scene.add(stage);

    const textureLoader = new THREE.TextureLoader();

    // Floating Golden Dust Particles
    const dustCount = 130;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 16;
      dustPositions[i * 3 + 1] = 0.2 + Math.random() * 4.2;
      dustPositions[i * 3 + 2] = -1.5 + Math.random() * 4.5;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xf5a462,
      size: 0.02,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // 6. Build Sleek 16:9 Widescreen Video Cards with Real YouTube Thumbnails
    const cardWidth = 2.40;
    const cardHeight = 1.35; // 2.40 * (9 / 16) = exact 16:9 widescreen ratio
    const cardDepth = 0.045;
    const bezelThickness = 0.04;

    const rigs: any[] = [];
    const hitTargets: THREE.Mesh[] = [];
    const sharedBox = new THREE.BoxGeometry(1, 1, 1);

    // Chassis geometry with subtle rounded corners
    const chassisGeo = new RoundedBoxGeometry(
      cardWidth + bezelThickness,
      cardHeight + bezelThickness,
      cardDepth,
      4,
      0.025
    );

    // Chassis material: obsidian graphite bezel with subtle metallic sheen
    const chassisMat = new THREE.MeshPhysicalMaterial({
      color: 0x141316,
      roughness: 0.32,
      metalness: 0.82,
      clearcoat: 0.25,
      clearcoatRoughness: 0.15,
    });

    const screenGeo = new THREE.PlaneGeometry(cardWidth, cardHeight);

    PODCAST_EPISODES.forEach((episode, index) => {
      const root = new THREE.Group();
      root.name = `video-card-${episode.id}`;
      stage.add(root);

      const motion = new THREE.Group();
      root.add(motion);

      // Bezel chassis
      const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
      chassisMesh.castShadow = true;
      chassisMesh.receiveShadow = true;
      motion.add(chassisMesh);

      // 16:9 YouTube Thumbnail Screen
      const thumbTex = textureLoader.load(episode.thumbnail, () => {
        thumbTex.needsUpdate = true;
      });
      thumbTex.colorSpace = THREE.SRGBColorSpace;
      thumbTex.generateMipmaps = true;
      thumbTex.minFilter = THREE.LinearMipmapLinearFilter;
      thumbTex.magFilter = THREE.LinearFilter;
      if (renderer.capabilities.getMaxAnisotropy) {
        thumbTex.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
      }

      const screenMat = new THREE.MeshPhysicalMaterial({
        map: thumbTex,
        emissiveMap: thumbTex,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.32, // Ensures vivid, crisp display without darkening
        roughness: 0.20,
        metalness: 0.02,
        clearcoat: 0.30,
        clearcoatRoughness: 0.12,
      });

      const screenMesh = new THREE.Mesh(screenGeo, screenMat);
      screenMesh.position.set(0, 0, cardDepth * 0.5 + 0.002);
      screenMesh.castShadow = true;
      motion.add(screenMesh);

      // Glowing Edge Outline for active / hover state
      const edgeGeo = new THREE.EdgesGeometry(
        new THREE.PlaneGeometry(cardWidth + bezelThickness, cardHeight + bezelThickness)
      );
      const edgeMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(episode.foil || "#f45532"),
        transparent: true,
        opacity: 0.25,
      });
      const edgeLine = new THREE.LineSegments(edgeGeo, edgeMat);
      edgeLine.position.set(0, 0, cardDepth * 0.5 + 0.003);
      motion.add(edgeLine);

      // Raycast Hit Target
      const hit = new THREE.Mesh(
        sharedBox,
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hit.scale.set(cardWidth * 1.08, cardHeight * 1.08, 0.45);
      hit.position.set(0, 0, 0.1);
      hit.userData = { index };
      motion.add(hit);
      hitTargets.push(hit);

      rigs.push({
        data: episode,
        index,
        root,
        motion,
        screenMesh,
        edgeMat,
        hit,
        base: { width: cardWidth, height: cardHeight, depth: cardDepth },
      });
    });

    videoRigsRef.current = rigs;
    hitTargetsRef.current = hitTargets;

    // 7. Input Listeners
    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inBounds =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (inBounds) {
        isPointerActive.current = true;
        pointerRef.current.x = THREE.MathUtils.clamp(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -1,
          1
        );
        pointerRef.current.y = THREE.MathUtils.clamp(
          -((e.clientY - rect.top) / rect.height) * 2 + 1,
          -1,
          1
        );
        setPointerPos({ x: e.clientX, y: e.clientY });
      } else {
        isPointerActive.current = false;
        pointerRef.current.set(0, 0);
        setHoveredIndex(-1);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (modeRef.current !== "hero") return;
      e.preventDefault();
      wheelIdleRef.current = 0.28;
      targetPositionRef.current += (e.deltaY + e.deltaX) * 0.0022;
      targetPositionRef.current = THREE.MathUtils.clamp(
        targetPositionRef.current,
        -0.2,
        PODCAST_EPISODES.length - 1 + 0.2
      );
    };

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (modeRef.current === "hero") {
        const rect = canvas.getBoundingClientRect();
        const clickCoord = new THREE.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1
        );
        raycasterRef.current.setFromCamera(clickCoord, camera);
        const hits = raycasterRef.current.intersectObjects(hitTargetsRef.current, false);
        if (hits.length > 0) {
          const hitIdx = hits[0].object.userData.index;
          if (hitIdx !== undefined) {
            if (hitIdx === selectedIndexRef.current) {
              onOpenDetail();
            } else {
              onSelectIndex(hitIdx);
            }
          }
        }
      }
    };

    const onPointerLeave = () => {
      isPointerActive.current = false;
      pointerRef.current.set(0, 0);
      setHoveredIndex(-1);
    };

    const onWindowLeave = () => {
      isPointerActive.current = false;
      pointerRef.current.set(0, 0);
      setHoveredIndex(-1);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("blur", onWindowLeave);
    document.addEventListener("mouseleave", onWindowLeave);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // 8. Animation Loop
    let rafId = 0;
    let lastTime = performance.now();
    const baselineTop = 0.12;
    const spacing = 2.65; // Balanced 16:9 card spacing

    const frame = (time: number) => {
      rafId = requestAnimationFrame(frame);
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      const elapsed = time / 1000;
      lastTime = time;

      // Ensure stage is anchored at bottom baseline
      stage.position.y = STAGE_Y;

      dustPoints.rotation.y = elapsed * 0.012;
      dustPoints.position.y = Math.sin(elapsed * 0.18) * 0.024;

      if (modeRef.current === "hero") {
        if (isPointerActive.current) {
          raycasterRef.current.setFromCamera(pointerRef.current, camera);
          const hits = raycasterRef.current.intersectObjects(hitTargetsRef.current, false);
          const newHover = hits.length > 0 ? hits[0].object.userData.index : -1;
          setHoveredIndex(newHover);
          canvas.style.cursor = newHover >= 0 ? "pointer" : "default";
        } else {
          setHoveredIndex(-1);
          canvas.style.cursor = "default";
        }

        positionRef.current = THREE.MathUtils.damp(
          positionRef.current,
          targetPositionRef.current,
          9.5,
          delta
        );

        if (wheelIdleRef.current > 0) {
          wheelIdleRef.current -= delta;
          if (wheelIdleRef.current <= 0) {
            targetPositionRef.current = Math.round(targetPositionRef.current);
          }
        }

        const nearest = THREE.MathUtils.clamp(
          Math.round(positionRef.current),
          0,
          PODCAST_EPISODES.length - 1
        );
        if (nearest !== selectedIndexRef.current) {
          onSelectIndex(nearest);
        }
      }

      // Smooth 16:9 Video Card Positioning & Motion
      rigs.forEach((rig, idx) => {
        if (modeRef.current === "hero") {
          const offset = idx - positionRef.current;
          const distance = Math.abs(offset);
          const focus = 1 - THREE.MathUtils.clamp(distance, 0, 1);
          const isHovered = hoveredIndex === idx;
          const isSelected = selectedIndexRef.current === idx;

          const targetX = offset * spacing;
          const targetY = baselineTop + rig.base.height * 0.5 + focus * 0.14;
          const targetZ = 0.15 + focus * 0.32 + (isHovered ? 0.20 : 0) - Math.min(distance, 2.8) * 0.10;
          const targetRotY = -offset * 0.075 + (isHovered ? 0.02 : 0);
          const targetRotZ = -offset * 0.012;
          const targetScale = 1 + focus * 0.08 + (isHovered ? 0.03 : 0);

          rig.root.position.x = THREE.MathUtils.damp(rig.root.position.x, targetX, 12, delta);
          rig.root.position.y = THREE.MathUtils.damp(rig.root.position.y, targetY, 12, delta);
          rig.root.position.z = THREE.MathUtils.damp(rig.root.position.z, targetZ, 12, delta);
          rig.root.rotation.y = THREE.MathUtils.damp(rig.root.rotation.y, targetRotY, 12, delta);
          rig.root.rotation.z = THREE.MathUtils.damp(rig.root.rotation.z, targetRotZ, 12, delta);
          rig.root.scale.setScalar(
            THREE.MathUtils.damp(rig.root.scale.x, targetScale, 12, delta)
          );

          const idleY = Math.sin(elapsed * 0.72 + idx * 0.8) * 0.012 * focus;
          rig.motion.position.y = THREE.MathUtils.damp(
            rig.motion.position.y,
            idleY + (isHovered ? 0.04 : 0),
            10,
            delta
          );

          // Animate edge accent glow
          if (rig.edgeMat) {
            const targetOpacity = isHovered ? 0.95 : isSelected ? 0.65 : 0.22;
            rig.edgeMat.opacity = THREE.MathUtils.damp(rig.edgeMat.opacity, targetOpacity, 10, delta);
          }
        } else if (modeRef.current === "detail" || modeRef.current === "opening") {
          // Slide 3D cards gracefully out of view in detail mode so video player and notes display cleanly
          rig.root.position.y = THREE.MathUtils.damp(rig.root.position.y, -5.0, 8, delta);
          rig.root.scale.setScalar(THREE.MathUtils.damp(rig.root.scale.x, 0.85, 8, delta));
        }
      });

      // Camera is rock-solid locked at baseline: never moves or shifts with mouse position
      camera.position.set(0, BASE_CAM_Y, 6.8);
      camera.lookAt(0, BASE_TARGET_Y, 0);

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onWindowLeave);
      document.removeEventListener("mouseleave", onWindowLeave);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, [onSelectIndex, onOpenDetail]);

  return (
    <div ref={containerRef} className="scene-shell" style={{ position: "absolute", inset: 0, zIndex: 2 }}>
      <canvas ref={canvasRef} id="scene" style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
