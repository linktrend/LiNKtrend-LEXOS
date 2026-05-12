import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthContext } from "@/server/auth/context";
import { ClientCreateForm } from "@/features/clients/ClientCreateForm";

export const metadata = { title: "New client — LEXOS" };

export default async function NewClientPage() {
  const ctx = await getAuthContext();
  if (!ctx) redirect("/login");

  if (!ctx.canMutate) {
    return (
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Your role cannot create clients. Contact an administrator.
        </p>
        <Link href="/clients" className="mt-4 inline-block text-sm text-indigo-600 hover:underline">
          Back to clients
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <div className="mb-6">
        <Link href="/clients" className="text-sm text-indigo-600 hover:underline">
          ← Clients
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">New client</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Demo data only. No real legal or client-identifying information.
        </p>
      </div>
      <ClientCreateForm />
    </main>
  );
}
