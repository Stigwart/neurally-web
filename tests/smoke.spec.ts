import { expect, test, type Page } from "@playwright/test";
import { allPages, redirects } from "./pages";

const WEB3FORMS = "https://api.web3forms.com/submit";

/** Block analytics and collect anything the page logs as an error. */
const watch = async (page: Page) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.route(/gc\.zgo\.at|goatcounter\.com/, (route) =>
    route.fulfill({ status: 200, contentType: "text/javascript", body: "" }),
  );
  return errors;
};

for (const path of allPages) {
  test(`renders ${path}`, async ({ page }) => {
    const errors = await watch(page);
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1:visible")).toHaveCount(1);

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://www.neurally.co.uk${path}`,
    );
    expect((await page.title()).length).toBeGreaterThan(10);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description?.length ?? 0).toBeGreaterThan(70);
    // No horizontal scroll.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    // Structured data parses.
    for (const block of await page.locator('script[type="application/ld+json"]').allTextContents())
      JSON.parse(block);
    expect(errors).toEqual([]);
  });
}

test("old .html URLs redirect permanently to clean URLs", async ({ request }) => {
  for (const [from, to] of redirects) {
    const response = await request.get(from, { maxRedirects: 0 });
    expect(response.status(), from).toBe(301);
    expect(response.headers()["location"], from).toBe(to);
  }
});

test("security headers are served", async ({ request }) => {
  const headers = (await request.get("/")).headers();
  expect(headers["content-security-policy"]).toContain("default-src 'self'");
  expect(headers["strict-transport-security"]).toContain("max-age=");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
  expect(headers["x-content-type-options"]).toBe("nosniff");
});

test("unknown URLs get the 404 page", async ({ page }) => {
  const response = await page.goto("/no-such-page/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("That page isn't here");
});

test("sitemap, robots and RSS are published", async ({ request }) => {
  expect((await request.get("/robots.txt")).ok()).toBeTruthy();
  const sitemap = await (await request.get("/sitemap-0.xml")).text();
  expect(sitemap).toContain("https://www.neurally.co.uk/use-cases/ai-governance/");
  expect(sitemap).not.toContain(".html");
  expect(await (await request.get("/rss.xml")).text()).toContain("<item>");
});

test("analytics tag is on the page", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('script[data-goatcounter="https://neurally.goatcounter.com/count"]')).toHaveCount(
    1,
  );
});

test("contact form submits to Web3Forms", async ({ page }) => {
  const errors = await watch(page);
  let posted: string | null = null;
  await page.route(WEB3FORMS, async (route) => {
    posted = route.request().postData();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
  await page.goto("/contact/");

  // Empty submit is caught client-side.
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator("#name")).toHaveAttribute("aria-invalid", "true");
  expect(posted).toBeNull();

  await page.locator("#name").fill("Test Person");
  await page.locator("#email").fill("test@example.com");
  await page.locator("#company").fill("Example Ltd");
  await page.locator("#message").fill("A test message.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator("#form-status")).toContainText("reply personally within two working days");
  expect(posted).toContain("365c5876-bc42-4524-b242-26a0ef6928e6");
  expect(posted).toContain("Scoping conversation: Example Ltd");
  expect(errors).toEqual([]);
});

test("contact form falls back to email when sending fails", async ({ page }) => {
  await watch(page);
  await page.route(WEB3FORMS, (route) =>
    route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ success: false }) }),
  );
  await page.goto("/contact/");
  await page.locator("#name").fill("Test Person");
  await page.locator("#email").fill("test@example.com");
  await page.locator("#message").fill("A test message.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator("#form-status a")).toHaveAttribute("href", "mailto:hello@neurally.co.uk");
});

test("assessment runs, scores and sends results", async ({ page }) => {
  const errors = await watch(page);
  let posted: string | null = null;
  await page.route(WEB3FORMS, async (route) => {
    posted = route.request().postData();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
  await page.goto("/assessment/");
  await page.getByRole("button", { name: "Start the assessment" }).click();

  // Ten screens. Choose the second option each time: 8 scored questions x 1 point = 8.
  for (let i = 0; i < 10; i++) {
    await expect(page.locator("#progress-label")).toHaveText(`Question ${i + 1} of 10`);
    await page.locator("#q-options label").nth(1).click();
  }
  await expect(page.locator("#r-name")).toHaveText("Activity Without Payback");
  await expect(page.locator("#r-score")).toHaveText("8 of 24");
  await expect(page.locator("#r-gap-title")).toHaveText("Evenly balanced");
  expect(page.url()).toContain("#r=1111111111");

  await page.locator("#assess-name").fill("Test Person");
  await page.locator("#assess-email").fill("test@example.com");
  await page.getByRole("button", { name: "Send my results" }).click();
  await expect(page.locator("#assess-status")).toContainText("we’ve got your results");
  expect(posted).toContain("Activity Without Payback");
  expect(posted).toContain("8 of 24");
  expect(errors).toEqual([]);
});

test("a shared assessment link reopens the result", async ({ page }) => {
  await watch(page);
  await page.goto("/assessment/#r=0333333330");
  await expect(page.locator("#r-name")).toHaveText("Built In");
  await expect(page.locator("#r-score")).toHaveText("24 of 24");
});

test("homepage problems show one answer at a time", async ({ page }) => {
  const errors = await watch(page);
  await page.goto("/");
  await expect(page.locator("#problem-panel-0")).toBeVisible();
  const tab = page.getByRole("button", { name: /You've run pilots/ });
  await tab.click();
  await expect(tab).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#problem-panel-1")).toBeVisible();
  await expect(page.locator("#problem-panel-0")).toBeHidden();
  await expect(
    page.locator("#problem-panel-1").getByRole("link", { name: /Book a free discovery call/ }),
  ).toHaveAttribute("href", "https://calendly.com/stuartdavis/30min");
  expect(errors).toEqual([]);
});

test("homepage stage row opens the chosen stage", async ({ page, isMobile }) => {
  test.skip(isMobile, "stages are stacked and all visible on small screens");
  await watch(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const design = page.locator('[data-stage-card][data-wash="design"]');
  await expect(design).not.toHaveAttribute("data-open");
  await design.getByRole("button", { name: "Design" }).click();
  await expect(design).toHaveAttribute("data-open");
  await expect(design.getByText("What must change?")).toBeVisible();
  await expect(page.locator('[data-stage-card][data-wash="decide"]')).not.toHaveAttribute("data-open");
});

test("content is visible with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await watch(page);
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  for (const el of await page.locator("[data-reveal], [data-rise]").all()) {
    expect(await el.evaluate((node) => getComputedStyle(node).opacity)).toBe("1");
  }
});

test("mobile menu opens and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await watch(page);
  await page.goto("/");
  const toggle = page.locator("[data-menu-toggle]");
  await toggle.click();
  const menu = page.locator("#mobile-menu");
  await expect(menu).toBeVisible();
  // Visible is not enough: the panel once opened one pixel tall.
  const box = await menu.boundingBox();
  const viewport = page.viewportSize();
  expect(box!.height).toBeGreaterThan(viewport!.height * 0.8);
  await expect(menu.getByRole("link", { name: "Contact" })).toBeInViewport();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toBeHidden();
});
