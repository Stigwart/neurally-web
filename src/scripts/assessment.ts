/**
 * AI maturity assessment: one question per screen, scored in the browser.
 * Nothing is stored. Answers leave the browser only if the visitor sends
 * the results form (Web3Forms), the same as the contact form.
 */
import {
  DIMENSIONS,
  LEVELS,
  QUESTIONS,
  SCORED_QS,
  SIZE_Q,
  TRIGGER_Q,
  decode,
  encode,
  score,
  type Result,
} from "../data/assessment";
import { appendLink, clearOnInput, readConfig, setStatus, submit, validate } from "./forms";

declare global {
  interface Window {
    goatcounter?: { count?: (opts: { path: string; title: string; event: boolean }) => void };
  }
}

const root = document.querySelector<HTMLElement>("#assessment");

if (root) {
  const TOTAL = QUESTIONS.length;
  const FALLBACK_EMAIL = root.dataset.email ?? "hello@neurally.co.uk";
  const config = readConfig(root);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const el = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
  const screens = { intro: el("screen-intro"), quiz: el("screen-quiz"), result: el("screen-result") };
  type Screen = keyof typeof screens;
  const show = (name: Screen) => {
    (Object.keys(screens) as Screen[]).forEach((k) => (screens[k].hidden = k !== name));
  };

  let answers: (number | undefined)[] = [];
  let current = 0;
  let advanceTimer: number | undefined;

  const shareUrl = (a: number[]) => `${location.origin}${location.pathname}#r=${encode(a)}`;

  // ── Quiz screen ───────────────────────────────────────────────────
  const progress = el("progress");
  const progressBar = el("progress-bar");
  const progressLabel = el("progress-label");
  const qTitle = el("q-title");
  const qHint = el("q-hint");
  const qOptions = el("q-options");
  const backBtn = el<HTMLButtonElement>("q-back");
  const nextBtn = el<HTMLButtonElement>("q-next");
  const nextLabel = nextBtn.querySelector("span") ?? nextBtn;

  const renderQuestion = () => {
    const q = QUESTIONS[current]!;
    const n = current + 1;
    progress.setAttribute("aria-valuenow", String(n));
    progressBar.style.width = `${(n / TOTAL) * 100}%`;
    progressLabel.textContent = `Question ${n} of ${TOTAL}`;
    qTitle.textContent = q.title;
    qHint.textContent = q.hint ?? "";
    qHint.hidden = !q.hint;
    qOptions.textContent = "";
    const dim = q.dim !== undefined ? DIMENSIONS[q.dim]! : null;
    if (dim) screens.quiz.dataset.stage = dim.key;
    else delete screens.quiz.dataset.stage;

    q.options.forEach((text, i) => {
      const label = document.createElement("label");
      label.className =
        "assess-option group border-line-strong hover:border-fg has-checked:border-stage has-checked:bg-surface flex cursor-pointer items-center gap-4 rounded-md border px-4 py-4 transition-colors duration-fast has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${current}`;
      input.value = String(i);
      input.className = "sr-only";
      input.checked = answers[current] === i;
      const key = document.createElement("span");
      key.className =
        "border-line-strong text-muted group-has-checked:bg-stage group-has-checked:border-stage group-has-checked:text-bg grid size-7 shrink-0 place-items-center rounded-sm border font-mono text-label transition-colors duration-fast";
      key.setAttribute("aria-hidden", "true");
      key.textContent = String(i + 1);
      const span = document.createElement("span");
      span.textContent = text;
      label.append(input, key, span);
      qOptions.appendChild(label);
    });

    backBtn.hidden = current === 0;
    nextBtn.disabled = answers[current] === undefined;
    nextLabel.textContent = current === TOTAL - 1 ? "See my result" : "Next";
    qTitle.focus({ preventScroll: true });
  };

  const next = () => {
    window.clearTimeout(advanceTimer);
    if (answers[current] === undefined) return;
    if (current === TOTAL - 1) {
      renderResult(answers as number[], true);
      return;
    }
    current++;
    renderQuestion();
  };

  const back = () => {
    window.clearTimeout(advanceTimer);
    if (current === 0) return;
    current--;
    renderQuestion();
  };

  const choose = (i: number, advance: boolean) => {
    answers[current] = i;
    const input = qOptions.querySelectorAll<HTMLInputElement>("input")[i];
    if (input) input.checked = true;
    nextBtn.disabled = false;
    if (advance) {
      window.clearTimeout(advanceTimer);
      advanceTimer = window.setTimeout(next, reduceMotion ? 0 : 260);
    }
  };

  qOptions.addEventListener("click", (e) => {
    const input = (e.target as Element).closest("input");
    if (!input) return;
    // Pointer clicks advance; arrow-key selection (detail 0) waits for Next.
    choose(Number(input.value), e.detail > 0);
  });
  nextBtn.addEventListener("click", next);
  backBtn.addEventListener("click", back);

  screens.quiz.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const n = parseInt(e.key, 10);
    const q = QUESTIONS[current]!;
    if (n >= 1 && n <= q.options.length) {
      e.preventDefault();
      choose(n - 1, true);
    } else if (e.key === "Enter" && !nextBtn.disabled && (e.target as Element).tagName !== "BUTTON") {
      e.preventDefault();
      next();
    }
  });

  // ── Result screen ─────────────────────────────────────────────────
  const summaryText = (a: number[], r: Result) => {
    const lines = [
      "AI maturity assessment result",
      `Scenario: ${LEVELS[r.level]!.name} (${r.total} of 24)`,
      "",
    ];
    DIMENSIONS.forEach((d, i) => lines.push(`${d.name}: ${r.dims[i]} of 6`));
    lines.push("", `Organisation size: ${SIZE_Q.options[a[0]!]}`);
    lines.push(`Most pressing: ${TRIGGER_Q.options[a[TOTAL - 1]!]}`, "");
    SCORED_QS.forEach((q, i) => lines.push(`${q.title} ${q.options[a[i + 1]!]} (${a[i + 1]}/3)`));
    lines.push("", `Reopen their result: ${shareUrl(a)}`);
    return lines.join("\n");
  };

  let currentAnswers: number[] | null = null;
  let currentResult: Result | null = null;

  const renderResult = (a: number[], fromQuiz: boolean) => {
    const r = score(a);
    const lvl = LEVELS[r.level]!;
    currentAnswers = a;
    currentResult = r;

    el("r-name").textContent = lvl.name;
    el("r-score").textContent = `${r.total} of 24`;
    el("r-stage").textContent = `Stage ${r.level + 1} of 4`;
    el("r-means").textContent = lvl.means;

    const bars = el("r-bars");
    bars.textContent = "";
    DIMENSIONS.forEach((d, i) => {
      const row = document.createElement("div");
      row.dataset.stage = d.key;
      const head = document.createElement("div");
      head.className = "flex items-baseline gap-3";
      const name = document.createElement("span");
      name.className = "font-display text-xl";
      name.textContent = d.name;
      const asks = document.createElement("span");
      asks.className = "text-muted text-sm";
      asks.textContent = d.asks;
      const val = document.createElement("span");
      val.className = "ml-auto font-mono text-sm tabular-nums";
      val.textContent = `${r.dims[i]} / 6`;
      head.append(name, asks, val);
      const track = document.createElement("div");
      track.className = "bg-line mt-2 h-2 overflow-hidden rounded-full";
      track.setAttribute("role", "img");
      track.setAttribute("aria-label", `${d.name}: ${r.dims[i]} out of 6`);
      const fill = document.createElement("div");
      fill.className =
        "bg-stage h-full origin-left rounded-full transition-transform duration-slower ease-out-expo";
      fill.style.width = `${(r.dims[i]! / 6) * 100}%`;
      fill.style.transform = "scaleX(0)";
      track.appendChild(fill);
      row.append(head, track);
      bars.appendChild(row);
      requestAnimationFrame(() => requestAnimationFrame(() => (fill.style.transform = "scaleX(1)")));
    });

    // Biggest gap: lowest dimension, earliest stage wins a tie.
    const gapBox = el("r-gap");
    const gapTitle = el("r-gap-title");
    const gapBody = el("r-gap-body");
    if (r.spread === 0) {
      delete gapBox.dataset.stage;
      gapTitle.textContent = "Evenly balanced";
      gapBody.textContent =
        "Your four areas score the same, so no single area is holding the others back. Progress here comes from moving all four together.";
    } else {
      const w = DIMENSIONS[r.weakest]!;
      gapBox.dataset.stage = w.key;
      gapTitle.textContent = `Biggest gap: ${w.name}`;
      gapBody.textContent = `${w.gap} ${w.help}${r.spread >= 4 ? " Your scores are uneven, so this area is likely to cap the benefit from the others." : ""}`;
    }

    el("r-help").textContent = lvl.help;
    el("r-cta-title").textContent = TRIGGER_Q.cta[a[TOTAL - 1]!]!;
    el<HTMLInputElement>("r-share").value = shareUrl(a);

    show("result");
    el("r-name").focus({ preventScroll: true });
    window.scrollTo(0, 0);

    if (fromQuiz) {
      try {
        history.replaceState(null, "", `#r=${encode(a)}`);
        window.goatcounter?.count?.({
          path: `assessment-complete/${lvl.name.toLowerCase().replace(/\s+/g, "-")}`,
          title: `Assessment: ${lvl.name}`,
          event: true,
        });
      } catch {
        /* analytics and history are best-effort */
      }
    }
  };

  // ── Start / retake ────────────────────────────────────────────────
  const start = () => {
    answers = [];
    current = 0;
    show("quiz");
    renderQuestion();
    window.scrollTo(0, 0);
  };
  el("start-btn").addEventListener("click", start);
  el("retake-btn").addEventListener("click", () => {
    try {
      history.replaceState(null, "", location.pathname);
    } catch {
      /* ignore */
    }
    const form = el<HTMLFormElement>("assess-form");
    form.hidden = false;
    el("assess-status").hidden = true;
    start();
  });

  el("copy-link").addEventListener("click", () => {
    const btn = el("copy-link");
    const label = btn.querySelector("span") ?? btn;
    const input = el<HTMLInputElement>("r-share");
    const done = () => {
      label.textContent = "Copied";
      window.setTimeout(() => (label.textContent = "Copy link"), 1800);
    };
    if (navigator.clipboard?.writeText)
      navigator.clipboard.writeText(input.value).then(done, () => input.select());
    else input.select();
  });

  // ── Send results (Web3Forms, mailto fallback) ─────────────────────
  const form = el<HTMLFormElement>("assess-form");
  const statusEl = el("assess-status");
  const submitBtn = form.querySelector<HTMLButtonElement>("button[type=submit]")!;
  const honeypot = el<HTMLInputElement>("assess-botcheck");
  clearOnInput(form);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (honeypot.value) return;
    if (!currentAnswers || !currentResult) return;
    if (!validate(form)) return;

    const a = currentAnswers;
    const r = currentResult;
    const lvl = LEVELS[r.level]!;
    const value = (id: string) => el<HTMLInputElement>(id).value.trim();
    const company = value("assess-company");
    const note = value("assess-note");
    const summary = summaryText(a, r);

    const data = new FormData();
    data.set("subject", `AI maturity assessment${company ? `: ${company}` : ""} (${lvl.name})`);
    data.set("name", value("assess-name"));
    data.set("email", value("assess-email"));
    data.set("company", company);
    data.set("message", `${note ? `${note}\n\n---\n\n` : ""}${summary}`);
    data.set("scenario", lvl.name);
    data.set("score", `${r.total} of 24`);
    DIMENSIONS.forEach((d, i) => data.set(`score_${d.key}`, `${r.dims[i]} of 6`));
    data.set("org_size", SIZE_Q.options[a[0]!]!);
    data.set("most_pressing", TRIGGER_Q.options[a[TOTAL - 1]!]!);
    data.set("result_link", shareUrl(a));

    submitBtn.disabled = true;
    setStatus(statusEl, "pending", "Sending…");
    try {
      await submit(config, data);
      // Swap the form for the confirmation so it's clear the email went.
      form.reset();
      form.hidden = true;
      submitBtn.disabled = false;
      setStatus(
        statusEl,
        "success",
        "Thanks, we’ve got your results and Stuart will reply personally within two working days.",
      );
      statusEl.focus();
    } catch {
      setStatus(statusEl, "error", "Something went wrong sending this.");
      appendLink(
        statusEl,
        `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(`AI maturity assessment (${lvl.name})`)}&body=${encodeURIComponent(summary)}`,
        "Email us the results instead.",
      );
      submitBtn.disabled = false;
    }
  });

  // ── Boot: a #r= link reopens a finished result ───────────────────
  const match = /^#r=(\d+)$/.exec(location.hash);
  const fromHash = match ? decode(match[1]!) : null;
  if (fromHash) renderResult(fromHash, false);
  else show("intro");
  root.dataset.ready = "true";
}

export {};
