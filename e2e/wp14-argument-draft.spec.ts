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

test.describe("WP-14 argument draft", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(({}, testInfo) => {
    testInfo.skip(
      !getE2ECredentials(),
      "Set LEXOS_E2E_EMAIL and LEXOS_E2E_PASSWORD or LEXOS_E2E_PASSWORD_FILE."
    );
  });

  test("creates argument draft and opens editor", async ({ page }) => {
    const creds = getE2ECredentials()!;
    await loginAsE2EUser(page, creds.email, creds.password);

    const matterId = await resolveMatterId(page);
    await page.goto(`/matters/${matterId}/argument`);
    await expect(page.getByRole("heading", { name: "Argument (W8)" })).toBeVisible({ timeout: 20_000 });

    await page.getByTestId("argument-create-submit").click();

    const errorShown = await page
      .getByTestId("argument-create-error")
      .waitFor({ state: "visible", timeout: 8000 })
      .then(() => true)
      .catch(() => false);
    if (errorShown) {
      const msg = await page.getByTestId("argument-create-error").innerText();
      if (msg.includes("row-level security")) {
        test.skip(
          true,
          "Apply supabase/migrations/20260519100000_wp14_argument_drafts_rls.sql to the Supabase project in NEXT_PUBLIC_SUPABASE_URL (RLS blocks argument_drafts insert until then)."
        );
      }
    }

    await expect(page.getByTestId("argument-draft-workspace")).toBeVisible({ timeout: 45_000 });
    await expect(page.getByTestId("argument-draft-save")).toBeVisible();
  });
});
