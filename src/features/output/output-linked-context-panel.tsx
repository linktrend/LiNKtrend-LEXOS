import Link from "next/link";
import type { Database } from "@/types/database";

type ArgumentDraftRow = Database["public"]["Tables"]["argument_drafts"]["Row"];
type AdversarialRow = Database["public"]["Tables"]["adversarial_critiques"]["Row"];

export function OutputLinkedContextPanel({
  matterId,
  draft,
  critique,
}: {
  matterId: string;
  draft: ArgumentDraftRow | null;
  critique: AdversarialRow | null;
}) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Linked sources</h3>
      <dl className="mt-3 space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
        <div>
          <dt className="font-medium text-zinc-500">Argument draft</dt>
          <dd>
            {draft ? (
              <Link
                href={`/matters/${matterId}/argument/${draft.id}`}
                className="text-indigo-600 hover:underline dark:text-indigo-400"
              >
                {(draft.title ?? "Untitled").slice(0, 100)}
              </Link>
            ) : (
              "—"
            )}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-zinc-500">Adversarial critique</dt>
          <dd>
            {critique ? (
              <>
                <Link
                  href={`/matters/${matterId}/adversarial/${critique.id}`}
                  className="text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  {(critique.title ?? "Critique").slice(0, 100)}
                </Link>
                {critique.loop_decision ? (
                  <p className="mt-1 text-zinc-500">Loop: {critique.loop_decision}</p>
                ) : null}
                {critique.severity_summary ? (
                  <p className="text-zinc-500">Severity: {critique.severity_summary}</p>
                ) : null}
              </>
            ) : (
              "—"
            )}
          </dd>
        </div>
      </dl>
    </section>
  );
}
