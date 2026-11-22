/**
 * Stage row: on large screens one stage card is open and the rest collapse
 * to a spine. Progressive enhancement: without this script the cards stack
 * with everything visible. No animation library is needed.
 */
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const large = window.matchMedia("(min-width: 64rem)");

document.querySelectorAll<HTMLElement>("[data-stage-row]").forEach((row) => {
  const cards = Array.from(row.querySelectorAll<HTMLElement>("[data-stage-card]"));
  const toggles = cards.map((card) => card.querySelector<HTMLButtonElement>("[data-stage-toggle]"));
  let intro: number[] = [];
  let hoverTimer = 0;

  const open = (index: number) => {
    cards.forEach((card, i) => {
      card.toggleAttribute("data-open", i === index);
      toggles[i]?.setAttribute("aria-expanded", String(i === index));
    });
  };
  const stopIntro = () => {
    intro.forEach((id) => window.clearTimeout(id));
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
  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        io.disconnect();
        if (!large.matches) return;
        intro = [1, 2, 3, 0].map((index, step) => window.setTimeout(() => open(index), 500 + step * 800));
      },
      { rootMargin: "0px 0px -40% 0px" },
    );
    io.observe(row);
  }
});

export {};
