import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

export type E2ECredentials = { email: string; password: string };

/** Strip BOM, trim, and remove one matching pair of surrounding quotes (common .env mistake). */
export function normalizeEnvScalar(raw: string | undefined): string {
  if (raw === undefined || raw === null) return "";
  let s = String(raw).replace(/^\uFEFF/, "").trim();
  if (
    (s.startsWith('"') && s.endsWith('"') && s.length >= 2) ||
    (s.startsWith("'") && s.endsWith("'") && s.length >= 2)
  ) {
    s = s.slice(1, -1);
  }
  return s;
}

function readPasswordFromEnv(): string {
  const filePath = process.env.LEXOS_E2E_PASSWORD_FILE?.trim();
  if (filePath) {
    const abs = resolve(process.cwd(), filePath);
    if (!existsSync(abs)) return "";
    return readFileSync(abs, "utf8").replace(/\r\n/g, "\n").trim();
  }
  return normalizeEnvScalar(process.env.LEXOS_E2E_PASSWORD);
}

export function getE2ECredentials(): E2ECredentials | null {
  const email = normalizeEnvScalar(process.env.LEXOS_E2E_EMAIL);
  const password = readPasswordFromEnv();
  if (!email || !password) return null;
  return { email, password };
}
