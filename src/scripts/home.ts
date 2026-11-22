/**
 * Homepage behaviour and motion (Stage light).
 * Everything here is progressive enhancement: the page reads and works
 * without it, and with reduced motion only the interactions are wired.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const large = window.matchMedia("(min-width: 64rem)");
const ease = "expo.out";

/** Draw an outline icon's strokes in. */
const drawIcon = (holder: Element | null, delay = 0) => {
  if (reduce || !holder) return;
  const shapes = holder.querySelectorAll("[pathLength]");
  gsap.fromTo(
    shapes,
    { strokeDasharray: 1, strokeDashoffset: 1 },
    {
      strokeDashoffset: 0,
      duration: 0.9,
      delay,
      stagger: 0.08,
      ease: "power2.out",
      clearProps: "strokeDasharray,strokeDashoffset",
    },
  );
};

// ── Problems: pick one, read its answer ─────────────────────────────
const problems = document.querySelector<HTMLElement>("[data-problems]");
if (problems) {
  const tabs = Array.from(problems.querySelectorAll<HTMLButtonElement>("[data-problem-tab]"));
  const panels = Array.from(problems.querySelectorAll<HTMLElement>("[data-problem-panel]"));
  const glider = problems.querySelector<HTMLElement>("[data-problem-glider]");
  let current = 0;

  const moveGlider = (animate: boolean) => {
    const row = tabs[current]?.parentElement;
    if (!glider || !row || !large.matches) return;
    gsap.to(glider, {
      y: row.offsetTop,
      height: row.offsetHeight,
      duration: animate && !reduce ? 0.55 : 0,
      ease,
      overwrite: true,
    });
  };

  const select = (next: number) => {
    if (next === current) return;
    tabs[current]?.setAttribute("aria-expanded", "false");
    panels[current]?.setAttribute("hidden", "");
    current = next;
    const tab = tabs[current];
    const panel = panels[current];
    if (!tab || !panel) return;
    tab.setAttribute("aria-expanded", "true");
    panel.removeAttribute("hidden");
    moveGlider(true);
    drawIcon(tab);
    if (!reduce) {
      gsap.fromTo(
        panel.querySelectorAll("[data-problem-line]"),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease, clearProps: "opacity,transform" },
      );
    }
  };

  tabs.forEach((tab, i) => tab.addEventListener("click", () => select(i)));
  problems.classList.add("has-glider");
  moveGlider(false);
  new ResizeObserver(() => moveGlider(false)).observe(problems);

  ScrollTrigger.create({
    trigger: problems,
    start: "top 75%",
    once: true,
    onEnter: () => tabs.forEach((tab, i) => drawIcon(tab, i * 0.1)),
  });
}

// ── Stage row: one card open, the rest collapsed ────────────────────
const row = document.querySelector<HTMLElement>("[data-stage-row]");
if (row) {
  const cards = Array.from(row.querySelectorAll<HTMLElement>("[data-stage-card]"));
  const toggles = cards.map((card) => card.querySelector<HTMLButtonElement>("[data-stage-toggle]"));
  let intro: gsap.core.Tween[] = [];
  let hoverTimer = 0;

  const open = (index: number) => {
    cards.forEach((card, i) => {
      card.toggleAttribute("data-open", i === index);
      toggles[i]?.setAttribute("aria-expanded", String(i === index));
    });
  };
  const stopIntro = () => {
    intro.forEach((call) => call.kill());
    intro = [];
  };

  cards.forEach((card, i) => {
    card.addEventListener("click", () => {
      stopIntro();
      open(i);
    });
    card.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse") return;
      window.clearTimeout(hoverTimer);
      hoverTimer = window.setTimeout(() => {
        stopIntro();
        open(i);
      }, 110);
    });
    card.addEventListener("pointerleave", () => window.clearTimeout(hoverTimer));
    toggles[i]?.addEventListener("focus", stopIntro);
  });

  const setLive = () => row.classList.toggle("is-live", large.matches);
  setLive();
  large.addEventListener("change", setLive);

  // Once, as the row arrives: open each stage in order, then rest on the first.
  ScrollTrigger.create({
    trigger: row,
    start: "top 60%",
    once: true,
    onEnter: () => {
      if (reduce || !large.matches) return;
      intro = [1, 2, 3, 0].map((index, step) => gsap.delayedCall(0.5 + step * 0.8, () => open(index)));
    },
  });
}

// ── Motion ──────────────────────────────────────────────────────────
if (!reduce) {
  // Hero: the four stage colours drift slowly, and fall behind as you scroll.
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  const shapes = gsap.utils.toArray<HTMLElement>("[data-hero-shape]");
  if (hero && shapes.length) {
    const drift = shapes.map((shape) =>
      gsap.to(shape, {
        x: "random(-36, 36)",
        y: "random(-28, 28)",
        scale: "random(0.94, 1.1)",
        duration: "random(5, 8)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
      }),
    );
    ScrollTrigger.create({
      trigger: hero,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => drift.forEach((tween) => tween.paused(!self.isActive)),
    });
    gsap.to("[data-hero-shapes]", {
      yPercent: -22,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
    });
  }

  // Sections rise as they arrive, staggered within a group.
  gsap.set("[data-rise]", { opacity: 0, y: 32 });
  ScrollTrigger.batch("[data-rise]", {
    start: "top 90%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.09,
        ease,
        overwrite: true,
        clearProps: "opacity,transform",
      }),
  });

  // The closing band grows to full width as it arrives.
  const close = document.querySelector<HTMLElement>("[data-close]");
  if (close) {
    gsap.from(close, {
      scale: 0.92,
      ease: "none",
      scrollTrigger: { trigger: close, start: "top bottom", end: "top 55%", scrub: true },
    });
  }
}

export {};
