export function ArgumentBanners() {
  return (
    <div className="space-y-2">
      <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
        Internal argument draft only. This is operator-authored work product — not a court filing, not externally
        approved, and not filing-ready.
      </div>
      <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-200">
        Unsupported assertions, contradictions, QA-flagged evidence, and open research issues must remain visible. LEXOS
        does not treat this narrative as verified fact or autonomous legal reasoning.
      </div>
    </div>
  );
}
