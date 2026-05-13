export function CaseStoryWarnings() {
  return (
    <div
      data-testid="case-story-narrative-warning"
      className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100"
    >
      <p className="font-medium">Narrative artifact — not verified fact</p>
      <p className="mt-1 text-xs">
        The case story is operator-authored narrative. It is not evidence, not a verified record of events, and must
        not be treated as a substitute for originals, extractions, or later support mapping (W5).
      </p>
    </div>
  );
}
