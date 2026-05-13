export function ResearchBanners() {
  return (
    <div className="space-y-2">
      <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
        Internal research only. This workspace is not client-ready legal advice, verified authority, or a court filing.
      </div>
      <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-200">
        Unsupported assertions are not proven. Contradictions and QA-flagged extractions must stay visible — LEXOS does
        not hide them.
      </div>
    </div>
  );
}
