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

test.describe("WP-22 revised output", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(({}, testInfo) => {
    testInfo.skip(
      !getE2ECredentials(),
      "Set LEXOS_E2E_EMAIL and LEXOS_E2E_PASSWORD or LEXOS_E2E_PASSWORD_FILE."
    );
  });

  test("creates revised output after argument + adversarial", async ({ page }) => {
    const creds = getE2ECredentials()!;
    await loginAsE2EUser(page, creds.email, creds.password);

    const matterId = await resolveMatterId(page);

    await page.goto(`/matters/${matterId}/argument`);
    await expect(page.getByRole("heading", { name: "Argument (W8)" })).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("argument-create-submit").click();
    const argErr = await page
      .getByTestId("argument-create-error")
      .waitFor({ state: "visible", timeout: 8000 })
      .then(async () => page.getByTestId("argument-create-error").innerText())
      .catch(() => "");
    if (argErr.includes("row-level security")) {
      test.skip(true, "Argument draft RLS blocks insert — apply WP-14 migration for E2E.");
    }
    await expect(page.getByTestId("argument-draft-workspace")).toBeVisible({ timeout: 45_000 });

    await page.goto(`/matters/${matterId}/adversarial`);
    await expect(page.getByRole("heading", { name: "Adversarial review (W9)" })).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("adversarial-create-submit").click();
    const advErr = await page
      .getByTestId("adversarial-create-error")
      .waitFor({ state: "visible", timeout: 8000 })
      .then(async () => page.getByTestId("adversarial-create-error").innerText())
      .catch(() => "");
    if (advErr.includes("row-level security")) {
      test.skip(true, "Apply WP-15 adversarial_critiques RLS migration for E2E.");
    }
    await expect(page.getByTestId("adversarial-critique-workspace")).toBeVisible({ timeout: 45_000 });

    await page.goto(`/matters/${matterId}/output`);
    await expect(page.getByRole("heading", { name: "Revised output (W11)" })).toBeVisible({ timeout: 20_000 });

    await page.locator('select[name="argument_draft_id"]').selectOption({ index: 1 });
    await page.locator('select[name="adversarial_critique_id"]').selectOption({ index: 1 });

    await page.getByTestId("revised-output-create-submit").click();

    const outErr = await page
      .getByTestId("revised-output-create-error")
      .waitFor({ state: "visible", timeout: 8000 })
      .then(async () => page.getByTestId("revised-output-create-error").innerText())
      .catch(() => "");
    if (outErr.includes("row-level security")) {
      test.skip(true, "Apply output_artifacts RLS migration (pre-WP-16 wp16_output_artifacts_rls) for E2E.");
    }

    await expect(page.getByTestId("revised-output-workspace")).toBeVisible({ timeout: 45_000 });
    await expect(page.getByTestId("revised-output-save")).toBeVisible();
  });
});
