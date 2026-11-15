import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { allPages } from "./pages";

for (const path of allPages) {
  test(`axe: ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.route(/gc\.zgo\.at|goatcounter\.com/, (route) => route.fulfill({ status: 200, body: "" }));
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
      .analyze();
    expect(
      results.violations.map(
        (v) => `${v.id}: ${v.nodes.length} node(s) e.g. ${v.nodes[0]?.html.slice(0, 120)}`,
      ),
    ).toEqual([]);
  });
}

test("axe: assessment result screen", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route(/gc\.zgo\.at|goatcounter\.com/, (route) => route.fulfill({ status: 200, body: "" }));
  await page.goto("/assessment/#r=1012103211");
  await expect(page.locator("#r-name")).toBeVisible();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes[0]?.html.slice(0, 120)}`)).toEqual([]);
});
