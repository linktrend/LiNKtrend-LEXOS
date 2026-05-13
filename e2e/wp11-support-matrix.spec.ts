import { expect, test, type Page } from "@playwright/test";
import path from "node:path";
import { loginAsE2EUser } from "./helpers/auth";
import { getE2ECredentials, normalizeEnvScalar } from "./helpers/env";

const txtFixture = path.join(process.cwd(), "e2e", "fixtures", "wp06-evidence-1.txt");

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

async function ensureEvidenceExists(page: Page, matterId: string): Promise<void> {
  await page.goto(`/matters/${matterId}/evidence`);
  await expect(page.getByRole("heading", { name: "Evidence", exact: true })).toBeVisible({ timeout: 20_000 });
  const openLinks = page.getByRole("table").getByRole("link", { name: "Open" });
  const n = await openLinks.count();
  if (n > 0) return;

  const uploadSection = page.locator("section").filter({
    has: page.getByRole("heading", { name: "Upload evidence" }),
  });
  const fileInput = uploadSection.locator('input#file[type="file"]');
  await fileInput.setInputFiles(txtFixture);
  await uploadSection.getByRole("button", { name: "Upload" }).click();
  await expect
    .poll(async () => openLinks.count(), { timeout: 60_000 })
    .toBeGreaterThanOrEqual(1);
}

test.describe("WP-11 support matrix", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(({}, testInfo) => {
    testInfo.skip(
      !getE2ECredentials(),
      "Set LEXOS_E2E_EMAIL and LEXOS_E2E_PASSWORD or LEXOS_E2E_PASSWORD_FILE."
    );
  });

  test("creates support link and shows it in matrix table", async ({ page }) => {
    const creds = getE2ECredentials()!;
    await loginAsE2EUser(page, creds.email, creds.password);

    const matterId = await resolveMatterId(page);
    await ensureEvidenceExists(page, matterId);

    const stamp = Date.now();
    const assertionText = `WP11 E2E support assertion ${stamp}`;

    await page.goto(`/matters/${matterId}/assertions`);
    await expect(page.getByRole("heading", { name: "Assertions" })).toBeVisible({ timeout: 20_000 });
    await page.getByLabel("Assertion text").fill(assertionText);
    await page.getByLabel("Type / category").fill("e2e_wp11");
    await page.locator('select[name="truth_state"]').selectOption("pending_verification");
    await page.locator('select[name="support_state"]').selectOption("pending");
    await page.getByTestId("assertion-create-submit").click();
    await expect(page.getByTestId("assertion-create-success")).toBeVisible({ timeout: 20_000 });

    const row = page.locator(`[data-testid^="assertion-row-"]`).filter({ hasText: String(stamp) });
    await expect(row).toBeVisible({ timeout: 15_000 });
    const href = await row.getByRole("link", { name: "Open" }).getAttribute("href");
    const assertionId = href?.match(/\/assertions\/([0-9a-f-]{36})/i)?.[1];
    expect(assertionId).toBeTruthy();

    await page.goto(`/matters/${matterId}/support`);
    await expect(page.getByTestId("support-matrix-workspace")).toBeVisible({ timeout: 20_000 });

    const createForm = page.locator("form").filter({ has: page.getByTestId("support-create-submit") });
    await createForm.locator('select[name="assertion_id"]').selectOption(assertionId!);
    await createForm.locator('select[name="evidence_id"]').selectOption({ index: 0 });
    await createForm.locator('select[name="support_state"]').selectOption("partially_supported");
    await page.getByTestId("support-create-submit").click();
    await expect(page.getByTestId("support-matrix-table")).toContainText(assertionText.slice(0, 30), {
      timeout: 45_000,
    });
  });
});
