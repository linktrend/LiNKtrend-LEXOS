import Link from "next/link";
import { PlaceholderPanel } from "@/components/shell/placeholder-panel";

export default function MattersPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-10">
      <PlaceholderPanel
        title="Matters"
        description="Matters are scoped workspaces for legal cognition. Use a demo matter id to explore the section shell."
      />
      <p className="text-sm">
        <Link
          href="/matters/demo-matter"
          className="font-medium text-zinc-800 underline-offset-4 hover:underline dark:text-zinc-200"
        >
          Open demo matter shell →
        </Link>
      </p>
    </main>
  );
}
