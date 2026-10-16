"use client";

import { useEffect, useRef } from "react";
import { NEWS_ARTICLES } from "../content";

export function VintageBroadsheetViewer() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    /* ─── Map Decoupled NEWS_ARTICLES to PAGES ─────────────────────── */
    const PAGES = NEWS_ARTICLES.map((article) => ({
      file: article.spreadImage || article.image,
      title: article.title,
      place: article.publication,
      url: article.spreadImage || article.image,
      externalUrl: article.url,
      excerpt: article.excerpt,
      aspectRatio: "1672 / 941",
    }));

    const M = PAGES.length;
    const LAND = Math.min(1, M - 1);

    const wrap = root.querySelector<HTMLDivElement>("#sbWrap");
    const stage = root.querySelector<HTMLDivElement>("#sbStage");
    const sb3d = root.querySelector<HTMLDivElement>("#sb3d");
    const book = root.querySelector<HTMLDivElement>("#sbBook");
    const capBox = root.querySelector<HTMLDivElement>("#sbCaptions");
    const hint = root.querySelector<HTMLParagraphElement>("#sbHint");
    const zoomWrap = root.querySelector<HTMLDivElement>("#zoomWrap");
    const zoomInner = root.querySelector<HTMLDivElement>("#zoomInner");
    const loupe = root.querySelector<HTMLDivElement>("#loupe");
    const zRead = root.querySelector<HTMLButtonElement | HTMLSpanElement>("#zRead");
    const loupeBtn = root.querySelector<HTMLButtonElement>("#loupeBtn");
    const zInBtn = root.querySelector<HTMLButtonElement>("#zIn");
    const zOutBtn = root.querySelector<HTMLButtonElement>("#zOut");
    const sbLeft = root.querySelector<HTMLButtonElement>("#sbLeft");
    const sbRight = root.querySelector<HTMLButtonElement>("#sbRight");
    const heroDown = root.querySelector<HTMLButtonElement>("#heroDown");
    const plateList = root.querySelector<HTMLOListElement>("#plateList");
    const articleLinkBox = root.querySelector<HTMLDivElement>("#sbArticleLinkBox");
    const pageTurnPill = root.querySelector<HTMLButtonElement>("#pageTurnPill");
    const pageCounter = root.querySelector<HTMLDivElement>("#sbPageCounter");

    if (
      !wrap ||
      !stage ||
      !sb3d ||
      !book ||
      !capBox ||
      !hint ||
      !zoomWrap ||
      !zoomInner
    ) {
      return;
    }

    const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ─── Exact Turning Leaf Physics & Geometry (news.html) ───────── */
    const N = 18;       /* 18 strips — enough for a smooth curve */
    const SPAN = 0.50;  /* gutter → outer page edge, full 50% width without gaps */
    const BETA = 0.60;  /* peak curl of the arc, radians */
    let idx = 0;
    let turn: { dir: "next" | "prev"; from: number; to: number; t: number } | null = null;
    let strips: HTMLDivElement[] = [];

    function el<K extends keyof HTMLElementTagNameMap>(
      t: K,
      c?: string
    ): HTMLElementTagNameMap[K] {
      const e = document.createElement(t);
      if (c) e.className = c;
      return e;
    }

    function imgEl(i: number, side: string) {
      const im = new Image();
      im.className = "sb-half-img " + side;
      im.draggable = false;
      im.alt = PAGES[i].title;
      im.src = PAGES[i].url;
      return im;
    }

    function halfEl(pos: "left" | "right", i: number) {
      const d = el("div", "sb-half " + pos);
      d.appendChild(imgEl(i, pos));
      d.appendChild(el("div", "gutter-shade " + pos));
      return d;
    }

    /* Build the strip chain once per turn; background offsets are pure
       geometry, so they never need touching again while it animates */
    function buildCurl(dir: "next" | "prev", from: number, to: number) {
      strips = [];
      const c = el("div", "curl " + dir);
      c.style.setProperty("--n", String(N));
      c.style.setProperty("--span", String(SPAN));
      let host: HTMLElement = c;
      for (let i = 0; i < N; i++) {
        const s = el("div", "strip");
        s.style.setProperty("--i", String(i));
        const gut = "calc(var(--bw) * 0.5)";
        const sw = "calc(var(--bw) * " + SPAN + " / " + N + ")";
        const A = "calc(-1 * (" + gut + " + " + i + " * " + sw + "))"; /* faces the from-page */
        const B = "calc(" + (i + 1) + " * " + sw + " - " + gut + ")";  /* faces the to-page */
        const f = el("div", "face front");
        const b = el("div", "face back");
        const dress = (e: HTMLElement, url: string, px: string) => {
          e.style.backgroundImage = "url(" + url + ")";
          e.style.backgroundPositionX = px;
        };
        dress(f, PAGES[from].url, dir === "next" ? A : B);
        dress(b, PAGES[to].url, dir === "next" ? B : A);
        f.appendChild(el("div", "sh"));
        f.appendChild(el("div", "gl"));
        b.appendChild(el("div", "sh"));
        b.appendChild(el("div", "gl"));
        s.appendChild(f);
        s.appendChild(b);
        if (i === N - 1) s.classList.add("edge");
        host.appendChild(s);
        host = s;
        strips.push(s);
      }
      return c;
    }

    let lastReportedIdx = -1;
    function updateDockAndCounter(curIdx: number) {
      if (curIdx === lastReportedIdx) return;
      lastReportedIdx = curIdx;

      /* ─── Render Direct News Link Below the Spread ───────────────── */
      if (articleLinkBox) {
        const curArticle = PAGES[curIdx];
        const hostName = curArticle.externalUrl.includes("economictimes")
          ? "economictimes.indiatimes.com"
          : curArticle.externalUrl.includes("bwdisrupt")
          ? "bwdisrupt.com"
          : "Original Coverage";

        articleLinkBox.innerHTML = `
          <a
            href="${curArticle.externalUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="sb-external-news-link"
            title="Read full article on ${curArticle.place}"
          >
            <span class="sb-link-dot" aria-hidden="true"></span>
            <span class="sb-link-text">Read story on <strong>${curArticle.place}</strong></span>
            <span class="sb-link-badge">${hostName}</span>
            <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 3h8v8" />
              <path d="M13 3L6 10" />
            </svg>
          </a>
        `;
      }

      /* ─── Update Spread Counter ─────────────────────────────────── */
      if (pageCounter) {
        pageCounter.innerHTML = `
          <span class="counter-badge">Spread ${curIdx + 1} of ${M}</span>
          <span class="counter-sep">·</span>
          <span>${PAGES[curIdx].place}</span>
        `;
      }
    }

    function applyTurn(t: number) {
      const th = Math.PI * t;                  /* how far the leaf has swung */
      const beta = BETA * Math.sin(Math.PI * t); /* it is flat at both ends */
      const D = 180 / Math.PI;
      const tt = th + beta;
      const td = (2 * beta) / N;
      sb3d!.style.setProperty("--tt", (tt * D).toFixed(2) + "deg");
      sb3d!.style.setProperty("--td", (td * D).toFixed(3) + "deg");
      sb3d!.style.setProperty("--shade", Math.sin(Math.PI * t).toFixed(3));
      fadeCaption(t);
      const activeIdx = turn ? (t >= 0.5 ? turn.to : turn.from) : idx;
      updateDockAndCounter(activeIdx);
      for (let i = 0; i < strips.length; i++) {
        const l1 = Math.abs(Math.cos(tt - i * td));        /* facing at this strip's near edge */
        const l2 = Math.abs(Math.cos(tt - (i + 1) * td));    /* ...and at its far edge */
        const st = strips[i].style;
        st.setProperty("--lit", l1.toFixed(3));
        st.setProperty("--a1", ((1 - l1) * 0.62).toFixed(3));
        st.setProperty("--a2", ((1 - l2) * 0.62).toFixed(3));
      }
    }

    function paint() {
      layout();
      book!.textContent = "";
      book!.style.aspectRatio = "1672 / 941";

      if (!turn) {
        const f = el("div", "sb-full");
        const im = new Image();
        im.src = PAGES[idx].url;
        im.alt = PAGES[idx].title;
        im.draggable = false;
        f.appendChild(im);
        book!.appendChild(f);
        sb3d!.style.setProperty("--shade", "0");
      } else {
        const next = turn.dir === "next";
        book!.appendChild(halfEl("left", next ? turn.from : turn.to));
        book!.appendChild(halfEl("right", next ? turn.to : turn.from));
        book!.appendChild(buildCurl(turn.dir, turn.from, turn.to));
        applyTurn(turn.t);
      }
      const a = el("button", "sb-zone sb-prev");
      const b = el("button", "sb-zone sb-next");
      a.setAttribute("aria-label", "previous page");
      b.setAttribute("aria-label", "next page");
      book!.appendChild(a);
      book!.appendChild(b);
      layout();
      caption();
      marks();
      syncZoomLayer();
      placeLoupe();
    }

    let capOut: HTMLElement | null = null;
    let capIn: HTMLElement | null = null;

    function caption() {
      capBox!.textContent = "";
      capOut = capIn = null;
      const curIdx = turn ? (turn.t >= 0.5 ? turn.to : turn.from) : idx;

      if (turn) {
        capOut = el("p", "sb-caption live");
        capOut.textContent = PAGES[turn.from].title;
        capBox!.appendChild(capOut);
        capIn = el("p", "sb-caption live");
        capIn.textContent = PAGES[turn.to].title;
        capBox!.appendChild(capIn);
        fadeCaption(turn.t);
      } else {
        const p = el("p", "sb-caption");
        p.textContent = PAGES[idx].title;
        capBox!.appendChild(p);
      }

      updateDockAndCounter(curIdx);
    }

    function fadeCaption(t: number) {
      if (!capOut || !capIn) return;
      /* The old title is gone before the new one arrives, so they never
         sit on top of each other mid-drag */
      const out = 1 - Math.max(0, Math.min(1, (t - 0.1) / 0.28));
      const inn = Math.max(0, Math.min(1, (t - 0.56) / 0.3));
      capOut.style.opacity = out.toFixed(3);
      capIn.style.opacity = inn.toFixed(3);
    }

    function layout() {
      sb3d!.style.setProperty("--bw", book!.clientWidth + "px");
    }

    /* ─── Spring Loop Physics ─────────────────────────────────────── */
    type SpringState =
      | { kind: "spring"; v: number; target: number; done?: () => void; k: number; c: number }
      | { kind: "tween"; from: number; target: number; dur: number; e: number; done?: () => void };

    let spring: SpringState | null = null;

    function animateTo(
      target: number,
      onDone?: () => void,
      stiff?: number,
      damp?: number
    ) {
      spring = {
        kind: "spring",
        v: 0,
        target: target,
        done: onDone,
        k: stiff || 150,
        c: damp || 22,
      };
      kick();
    }

    /* The riffle wants a fixed tempo, not a spring settling time */
    function tweenTo(target: number, dur: number, onDone?: () => void) {
      spring = {
        kind: "tween",
        from: turn ? turn.t : 0,
        target: target,
        dur: dur,
        e: 0,
        done: onDone,
      };
      kick();
    }

    let raf: number | null = null;
    let last = 0;

    function tick(now: number) {
      raf = null;
      const dt = Math.min(0.032, (now - last) / 1000 || 0.016);
      last = now;
      if (spring && turn) {
        const s = spring;
        if (s.kind === "tween") {
          s.e += dt;
          const k = Math.min(1, s.e / s.dur);
          // Fluid sinusoidal easing that matches physical paper swing by hand
          const progress = 0.5 - 0.5 * Math.cos(Math.PI * k);
          turn.t = s.from + (s.target - s.from) * progress;
          applyTurn(turn.t);
          if (k >= 1) {
            turn.t = s.target;
            applyTurn(turn.t);
            spring = null;
            const d = s.done;
            if (d) d();
          }
        } else {
          const x = turn.t - s.target;
          s.v += (-s.k * x - s.c * s.v) * dt;
          turn.t += s.v * dt;
          const isNear = Math.abs(turn.t - s.target) < 0.005 && Math.abs(s.v) < 0.05;
          const isPast = (s.target === 1 && turn.t >= 1) || (s.target === 0 && turn.t <= 0);
          if (isNear || isPast) {
            turn.t = s.target;
            spring = null;
            applyTurn(turn.t);
            const d = s.done;
            if (d) d();
          } else {
            applyTurn(turn.t);
          }
        }
      }
      viewSpring();
      const lmoved = loupeEase();
      /* kick() may already have queued the next frame from a done-callback */
      if ((spring || viewActive || lmoved) && raf === null) {
        raf = requestAnimationFrame(tick);
      }
    }

    function kick() {
      if (raf === null) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    }

    /* ─── Tilt & Zoom of the Broadsheet Book ───────────────────────── */
    const TILT_X = 4.5;
    const TILT_Y = 7; /* degrees — deliberately restrained */
    const ZOOM_MIN = 0.85;
    const ZOOM_MAX = 2.2;
    const view = { rx: 0, ry: 0, z: 1, trx: 0, try_: 0, tz: 1 };
    let viewActive = false;
    let lastZ = 1;

    function applyView() {
      sb3d!.style.setProperty("--rx", view.rx.toFixed(2) + "deg");
      sb3d!.style.setProperty("--ry", view.ry.toFixed(2) + "deg");
      sb3d!.style.setProperty("--zoom", view.z.toFixed(3));
      /* The glass stays put, but the page under it has moved */
      if (view.z !== lastZ) {
        lastZ = view.z;
        placeLoupe();
      }
    }

    function viewSpring() {
      const e = 0.14;
      let moved = false;
      const keys: Array<["rx" | "ry" | "z", "trx" | "try_" | "tz"]> = [
        ["rx", "trx"],
        ["ry", "try_"],
        ["z", "tz"],
      ];
      for (const [k, t] of keys) {
        const d = view[t] - view[k];
        if (Math.abs(d) > 0.0006) {
          view[k] += d * e;
          moved = true;
        } else {
          view[k] = view[t];
        }
      }
      if (moved) applyView();
      viewActive = moved;
      return moved;
    }

    function setView(rx: number, ry: number, z: number) {
      view.trx = Math.max(-TILT_X, Math.min(TILT_X, rx));
      view.try_ = Math.max(-TILT_Y, Math.min(TILT_Y, ry));
      view.tz = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));
      viewActive = true;
      kick();
      syncZoom();
    }

    /* The book leans toward the cursor — no dragging, and never far */
    function tiltTo(cx: number, cy: number) {
      if (drag) return; /* hold still while a page is being turned */
      const r = book!.getBoundingClientRect();
      if (!r.width) return;
      const nx = Math.max(-1, Math.min(1, (cx - (r.left + r.width / 2)) / (r.width * 0.62)));
      const ny = Math.max(-1, Math.min(1, (cy - (r.top + r.height / 2)) / (r.height * 0.9)));
      setView(-ny * TILT_X, nx * TILT_Y, view.tz);
    }

    /* ─── Pointer & Touch Gestures ────────────────────────────────── */
    interface DragState {
      dir: "next" | "prev";
      x0: number;
      w: number;
      moved: number;
      vel: number;
      tPrev: number;
    }
    let drag: DragState | null = null;

    function bookRect() {
      return book!.getBoundingClientRect();
    }

    function hideHint() {
      hint!.classList.add("gone");
    }

    const onStagePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      // Only capture pointer on the page reading zones, never on buttons, pills, dock, or outer stage
      const onBook = target?.closest(".sb-zone");
      if (!onBook || introOn) return;

      e.preventDefault();
      stage.setPointerCapture(e.pointerId);
      hideHint();

      const r = bookRect();
      const dir = (e.clientX - r.left) / r.width > 0.5 ? "next" : "prev";
      startTurn(dir, 0);
      drag = {
        dir: dir,
        x0: e.clientX,
        w: r.width,
        moved: 0,
        vel: 0,
        tPrev: performance.now(),
      };
    };

    const onStagePointerMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x0;
      drag.moved = Math.max(drag.moved, Math.abs(dx));
      const raw = (drag.dir === "next" ? -dx : dx) / (drag.w * 0.62);
      const t = Math.max(0, Math.min(1, raw));
      const now = performance.now();
      drag.vel = (t - (turn ? turn.t : 0)) / Math.max(0.001, (now - drag.tPrev) / 1000);
      drag.tPrev = now;
      if (turn) {
        turn.t = t;
        applyTurn(t);
      }
    };

    function endDrag() {
      if (!drag) return;
      const d = drag;
      drag = null;
      if (!turn) return;
      if (d.moved < 6) { /* a tap, not a drag */
        commit();
        return;
      }
      const go = turn.t > 0.42 || d.vel > 1.1;
      if (go) commit();
      else cancel();
    }

    /* ─── Turn Control ────────────────────────────────────────────── */
    function startTurn(dir: "next" | "prev", t?: number) {
      spring = null;
      if (turn) {
        idx = turn.to;
        turn = null;
      } /* settle anything still in flight */
      shoveLoupe(dir);
      const from = idx;
      turn = {
        dir: dir,
        from: from,
        to: dir === "next" ? (from + 1) % M : (from - 1 + M) % M,
        t: t || 0,
      };
      paint();
    }

    function commit() {
      if (!turn) return;
      const remainingDist = Math.max(0.01, 1 - turn.t);
      // Natural 0.78s broadsheet page turn duration, matching physical mouse-drag speed
      const dur = Math.max(0.25, remainingDist * 0.78);
      tweenTo(1, dur, () => {
        if (turn) idx = turn.to;
        turn = null;
        paint();
      });
    }

    function cancel() {
      if (!turn) return;
      const remainingDist = Math.max(0.01, turn.t);
      const dur = Math.max(0.20, remainingDist * 0.65);
      tweenTo(0, dur, () => {
        turn = null;
        paint();
      });
    }

    function step(dir: "next" | "prev") {
      if (introOn) endIntro();
      if (turn) {
        idx = turn.to;
        turn = null;
      }
      startTurn(dir, 0);
      commit();
    }

    function goTo(i: number) {
      if (introOn) endIntro();
      if (i === idx) return;
      if (turn) {
        idx = turn.to;
        turn = null;
      }
      const fwd = (i - idx + M) % M;
      const back = (idx - i + M) % M;
      if (Math.min(fwd, back) === 1) {
        step(fwd === 1 ? "next" : "prev");
        return;
      }
      idx = i;
      paint();
    }

    /* ─── Loupe & Magnifier Controls (news.html) ─────────────────── */
    const MAG = 2.3;
    let loupeOn = false;
    let lx: number | null = null;
    let ly: number | null = null;
    let lgrab: { cx: number; cy: number; lx0: number; ly0: number } | null = null;
    let lTarget: { x: number; y: number } | null = null;

    function loupeSize() {
      return Math.round(Math.max(165, Math.min(262, book!.clientWidth * 0.235)));
    }

    function bookBox() {
      return { x: 0, y: 0, w: book!.clientWidth, h: book!.clientHeight };
    }

    /* Park it on the desk at the lower right, half off the book */
    function restLoupe() {
      if (!loupe) return;
      const b = bookBox();
      lx = b.x + b.w * 0.88;
      ly = b.y + b.h * 0.855;
      placeLoupe();
    }

    /* Mirror whatever the book is currently showing into the magnified copy */
    function syncZoomLayer() {
      zoomInner!.textContent = "";
      for (let i = 0; i < book!.children.length; i++) {
        const c = book!.children[i];
        if (c.classList.contains("sb-zone")) continue;
        zoomInner!.appendChild(c.cloneNode(true));
      }
    }

    /* Exact coordinate math matching news.html and 1760/1240 bounds */
    function placeLoupe() {
      if (!loupe || lx === null || ly === null) return;
      const B = bookBox();
      const bw = B.w;
      const bh = B.h;
      if (!bw || !bh) return;

      const R = loupeSize() / 2;
      const bez = R * 2 * 0.028;
      loupe.style.setProperty("--lr", R * 2 + "px");
      loupe.style.transform =
        "translate3d(" + (lx - R).toFixed(1) + "px," + (ly - R).toFixed(1) + "px,0)";
      if (loupeOn) loupe.classList.add("on");

      /* where the paper's edges actually land once the book is scaled */
      const z = view.z;
      const cx = bw / 2;
      const cy = bh / 2;
      const x0 = cx + (bw * 0.051 - cx) * z;
      const x1 = cx + (bw * 0.949 - cx) * z;
      const y0 = cy + (bh * 0.218 - cy) * z;
      const y1 = cy + (bh * 0.782 - cy) * z;

      /* How far the glass's own centre is inside the paper. The copy fades out
         as it wanders off the sheet, so you are left looking through plain
         glass rather than at a sliver of page on flat desk. */
      const nx = Math.max(x0, Math.min(lx, x1));
      const ny = Math.max(y0, Math.min(ly, y1));
      const inside =
        lx > x0 && lx < x1 && ly > y0 && ly < y1
          ? Math.min(lx - x0, x1 - lx, ly - y0, y1 - ly)
          : -Math.hypot(lx - nx, ly - ny);

      const k = Math.max(0, Math.min(1, (inside + R * 0.3) / (R * 0.55)));

      zoomWrap!.style.opacity = (loupeOn ? k : 0).toFixed(3);
      if (k <= 0.002) return;

      const r = (R - bez).toFixed(1);
      const mask =
        "radial-gradient(circle " +
        r +
        "px at " +
        lx.toFixed(1) +
        "px " +
        ly.toFixed(1) +
        "px,#000 calc(100% - 1px),transparent 100%)";
      zoomWrap!.style.webkitMaskImage = mask;
      zoomWrap!.style.maskImage = mask;

      /* The page point beneath the glass, magnified about that same spot so the
         lens keeps showing MAG times whatever is on screen */
      const px = cx + (lx - cx) / z;
      const py = cy + (ly - cy) / z;
      const s = MAG * z;
      zoomInner!.style.transform =
        "translate(" +
        (lx - px * s).toFixed(1) +
        "px," +
        (ly - py * s).toFixed(1) +
        "px) scale(" +
        s.toFixed(4) +
        ")";
    }

    /* The leaf shoves the glass aside as it sweeps past */
    function shoveLoupe(dir: "next" | "prev") {
      if (!loupeOn || lx === null || ly === null || lgrab) return;
      const b = bookBox();
      const nx = (b.w / 2 + (lx - b.x - b.w / 2) / view.z) / b.w;
      const ny = (b.h / 2 + (ly - b.y - b.h / 2) / view.z) / b.h;
      if (nx < 0.02 || nx > 0.98 || ny < 0.17 || ny > 0.83) return;
      lTarget = {
        x: b.x + b.w * (dir === "next" ? 0.12 : 0.88),
        y: b.y + b.h * 0.855,
      };
      kick();
    }

    function loupeEase() {
      if (!lTarget || lx === null || ly === null) return false;
      if (lgrab) {
        lTarget = null;
        return false;
      }
      const dx = lTarget.x - lx;
      const dy = lTarget.y - ly;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        lx = lTarget.x;
        ly = lTarget.y;
        lTarget = null;
        placeLoupe();
        return false;
      }
      lx += dx * 0.17;
      ly += dy * 0.17;
      placeLoupe();
      return true;
    }

    const onLoupePointerDown = (e: PointerEvent) => {
      if (!loupeOn || e.button !== 0 || lx === null || ly === null) return;
      e.preventDefault();
      e.stopPropagation(); /* never starts a page turn */
      lTarget = null;
      lgrab = { cx: e.clientX, cy: e.clientY, lx0: lx, ly0: ly };
      loupe!.classList.add("held");
      loupe!.setPointerCapture(e.pointerId);
      hideHint();
    };

    const onLoupePointerMove = (e: PointerEvent) => {
      if (!lgrab) return;
      const b = bookBox();
      const R = loupeSize() / 2;
      /* the glass carries none of the book's transform, so the cursor maps 1:1 */
      lx = Math.max(
        b.x - R * 0.7,
        Math.min(b.x + b.w + R * 0.7, lgrab.lx0 + (e.clientX - lgrab.cx))
      );
      ly = Math.max(
        b.y - R * 0.7,
        Math.min(b.y + b.h + R * 1.0, lgrab.ly0 + (e.clientY - lgrab.cy))
      );
      placeLoupe();
    };

    function dropLoupe() {
      lgrab = null;
      loupe!.classList.remove("held");
    }

    function syncZoom() {
      if (zRead) zRead.textContent = Math.round(view.tz * 100) + "%";
      if (zOutBtn) zOutBtn.disabled = view.tz <= ZOOM_MIN + 0.001;
      if (zInBtn) zInBtn.disabled = view.tz >= ZOOM_MAX - 0.001;
    }

    /* ─── The Index Plates (Exact news.html) ───────────────────────── */
    function marks() {
      if (!plateList) return;
      const cur = turn ? (turn.t >= 0.5 ? turn.to : turn.from) : idx;
      const items = plateList.querySelectorAll<HTMLButtonElement>(".plate");
      items.forEach((b, i) =>
        b.setAttribute("aria-current", i === cur ? "true" : "false")
      );
    }

    if (plateList) {
      plateList.innerHTML = "";
      PAGES.forEach((p, i) => {
        const li = el("li");
        const b = el("button", "plate");
        b.innerHTML =
          '<span class="n">' +
          String(i + 1).padStart(2, "0") +
          "</span>" +
          '<span class="t"></span><span class="p"></span>';
        const tEl = b.querySelector<HTMLSpanElement>(".t");
        const pEl = b.querySelector<HTMLSpanElement>(".p");
        if (tEl) tEl.textContent = p.title;
        if (pEl) pEl.textContent = p.place;
        b.onclick = () => {
          goTo(i);
          document
            .getElementById("sketchbook")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        };
        li.appendChild(b);
        plateList.appendChild(li);
      });
    }

    /* ─── The Riffle Intro Sequence ───────────────────────────────── */
    let riffle: Array<{ bell: number; dur: number }> | null = null;
    let riffleAt = 0;
    let introOn = false;

    function endIntro() {
      introOn = false;
      wrap!.classList.remove("intro", "b2");
    }

    function riffleStep() {
      if (!riffle || riffleAt >= riffle.length) {
        endIntro();
        paint();
        return;
      }
      const s = riffle[riffleAt];
      wrap!.classList.toggle("b2", s.bell > 0.55);
      startTurn("next", 0);
      tweenTo(1, s.dur, () => {
        if (turn) idx = turn.to;
        turn = null;
        riffleAt++;
        if (introOn && riffle && riffleAt < riffle.length) {
          paint();
          riffleStep();
        } else {
          endIntro();
          paint();
        }
      });
    }

    function startIntro() {
      const coarse = window.matchMedia(
        "(max-width: 640px), (pointer: coarse)"
      ).matches;
      if (coarse || REDUCED) {
        idx = LAND;
        paint();
        return;
      }
      const steps = M + LAND;
      riffle = [];
      for (let r = 0; r < steps; r++) {
        const bell = Math.sin(Math.PI * (r / (steps - 1)));
        riffle.push({ bell: bell, dur: 0.26 - 0.19 * bell });
      }
      riffleAt = 0;
      introOn = true;
      wrap!.classList.add("intro");
      riffleStep();
    }

    /* ─── Event Listeners ─────────────────────────────────────────── */
    const onResizeWindow = () => {
      layout();
      lx = null;
      restLoupe();
    };

    const onPointerMoveWindow = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      tiltTo(e.clientX, e.clientY);
    };

    const onPointerOutWindow = (e: PointerEvent) => {
      if (!e.relatedTarget) setView(0, 0, view.tz);
    };

    const onBlurWindow = () => setView(0, 0, view.tz);

    const onKeyDownWindow = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
      ) {
        return;
      }
      e.preventDefault();
      hideHint();
      step(e.key === "ArrowRight" ? "next" : "prev");
    };

    stage.addEventListener("pointerdown", onStagePointerDown);
    stage.addEventListener("pointermove", onStagePointerMove);
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);
    stage.addEventListener("dragstart", (e) => e.preventDefault());
    stage.addEventListener("selectstart", (e) => e.preventDefault());
    stage.addEventListener("dblclick", () => setView(view.trx, view.try_, 1));

    if (loupe) {
      loupe.addEventListener("pointerdown", onLoupePointerDown);
      loupe.addEventListener("pointermove", onLoupePointerMove);
      loupe.addEventListener("pointerup", dropLoupe);
      loupe.addEventListener("pointercancel", dropLoupe);

      if (loupeBtn) {
        loupeBtn.onclick = () => {
          loupeOn = !loupeOn;
          loupeBtn.setAttribute("aria-pressed", String(loupeOn));
          loupe.classList.toggle("on", loupeOn);
          if (loupeOn && lx === null) restLoupe();
        };
      }
    }

    const ZOOM_STEPS = [0.85, 1.0, 1.15, 1.30, 1.50, 1.75, 2.0];

    if (zInBtn) {
      zInBtn.onclick = (e) => {
        e.stopPropagation();
        const next = ZOOM_STEPS.find((s) => s > view.tz + 0.02) || ZOOM_MAX;
        setView(view.trx, view.try_, next);
        hideHint();
      };
    }

    if (zOutBtn) {
      zOutBtn.onclick = (e) => {
        e.stopPropagation();
        const prev = [...ZOOM_STEPS].reverse().find((s) => s < view.tz - 0.02) || ZOOM_MIN;
        setView(view.trx, view.try_, prev);
        hideHint();
      };
    }

    if (zRead) {
      zRead.onclick = (e) => {
        e.stopPropagation();
        setView(0, 0, 1.0);
        hideHint();
      };
    }

    const onStageDblClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("#loupe") ||
        target?.closest(".sb-arrow") ||
        target?.closest(".page-turn-pill") ||
        target?.closest(".newsbook-dock")
      ) {
        return;
      }
      if (view.tz > 1.05) {
        setView(0, 0, 1.0);
      } else {
        setView(view.trx, view.try_, 1.3);
      }
      hideHint();
    };

    const onStageWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.1 : 0.9;
        setView(view.trx, view.try_, Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, view.tz * factor)));
        hideHint();
      }
    };

    stage.addEventListener("dblclick", onStageDblClick);
    stage.addEventListener("wheel", onStageWheel, { passive: false });

    const triggerPrev = (e?: Event) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      hideHint();
      step("prev");
    };

    const triggerNext = (e?: Event) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      hideHint();
      step("next");
    };

    if (sbLeft) {
      sbLeft.onclick = triggerPrev;
    }
    if (sbRight) {
      sbRight.onclick = triggerNext;
    }
    if (pageTurnPill) {
      pageTurnPill.onclick = triggerNext;
    }

    if (heroDown) {
      heroDown.onclick = () => {
        root
          .querySelector("#about")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      };
    }

    window.addEventListener("pointermove", onPointerMoveWindow, { passive: true });
    window.addEventListener("pointerout", onPointerOutWindow);
    window.addEventListener("blur", onBlurWindow);
    window.addEventListener("keydown", onKeyDownWindow);
    window.addEventListener("resize", onResizeWindow);

    /* ─── Boot Sequence ───────────────────────────────────────────── */
    (async function boot() {
      setView(0, 0, 1.0);
      paint();
      applyView();

      await Promise.all(
        PAGES.map((p) => {
          const im = new Image();
          im.src = p.url;
          return im.decode
            ? im.decode().catch(() => {})
            : new Promise((r) => {
                im.onload = im.onerror = r;
              });
        })
      );

      syncZoom();
      restLoupe();
    })();

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      stage.removeEventListener("pointerdown", onStagePointerDown);
      stage.removeEventListener("pointermove", onStagePointerMove);
      stage.removeEventListener("pointerup", endDrag);
      stage.removeEventListener("pointercancel", endDrag);
      stage.removeEventListener("dblclick", onStageDblClick);
      stage.removeEventListener("wheel", onStageWheel);
      if (loupe) {
        loupe.removeEventListener("pointerdown", onLoupePointerDown);
        loupe.removeEventListener("pointermove", onLoupePointerMove);
        loupe.removeEventListener("pointerup", dropLoupe);
        loupe.removeEventListener("pointercancel", dropLoupe);
      }
      window.removeEventListener("pointermove", onPointerMoveWindow);
      window.removeEventListener("pointerout", onPointerOutWindow);
      window.removeEventListener("blur", onBlurWindow);
      window.removeEventListener("keydown", onKeyDownWindow);
      window.removeEventListener("resize", onResizeWindow);
    };
  }, []);

  return (
    <div ref={rootRef}>
      {/* ─── Sketchbook / Broadsheet Hero (news.html) ────────────────── */}
      <section id="sketchbook" className="hero">
        <p className="hero-kicker">
          <span className="masthead-sunset-dot" />
          The Resilience Gazette · Dispatches · Press Coverage &amp; Milestones
        </p>

        <div className="sb-wrap" id="sbWrap">
          <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
            <filter id="sb-mblur-1">
              <feGaussianBlur stdDeviation="5 0" />
            </filter>
            <filter id="sb-mblur-2">
              <feGaussianBlur stdDeviation="14 0" />
            </filter>
          </svg>

          <div className="sb-stage" id="sbStage">
            {/* Enhanced Left Arrow Button */}
            <button className="sb-arrow left" id="sbLeft" aria-label="previous page" title="Turn to previous page">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* 3D Box & Exact 1760/1240 Broadsheet Book (Little Larger: 1040px) */}
            <div className="sb-3d" id="sb3d">
              <div className="sb-tilt" id="sbTilt">
                <div className="sb-book" id="sbBook" />
              </div>

              <div className="zoomwrap" id="zoomWrap" aria-hidden="true">
                <div className="zoominner" id="zoomInner" />
              </div>
            </div>

            {/* Enhanced Right Arrow Button with "Turn Page" Callout Pill for New Users */}
            <button className="sb-arrow right" id="sbRight" aria-label="next page" title="Turn to next page">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              {/* Callout Pill Showing New Users How to Turn the Page */}
              <span className="page-turn-pill" id="pageTurnPill" title="Click to turn to the next page">
                <span>Turn page</span>
                <span className="pill-arrow">→</span>
              </span>
            </button>
          </div>

          {/* ─── DOCKED ACTION BAR: Website Link + Zoom Controls Directly Below News Page ─── */}
          <div className="newsbook-dock" id="newsbookDock" role="toolbar" aria-label="Broadsheet reader controls">
            {/* Website Link Box (Updated dynamically per active spread) */}
            <div className="newsbook-website-box" id="sbArticleLinkBox" />

            <div className="newsbook-dock-divider" aria-hidden="true" />

            {/* Broadsheet Zoom In / Out & Magnifier Controls */}
            <div className="newsbook-zoom-cluster" role="group" aria-label="Newsbook Zoom Controls">
              <span className="zoom-ctrl-label" id="zoomLabel">Zoom:</span>

              <button
                type="button"
                className="newsbook-zoom-btn"
                id="zOut"
                aria-label="Zoom out newsbook"
                title="Zoom out (−)"
              >
                <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="5" y1="10" x2="15" y2="10" />
                </svg>
              </button>

              <button
                type="button"
                className="newsbook-zoom-badge"
                id="zRead"
                aria-label="Current zoom level. Click to reset to 100%"
                title="Click to reset zoom to 100%"
              >
                100%
              </button>

              <button
                type="button"
                className="newsbook-zoom-btn"
                id="zIn"
                aria-label="Zoom in newsbook"
                title="Zoom in (+)"
              >
                <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="5" y1="10" x2="15" y2="10" />
                  <line x1="10" y1="5" x2="10" y2="15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Sub-bar: Spread Counter & Active Headline Caption */}
          <div className="newsbook-meta-bar">
            <div className="sb-page-counter" id="sbPageCounter" />
            <div className="sb-captions" id="sbCaptions" />
          </div>

          <p className="sb-hint" id="sbHint">
            Click arrows or drag edge to turn page · Use zoom controls (+/-) or double-click to scale
          </p>
        </div>

        <button className="hero-down" id="heroDown" aria-label="scroll to about">
          <svg viewBox="0 0 44 22" width="34" height="17" fill="none" aria-hidden="true">
            <polyline
              points="3,3 22,11 41,3"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="3,11 22,19 41,11"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </section>

      {/* Painted Divider Rule */}
      <div className="rule" aria-hidden="true" />

      {/* ─── About Section (Exact news.html) ─────────────────────────── */}
      <section id="about" className="about">
        <div>
          <p className="section-label">About MeshDefend</p>
          <p className="bio">
            MeshDefend is the autonomous enterprise operations layer for backup, recovery, and resilience. Founded by former Dell infrastructure leaders <a className="bio-link" href="#plates">Tejas Pandit and Ravi Chitloor</a>, the platform delivers ResOC (Resilience Operations Center) powered by patent-pending <a className="bio-link" href="/platform">Agent Mesh™</a> technology. Enterprise backup environments are vast, fragmented, and vulnerable to silent failures across Commvault, Veeam, Dell PowerProtect, and multi-cloud vaults. MeshDefend unifies operations, proactively validates recovery readiness, and eliminates catastrophic downtime before it strikes. The company has secured $2.3 million in seed funding led by <a className="bio-link" href="https://economictimes.indiatimes.com/tech/funding/ai-enterprise-ops-startup-meshdefend-raises-2-3-million-in-round-led-by-kalaari-capital/articleshow/125111852.cms" target="_blank" rel="noopener noreferrer">Kalaari Capital</a> with participation from Kettleborough VC.
          </p>
        </div>
      </section>

      {/* Short Painted Divider Rule */}
      <div className="rule short" aria-hidden="true" />

      {/* ─── Plates Index (Exact news.html) ─────────────────────────── */}
      <section id="plates" className="plates">
        <p className="section-label">Plates · Media Coverage</p>
        <ol className="plate-list" id="plateList" />
      </section>
    </div>
  );
}
