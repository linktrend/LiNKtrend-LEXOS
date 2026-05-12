type StatusBadgeProps = {
  label: string;
  value: string | null | undefined;
  tone?: "neutral" | "warn" | "ok" | "bad";
};

const toneClass: Record<NonNullable<StatusBadgeProps["tone"]>, string> = {
  neutral: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
  warn: "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100",
  ok: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100",
  bad: "bg-red-100 text-red-900 dark:bg-red-900/40 dark:text-red-100",
};

export function StatusBadge({ label, value, tone = "neutral" }: StatusBadgeProps) {
  const v = value?.trim() || "—";
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{label}</span>
      <span className={`inline-flex w-fit rounded-md px-2 py-0.5 text-xs font-medium ${toneClass[tone]}`}>{v}</span>
    </div>
  );
}
