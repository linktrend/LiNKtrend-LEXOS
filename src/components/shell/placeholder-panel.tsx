type PlaceholderPanelProps = {
  title: string;
  description?: string;
};

export function PlaceholderPanel({ title, description }: PlaceholderPanelProps) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/80">
      <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {title}
      </h1>
      {description ? (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      ) : null}
      <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-500">
        WP-01 shell — internal navigation only. No client data, auth, or model calls.
      </p>
    </section>
  );
}
