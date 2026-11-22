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

// ── Motion ──────────────────────────────────────────────────────────
if (!reduce) {
  // Hero: the four stage colours keep moving, follow the mouse, and fall
  // behind as you scroll.
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  const shapes = gsap.utils.toArray<HTMLElement>("[data-hero-shape]");
  if (hero && shapes.length) {
    // Always moving: each colour swells and wanders on its own slow loop.
    const span = () => window.innerWidth;
    const drift = shapes.map((shape) =>
      gsap.to(shape, {
        x: () => gsap.utils.random(-0.09, 0.09) * span(),
        y: () => gsap.utils.random(-0.05, 0.05) * span(),
        scale: "random(0.85, 1.25)",
        duration: "random(4, 7)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
      }),
    );

    // The colours lean towards the mouse, each at its own rate, with a soft lag.
    // This uses the `translate` property so it adds to the drift above.
    const lean = { x: 0, y: 0 };
    const applyLean = () =>
      shapes.forEach((shape, i) => {
        const reach = (0.05 + i * 0.018) * span();
        shape.style.translate = `${(lean.x * reach).toFixed(1)}px ${(lean.y * reach * 0.7).toFixed(1)}px`;
      });
    const leanTo = (x: number, y: number) =>
      gsap.to(lean, { x, y, duration: 1.6, ease: "power3.out", overwrite: true, onUpdate: applyLean });
    hero.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;
      const box = hero.getBoundingClientRect();
      leanTo((event.clientX - box.left) / box.width - 0.5, (event.clientY - box.top) / box.height - 0.5);
    });
    hero.addEventListener("pointerleave", () => leanTo(0, 0));

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
