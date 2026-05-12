import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

/**
 * Signs in via /login using email + password fields. Does not log credentials.
 * Surfaces Supabase error text from the form (never prints the password).
 */
export async function loginAsE2EUser(page: Page, email: string, password: string): Promise<void> {
  await page.goto("/login", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "LEXOS" })).toBeVisible({ timeout: 15_000 });

  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);

  await page.getByRole("button", { name: /^Sign in$/i }).click();

  const leftLogin = page.waitForURL((url) => !url.pathname.endsWith("/login"), { timeout: 45_000 });
  const errorVisible = page.getByTestId("login-error").waitFor({ state: "visible", timeout: 45_000 });

  const outcome = await Promise.race([
    leftLogin.then(() => "ok" as const),
    errorVisible.then(() => "err" as const),
  ]).catch(() => "timeout" as const);

  if (outcome === "err") {
    const msg = (await page.getByTestId("login-error").innerText()).trim();
    throw new Error(
      [
        "Login failed on /login.",
        `Message: ${msg}`,
        "Verify LEXOS_E2E_EMAIL and LEXOS_E2E_PASSWORD match a Supabase Auth user.",
        "Set LEXOS_E2E_BOOTSTRAP_AUTH=1 (with SUPABASE_SERVICE_ROLE_KEY) to sync the test user from env, or fix .env: quote values with # or use LEXOS_E2E_PASSWORD_FILE.",
      ].join(" ")
    );
  }

  if (outcome === "timeout") {
    const fallback = page.getByTestId("login-error");
    if (await fallback.isVisible().catch(() => false)) {
      const msg = (await fallback.innerText()).trim();
      throw new Error(
        [
          "Login timed out; error message present.",
          `Message: ${msg}`,
          "Verify credentials or set LEXOS_E2E_BOOTSTRAP_AUTH=1 to sync the Supabase user.",
        ].join(" ")
      );
    }
    throw new Error(
      [
        "Login timed out: still on /login with no visible error.",
        "Check dev server, NEXT_PUBLIC_SUPABASE_URL / anon key, and network.",
      ].join(" ")
    );
  }

  await expect(page).not.toHaveURL(/\/login$/);
}
