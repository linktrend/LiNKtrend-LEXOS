import Link from "next/link";

const matterSections = [
  { segment: "overview", label: "Overview" },
  { segment: "story", label: "Story" },
  { segment: "evidence", label: "Evidence" },
  { segment: "assertions", label: "Assertions" },
  { segment: "strategy", label: "Strategy" },
  { segment: "research", label: "Research" },
  { segment: "argument", label: "Argument" },
  { segment: "adversarial", label: "Adversarial" },
  { segment: "output", label: "Output" },
  { segment: "risks", label: "Risks" },
  { segment: "workflow", label: "Workflow" },
] as const;

type MatterNavProps = {
  matterId: string;
};

export function MatterNav({ matterId }: MatterNavProps) {
  const base = `/matters/${matterId}`;
  return (
    <nav
      className="mb-6 flex flex-wrap gap-1 border-b border-zinc-200 pb-3 dark:border-zinc-800"
      aria-label="Matter sections"
    >
      {matterSections.map(({ segment, label }) => (
        <Link
          key={segment}
          href={`${base}/${segment}`}
          className="rounded-md px-2 py-1 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50 sm:text-sm"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
