# DESIGN_NOTES.md — Unified Resilience Observability

> **Route:** `/platform#observability` (also accessible at `/platform`)  
> **Brand:** MeshDefend — Resilience Operations Center (ResOC)  
> **Design Philosophy:** Think like an editorial art director first. Data sculpture, not decoration. Print/paper materiality, typographic discipline, zero AI-vibe coding, institutional trust.

---

## 1. Visitor Core Question & Narrative Job

- **Primary Persona:** Enterprise VP of Infrastructure, Head of Resilience, or CISO managing multi-vendor IT estates.
- **The Core Question:** *"Can I see everything in one place, and can I hand something credible to compliance or leadership without compiling it by hand?"*
- **Equal Weight Mandate:** Observability and Reporting carry **strictly equal weight**:
  - **Folds 1–3:** Observability (The Overnight Loom — Fragmented consoles $\rightarrow$ Unified cord $\rightarrow$ Signal correlation).
  - **Fold 4:** Reporting (Typographic index with CSS-3D paper sheet preview — operational data already compiled).
  - **Fold 5:** Impact (Conditional metric fold — omitted until certified customer telemetry exists).
  - **Fold 6:** Action Handoff (The 1px cable line leads directly into Incident Resolution).
  - **Fold 7:** Proof CTA ("Bring the consoles you check every morning").

---

## 2. Grid, Baseline Rhythm & Layout Architecture

### 2.1 The Master Grid
- **Max Width:** `1200px` centered container with `min(1200px, calc(100% - 80px))` on desktop, `calc(100% - 40px)` on tablet/mobile.
- **Columns:** 12-column grid, `24px` gutter, `8px` baseline rhythm.
- **Deliberate Asymmetry:**
  - Pinned stage: **7 columns** (text & editorial context) / **5 columns** (WebGL 3D canvas viewport).
  - Folds 1–3 on desktop: Text pinned on the left with progressive opacity fades; canvas pinned on the right.
  - Mobile (<1024px): Canvas sits as an atmospheric background / full-bleed stage with crisp DOM text flowing naturally above it.
- **Negative Space & Padding:** Strict `120px` top/bottom section padding (`section { padding: 120px 0; }`), reducing to `72px` on mobile.
- **Off-Grid Intent:** Exactly one element per section deliberately breaks alignment (e.g., figure tag offset, floating threshold tick, or right-hanging metadata label).

---

## 3. Typographic Scale & Editorial Hierarchy

| Role | Font Family | Size | Line Height | Tracking | Weight | Notes / Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow** | Inter | `13px` | `1.4` | `0` | Regular (400) | Sentence case: `Platform · Unified Resilience Observability` (never all-caps mono) |
| **Display H1** | Instrument Serif | `clamp(52px, 5.6vw, 84px)` | `0.96` | `-0.035em` | Regular (400) | Fold 1: "Resilience visibility is fragmented." |
| **Display H2** | Instrument Serif | `clamp(36px, 4vw, 60px)` | `1.04` | `-0.03em` | Regular (400) | Folds 2, 3, 4, 6, 7 |
| **Lead / Hook** | Inter | `18px` / `20px` | `1.55` | `-0.01em` | Medium (500) | Narrative hook statements |
| **Body Text** | Inter | `16px` | `1.65` | `0` | Regular (400) | Descriptive paragraphs |
| **Editorial Headings** | Instrument Serif | `28px` | `1.2` | `-0.02em` | Regular (400) | Fold 4 Report Titles |
| **Console / Meta** | JetBrains Mono | `11px` / `12px` | `1.5` | `+0.06em` | Regular (400) | Timestamps, status chips, figures (never < 11px) |
| **Serif Numerals** | Instrument Serif | `48px` / `64px` | `1.0` | `-0.02em` | Regular (400) | Tabular figures for time/quantities |

### Mathematical Type Ratio:
Minor Third ($1.200$) / Major Third ($1.250$) hybrid scale anchored on `16px` base:
`11px` $\rightarrow$ `13px` $\rightarrow$ `16px` $\rightarrow$ `20px` $\rightarrow$ `28px` $\rightarrow$ `36px` $\rightarrow$ `48px` $\rightarrow$ `64px` $\rightarrow$ `84px`.

---

## 4. Color Tokens & Strict Orange Budget

### 4.1 Strict Brand Palette
Only three color values are permitted:
1. **Orange:** `#f45532` (accessible variant `#c5401f` for high-contrast small text)
2. **Dark Charcoal / Ink:** `#221f22`
3. **Paper White / Ground:** `#fefdfd` / `#ffffff`
4. **Muted Neutral:** `#6b6568` (Light) / `#a09a9c` (Dark)
5. **Hairline Border:** `#e5e2e3` (Light) / `#3d393b` (Dark)

### 4.2 The "Orange Budget" Rule
> **Rule:** At most **2 orange elements visible in any viewport simultaneously**.
- In Fold 1: Zero orange elements (everything is fragmented, uncoordinated grey).
- In Fold 2: Only 1 orange element: The backup-window ribbon that rises toward the SLA threshold plane.
- In Fold 3: Only 1 orange element: The single anomalous tick on the active correlated thread.
- In Fold 4: Only 1 orange element: The active report row indicator.
- In Fold 6: Only 1 orange element: The "payments-db · at risk" issue chip leading to Incident Resolution.
- In Fold 7: The Primary CTA button ("Book a demo").

---

## 5. Motion Language & Choreography

### 5.1 Permitted Easings & Timings
- **Cinematic Beat Transitions (Scroll scrub & jumps):** `cubic-bezier(0.65, 0, 0.15, 1)`
- **UI Micro-Interactions (Hover, focus, drawer reveals):** `cubic-bezier(0.22, 1, 0.36, 1)`
- **Duration Scale:** Exactly four discrete durations:
  - `120ms` — Micro-interactions, hover highlights.
  - `240ms` — Tooltip reveals, focus state ring expansion.
  - `480ms` — Card expansion, paper sheet 3D tilt reveal.
  - `960ms` — Segmented control 3D camera jump tween.

### 5.2 Smooth Scroll Damping
- Integrated with Lenis or GSAP ScrollTrigger `scrub: 1` for fluid physical momentum without artificial lag.
- Zero handheld camera shake, zero bounce, zero spring physics.

---

## 6. Storyboard: "The Overnight Loom" (300vh Pinned Stage)

```
        SCROLL PROGRESS: 0.00                              0.50                              1.00
  ┌───────────────────────────────┐  ┌───────────────────────────────┐  ┌───────────────────────────────┐
  │ BEAT 1: FRAGMENTED (Fold 1)   │  │ BEAT 2: UNIFIED (Fold 2)      │  │ BEAT 3: QUIET (Fold 3)        │
  │                               │  │                               │  │                               │
  │  [Backup]   ─ ─●─ ─ ─         │  │            \     /            │  │        ─ ─ ─ ─ ─ ─ ─ (8%)     │
  │  [Storage]    ─ ─ ─●─ ─       │  │             \   /             │  │        ─ ─ ─ ─ ─ ─ ─ (8%)     │
  │  [Cloud]    ─●─ ─ ─ ─ ─       │  │  ─────── ≡≡≡≡≡≡≡≡≡≡ ───────   │  │  ══════ ─ ─ ─ ─ ─ ─ (8%)     │
  │  [ITSM]       ─ ─●─ ─ ─       │  │         (BRAIDED CORD)        │  │         ──●─── (Orange Tick)  │
  │  [CMDB]     ─ ─ ─ ─●─ ─       │  │            /   \  Threshold:  │  │         ────── (Orange Tick)  │
  │  [Security] ─●─ ─ ─ ─ ─       │  │     [ORANGE RIBBON]           │  │        ─ ─ ─ ─ ─ ─ ─ (8%)     │
  │                               │  │     rises near SLA plane      │  │        ─ ─ ─ ─ ─ ─ ─ (8%)     │
  │  Camera: 38° Oblique Angle    │  │  Camera: Frontal, Dolly-In    │  │  Camera: Slow Pull-Back       │
  │  6 separate depth planes      │  │  Unified Cable + 3 Lenses     │  │  600 hairlines fan out        │
  │  Hairline console frames      │  │  DOM: "rising 3 nights"       │  │  Under: "Everything else: ok"│
  └───────────────────────────────┘  └───────────────────────────────┘  └───────────────────────────────┘
                                                  │
                                                  ▼
                                       RELEASE INTO FOLD 4
                       Stage unpins; 1px cable continues seamlessly into DOM
```

### Detailed Beat Breakdown:
1. **BEAT 1: Fragmented (Scroll 0.00 $\rightarrow$ 0.33, Fold 1)**
   - **Visual:** Six thin flat ribbons representing enterprise silos: Backup (Veeam), Storage (DataDomain), Cloud, ITSM (ServiceNow), CMDB, Security.
   - **Coordinates:** Time mapped along x-axis (`22:00` to `07:00`). Each ribbon is staggered on its own z-depth plane inside a hairline rectangular console frame.
   - **Details:** Plausible timestamp event beads sit on each ribbon (e.g. `02:14` change approved, `02:31` warning).
   - **Camera:** Oblique perspective ($x: 8, y: 5, z: 12$), looking across the fragmented planes.
   - **DOM Tags:** Tracked 3D-to-2D coordinates pin crisp labels above ribbons without texture baking.

2. **BEAT 2: Unified (Scroll 0.33 $\rightarrow$ 0.66, Fold 2)**
   - **Visual:** Hairline console frames dissolve. Ribbons converge toward the center axis and braid into a single twisted cable via vertex shader deformation (`uBraid`).
   - **Camera:** Smoothly sweeps to a frontal elevation and dollies in ($x: 0, y: 1.5, z: 8.5$).
   - **Threshold Event:** A 1px hairline horizontal threshold plane appears. The Backup ribbon—the sole orange element—gradually rises over three nights and stops just short of the plane.
   - **DOM Callout:** Pinned DOM badge: `"Backup window · rising 3 nights · still within SLA"`. Lens markers emerge: *Business*, *Infrastructure*, *Security*.

3. **BEAT 3: Quiet & Correlated (Scroll 0.66 $\rightarrow$ 1.00, Fold 3)**
   - **Visual:** The braided cable fans into approximately 600 fine instanced hairlines. 598 hairlines attenuate to ~8% opacity into the background.
   - **Signal Focus:** Only two hairlines remain fully visible, bearing tiny orange indicator ticks:
     1. `"Backup warning · payments-db"`
     2. `"Replication lag trending"`
   - **Camera:** Gracefully pulls back to reveal the calm, correlated estate ($z: 14$).
   - **Under-Stage Context:** Typographic statement: *"Everything else: normal, no action."*

4. **Release into Fold 4:**
   - The pinned stage releases scroll lock. The terminal vertex of the remaining cable aligns with a 1px vertical hairline SVG that travels down into the editorial reporting fold.

---

## 7. Fold-by-Fold Copy & Structural Blueprint

### Fold 1: Visibility Problem
- **Single Job:** Establish the painful reality of morning fragmentation without hype or action verbs.
- **Eyebrow:** `Platform · Unified Resilience Observability` (Inter 13px)
- **H1:** "Resilience visibility is fragmented."
- **Hook Line (DRAFT):** *"The morning routine: open the backup console, then storage, then cloud, then the ITSM queue, and try to piece together what happened overnight."*
- **Text:** *"Hybrid enterprises rely on multiple backup, storage, cloud, ITSM, CMDB, and security systems, each with its own console, data model, and terminology."*
- **Visual Artifacts:** 5 console data tiles with realistic timestamps:
  - Backup (Veeam): `Job completed with warnings · 02:31`
  - Storage (DataDomain): `Replication lag · within threshold`
  - ITSM (ServiceNow): `Change approved · config update · 02:14`
  - CMDB: `payments-db · 3 dependent applications`
  - Security: `Scan completed · no findings`
- **Joined Synthesis:** `payments-db: config changed 02:14 → backup warning 02:31 → replication lag rising → recovery risk: at risk.`
- **Badge:** Single `SAMPLE DATA` tag.

### Fold 2: Unified Visibility
- **Single Job:** Show how unifying consoles reveals hidden compound risk before an incident occurs.
- **Interactive Control:** Segmented toggle: `[ Separate consoles | Unified view ]` (keyboard accessible, linked to 3D scrub).
- **H2:** "Unified Resilience Observability"
- **Opening Fact (DRAFT):** *"Every platform says healthy. One is drifting toward its threshold."*
- **Text:** *"MeshDefend unifies these fragmented views into a common resilience view, giving business, infrastructure, and security teams shared visibility to see risk clearly, coordinate faster, and act with confidence."*
- **Visual:** Three vendor tiles (Commvault, Veeam, Dell PowerProtect) all showing green/OK, with Veeam exhibiting a subtle trend: `"Backup window · rising 3 nights · still within SLA"`. Unified panel displaying the 3 lenses: Business (applications at risk), Infrastructure (jobs, storage), Security (recent changes).
- **Compliance Guardrail:** Pillar restricted to *"detects and alerts"* (fixing is reserved for Incident Resolution). Sample marked as *"illustrative"*.

### Fold 3: Alert Fatigue
- **Single Job:** Prove noise suppression through signal correlation—showing that more visibility does not mean more alerts.
- **Lead-in (DRAFT):** *"More visibility should not mean more noise."*
- **H2:** "Start the day with what needs action, not another wall of alerts."
- **Text (DRAFT):** *"Every platform keeps reporting. MeshDefend correlates those signals first, so normal activity stays quiet and you see only the exceptions that need a decision, each with the reason attached."*
- **Key Exceptions:**
  - `Backup warning · payments-db`
  - `Replication lag trending`
- **Quiet Baseline:** *"Everything else: normal, no action."* (No fabricated metrics or percentages).

### Fold 4: Reporting (NO 3D; Pure Editorial DOM)
- **Single Job:** Prove that compliance and leadership reports are generated continuously from live data, never compiled manually.
- **H2:** "The report doesn't start when someone asks for it. It's already current."
- **Text (DRAFT):** *"Operational data from every platform becomes reports for operations, leadership, compliance and auditors, on a schedule, without anyone compiling it by hand."*
- **Typographic Report Index:** 4 editorial rows (Instrument Serif 28px title, audience in Inter, right-aligned tabular release time):
  1. `Daily protection brief` · Operations · ready 06:00
  2. `Weekly resilience posture` · Leadership · Monday 08:00
  3. `Compliance evidence pack` · Compliance and audit · always current
  4. `Board summary` · Board · monthly
- **Interactive CSS-3D Paper Sheet Preview:**
  - Perspective `1200px`, max rotation $4^\circ$ on hover/focus.
  - Sections: *Estate health*, *Exceptions*, *Recovery readiness*, *Actions taken and approved*, *Evidence*.
  - Source line: `"Generated from live data across Commvault, Veeam, Dell PowerProtect (sample)"`.
- **Contrast Strip:**
  - `Today: export from each console → reconcile in a spreadsheet → format → send.`
  - `With MeshDefend: ready.`
- **Three Principles:** Scheduled or on demand · Same evidence as the operational view · A view for each audience.
- **Metric Slot:** Kept hidden per design rules until verified customer data exists.

### Fold 5: Impact
- **Mandate:** Kept conditionally hidden / omitted because verified customer proof points are pending. As instructed: *"Never ship the 60% fewer manual checks sitemap example as real evidence. Omit until real data exists."*

### Fold 6: Visibility to Action
- **Single Job:** Build anticipation for remediation and hand off cleanly to Incident Resolution.
- **H2:** "You've found what needs attention. What happens next?"
- **Visual Continuum:** The 1px hairline carries the issue chip `"payments-db · recovery risk: at risk"` across an arrow into an Incident Resolution card.
- **Progressive Strip:** `[ See what matters (active) → Resolve what needs action → Learn from what happened ]`
- **CTA:** `"See how MeshDefend takes action" → /platform#incident-resolution`

### Fold 7: Proof CTA
- **H2 (DRAFT):** "See your own estate in one view."
- **Text (DRAFT):** *"Bring the consoles you check every morning. We will show you the same overnight story as one view, and the report that comes with it."*
- **Actions:**
  - Primary button: `"Book a demo"` (`/demo`)
  - Secondary button: `"See your estate in one view"`

---

## 8. Fallback Architecture (<1024px, WebGL-disabled, Prefers-Reduced-Motion)

1. **Automatic Detection:**
   - Feature check: WebGL 2.0 context availability.
   - Media query check: `(prefers-reduced-motion: reduce)` and viewport width $< 1024\text{px}$.
2. **Fallback Visuals:**
   - Three crisp vector/SVG rendered posters capturing Beat 1, Beat 2, and Beat 3 with identical typography and hairline framing.
   - Smooth CSS crossfade driven by the same segmented control toggle.
   - Zero degraded degradation feel—looks like a deliberate, refined print layout.
