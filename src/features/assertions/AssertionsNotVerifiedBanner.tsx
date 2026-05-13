export function AssertionsNotVerifiedBanner() {
  return (
    <div
      data-testid="assertions-not-verified-banner"
      className="rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-950 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100"
    >
      <p className="font-medium">Assertions are claims, not verified facts</p>
      <p className="mt-1 text-xs">
        By default, new assertions are pending review. Unsupported or vulnerable assertions stay visible here. Formal
        evidence linking happens in the Support Matrix (W5), which is not implemented in this packet.
      </p>
    </div>
  );
}
