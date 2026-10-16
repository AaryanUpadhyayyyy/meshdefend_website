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
  const bookRigsRef = useRef<any[]>([]);
  const hitTargetsRef = useRef<THREE.Mesh[]>([]);

  const modeRef = useRef<"hero" | "detail" | "opening" | "closing">(mode);
  modeRef.current = mode;

  const selectedIndexRef = useRef(selectedIndex);
  selectedIndexRef.current = selectedIndex;

  const positionRef = useRef(selectedIndex);
  const targetPositionRef = useRef(selectedIndex);
  const wheelIdleRef = useRef(0);

  // Precise shelf and camera positioning: anchored at bottom baseline of viewport
  const SHELF_STAGE_Y = -1.78; // Pulls shelf board right to the bottom baseline of screen (94-96% from top)
  const BASE_SHELF_CAM_Y = 0.65;
  const BASE_SHELF_TARGET_Y = 0.20;
  const BASE_INSPECT_CAM_Y = 0.75;
  const BASE_INSPECT_TARGET_Y = 0.65;
  const INSPECT_BOOK_LOCAL_Y = 2.42;

  const shelfCameraPos = useRef(new THREE.Vector3(0, BASE_SHELF_CAM_Y, 6.8));
  const shelfCameraTarget = useRef(new THREE.Vector3(0, BASE_SHELF_TARGET_Y, 0));
  const inspectCameraPos = useRef(new THREE.Vector3(-0.55, BASE_INSPECT_CAM_Y, 4.6));
  const inspectCameraTarget = useRef(new THREE.Vector3(-1.75, BASE_INSPECT_TARGET_Y, 0));
  const inspectPosition = useRef(new THREE.Vector3(-1.75, INSPECT_BOOK_LOCAL_Y, 0));

  const currentCamTarget = useRef(new THREE.Vector3(0, BASE_SHELF_TARGET_Y, 0));
  const pointerRef = useRef(new THREE.Vector2(-100, -100));
  const raycasterRef = useRef(new THREE.Raycaster());

  useEffect(() => {
    targetPositionRef.current = selectedIndex;
  }, [selectedIndex]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Transparent Scene so the full background image is 100% visible
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 50);
    camera.position.set(0, BASE_SHELF_CAM_Y, 6.8);
    camera.lookAt(0, BASE_SHELF_TARGET_Y, 0);
    currentCamTarget.current.set(0, BASE_SHELF_TARGET_Y, 0);
    cameraRef.current = camera;

    // 3. Renderer with alpha: true for transparent canvas
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0); // Transparent background!
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // 4. Studio Lighting tuned for vibrant covers and warm sunset ambiance
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xc8baa8, 0.95);
    scene.add(hemiLight);

    // Warm Sun Key Light (casting crisp soft shadows on the shelf)
    const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.25);
    sunLight.position.set(4.5, 6.5, 5.5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(2048, 2048);
    sunLight.shadow.bias = -0.00012;
    sunLight.shadow.radius = 3.0;
    scene.add(sunLight);

    // Dedicated Front Fill Light to completely eliminate darkness on book covers
    const frontBookLight = new THREE.DirectionalLight(0xffffff, 1.15);
    frontBookLight.position.set(0, 1.5, 6.5);
    scene.add(frontBookLight);

    // Soft sky fill light
    const skyFill = new THREE.DirectionalLight(0xe8f0f8, 0.60);
    skyFill.position.set(-4.5, 4.0, 4.5);
    scene.add(skyFill);

    // Golden Sunset Rim Light on top and edges of books
    const rimLight = new THREE.DirectionalLight(0xffaa60, 0.75);
    rimLight.position.set(1.5, 4.2, -2.2);
    scene.add(rimLight);

    // 5. Architectural Realistic Hardwood Bookshelf (Anchored right at bottom baseline)
    const shelfStage = new THREE.Group();
    shelfStage.position.y = SHELF_STAGE_Y; // Anchored at the bottom edge of the screen
    shelfStageRef.current = shelfStage;

    const textureLoader = new THREE.TextureLoader();

    // High-resolution realistic natural wood grain textures
    const woodDiffuse = textureLoader.load("/images/shelf-wood-diffuse.jpg");
    woodDiffuse.colorSpace = THREE.SRGBColorSpace;
    woodDiffuse.wrapS = THREE.RepeatWrapping;
    woodDiffuse.wrapT = THREE.RepeatWrapping;
    woodDiffuse.repeat.set(2.5, 1);

    const woodBump = textureLoader.load("/images/shelf-wood-bump.jpg");
    woodBump.wrapS = THREE.RepeatWrapping;
    woodBump.wrapT = THREE.RepeatWrapping;
    woodBump.repeat.set(2.5, 1);

    const woodRoughness = textureLoader.load("/images/shelf-wood-roughness.jpg");
    woodRoughness.wrapS = THREE.RepeatWrapping;
    woodRoughness.wrapT = THREE.RepeatWrapping;
    woodRoughness.repeat.set(2.5, 1);

    const shelfMat = new THREE.MeshStandardMaterial({
      map: woodDiffuse,
      bumpMap: woodBump,
      bumpScale: 0.008,
      roughnessMap: woodRoughness,
      roughness: 0.48,
      metalness: 0.02,
    });

    const shelfLipMat = new THREE.MeshStandardMaterial({
      map: woodDiffuse,
      bumpMap: woodBump,
      bumpScale: 0.005,
      roughness: 0.54,
      metalness: 0.02,
    });

    // Main Shelf Board positioned comfortably in lower mist
    const shelfBoard = new THREE.Mesh(
      new RoundedBoxGeometry(16, 0.12, 1.25, 3, 0.012),
      shelfMat
    );
    shelfBoard.position.set(0, 0.02, -0.04);
    shelfBoard.castShadow = true;
    shelfBoard.receiveShadow = true;
    shelfStage.add(shelfBoard);

    // Subtle front bevel lip
    const shelfLip = new THREE.Mesh(
      new RoundedBoxGeometry(16.02, 0.04, 1.28, 2, 0.006),
      shelfLipMat
    );
    shelfLip.position.set(0, -0.03, 0.01);
    shelfStage.add(shelfLip);

    // Warm Contact Shadow below wooden shelf floating into background mist
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 512;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d")!;
    const grad = sCtx.createRadialGradient(256, 64, 10, 256, 64, 250);
    grad.addColorStop(0, "rgba(70, 42, 24, 0.35)");
    grad.addColorStop(0.45, "rgba(100, 65, 38, 0.12)");
    grad.addColorStop(1, "rgba(230, 210, 190, 0)");
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 512, 128);
    const softShadowTex = new THREE.CanvasTexture(shadowCanvas);

    const shadowStrip = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 1.4),
      new THREE.MeshBasicMaterial({
        map: softShadowTex,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      })
    );
    shadowStrip.rotation.x = -Math.PI / 2;
    shadowStrip.position.set(0, -0.05, 0.15);
    shelfStage.add(shadowStrip);

    scene.add(shelfStage);

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

    // 6. Build Hardcover Books with Full-Bleed Custom Cover Art (2:3 Aspect Ratio)
    const bookWidth = 1.36;
    const bookHeight = 2.04;
    const bookDepth = 0.28;
    const board = 0.036;
    const pageWidth = bookWidth - 0.09;
    const pageHeight = bookHeight - 0.08;
    const pageDepth = bookDepth - 0.03;

    const rigs: any[] = [];
    const hitTargets: THREE.Mesh[] = [];
    const sharedBox = new THREE.BoxGeometry(1, 1, 1);
    const sharedPlane = new THREE.PlaneGeometry(1, 1);

    PODCAST_EPISODES.forEach((book, index) => {
      const root = new THREE.Group();
      root.name = `book-${book.id}`;
      shelfStage.add(root);

      const motion = new THREE.Group();
      root.add(motion);

      const clothBump = makeClothBumpTexture(book);

      // Light Bookcloth Physical Material with tactile woven texture
      const clothMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(book.color),
        roughness: 0.82,
        metalness: 0.02,
        bumpMap: clothBump,
        bumpScale: 0.004,
        sheen: 0.35,
        sheenRoughness: 0.65,
        sheenColor: new THREE.Color(book.foil),
      });

      // Page Block (Cream Paper)
      const pageGeo = new RoundedBoxGeometry(pageWidth, pageHeight, pageDepth, 3, 0.003);
      const pageMat = new THREE.MeshPhysicalMaterial({
        color: 0xf3ede2,
        roughness: 0.94,
        metalness: 0,
      });

      const rightPageTex = new THREE.CanvasTexture(makeInsideRightPageCanvas(book));
      rightPageTex.colorSpace = THREE.SRGBColorSpace;
      const rightPageMat = new THREE.MeshPhysicalMaterial({
        map: rightPageTex,
        roughness: 0.92,
      });

      const pageMaterials = [pageMat, pageMat, pageMat, pageMat, rightPageMat, pageMat];
      const pageBlock = new THREE.Mesh(pageGeo, pageMaterials);
      pageBlock.position.x = 0.022;
      pageBlock.castShadow = true;
      pageBlock.receiveShadow = true;
      motion.add(pageBlock);

      // Back Cover Board
      const coverGeo = new RoundedBoxGeometry(bookWidth, bookHeight, board, 2, 0.004);
      const backPivot = new THREE.Group();
      backPivot.position.set(-bookWidth * 0.5, 0, -bookDepth * 0.5 - board * 0.5);

      const backCover = new THREE.Mesh(coverGeo, clothMat);
      backCover.position.x = bookWidth * 0.5;
      backCover.castShadow = true;
      backCover.receiveShadow = true;
      backPivot.add(backCover);
      motion.add(backPivot);

      // Spine in matching light color with foil embossing
      const spineGeo = new RoundedBoxGeometry(board * 1.15, bookHeight, bookDepth + board * 1.4, 2, 0.003);
      const spineTex = new THREE.CanvasTexture(makeSpineCanvas(book));
      spineTex.colorSpace = THREE.SRGBColorSpace;
      const spineMat = new THREE.MeshPhysicalMaterial({
        map: spineTex,
        bumpMap: clothBump,
        bumpScale: 0.0035,
        roughness: 0.75,
        metalness: 0.08,
      });
      const spineMesh = new THREE.Mesh(spineGeo, spineMat);
      spineMesh.position.set(-bookWidth * 0.5 - 0.006, 0, 0);
      spineMesh.castShadow = true;
      motion.add(spineMesh);

      // Headbands
      const headbandMat = new THREE.MeshPhysicalMaterial({
        color: 0xd4b278,
        roughness: 0.55,
        metalness: 0.18,
      });
      [-1, 1].forEach((dir) => {
        const headband = new THREE.Mesh(sharedBox, headbandMat);
        headband.scale.set(pageWidth * 0.96, 0.02, pageDepth * 0.95);
        headband.position.set(0.022, dir * (pageHeight * 0.5 - 0.01), 0);
        motion.add(headband);
      });

      // Front Cover Pivot
      const frontPivot = new THREE.Group();
      frontPivot.position.set(-bookWidth * 0.5, 0, bookDepth * 0.5 + board * 0.5);

      const frontCover = new THREE.Mesh(coverGeo, clothMat);
      frontCover.position.x = bookWidth * 0.5;
      frontCover.castShadow = true;
      frontPivot.add(frontCover);

      // Full-bleed Custom Book Cover Image (covers the whole front face!)
      const coverTex = textureLoader.load(book.coverImage, () => {
        coverTex.needsUpdate = true;
      });
      coverTex.colorSpace = THREE.SRGBColorSpace;
      coverTex.generateMipmaps = true;
      coverTex.minFilter = THREE.LinearMipmapLinearFilter;
      coverTex.magFilter = THREE.LinearFilter;
      if (renderer.capabilities.getMaxAnisotropy) {
        coverTex.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
      }

      const coverArtMat = new THREE.MeshPhysicalMaterial({
        map: coverTex,
        emissiveMap: coverTex,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.65, // Eliminates darkness, ensures bright, vivid, crisp artwork
        roughness: 0.22,
        metalness: 0.0,
        clearcoat: 0.20,
        clearcoatRoughness: 0.18,
      });

      // Spans the full front cover face (whole over!)
      const coverPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(bookWidth, bookHeight),
        coverArtMat
      );
      coverPlane.position.set(bookWidth * 0.5, 0, board * 0.505);
      coverPlane.castShadow = true;
      frontPivot.add(coverPlane);

      // Inside Left Page (Facing camera when opened 180°)
      const insideLeftTex = new THREE.CanvasTexture(makeInsideLeftPageCanvas(book));
      insideLeftTex.colorSpace = THREE.SRGBColorSpace;
      const insideLeftMat = new THREE.MeshPhysicalMaterial({
        map: insideLeftTex,
        roughness: 0.94,
      });
      const insideLeft = new THREE.Mesh(
        new THREE.PlaneGeometry(bookWidth - 0.04, bookHeight - 0.04),
        insideLeftMat
      );
      insideLeft.rotation.y = Math.PI;
      insideLeft.position.set(bookWidth * 0.5, 0, -board * 0.52);
      frontPivot.add(insideLeft);

      motion.add(frontPivot);

      // Soft contact shadow below book on shelf
      const bookShadow = new THREE.Mesh(
        sharedPlane,
        new THREE.MeshBasicMaterial({
          map: softShadowTex,
          transparent: true,
          opacity: 0.38,
          depthWrite: false,
          color: new THREE.Color(0x22110a),
        })
      );
      bookShadow.scale.set(bookWidth * 1.35, bookDepth * 2.2, 1);
      bookShadow.rotation.x = -Math.PI / 2;
      bookShadow.position.set(0, -bookHeight * 0.5 - 0.02, 0.02);
      root.add(bookShadow);

      // Raycast Hit Target
      const hit = new THREE.Mesh(
        sharedBox,
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hit.scale.set(bookWidth * 1.35, bookHeight * 1.15, Math.max(bookDepth * 3.5, 1.2));
      hit.position.set(0, 0, 0.12);
      hit.userData = { index };
      motion.add(hit);
      hitTargets.push(hit);

      rigs.push({
        data: book,
        index,
        root,
        motion,
        frontPivot,
        frontCover,
        contactShadow: bookShadow,
        hit,
        base: { width: bookWidth, height: bookHeight, depth: bookDepth },
      });
    });

    bookRigsRef.current = rigs;
    hitTargetsRef.current = hitTargets;

    // 7. Input Listeners
    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      setPointerPos({ x: e.clientX, y: e.clientY });

      if (modeRef.current === "hero") {
        shelfCameraPos.current.x = pointerRef.current.x * 0.22;
        shelfCameraPos.current.y = BASE_SHELF_CAM_Y + pointerRef.current.y * 0.06;
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
        raycasterRef.current.setFromCamera(pointerRef.current, camera);
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
      pointerRef.current.set(-100, -100);
      setHoveredIndex(-1);
    };

    window.addEventListener("pointermove", onPointerMove);
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
    const shelfBoardTop = 0.08; // Sits in lower mist, giving generous headroom
    const spacing = 2.15;

    const frame = (time: number) => {
      rafId = requestAnimationFrame(frame);
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      const elapsed = time / 1000;
      lastTime = time;

      // Lock shelfStage position every frame to guarantee bottom baseline anchor
      shelfStage.position.y = SHELF_STAGE_Y;

      dustPoints.rotation.y = elapsed * 0.012;
      dustPoints.position.y = Math.sin(elapsed * 0.18) * 0.024;

      if (modeRef.current === "hero") {
        raycasterRef.current.setFromCamera(pointerRef.current, camera);
        const hits = raycasterRef.current.intersectObjects(hitTargetsRef.current, false);
        const newHover = hits.length > 0 ? hits[0].object.userData.index : -1;
        setHoveredIndex(newHover);
        canvas.style.cursor = newHover >= 0 ? "pointer" : "default";

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

      // Smooth book placement on shelf
      rigs.forEach((rig, idx) => {
        if (modeRef.current === "hero") {
          const offset = idx - positionRef.current;
          const distance = Math.abs(offset);
          const focus = 1 - THREE.MathUtils.clamp(distance, 0, 1);

          const targetX = offset * spacing;
          const targetY = shelfBoardTop + rig.base.height * 0.5 + focus * 0.16;
          const targetZ = 0.12 + focus * 0.3 - Math.min(distance, 2.8) * 0.08;
          const targetRotY = -offset * 0.105;
          const targetRotZ = -offset * 0.018;
          const targetScale = 1 + focus * 0.08;

          rig.root.position.x = THREE.MathUtils.damp(rig.root.position.x, targetX, 12, delta);
          rig.root.position.y = THREE.MathUtils.damp(rig.root.position.y, targetY, 12, delta);
          rig.root.position.z = THREE.MathUtils.damp(rig.root.position.z, targetZ, 12, delta);
          rig.root.rotation.y = THREE.MathUtils.damp(rig.root.rotation.y, targetRotY, 12, delta);
          rig.root.rotation.z = THREE.MathUtils.damp(rig.root.rotation.z, targetRotZ, 12, delta);
          rig.root.scale.setScalar(
            THREE.MathUtils.damp(rig.root.scale.x, targetScale, 12, delta)
          );

          const isHovered = hoveredIndex === idx;
          const hoverAngle = isHovered ? -0.14 : 0;
          rig.frontPivot.rotation.y = THREE.MathUtils.damp(
            rig.frontPivot.rotation.y,
            hoverAngle,
            12,
            delta
          );

          const idleY = Math.sin(elapsed * 0.72 + idx * 0.8) * 0.014 * focus;
          rig.motion.position.y = THREE.MathUtils.damp(
            rig.motion.position.y,
            idleY + (isHovered ? 0.04 : 0),
            9,
            delta
          );
        } else if (modeRef.current === "detail" || modeRef.current === "opening") {
          const isSelected = idx === selectedIndexRef.current;
          if (isSelected) {
            rig.root.position.x = THREE.MathUtils.damp(rig.root.position.x, inspectPosition.current.x, 8, delta);
            rig.root.position.y = THREE.MathUtils.damp(rig.root.position.y, INSPECT_BOOK_LOCAL_Y, 8, delta);
            rig.root.position.z = THREE.MathUtils.damp(rig.root.position.z, 0.45, 8, delta);
            rig.root.rotation.y = THREE.MathUtils.damp(rig.root.rotation.y, -0.06, 8, delta);
            rig.root.scale.setScalar(THREE.MathUtils.damp(rig.root.scale.x, 1.12, 8, delta));

            rig.frontPivot.rotation.y = THREE.MathUtils.damp(
              rig.frontPivot.rotation.y,
              -Math.PI + 0.02,
              7.5,
              delta
            );
          } else {
            rig.root.position.y = THREE.MathUtils.damp(rig.root.position.y, -4.0, 8, delta);
            rig.frontPivot.rotation.y = THREE.MathUtils.damp(rig.frontPivot.rotation.y, 0, 10, delta);
          }
        } else if (modeRef.current === "closing") {
          const isSelected = idx === selectedIndexRef.current;
          if (isSelected) {
            rig.frontPivot.rotation.y = THREE.MathUtils.damp(rig.frontPivot.rotation.y, 0, 9, delta);
          }
        }
      });

      if (modeRef.current === "hero") {
        const targetCamX = pointerRef.current.x * 0.22;
        const targetCamY = BASE_SHELF_CAM_Y + pointerRef.current.y * 0.06;

        camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 8, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 8, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, 6.8, 8, delta);
        currentCamTarget.current.x = THREE.MathUtils.damp(currentCamTarget.current.x, 0, 8, delta);
        currentCamTarget.current.y = THREE.MathUtils.damp(currentCamTarget.current.y, BASE_SHELF_TARGET_Y, 8, delta);
        currentCamTarget.current.z = THREE.MathUtils.damp(currentCamTarget.current.z, 0, 8, delta);
        camera.lookAt(currentCamTarget.current);
      } else if (modeRef.current === "detail" || modeRef.current === "opening") {
        camera.position.x = THREE.MathUtils.damp(camera.position.x, -0.55, 7.5, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, BASE_INSPECT_CAM_Y, 7.5, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, 4.6, 7.5, delta);
        currentCamTarget.current.x = THREE.MathUtils.damp(currentCamTarget.current.x, -1.75, 7.5, delta);
        currentCamTarget.current.y = THREE.MathUtils.damp(currentCamTarget.current.y, BASE_INSPECT_TARGET_Y, 7.5, delta);
        currentCamTarget.current.z = THREE.MathUtils.damp(currentCamTarget.current.z, 0, 7.5, delta);
        camera.lookAt(currentCamTarget.current);
      }

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
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

// ─────────────────────────────────────────────────────────────────────────────
// Light Book Cloth Texture Generators
// ─────────────────────────────────────────────────────────────────────────────

function makeClothBumpTexture(book: PodcastEpisode): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, 256, 256);

  for (let y = 0; y < 256; y += 2) {
    const shade = Math.round(110 + (Math.sin(y * 0.8 + book.seed) + 1) * 20);
    ctx.strokeStyle = `rgb(${shade},${shade},${shade})`;
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  }

  for (let x = 1; x < 256; x += 3) {
    const shade = Math.round(105 + (Math.cos(x * 0.7 + book.seed) + 1) * 18);
    ctx.strokeStyle = `rgb(${shade},${shade},${shade})`;
    ctx.lineWidth = 0.65;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 8);
  return tex;
}

function makeFrontCoverCanvas(book: PodcastEpisode): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1536;
  const ctx = canvas.getContext("2d")!;

  // Light cloth base color
  ctx.fillStyle = book.color;
  ctx.fillRect(0, 0, 1024, 1536);

  // Subtle linen lighting wash on edges
  const shade = ctx.createLinearGradient(0, 0, 1024, 0);
  shade.addColorStop(0, "rgba(0, 0, 0, 0.08)");
  shade.addColorStop(0.08, "rgba(255, 255, 255, 0.22)");
  shade.addColorStop(0.92, "rgba(255, 255, 255, 0.05)");
  shade.addColorStop(1, "rgba(0, 0, 0, 0.12)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, 1024, 1536);

  // Elegant foil and ink borders
  ctx.strokeStyle = book.foil;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(48, 48, 1024 - 96, 1536 - 96);

  ctx.strokeStyle = "rgba(34, 31, 34, 0.2)";
  ctx.lineWidth = 1;
  ctx.strokeRect(60, 60, 1024 - 120, 1536 - 120);

  // Top series header in foil
  ctx.fillStyle = book.foil;
  ctx.textAlign = "center";
  ctx.font = "700 20px Inter, sans-serif";
  ctx.letterSpacing = "5px";
  ctx.fillText(`WORKING VOLUMES  /  ${book.roman}`, 512, 114);

  // Aperture window for 16:9 thumbnail
  ctx.strokeStyle = book.foil;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(72, 168, 1024 - 144, 496);

  // Accent divider line
  ctx.fillStyle = book.foil;
  ctx.fillRect(72, 700, 1024 - 144, 3);

  // Discipline in contrasting foil/ink
  ctx.font = "700 18px Inter, sans-serif";
  ctx.letterSpacing = "4px";
  ctx.textAlign = "left";
  ctx.fillText(book.discipline.toUpperCase(), 76, 750);

  // Big Title in sharp dark ink
  ctx.fillStyle = book.ink;
  ctx.font = "400 58px 'Instrument Serif', Georgia, serif";
  wrapText(ctx, book.title, 76, 830, 870, 68, 4);

  // Bottom Metadata
  ctx.strokeStyle = "rgba(34, 31, 34, 0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(76, 1360);
  ctx.lineTo(1024 - 76, 1360);
  ctx.stroke();

  ctx.fillStyle = book.ink;
  ctx.font = "600 18px Inter, sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText(`GUEST: ${book.guest.toUpperCase()}`, 76, 1406);

  ctx.fillStyle = book.foil;
  ctx.textAlign = "right";
  ctx.fillText(`${book.duration.toUpperCase()}`, 1024 - 76, 1406);
  ctx.textAlign = "left";

  return canvas;
}

function makeThumbnailPlaceholder(book: PodcastEpisode): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#221f22";
  ctx.fillRect(0, 0, 1280, 720);

  ctx.fillStyle = book.foil;
  ctx.font = "700 28px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`VOLUME ${book.episodeNumber}`, 640, 320);

  ctx.fillStyle = "#ffffff";
  ctx.font = "400 42px 'Instrument Serif', Georgia, serif";
  ctx.fillText(book.title, 640, 390);

  return canvas;
}

function makeSpineCanvas(book: PodcastEpisode): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 1536;
  const ctx = canvas.getContext("2d")!;

  // Light cloth base
  ctx.fillStyle = book.color;
  ctx.fillRect(0, 0, 256, 1536);

  const shade = ctx.createLinearGradient(0, 0, 256, 0);
  shade.addColorStop(0, "rgba(0,0,0,0.18)");
  shade.addColorStop(0.18, "rgba(255,255,255,0.22)");
  shade.addColorStop(0.82, "rgba(255,255,255,0.15)");
  shade.addColorStop(1, "rgba(0,0,0,0.2)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, 256, 1536);

  ctx.strokeStyle = book.foil;
  ctx.lineWidth = 2;
  ctx.strokeRect(18, 28, 256 - 36, 1536 - 56);

  // Top: Roman Numeral
  ctx.fillStyle = book.foil;
  ctx.font = "700 30px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(book.roman, 128, 98);

  // Middle: Rotated Title in sharp dark ink
  ctx.save();
  ctx.translate(128, 768);
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = book.ink;
  ctx.font = "500 38px 'Instrument Serif', Georgia, serif";
  ctx.textAlign = "center";
  const truncated = book.title.length > 44 ? book.title.slice(0, 42) + "…" : book.title;
  ctx.fillText(truncated, 0, 8);
  ctx.restore();

  // Bottom foil dot
  ctx.fillStyle = book.foil;
  ctx.beginPath();
  ctx.arc(128, 1420, 10, 0, Math.PI * 2);
  ctx.fill();

  return canvas;
}

function makeInsideLeftPageCanvas(book: PodcastEpisode): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1536;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#faf6ef";
  ctx.fillRect(0, 0, 1024, 1536);

  ctx.strokeStyle = "rgba(43, 39, 33, 0.16)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(50, 50, 1024 - 100, 1536 - 100);

  ctx.fillStyle = "rgba(43, 39, 33, 0.6)";
  ctx.font = "600 16px Inter, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText(`DISPATCH RECORD  /  ${book.roman}`, 76, 108);

  ctx.fillStyle = "#161822";
  ctx.fillRect(76, 210, 1024 - 152, 490);
  ctx.strokeStyle = book.foil;
  ctx.lineWidth = 2;
  ctx.strokeRect(76, 210, 1024 - 152, 490);

  ctx.fillStyle = "#ffffff";
  ctx.font = "500 22px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("LIVE VIDEO RECORDING", 512, 460);
  ctx.textAlign = "left";

  ctx.fillStyle = "rgba(43, 39, 33, 0.4)";
  ctx.font = "500 14px Inter, sans-serif";
  ctx.fillText("AUTHENTIC STREAMED RECORD · MESHDEFEND", 76, 1440);

  return canvas;
}

function makeInsideRightPageCanvas(book: PodcastEpisode): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1536;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#faf6ef";
  ctx.fillRect(0, 0, 1024, 1536);

  ctx.strokeStyle = "rgba(43, 39, 33, 0.16)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(50, 50, 1024 - 100, 1536 - 100);

  ctx.fillStyle = "rgba(43, 39, 33, 0.6)";
  ctx.font = "600 16px Inter, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText(`EPISODE ${book.episodeNumber}  /  SESSION DELIBERATION`, 80, 108);

  ctx.fillStyle = "#221f22";
  ctx.font = "400 52px 'Instrument Serif', Georgia, serif";
  wrapText(ctx, book.title, 80, 200, 860, 64, 3);

  const metaY = 480;
  ctx.strokeStyle = "rgba(43, 39, 33, 0.15)";
  ctx.strokeRect(80, metaY, 860, 120);

  ctx.fillStyle = "rgba(43, 39, 33, 0.5)";
  ctx.font = "600 13px Inter, sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText("GUEST", 104, metaY + 38);
  ctx.fillText("DATE", 420, metaY + 38);
  ctx.fillText("DURATION", 700, metaY + 38);

  ctx.fillStyle = "#221f22";
  ctx.font = "500 18px Inter, sans-serif";
  ctx.fillText(book.guest, 104, metaY + 76);
  ctx.fillText(book.date, 420, metaY + 76);
  ctx.fillText(book.duration, 700, metaY + 76);

  ctx.fillStyle = "rgba(43, 39, 33, 0.85)";
  ctx.font = "400 26px 'Instrument Serif', Georgia, serif";
  wrapText(ctx, book.description, 80, 680, 860, 42, 8);

  ctx.fillStyle = "rgba(43, 39, 33, 0.4)";
  ctx.font = "500 13px Inter, sans-serif";
  ctx.fillText("RESILIENCE OPERATIONS CENTER · CERTIFIED RECORD", 80, 1440);

  return canvas;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number = 4
) {
  const words = text.split(" ");
  let line = "";
  let lineCount = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y + lineCount * lineHeight);
      line = words[n] + " ";
      lineCount++;
      if (lineCount >= maxLines) return;
    } else {
      line = testLine;
    }
  }
  if (lineCount < maxLines) {
    ctx.fillText(line, x, y + lineCount * lineHeight);
  }
}
