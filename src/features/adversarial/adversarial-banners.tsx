export function AdversarialBanners() {
  return (
    <div className="space-y-2">
      <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
        Internal adversarial stress-test only. This critique is not client-facing by default, not filing-ready, and not
        final legal work product.
      </div>
      <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-200">
        Do not hide weaknesses: unsupported assertions, contradictions, QA-flagged extractions, and research gaps must
        remain visible. LEXOS does not auto-strengthen the underlying argument record.
      </div>
    </div>
  );
}
