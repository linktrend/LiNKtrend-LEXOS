"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Database } from "@/types/database";
import { isAssertionArchivedRow } from "@/features/assertions/assertion-utils";

type AssertionRow = Database["public"]["Tables"]["assertions"]["Row"];

function metaStr(meta: AssertionRow["metadata"], key: string): string | null {
  if (!meta || typeof meta !== "object" || Array.isArray(meta)) return null;
  const v = (meta as Record<string, unknown>)[key];
  return typeof v === "string" ? v : null;
}

type Props = {
  matterId: string;
  rows: AssertionRow[];
};

export function AssertionsTable({ matterId, rows }: Props) {
  const [hideArchived, setHideArchived] = useState(false);

  const visible = useMemo(() => {
    if (!hideArchived) return rows;
    return rows.filter((r) => !isAssertionArchivedRow(r));
  }, [rows, hideArchived]);

  if (rows.length === 0) {
    return (
      <p
        data-testid="assertions-list-empty"
        className="rounded-lg border border-dashed border-zinc-300 px-4 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"
      >
        No assertions yet. Create one below. Unsupported and vulnerable assertions remain visible once added.
      </p>
    );
  }

  return (
    <div className="space-y-3" data-testid="assertions-table-wrap">
      <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
        <input
          type="checkbox"
          checked={hideArchived}
          onChange={(e) => setHideArchived(e.target.checked)}
          className="rounded border-zinc-400"
        />
        Hide archived
      </label>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-800" data-testid="assertions-table">
          <thead className="bg-zinc-50 dark:bg-zinc-900/50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase text-zinc-500">Assertion</th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase text-zinc-500">Truth</th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase text-zinc-500">Support</th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase text-zinc-500">Use</th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase text-zinc-500">Next</th>
              <th className="px-3 py-2 text-right text-xs font-medium uppercase text-zinc-500">Detail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-950">
            {visible.map((row) => {
              const snippet =
                row.assertion_text.length > 120 ? `${row.assertion_text.slice(0, 120)}…` : row.assertion_text;
              const archived = isAssertionArchivedRow(row);
              const next = metaStr(row.metadata, "next_support_action");
              return (
                <tr key={row.id} data-testid={`assertion-row-${row.id}`}>
                  <td className="px-3 py-2 text-zinc-900 dark:text-zinc-100">
                    <div className="font-medium">{snippet}</div>
                    {row.assertion_type ? (
                      <div className="text-xs text-zinc-500">{row.assertion_type}</div>
                    ) : null}
                    {archived ? (
                      <span className="mt-1 inline-block rounded bg-zinc-200 px-1.5 py-0.5 text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                        Archived
                      </span>
                    ) : null}
                    {row.contradiction_flag ? (
                      <span className="ml-1 mt-1 inline-block rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-900 dark:bg-red-950 dark:text-red-100">
                        Contradiction
                      </span>
                    ) : null}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300">
                    {row.truth_state ?? "—"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300">
                    {row.support_state ?? "—"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300">
                    {row.use_status ?? "—"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300">
                    {next ?? "—"}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <Link
                      href={`/matters/${matterId}/assertions/${row.id}`}
                      className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
