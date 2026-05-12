import { expect, test, type Page } from "@playwright/test";
import path from "path";
import { loginAsE2EUser } from "./helpers/auth";
import { getE2ECredentials, normalizeEnvScalar } from "./helpers/env";

const fixture1 = path.join(process.cwd(), "e2e", "fixtures", "wp06-evidence-1.txt");
const fixture2 = path.join(process.cwd(), "e2e", "fixtures", "wp06-evidence-2.txt");

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
  await expect(
    firstMatterLink,
    "No matters row: create a client+matter, set LEXOS_E2E_MATTER_ID, or run with LEXOS_E2E_BOOTSTRAP_AUTH=1 (and SUPABASE_SERVICE_ROLE_KEY) to seed fixtures."
  ).toBeVisible({ timeout: 20_000 });
  const href = await firstMatterLink.getAttribute("href");
  const m = href?.match(/\/matters\/([0-9a-f-]{36})\//i);
  if (!m?.[1]) {
    throw new Error(
      "Could not parse matter id from matters table. Set LEXOS_E2E_MATTER_ID or ensure at least one matter exists."
    );
  }
  return m[1];
}

test.describe("WP-06 evidence upload", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(({}, testInfo) => {
    testInfo.skip(
      !getE2ECredentials(),
      "Set LEXOS_E2E_EMAIL and LEXOS_E2E_PASSWORD or LEXOS_E2E_PASSWORD_FILE (e.g. in .env.local or .env.e2e.local). Do not commit credentials."
    );
  });

  test("uploads two originals via setInputFiles; list shows two rows; detail download link; distinct evidence paths", async ({
    page,
  }) => {
    const creds = getE2ECredentials()!;
    await loginAsE2EUser(page, creds.email, creds.password);

    const matterId = await resolveMatterId(page);
    await page.goto(`/matters/${matterId}/evidence`);
    await expect(page.getByRole("heading", { name: "Evidence", exact: true })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByRole("heading", { name: "Upload evidence" })).toBeVisible();

    const uploadSection = page.locator("section").filter({
      has: page.getByRole("heading", { name: "Upload evidence" }),
    });
    const fileInput = uploadSection.locator('input#file[type="file"]');
    const openLinks = page.getByRole("table").getByRole("link", { name: "Open" });
    const initialOpenCount = await openLinks.count();

    await fileInput.setInputFiles(fixture1);
    await expect(fileInput, "file input should hold the chosen fixture").toHaveJSProperty("files.length", 1);
    await uploadSection.getByRole("button", { name: "Upload" }).click();
    await expect
      .poll(async () => {
        const n = await openLinks.count();
        if (n >= initialOpenCount + 1) return n;
        const err = uploadSection.getByTestId("evidence-upload-error");
        if (await err.isVisible().catch(() => false)) {
          throw new Error(`Evidence upload failed: ${(await err.innerText()).trim()}`);
        }
        return n;
      }, { timeout: 60_000 })
      .toBe(initialOpenCount + 1);

    await fileInput.setInputFiles(fixture2);
    await expect(fileInput, "file input should hold the second fixture").toHaveJSProperty("files.length", 1);
    await uploadSection.getByRole("button", { name: "Upload" }).click();
    await expect
      .poll(async () => {
        const n = await openLinks.count();
        if (n >= initialOpenCount + 2) return n;
        const err = uploadSection.getByTestId("evidence-upload-error");
        if (await err.isVisible().catch(() => false)) {
          throw new Error(`Evidence upload failed: ${(await err.innerText()).trim()}`);
        }
        return n;
      }, { timeout: 60_000 })
      .toBe(initialOpenCount + 2);

    const href0 = await openLinks.nth(0).getAttribute("href");
    const href1 = await openLinks.nth(1).getAttribute("href");
    expect(href0).toBeTruthy();
    expect(href1).toBeTruthy();
    expect(href0).not.toEqual(href1);

    const ev0 = href0!.match(/\/evidence\/([0-9a-f-]{36})$/i)?.[1];
    const ev1 = href1!.match(/\/evidence\/([0-9a-f-]{36})$/i)?.[1];
    expect(ev0).toBeTruthy();
    expect(ev1).toBeTruthy();
    expect(ev0).not.toEqual(ev1);

    await openLinks.nth(0).click();
    await expect(page.getByRole("link", { name: "Download original" })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByRole("heading", { name: "Extraction (WP-07)" })).toBeVisible();
  });
});
