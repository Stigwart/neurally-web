/**
 * Moves the page glows with the scroll position and the mouse.
 * The glows already drift on a CSS loop; this adds to it through custom
 * properties, so nothing here is needed for them to show.
 */
const glows = Array.from(document.querySelectorAll<HTMLElement>("[data-glow]"));
const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (glows.length && !still && "IntersectionObserver" in window) {
  const visible = new Set<HTMLElement>();
  const target = { x: 0, y: 0 };
  const lean = { x: 0, y: 0 };
  let running = false;

  const frame = () => {
    lean.x += (target.x - lean.x) * 0.06;
    lean.y += (target.y - lean.y) * 0.06;
    const vh = window.innerHeight;
    for (const glow of visible) {
      const host = glow.parentElement;
      if (!host) continue;
      const box = host.getBoundingClientRect();
      // -1 as the host enters at the bottom, 0 at the middle, 1 as it leaves at the top.
      const travel = (vh / 2 - (box.top + box.height / 2)) / (vh / 2 + box.height / 2);
      glow.style.setProperty("--gy", `${(travel * 90).toFixed(1)}px`);
      glow.style.setProperty("--gx", `${(lean.x * 70).toFixed(1)}px`);
      glow.style.setProperty("--gmy", `${(lean.y * 50).toFixed(1)}px`);
    }
    if (visible.size) requestAnimationFrame(frame);
    else running = false;
  };
  const start = () => {
    if (running || !visible.size) return;
    running = true;
    requestAnimationFrame(frame);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const glow = entry.target as HTMLElement;
        if (entry.isIntersecting) visible.add(glow);
        else visible.delete(glow);
      }
      start();
    },
    { rootMargin: "20% 0px" },
  );
  glows.forEach((glow) => io.observe(glow));

  window.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX / window.innerWidth - 0.5;
      target.y = event.clientY / window.innerHeight - 0.5;
    },
    { passive: true },
  );
}

export {};
