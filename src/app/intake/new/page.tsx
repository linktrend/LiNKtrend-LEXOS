import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { IntakeNewForm } from "@/features/intake/IntakeNewForm";

export const metadata = { title: "New intake — LEXOS" };

export default async function IntakeNewPage() {
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <div className="mb-6">
        <Link href="/intake" className="text-sm text-indigo-600 hover:underline dark:text-indigo-400">
          ← All intake
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">New intake</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Creates an intake record only (no W1 client until explicit acceptance handoff).
        </p>
      </div>
      <IntakeNewForm />
    </main>
  );
}
