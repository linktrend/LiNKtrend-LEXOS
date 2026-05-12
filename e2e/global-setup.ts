import { randomUUID } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { config as loadEnv } from "dotenv";
import { resolve } from "path";
import { getE2ECredentials } from "./helpers/env";

const E2E_CLIENT_NAME = "LEXOS E2E Client";
const E2E_MATTER_NAME = "LEXOS E2E Matter";

async function ensureProfileClientAndMatter(
  admin: SupabaseClient,
  userId: string,
  email: string
): Promise<void> {
  const { data: existingMatter } = await admin
    .from("matters")
    .select("id")
    .eq("created_by", userId)
    .limit(1)
    .maybeSingle();

  if (existingMatter?.id) {
    console.log("[lexos e2e global-setup] Matter already exists for user — skip DB seed.");
    return;
  }

  const { error: profErr } = await admin.from("user_profiles").upsert(
    {
      id: userId,
      email,
      display_name: "E2E",
    },
    { onConflict: "id" }
  );

  if (profErr) {
    console.warn(`[lexos e2e global-setup] user_profiles upsert failed: ${profErr.message}`);
    return;
  }

  const clientId = randomUUID();
  const { error: cErr } = await admin.from("clients").insert({
    id: clientId,
    client_name: E2E_CLIENT_NAME,
    created_by: userId,
  });

  if (cErr) {
    console.warn(`[lexos e2e global-setup] clients insert failed: ${cErr.message}`);
    return;
  }

  const matterId = randomUUID();
  const { error: mErr } = await admin.from("matters").insert({
    id: matterId,
    client_id: clientId,
    matter_name: E2E_MATTER_NAME,
    created_by: userId,
  });

  if (mErr) {
    console.warn(`[lexos e2e global-setup] matters insert failed: ${mErr.message}`);
    return;
  }

  console.log("[lexos e2e global-setup] Seeded E2E client + matter for uploads.");
}

/**
 * Optional: set LEXOS_E2E_BOOTSTRAP_AUTH=1 with SUPABASE_SERVICE_ROLE_KEY in env
 * so the Supabase Auth user matches LEXOS_E2E_EMAIL / LEXOS_E2E_PASSWORD (fixes
 * drift and .env parsing mistakes), and a minimal client+matter exists for WP-06.
 * Never commit the service role key.
 */
export default async function globalSetup(): Promise<void> {
  loadEnv({ path: resolve(process.cwd(), ".env.local"), quiet: true });
  loadEnv({ path: resolve(process.cwd(), ".env.e2e.local"), quiet: true, override: true });

  if (process.env.LEXOS_E2E_BOOTSTRAP_AUTH !== "1") {
    return;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const creds = getE2ECredentials();

  if (!url || !serviceKey || !creds) {
    console.warn(
      "[lexos e2e global-setup] LEXOS_E2E_BOOTSTRAP_AUTH=1 but NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, or E2E credentials are missing — skipping bootstrap."
    );
    return;
  }

  const admin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  let userId: string | null = null;

  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email: creds.email,
    password: creds.password,
    email_confirm: true,
  });

  if (!createErr && created.user) {
    userId = created.user.id;
    console.log("[lexos e2e global-setup] Created E2E Auth user.");
  } else {
    const duplicate =
      createErr?.message?.toLowerCase().includes("already") ||
      createErr?.message?.toLowerCase().includes("registered");

    if (!duplicate) {
      console.warn(
        `[lexos e2e global-setup] createUser failed: ${createErr?.message ?? "unknown"} — skipping update path.`
      );
      return;
    }

    const { data: pageData, error: listErr } = await admin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });

    if (listErr || !pageData?.users?.length) {
      console.warn(
        `[lexos e2e global-setup] listUsers failed: ${listErr?.message ?? "empty"} — cannot sync password.`
      );
      return;
    }

    const match = pageData.users.find((u) => u.email?.toLowerCase() === creds.email.toLowerCase());

    if (!match) {
      console.warn(
        "[lexos e2e global-setup] User exists but not found in first listUsers page — increase perPage or create user in dashboard."
      );
      return;
    }

    const { error: updErr } = await admin.auth.admin.updateUserById(match.id, {
      password: creds.password,
      email_confirm: true,
    });

    if (updErr) {
      console.warn(`[lexos e2e global-setup] updateUserById failed: ${updErr.message}`);
      return;
    }

    userId = match.id;
    console.log("[lexos e2e global-setup] Synced password for existing E2E Auth user.");
  }

  if (userId) {
    await ensureProfileClientAndMatter(admin, userId, creds.email);
  }
}
