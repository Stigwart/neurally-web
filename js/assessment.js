// AI maturity assessment: one question per screen, scored client-side.
// Nothing is stored. Answers only leave the browser if the visitor submits
// the "send me these results" form (Web3Forms), same as the contact form.
(function () {
  var root = document.getElementById("assessment");
  if (!root) return;

  // Same public Web3Forms key as js/main.js (keep the two in sync).
  var WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
  var WEB3FORMS_ACCESS_KEY = "365c5876-bc42-4524-b242-26a0ef6928e6";
  var FALLBACK_EMAIL = "hello@neurally.co.uk";
  var CALENDLY = "https://calendly.com/stuartdavis/30min";

  // ── Content ───────────────────────────────────────────────────────
  // Dimensions follow the site's Decide → Design → Deliver → Embed path.
  var DIMENSIONS = [
    {
      key: "decide", name: "Decide", stage: "diagnose",
      asks: "Direction and investment",
      gap: "You have not yet chosen the few AI opportunities worth backing, or set the measures that would show them working.",
      help: "An AI Opportunity Workshop picks the opportunities worth pursuing and sets out the value case for each.",
      service: "AI Opportunity Workshop"
    },
    {
      key: "design", name: "Design", stage: "redesign",
      asks: "Operating model",
      gap: "The way work gets done has changed less than the tools around it, and ownership across teams is unclear.",
      help: "Operating Model Design redesigns workflows, roles and decision rights around the opportunities, including what stays with people.",
      service: "Operating Model Design"
    },
    {
      key: "deliver", name: "Deliver", stage: "lead",
      asks: "Delivery and results",
      gap: "Pilots are not yet becoming everyday tools, or results are not tracked against business outcomes.",
      help: "Implementation Support and Transformation Leadership take the riskiest assumptions through bounded pilots with agreed success measures.",
      service: "Implementation Support and Transformation Leadership"
    },
    {
      key: "embed", name: "Embed", stage: "measure",
      asks: "People and guardrails",
      gap: "People are not yet equipped to use AI well, or the guardrails for using it safely are thin.",
      help: "AI Training for Leaders and Teams is built around your own redesigned workflows, alongside the governance to keep use safe.",
      service: "AI Training for Leaders and Teams"
    }
  ];

  var SIZE_Q = {
    id: "size", title: "How big is your organisation?", hint: "Roughly, by headcount.",
    options: ["Under 50 people", "50 to 250 people", "250 to 1,000 people", "More than 1,000 people"]
  };

  var SCORED_QS = [
    { dim: 0, title: "Where does AI sit in your business strategy?", options: [
      "Nobody has set a direction",
      "Plenty of ideas, nothing written down",
      "A written AI plan, not yet tied to investment",
      "Clear priorities, each with a value case and an owner"] },
    { dim: 0, title: "How do you decide which AI opportunities to back?", options: [
      "Whoever asks loudest, or the latest tool",
      "Teams choose their own tools",
      "We list use cases and rank them roughly",
      "Ranked by expected return, with success measures agreed first"] },
    { dim: 1, title: "How much has the way work gets done changed?", options: [
      "Not at all",
      "Individuals use AI to speed up their existing tasks",
      "A few workflows have been redesigned around AI",
      "Roles, decisions and hand-offs redesigned in key areas, including what stays with people"] },
    { dim: 1, title: "Who owns AI across the business?", options: [
      "Nobody",
      "IT or one enthusiast, alongside their day job",
      "A named sponsor, but coordination between teams is ad hoc",
      "A named executive owner with a cross-team mandate and budget"] },
    { dim: 2, title: "What has happened to your AI pilots?", options: [
      "We haven't run any",
      "Several pilots, none in everyday use",
      "One or two in everyday use",
      "Several in everyday use, and we've stopped ones that didn't work"] },
    { dim: 2, title: "How do you know whether AI is paying off?", options: [
      "We don't",
      "Anecdotes and gut feel",
      "Some measures, such as usage or time saved",
      "Tracked against business outcomes: revenue, cost, capacity, customers"] },
    { dim: 3, title: "How well equipped are your people?", options: [
      "No training, left to figure it out",
      "A few self-taught enthusiasts",
      "General AI training for most people",
      "Role-specific training built around our own workflows"] },
    { dim: 3, title: "What guardrails are in place?", options: [
      "None",
      "Informal “be careful” advice",
      "A written policy on data and use",
      "A policy, plus risk-reviewed use cases that someone monitors"] }
  ];

  var TRIGGER_Q = {
    id: "trigger", title: "What's most pressing right now?", hint: "This only shapes the suggestion at the end.",
    options: [
      "The board expects an AI strategy",
      "Lots of AI activity, no payback",
      "A transformation that's stalled or off track",
      "Getting the team to actually use it",
      "Just exploring"],
    cta: [
      "Turn the board’s expectation into an investment case",
      "Find out which AI activity is worth keeping",
      "Get an independent view of what has stalled",
      "Get your team using it well",
      "Start with a conversation, no commitment"]
  };

  // Screen order: size, eight scored questions, trigger.
  var QUESTIONS = [SIZE_Q].concat(SCORED_QS, [TRIGGER_Q]);
  var TOTAL = QUESTIONS.length;

  var LEVELS = [
    { name: "The Starting Line", max: 6,
      means: "There is little formal AI activity yet. That is a fair place to be, and the main risk is buying tools before choosing a direction.",
      help: "Start with a free discovery call, then an AI Opportunity Workshop to choose the few opportunities worth pursuing and the measures that would show them working.",
      service: "Free discovery call, then an AI Opportunity Workshop" },
    { name: "Activity Without Payback", max: 12,
      means: "Pilots and tools are multiplying, but little of it is measured against the business, so it is hard to say what is worth continuing.",
      help: "An AI Advantage Diagnostic sizes the opportunities, gives a proceed, adapt or stop view on what is running, and builds the value case for what remains.",
      service: "AI Advantage Diagnostic" },
    { name: "Proven in Pockets", max: 18,
      means: "Some things work, but the business has not changed around them, so results stay local to the teams that built them.",
      help: "Operating Model Design and Implementation Support turn those pockets into how the business runs. An AI Transformation Deep Dive helps if several initiatives need aligning first.",
      service: "Operating Model Design and Implementation Support" },
    { name: "Built In", max: 24,
      means: "AI is part of how the business runs. The question now is compounding it and staying in control of the risks.",
      help: "You may not need us yet. Where an independent view helps, that is CEO and board advisory on the next investment, or targeted AI training for the teams still catching up.",
      service: "Advisory and targeted AI training" }
  ];

  // ── State ─────────────────────────────────────────────────────────
  var answers = [];       // option index per screen (0-based), undefined if unanswered
  var current = 0;
  var advanceTimer = null;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var el = function (id) { return document.getElementById(id); };
  var screens = { intro: el("screen-intro"), quiz: el("screen-quiz"), result: el("screen-result") };

  var show = function (name) {
    Object.keys(screens).forEach(function (k) { screens[k].hidden = k !== name; });
  };

  // ── Scoring ───────────────────────────────────────────────────────
  var score = function (a) {
    var dims = [0, 0, 0, 0];
    SCORED_QS.forEach(function (q, i) { dims[q.dim] += a[i + 1]; });
    var total = dims.reduce(function (s, n) { return s + n; }, 0);
    var level = 0;
    while (total > LEVELS[level].max) level++;
    var lo = 0, hi = 0;
    dims.forEach(function (d, i) { if (d < dims[lo]) lo = i; if (d > dims[hi]) hi = i; });
    return { dims: dims, total: total, level: level, weakest: lo, spread: dims[hi] - dims[lo] };
  };

  // ── Share link: answers as one digit per screen ──────────────────
  var encode = function (a) { return a.join(""); };
  var decode = function (s) {
    if (!/^\d{10}$/.test(s)) return null;
    var a = s.split("").map(Number);
    for (var i = 0; i < TOTAL; i++) if (a[i] >= QUESTIONS[i].options.length) return null;
    return a;
  };
  var shareUrl = function (a) {
    return location.origin + location.pathname + "#r=" + encode(a);
  };

  // ── Quiz screen ───────────────────────────────────────────────────
  var progress = el("progress");
  var progressBar = el("progress-bar");
  var progressLabel = el("progress-label");
  var qTitle = el("q-title");
  var qHint = el("q-hint");
  var qOptions = el("q-options");
  var backBtn = el("q-back");
  var nextBtn = el("q-next");

  var renderQuestion = function () {
    var q = QUESTIONS[current];
    var n = current + 1;
    progress.setAttribute("aria-valuenow", n);
    progressBar.style.width = (n / TOTAL * 100) + "%";
    progressLabel.textContent = "Question " + n + " of " + TOTAL;
    qTitle.textContent = q.title;
    qHint.textContent = q.hint || "";
    qHint.hidden = !q.hint;
    qOptions.textContent = "";
    var dim = q.dim !== undefined ? DIMENSIONS[q.dim] : null;
    qOptions.className = "assess-options" + (dim ? " assess-options--" + dim.stage : "");

    q.options.forEach(function (text, i) {
      var label = document.createElement("label");
      label.className = "assess-option";
      var input = document.createElement("input");
      input.type = "radio";
      input.name = "q" + current;
      input.value = i;
      input.checked = answers[current] === i;
      var key = document.createElement("span");
      key.className = "assess-option__key";
      key.setAttribute("aria-hidden", "true");
      key.textContent = i + 1;
      var span = document.createElement("span");
      span.className = "assess-option__text";
      span.textContent = text;
      label.appendChild(input);
      label.appendChild(key);
      label.appendChild(span);
      qOptions.appendChild(label);
    });

    backBtn.hidden = current === 0;
    nextBtn.disabled = answers[current] === undefined;
    nextBtn.textContent = current === TOTAL - 1 ? "See my result" : "Next";
    qTitle.focus({ preventScroll: true });
  };

  var choose = function (i, advance) {
    answers[current] = i;
    var inputs = qOptions.querySelectorAll("input");
    inputs[i].checked = true;
    nextBtn.disabled = false;
    if (advance) {
      clearTimeout(advanceTimer);
      advanceTimer = setTimeout(next, reduceMotion ? 0 : 260);
    }
  };

  var next = function () {
    clearTimeout(advanceTimer);
    if (answers[current] === undefined) return;
    if (current === TOTAL - 1) return finish();
    current++;
    renderQuestion();
  };

  var back = function () {
    clearTimeout(advanceTimer);
    if (current === 0) return;
    current--;
    renderQuestion();
  };

  qOptions.addEventListener("click", function (e) {
    var input = e.target.closest ? e.target.closest("input") : null;
    if (!input) return;
    // Pointer clicks advance; arrow-key selection (detail 0) waits for Next.
    choose(Number(input.value), e.detail > 0);
  });
  nextBtn.addEventListener("click", next);
  backBtn.addEventListener("click", back);

  screens.quiz.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var n = parseInt(e.key, 10);
    var q = QUESTIONS[current];
    if (n >= 1 && n <= q.options.length) {
      e.preventDefault();
      choose(n - 1, true);
    } else if (e.key === "Enter" && !nextBtn.disabled && e.target.tagName !== "BUTTON") {
      e.preventDefault();
      next();
    }
  });

  // ── Result screen ─────────────────────────────────────────────────
  var summaryText = function (a, r) {
    var lines = [
      "AI maturity assessment result",
      "Scenario: " + LEVELS[r.level].name + " (" + r.total + " of 24)",
      ""
    ];
    DIMENSIONS.forEach(function (d, i) { lines.push(d.name + ": " + r.dims[i] + " of 6"); });
    lines.push("", "Organisation size: " + SIZE_Q.options[a[0]]);
    lines.push("Most pressing: " + TRIGGER_Q.options[a[TOTAL - 1]], "");
    SCORED_QS.forEach(function (q, i) {
      lines.push(q.title + " " + q.options[a[i + 1]] + " (" + a[i + 1] + "/3)");
    });
    lines.push("", "Reopen their result: " + shareUrl(a));
    return lines.join("\n");
  };

  var currentAnswers = null;
  var currentResult = null;

  var renderResult = function (a, fromQuiz) {
    var r = score(a);
    var lvl = LEVELS[r.level];
    currentAnswers = a;
    currentResult = r;

    el("r-name").textContent = lvl.name;
    el("r-score").textContent = r.total + " of 24";
    el("r-stage").textContent = "Stage " + (r.level + 1) + " of 4";
    el("r-means").textContent = lvl.means;

    var bars = el("r-bars");
    bars.textContent = "";
    DIMENSIONS.forEach(function (d, i) {
      var row = document.createElement("div");
      row.className = "assess-bar assess-bar--" + d.stage;
      var head = document.createElement("div");
      head.className = "assess-bar__head";
      var nm = document.createElement("span");
      nm.className = "assess-bar__name";
      nm.textContent = d.name;
      var sub = document.createElement("span");
      sub.className = "assess-bar__asks";
      sub.textContent = d.asks;
      var val = document.createElement("span");
      val.className = "assess-bar__val";
      val.textContent = r.dims[i] + " / 6";
      head.appendChild(nm); head.appendChild(sub); head.appendChild(val);
      var track = document.createElement("div");
      track.className = "assess-bar__track";
      track.setAttribute("role", "img");
      track.setAttribute("aria-label", d.name + ": " + r.dims[i] + " out of 6");
      var fill = document.createElement("div");
      fill.className = "assess-bar__fill";
      fill.style.width = (r.dims[i] / 6 * 100) + "%";
      track.appendChild(fill);
      row.appendChild(head); row.appendChild(track);
      bars.appendChild(row);
    });

    // Biggest gap: lowest dimension, earliest stage wins a tie.
    var gapBox = el("r-gap");
    if (r.spread === 0) {
      gapBox.className = "card assess-gap";
      gapBox.querySelector(".assess-gap__title").textContent = "Evenly balanced";
      gapBox.querySelector(".assess-gap__body").textContent =
        "Your four areas score the same, so no single area is holding the others back. Progress here comes from moving all four together.";
    } else {
      var w = DIMENSIONS[r.weakest];
      gapBox.className = "card assess-gap assess-gap--" + w.stage;
      gapBox.querySelector(".assess-gap__title").textContent = "Biggest gap: " + w.name;
      gapBox.querySelector(".assess-gap__body").textContent =
        w.gap + " " + w.help + (r.spread >= 4 ? " Your scores are uneven, so this area is likely to cap the benefit from the others." : "");
    }

    el("r-help").textContent = lvl.help;
    el("r-cta-title").textContent = TRIGGER_Q.cta[a[TOTAL - 1]];

    var share = el("r-share");
    share.value = shareUrl(a);

    show("result");
    screens.result.querySelector("h1").focus({ preventScroll: true });
    window.scrollTo(0, 0);

    if (fromQuiz) {
      try {
        history.replaceState(null, "", "#r=" + encode(a));
        if (window.goatcounter && window.goatcounter.count) {
          window.goatcounter.count({ path: "assessment-complete/" + lvl.name.toLowerCase().replace(/\s+/g, "-"), title: "Assessment: " + lvl.name, event: true });
        }
      } catch (err) { /* analytics and history are best-effort */ }
    }
  };

  var finish = function () { renderResult(answers.slice(), true); };

  // ── Start / retake ────────────────────────────────────────────────
  var start = function () {
    answers = [];
    current = 0;
    show("quiz");
    renderQuestion();
    window.scrollTo(0, 0);
  };
  var reset = function () {
    try { history.replaceState(null, "", location.pathname); } catch (err) { /* ignore */ }
    show("intro");
    window.scrollTo(0, 0);
  };
  el("start-btn").addEventListener("click", start);
  el("retake-btn").addEventListener("click", function () { reset(); start(); });

  el("copy-link").addEventListener("click", function () {
    var btn = el("copy-link");
    var input = el("r-share");
    var done = function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy link"; }, 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(input.value).then(done, function () { input.select(); });
    } else { input.select(); }
  });

  // ── Send results to Stuart (Web3Forms, mailto fallback) ───────────
  var form = el("assess-form");
  var statusEl = el("assess-status");
  var submitBtn = form.querySelector("button[type=submit]");
  var honeypot = el("assess-botcheck");

  var setStatus = function (kind, message) {
    statusEl.hidden = false;
    statusEl.textContent = message;
    statusEl.className = "assess-status form__status" + (kind ? " form__status--" + kind : "");
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (honeypot && honeypot.value) return;
    if (!currentAnswers) return;

    var valid = true;
    form.querySelectorAll("[required]").forEach(function (field) {
      var ok = field.checkValidity();
      field.setAttribute("aria-invalid", ok ? "false" : "true");
      if (!ok && valid) { field.focus(); valid = false; }
    });
    if (!valid) return;

    var a = currentAnswers, r = currentResult, lvl = LEVELS[r.level];
    var company = el("assess-company").value.trim();
    var note = el("assess-note").value.trim();
    var summary = summaryText(a, r);

    var data = new FormData();
    data.set("access_key", WEB3FORMS_ACCESS_KEY);
    data.set("subject", "AI maturity assessment" + (company ? ": " + company : "") + " (" + lvl.name + ")");
    data.set("name", el("assess-name").value.trim());
    data.set("email", el("assess-email").value.trim());
    data.set("company", company);
    data.set("message", (note ? note + "\n\n---\n\n" : "") + summary);
    data.set("scenario", lvl.name);
    data.set("score", r.total + " of 24");
    DIMENSIONS.forEach(function (d, i) { data.set("score_" + d.key, r.dims[i] + " of 6"); });
    data.set("org_size", SIZE_Q.options[a[0]]);
    data.set("most_pressing", TRIGGER_Q.options[a[TOTAL - 1]]);
    data.set("result_link", shareUrl(a));

    submitBtn.disabled = true;
    setStatus(null, "Sending…");

    fetch(WEB3FORMS_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then(function (res) { return res.json(); })
      .then(function (json) {
        if (!json.success) throw new Error(json.message || "Submission failed");
        // Swap the form for the confirmation so it's clear the email went.
        form.reset();
        form.hidden = true;
        setStatus("success", "Thanks, I’ve got your results and will reply personally within two working days.");
        statusEl.focus();
      })
      .catch(function () {
        setStatus("error", "Something went wrong sending this.");
        var link = document.createElement("a");
        link.href = "mailto:" + FALLBACK_EMAIL + "?subject=" + encodeURIComponent("AI maturity assessment (" + lvl.name + ")") +
          "&body=" + encodeURIComponent(summary);
        link.textContent = "Email me the results instead.";
        statusEl.appendChild(document.createTextNode(" "));
        statusEl.appendChild(link);
        submitBtn.disabled = false;
      });
  });

  form.addEventListener("input", function (e) {
    if (e.target.getAttribute("aria-invalid") === "true" && e.target.checkValidity()) {
      e.target.setAttribute("aria-invalid", "false");
    }
  });

  // ── Boot: a #r= link reopens a finished result ───────────────────
  var m = /^#r=(\d+)$/.exec(location.hash);
  var fromHash = m ? decode(m[1]) : null;
  if (fromHash) renderResult(fromHash, false); else show("intro");
})();
