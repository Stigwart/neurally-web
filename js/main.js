// Footer year
document.querySelectorAll("[data-year]").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Contact form: compose a pre-filled email rather than posting anywhere,
// since the site is static and has no backend.
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;
  var to = form.getAttribute("action").replace(/^mailto:/, "");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var valid = true;
    form.querySelectorAll("[required]").forEach(function (field) {
      var ok = field.checkValidity();
      field.setAttribute("aria-invalid", ok ? "false" : "true");
      if (!ok && valid) { field.focus(); valid = false; }
    });
    if (!valid) return;

    var v = function (id) { return document.getElementById(id).value.trim(); };
    var subject = "Scoping conversation" + (v("company") ? " — " + v("company") : "");
    var body = [
      v("message"),
      "",
      "Name: " + v("name"),
      "Email: " + v("email"),
      v("company") ? "Company and role: " + v("company") : ""
    ].join("\n").trim();

    window.location.href = "mailto:" + to +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  });

  form.addEventListener("input", function (e) {
    if (e.target.getAttribute("aria-invalid") === "true" && e.target.checkValidity()) {
      e.target.setAttribute("aria-invalid", "false");
    }
  });
})();
