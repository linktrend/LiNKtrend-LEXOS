import { expect, test } from "@playwright/test";
import { loginAsE2EUser } from "./helpers/auth";
import { getE2ECredentials } from "./helpers/env";

test.describe("WP-05 W0-lite intake", () => {
  test.beforeEach(({}, testInfo) => {
    testInfo.skip(
      !getE2ECredentials(),
      "Set LEXOS_E2E_EMAIL and LEXOS_E2E_PASSWORD or LEXOS_E2E_PASSWORD_FILE (e.g. in .env.local or .env.e2e.local). Do not commit credentials."
    );
  });

  test("creates intake record and lands on intake detail", async ({ page }) => {
    const creds = getE2ECredentials()!;
    await loginAsE2EUser(page, creds.email, creds.password);

    await page.goto("/intake/new");
    await expect(page.getByRole("heading", { name: "New intake" })).toBeVisible();

    const marker = `playwright_wp05_${Date.now()}`;
    await page.locator("#intake_type").fill("playwright_e2e");
    await page.locator("#source").fill("playwright_e2e");
    await page.locator("#notes").fill(marker);
    await page.getByRole("button", { name: "Create intake" }).click();

    await expect(page).toHaveURL(/\/intake\/[0-9a-f-]{36}/i, { timeout: 30_000 });
    await expect(page.getByRole("heading", { name: "Intake detail" })).toBeVisible();
    const url = page.url();
    const idMatch = url.match(/\/intake\/([0-9a-f-]{36})/i);
    expect(idMatch?.[1]).toBeTruthy();
    await expect(page.getByText(idMatch![1], { exact: true })).toBeVisible();
    // Notes appear in read-only paragraph; textarea also contains the same text on some layouts.
    await expect(page.getByRole("paragraph").filter({ hasText: marker })).toBeVisible();
  });
});
