export function OutputBanners() {
  return (
    <div className="space-y-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
      <p className="font-medium">Internal revised work product (W11)</p>
      <p className="text-xs opacity-90">
        This workspace is for post-adversarial synthesis only. It is not court-ready, not a final external filing,
        and not autonomous legal reasoning. Visual exhibits and final presentation bundles are out of scope for
        this MVP packet.
      </p>
    </div>
  );
}
