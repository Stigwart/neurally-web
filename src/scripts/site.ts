/**
 * Site-wide behaviour: navigation menus and scroll-linked motion.
 * Everything here is progressive enhancement. The pages read and work
 * without it.
 */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// ── Navigation ──────────────────────────────────────────────────────
const bindDisclosure = (toggleSel: string, onChange?: (open: boolean) => void) => {
  const toggle = document.querySelector<HTMLButtonElement>(toggleSel);
  const panelId = toggle?.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : null;
  if (!toggle || !panel) return null;

  const setOpen = (open: boolean) => {
    toggle.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
    onChange?.(open);
  };
  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  toggle.addEventListener("click", () => setOpen(!isOpen()));
  panel.addEventListener("click", (e) => {
    if ((e.target as Element).closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (e) => {
    const target = e.target as Node;
    if (isOpen() && !panel.contains(target) && !toggle.contains(target)) setOpen(false);
  });
  return { setOpen, isOpen, toggle };
};

bindDisclosure("[data-mega-toggle]");
const mobile = bindDisclosure("[data-menu-toggle]", (open) => {
  document.documentElement.style.overflow = open ? "hidden" : "";
  document.querySelector("[data-menu-toggle]")?.setAttribute("aria-label", open ? "Close menu" : "Menu");
});
window.matchMedia("(min-width: 64rem)").addEventListener("change", () => mobile?.setOpen(false));

// ── Reveal on scroll ────────────────────────────────────────────────
const revealables = document.querySelectorAll<HTMLElement>("[data-reveal]");
if (reduceMotion.matches || !("IntersectionObserver" in window)) {
  revealables.forEach((el) => el.classList.add("is-in"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  revealables.forEach((el) => io.observe(el));
}

// ── Scroll progress ─────────────────────────────────────────────────
// Elements with [data-progress] get a --p custom property from 0 to 1 as
// they travel through the viewport. CSS does the rest.
const tracked = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]"));
if (tracked.length && !reduceMotion.matches) {
  let ticking = false;
  const visible = new Set<HTMLElement>();
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    for (const el of visible) {
      const rect = el.getBoundingClientRect();
      const mode = el.dataset.progress;
      // "through": 0 when the top reaches the viewport middle, 1 when the bottom does.
      // default: 0 when the element enters at the bottom, 1 when it leaves at the top.
      const p =
        mode === "through"
          ? (vh * 0.5 - rect.top) / Math.max(rect.height, 1)
          : (vh - rect.top) / (vh + rect.height);
      el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
    }
  };
  const request = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const el = entry.target as HTMLElement;
      if (entry.isIntersecting) visible.add(el);
      else visible.delete(el);
    }
    request();
  });
  tracked.forEach((el) => io.observe(el));
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request, { passive: true });
} else {
  tracked.forEach((el) => el.style.setProperty("--p", "1"));
}

// ── Active step in scroll stories ───────────────────────────────────
document.querySelectorAll<HTMLElement>("[data-story]").forEach((story) => {
  const steps = Array.from(story.querySelectorAll<HTMLElement>("[data-step]"));
  if (!steps.length) return;
  const setActive = (id: string) => {
    story.dataset.active = id;
    steps.forEach((s) => s.toggleAttribute("data-current", s.dataset.step === id));
    story
      .querySelectorAll<HTMLElement>("[data-step-ref]")
      .forEach((r) => r.toggleAttribute("data-current", r.dataset.stepRef === id));
  };
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive((entry.target as HTMLElement).dataset.step!);
      }
    },
    { rootMargin: "-45% 0px -45% 0px" },
  );
  steps.forEach((s) => io.observe(s));
});

export {};
