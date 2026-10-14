# MeshDefend — Unified Resilience Observability

> **Production Website & Interactive WebGL Experience**  
> MeshDefend provides multi-vendor enterprise resilience observability across Commvault, Veeam, Dell PowerProtect, and ServiceNow. Correlate overnight signals, eliminate alert fatigue, and generate audit-ready resilience reports automatically.

---

## Architecture & Visual Craft

The platform includes an editorial-grade interactive experience built with Next.js, Three.js, and WebGL:

- **The Overnight Loom (3D Stage):**
  - **Beat 1 ("Each console has its own scale"):** 6 tilted perspective planes representing independent enterprise consoles (Backup, Storage, Cloud, ITSM, CMDB, Security).
  - **Beat 2 ("One shared scale"):** Real 3D geometric folding motion collapsing tilted lanes flat into a single 0–100% threshold plane, highlighting the rising 3-night backup window trend near the SLA limit.
  - **Beat 3 ("Hundreds of signals overnight"):** 600 harmonic hairlines at 8% alpha with 2 prominent illuminated exceptions (Backup warning on `payments-db` and Replication lag).
  - **Modern Creative Engineering:** Living telemetry packet pulses traversing overnight time (22:00 to 07:00), atmospheric volumetric dust field, and critically damped spring physics for pointer parallax.
- **The Report Library (The Index):**
  - Typographic editorial index with dynamic row selection, interactive process flow line, and CSS-3D paper sheet preview.
- **The Action Handoff:**
  - Asymmetric ink band (`#221f22`) where a 1px data line carries active incident context (`payments-db · recovery risk`) into the first letter of *"Incident Resolution"*.
- **The Ask:**
  - Clear enterprise conversion interface with supported vendor telemetry integrations.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack, React 19)
- **3D & Graphics:** [Three.js](https://threejs.org/) (WebGL / WebGPU-ready)
- **Typography:** Instrument Serif (Display), Inter (Body & UI), JetBrains Mono (Data & Ticks)
- **Styling:** CSS Modules & JSX Styles with semantic CSS tokens (`--bg`, `--ink`, `--orange`, `--border`, `--muted`)
- **Theme Support:** Dark & Light modes with automatic CSS variable synchronization into WebGL materials

---

## Getting Started

### Prerequisites

- Node.js 18.18+ or 20+
- npm, pnpm, or yarn

### Installation

```bash
git clone https://github.com/AaryanUpadhyayyyy/meshdefend_website.git
cd meshdefend_website
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) or [http://localhost:3000/platform/observability](http://localhost:3000/platform/observability) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## Documentation

- [`docs/DESIGN_NOTES.md`](./docs/DESIGN_NOTES.md) — Comprehensive design system, mathematical grid ratios, and editorial guidelines.
- [`docs/RESEARCH.md`](./docs/RESEARCH.md) — Modern 3D web design trends, WebGL craft principles, and microinteraction architecture.

