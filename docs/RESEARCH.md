# RESEARCH.md — 3D Scroll & Editorial WebGL Architecture

> **Context:** Oct 2026 Reference Study for MeshDefend "Unified Resilience Observability" (`/platform#observability`).  
> **Core Mandate:** Data sculpture, not decoration. Print/editorial paper aesthetic, zero AI vibe-coding, strict performance budget.

---

## 1. Reference Analysis (6 References)

### Reference 1: Joseph Santamaria / Codrops — "How to Build Cinematic 3D Scroll Experiences with GSAP"
- **What the Motion Does:** Maps the browser scroll bar directly to a normalized progress value `[0, 1]` on a master GSAP timeline with `ScrollTrigger.create({ scrub: true })`. Instead of discrete scene changes or scrolling standard DOM, the camera traverses continuous 3D space while scene parameters (shader uniforms, object rotations, line widths) are interpolated in exact sync with scroll velocity.
- **Why It Works:** It eradicates the jarring disconnect between page scroll and canvas animation. The user has tactile, instantaneous control over narrative time: reversing scroll rewinds the physical simulation with zero hysteresis or phase lag.
- **Technique We Adopt:** **Master Progress Scrubber Pattern.** A single `gsap.timeline()` driven by ScrollTrigger updates an internal ref `progress.current`. The Three.js `useFrame` render loop reads this float ref directly (never reading React state) and evaluates Catmull-Rom spline coordinates and shader uniforms in a single RAF pass.

---

### Reference 2: Three.js Official Architecture — Instanced Attributes & Vector Projection (`webgl_instancing_dynamic`, `CSS2DRenderer` / Screen Space Projection)
- **What the Motion Does:** Renders hundreds of geometric elements (event ticks, hairlines, signal beads) in a single GPU draw call using `THREE.InstancedMesh`. Simultaneously, key milestone vertices in 3D world space are projected via `vector.project(camera)` to compute 2D screen coordinates `(x, y)` to pin crisp, accessible HTML typographic tags.
- **Why It Works:** Baking text into canvas textures results in blurry, unscalable, non-selectable, non-accessible typography that immediately signals "cheap 3D template." By tracking DOM overlays to 3D matrix transformations, text remains rendered by the browser's native text engine at sub-pixel resolution with full DOM accessibility.
- **Technique We Adopt:** **Dual-Layer Instanced Matrix + DOM Tag Tracking.**
  1. Instanced mesh for the ~600 fine hairlines (Beat 3) and data beads (Beat 1), keeping total WebGL draw calls under 10.
  2. Direct mathematical projection (`Vector3.project(camera)`) within the RAF loop using CSS `transform: translate3d(x, y, 0)` for zero layout reflows.

---

### Reference 3: Niccolò Miranda / Obys Agency — High-Craft Editorial WebGL & Paper Tactility
- **What the Motion Does:** Merges Swiss international typographic layouts (asymmetric 12-column grids, strict baseline rhythm, hairline borders, tabular metadata) with flat matte 3D geometries that simulate ink on heavy archival paper rather than shiny CGI plastic.
- **Why It Works:** Enterprise infrastructure software suffers from dark-mode neon tropes (glowing cyber shields, floating glass tiles). Rooting the visual language in physical editorial print gives enterprise risk officers and compliance auditors an immediate sense of permanence, sobriety, and institutional credibility.
- **Technique We Adopt:** **Matte Ink & Paper Materiality.**
  - Zero specular shine, zero environment map reflections, zero bloom.
  - Light theme: Flat matte ink ribbons (`#221f22`) casting soft directional ambient-occlusion contact shadows onto an off-white `#fefdfd` paper ground plane.
  - Dark theme: Crisp off-white ribbons on deep `#221f22` canvas with fog fading softly to background color.
  - A subtle 3-4% static noise overlay for authentic print grain tactility.

---

### Reference 4: Holographik (CoMinVi / Minimalist 3D Staging) — Continuous Shader Morphing via Uniform Scrubbing
- **What the Motion Does:** Rather than swapping discrete 3D models or crossfading visibility, a single continuous ribbon mesh undergoes spatial restructuring driven by custom vertex shader uniforms (`uBraid`, `uTwist`, `uOffset`). The geometry physically braids from six independent console planes into a single unified cord.
- **Why It Works:** Discrete swaps destroy spatial permanence; the eye detects the cut and treats the visual as a slide presentation. Continuous topological deformation proves the conceptual metaphor: six fragmented platforms *are physically the exact same data stream* once unified.
- **Technique We Adopt:** **Custom Vertex Shader Twist/Braid Uniform.**
  - Six ribbon strips with shared continuous UVs along the x-axis (time: 22:00 to 07:00).
  - Vertex shader blends from planar offset position $P_{fragmented}$ to braided helical path $P_{braided}$ via:
    $$P = \text{mix}(P_{fragmented}, P_{braided}, uBraid)$$
  - Driven entirely by a single GSAP uniform scrub.

---

### Reference 5: Stripe Press / Linear Data Sculptures — Distance-Based Line Width & Anti-Aliased Ribbon Shaders
- **What the Motion Does:** Thin geometric lines maintain elegant typographic line-weights across varying camera distances. Lines don't turn into jagged aliased 1px pixel crawls as they recede into depth; instead, they gently attenuate in opacity and slightly thin down using depth-aware smoothstep calculations.
- **Why It Works:** Default WebGL `GL_LINES` is notoriously locked to 1px on most GPUs and exhibits severe aliasing. Using custom ribbon triangle strips with distance-based alpha falloff provides crisp, publication-grade vector fidelity at any angle.
- **Technique We Adopt:** **Variable-Width Ribbon Geometry with Depth Falloff.**
  - Extruded triangle ribbon strips with screen-space edge softening.
  - Native linear fog tuned precisely to background color (`#fefdfd` / `#221f22`), ensuring smooth depth dissolution without post-processing passes.

---

### Reference 6: Awwwards Elements — Two-Way Interactive Scrub Synchronizer
- **What the Motion Does:** Combines continuous scroll-scrubbing with an interactive UI segmented control (`Separate consoles` | `Unified view`). Clicking the control smoothly animates the GSAP ScrollTrigger timeline to the exact target beat with a custom 900ms cubic-bezier tween, while scrolling naturally updates the segmented control's active pill indicator.
- **Why It Works:** Heavy scrollytelling can feel hostage-taking if the user is forced to scroll back and forth to inspect a specific state. Giving the visitor immediate keyboard and click access to key narrative milestones respects user agency without breaking the 3D continuum.
- **Technique We Adopt:** **Bidirectional GSAP Scrub Bridge.**
  - `ScrollTrigger` tracks scroll position and dispatches active index to the segmented control with hysteresis thresholding.
  - Segmented control triggers `gsap.to(window, { scrollTo: targetY, duration: 0.9, ease: "cubic-bezier(0.65, 0, 0.15, 1)" })`.
  - Full ARIA tablist / radio role support for WCAG keyboard accessibility.

---

## 2. Techniques Rejected (Anti-Patterns)

| Anti-Pattern | Why It Is Excluded |
| :--- | :--- |
| **Bloom & Post-Processing Glow** | Signals cheap WebGL template / gaming gimmick; reduces contrast for compliance/enterprise legibility. |
| **Cyan / Cyberpunk Neon** | Clashes with MeshDefend brand guidelines (strictly `#f45532`, `#221f22`, `#fefdfd`); looks amateurish. |
| **Floating Glassmorphic Cards** | 2021 UI cliché; destroys typographic hierarchy and creates accessibility contrast failures. |
| **Particle Cloud Noise Backgrounds** | Random visual clutter that distracts from the core data sculpture narrative; heavy on battery. |
| **Handheld Camera Shake / Jitter** | Causes vestibular motion sickness; undermines precision and credibility. |
| **Bounce / Elastic Easing** | Physics gimmicks that contradict enterprise rigor; strictly stick to `.65,0,.15,1` and `.22,1,.36,1`. |

---

## 3. Engineering Feasibility & Performance Envelope

- **Max Draw Calls:** $\le 8$ (1 paper ground plane, 1 instanced ribbon mesh, 1 instanced hairline mesh, 1 instanced bead mesh, 1 threshold guide). Budget cap: 40.
- **Max Vertices:** $\approx 38,000$ (well under the 150k vertex budget limit).
- **Target Frame Rate:** $60\text{ fps}$ on mid-tier integrated graphics (Intel Iris Xe / Apple M-series).
- **Device Pixel Ratio:** Explicitly clamped via `Math.min(window.devicePixelRatio, 1.75)`.
- **Visibility Culling:** Frameloop set to `demand` or suspended when ScrollTrigger moves outside the 300vh pinned stage bounds.
