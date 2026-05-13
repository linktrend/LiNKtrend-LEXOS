import { expect, test, type Page } from "@playwright/test";
import { loginAsE2EUser } from "./helpers/auth";
import { getE2ECredentials, normalizeEnvScalar } from "./helpers/env";

async function resolveMatterId(page: Page): Promise<string> {
  const fromEnv = normalizeEnvScalar(process.env.LEXOS_E2E_MATTER_ID);
  const uuidRe =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (fromEnv && uuidRe.test(fromEnv)) {
    return fromEnv;
  }

  await page.goto("/matters");
  await expect(page.getByRole("heading", { name: "Matters" })).toBeVisible({ timeout: 20_000 });
  const firstMatterLink = page.locator('table tbody tr td a[href^="/matters/"]').first();
  await expect(firstMatterLink).toBeVisible({ timeout: 20_000 });
  const href = await firstMatterLink.getAttribute("href");
  const m = href?.match(/\/matters\/([0-9a-f-]{36})\//i);
  if (!m?.[1]) {
    throw new Error("Could not parse matter id from matters table.");
  }
  return m[1];
}

test.describe("WP-10 case story and assertions", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(({}, testInfo) => {
    testInfo.skip(
      !getE2ECredentials(),
      "Set LEXOS_E2E_EMAIL and LEXOS_E2E_PASSWORD or LEXOS_E2E_PASSWORD_FILE."
    );
  });

  test("saves case story and creates assertion visible in table", async ({ page }) => {
    const creds = getE2ECredentials()!;
    await loginAsE2EUser(page, creds.email, creds.password);

    const matterId = await resolveMatterId(page);

    await page.goto(`/matters/${matterId}/story`);
    await expect(page.getByTestId("case-story-workspace")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("case-story-heading")).toHaveText(/Case story/i);
    await expect(page.getByTestId("case-story-narrative-warning")).toBeVisible();

    await page.getByLabel("Title").fill("LEXOS E2E narrative");
    await page.getByLabel("Narrative (markdown)").fill(
      "This is a forty-one character narrative block.\n\nSecond paragraph for structure."
    );
    await page.getByTestId("case-story-save").click();
    await expect(page.getByTestId("case-story-save-success")).toBeVisible({ timeout: 20_000 });

    await page.goto(`/matters/${matterId}/assertions`);
    await expect(page.getByRole("heading", { name: "Assertions" })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("assertions-not-verified-banner")).toBeVisible();
    await expect(page.getByTestId("support-matrix-placeholder")).toBeVisible();

    await page.getByLabel("Assertion text").fill("E2E assertion: matter narrative implies a claim to track.");
    await page.getByLabel("Type / category").fill("e2e_fact");
    await page.locator('select[name="truth_state"]').selectOption("unsupported");
    await page.locator('select[name="support_state"]').selectOption("unsupported");
    await page.getByTestId("assertion-create-submit").click();
    await expect(page.getByTestId("assertion-create-success")).toBeVisible({ timeout: 20_000 });

    await expect(page.getByTestId("assertions-table")).toContainText("E2E assertion:", { timeout: 15_000 });
    await expect(page.getByTestId("assertions-table")).toContainText("unsupported");
  });
});
