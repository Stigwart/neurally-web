// Footer year
document.querySelectorAll("[data-year]").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Contact form: submit via Web3Forms, with a mailto fallback if it fails.
// Replace WEB3FORMS_ACCESS_KEY below with the real key before go-live.
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
  var WEB3FORMS_ACCESS_KEY = "WEB3FORMS_ACCESS_KEY";
  var fallbackHref = form.getAttribute("data-fallback") || "mailto:hello@neurally.co.uk";
  var submitBtn = form.querySelector("button[type=submit]");
  var statusEl = document.getElementById("form-status");
  var honeypot = document.getElementById("botcheck");

  var setStatus = function (kind, message) {
    if (!statusEl) return;
    statusEl.hidden = false;
    statusEl.textContent = message;
    statusEl.className = "field__hint form__status" + (kind ? " form__status--" + kind : "");
  };

  var addFallbackLink = function () {
    if (!statusEl) return;
    var link = document.createElement("a");
    link.href = fallbackHref;
    link.textContent = "email us directly instead";
    statusEl.appendChild(document.createTextNode(" — "));
    statusEl.appendChild(link);
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (honeypot && honeypot.value) return; // likely a bot — drop silently

    var valid = true;
    form.querySelectorAll("[required]").forEach(function (field) {
      var ok = field.checkValidity();
      field.setAttribute("aria-invalid", ok ? "false" : "true");
      if (!ok && valid) { field.focus(); valid = false; }
    });
    if (!valid) return;

    var v = function (id) { return document.getElementById(id).value.trim(); };
    var subject = "Scoping conversation" + (v("company") ? " — " + v("company") : "");

    var data = new FormData(form);
    data.set("access_key", WEB3FORMS_ACCESS_KEY);
    data.set("subject", subject);

    if (submitBtn) submitBtn.disabled = true;
    setStatus(null, "Sending…");

    fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    })
      .then(function (r) { return r.json(); })
      .then(function (json) {
        if (!json.success) throw new Error(json.message || "Submission failed");
        setStatus("success", "Thanks — I'll reply personally within two working days.");
        form.reset();
        if (submitBtn) submitBtn.disabled = false;
      })
      .catch(function () {
        setStatus("error", "Something went wrong sending this.");
        addFallbackLink();
        if (submitBtn) submitBtn.disabled = false;
      });
  });

  form.addEventListener("input", function (e) {
    if (e.target.getAttribute("aria-invalid") === "true" && e.target.checkValidity()) {
      e.target.setAttribute("aria-invalid", "false");
    }
  });
})();
