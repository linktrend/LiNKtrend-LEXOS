import { defineConfig, devices } from "@playwright/test";
import { config as loadEnv } from "dotenv";
import { resolve } from "path";

// Load local env for LEXOS_E2E_* (and optional shared vars). Never log values here.
loadEnv({ path: resolve(process.cwd(), ".env.local"), quiet: true });
// Dedicated E2E overrides (optional); wins over .env.local for duplicate keys.
loadEnv({ path: resolve(process.cwd(), ".env.e2e.local"), quiet: true, override: true });

// CI must always spawn a dev server for E2E unless explicitly opted out after env load.
if (process.env.CI && process.env.LEXOS_E2E_ALLOW_SKIP_WEBSERVER_IN_CI !== "1") {
  delete process.env.LEXOS_E2E_SKIP_WEBSERVER;
}

const baseURL =
  normalizeBaseUrl(process.env.LEXOS_E2E_BASE_URL) || "http://localhost:3000";

function normalizeBaseUrl(raw: string | undefined): string {
  const t = raw?.trim();
  if (!t) return "";
  return t.replace(/\/$/, "");
}

export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  timeout: 120_000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: process.env.LEXOS_E2E_SKIP_WEBSERVER
    ? undefined
    : {
        command: "pnpm run dev",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
