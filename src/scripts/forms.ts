/** Shared Web3Forms helpers for the contact form and the assessment. */

export interface FormConfig {
  endpoint: string;
  accessKey: string;
}

export const readConfig = (el: HTMLElement): FormConfig => ({
  endpoint: el.dataset.endpoint ?? "",
  accessKey: el.dataset.accessKey ?? "",
});

/** Mark invalid required fields, focus the first one, and report validity. */
export const validate = (form: HTMLFormElement): boolean => {
  let valid = true;
  form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[required]").forEach((field) => {
    const ok = field.checkValidity();
    field.setAttribute("aria-invalid", ok ? "false" : "true");
    if (!ok && valid) {
      field.focus();
      valid = false;
    }
  });
  return valid;
};

/** Clear the invalid state as soon as a field is corrected. */
export const clearOnInput = (form: HTMLFormElement) => {
  form.addEventListener("input", (e) => {
    const field = e.target as HTMLInputElement;
    if (field.getAttribute("aria-invalid") === "true" && field.checkValidity()) {
      field.setAttribute("aria-invalid", "false");
    }
  });
};

export const setStatus = (el: HTMLElement, kind: "pending" | "success" | "error", message: string) => {
  el.hidden = false;
  el.textContent = message;
  el.dataset.kind = kind;
};

export const appendLink = (el: HTMLElement, href: string, text: string) => {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = text;
  link.className = "link";
  el.append(" ", link);
};

export const submit = async (config: FormConfig, data: FormData): Promise<void> => {
  data.set("access_key", config.accessKey);
  const response = await fetch(config.endpoint, {
    method: "POST",
    body: data,
    headers: { Accept: "application/json" },
  });
  const json = (await response.json()) as { success?: boolean; message?: string };
  if (!json.success) throw new Error(json.message ?? "Submission failed");
};
