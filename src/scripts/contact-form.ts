import { appendLink, clearOnInput, readConfig, setStatus, submit, validate } from "./forms";

const form = document.querySelector<HTMLFormElement>("#contact-form");
const status = document.querySelector<HTMLElement>("#form-status");

if (form && status) {
  const config = readConfig(form);
  const fallback = form.dataset.fallback ?? "mailto:hello@neurally.co.uk";
  const button = form.querySelector<HTMLButtonElement>("button[type=submit]");
  const honeypot = form.querySelector<HTMLInputElement>("#botcheck");
  clearOnInput(form);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (honeypot?.value) return; // likely a bot: drop silently
    if (!validate(form)) return;

    const data = new FormData(form);
    const company = String(data.get("company") ?? "").trim();
    data.set("subject", `Scoping conversation${company ? `: ${company}` : ""}`);

    if (button) button.disabled = true;
    setStatus(status, "pending", "Sending…");
    try {
      await submit(config, data);
      setStatus(status, "success", "Thanks, Stuart will reply personally within two working days.");
      form.reset();
    } catch {
      setStatus(status, "error", "Something went wrong sending this.");
      appendLink(status, fallback, "Email us directly instead.");
    } finally {
      if (button) button.disabled = false;
    }
  });
}
