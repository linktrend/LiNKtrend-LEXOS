import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthContext } from "@/server/auth/context";
import { getIntakeBundle } from "@/server/intake/queries";
import { IntakeDetailClient } from "@/features/intake/IntakeDetailClient";

const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function generateMetadata({ params }: { params: Promise<{ intakeId: string }> }) {
  const { intakeId } = await params;
  if (!uuidRe.test(intakeId)) return { title: "Intake — LEXOS" };
  return { title: `Intake ${intakeId.slice(0, 8)}… — LEXOS` };
}

export default async function IntakeDetailPage({ params }: { params: Promise<{ intakeId: string }> }) {
  const { intakeId } = await params;
  if (!uuidRe.test(intakeId)) notFound();

  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");

  const supabase = await createSupabaseServerClient();
  const bundle = await getIntakeBundle(supabase, intakeId, ctx);
  if (!bundle) notFound();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <Link href="/intake" className="text-sm text-indigo-600 hover:underline dark:text-indigo-400">
        ← All intake
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Intake detail</h1>
      <p className="mt-1 font-mono text-xs text-zinc-500">{bundle.intake.id}</p>
      <IntakeDetailClient bundle={bundle} />
    </main>
  );
}
