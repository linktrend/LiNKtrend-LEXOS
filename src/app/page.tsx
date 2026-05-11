import Link from "next/link";
import { PlaceholderPanel } from "@/components/shell/placeholder-panel";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-10">
      <PlaceholderPanel
        title="LEXOS MVP"
        description="Structured legal cognition: clients and matters, case story, evidence and extraction, assertions and support, strategy, research, argument draft, adversarial review, and revised output. This is an internal shell — not chatbot-first and not filing-ready."
      />
      <div className="flex flex-wrap gap-3 text-sm">
        <Link
          className="rounded-md bg-zinc-900 px-4 py-2 font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          href="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className="rounded-md border border-zinc-300 px-4 py-2 font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          href="/matters"
        >
          Matters
        </Link>
        <Link
          className="rounded-md border border-zinc-300 px-4 py-2 font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          href="/clients"
        >
          Clients
        </Link>
      </div>
    </main>
  );
}
