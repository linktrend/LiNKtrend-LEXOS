import Link from "next/link";
import { PlaceholderPanel } from "@/components/shell/placeholder-panel";

export default function ClientsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-10">
      <PlaceholderPanel
        title="Clients"
        description="Client records and intake will connect here after WP-03/WP-04. Demo link below uses a fake id."
      />
      <p className="text-sm">
        <Link
          href="/clients/demo-client"
          className="font-medium text-zinc-800 underline-offset-4 hover:underline dark:text-zinc-200"
        >
          Open demo client shell →
        </Link>
      </p>
    </main>
  );
}
