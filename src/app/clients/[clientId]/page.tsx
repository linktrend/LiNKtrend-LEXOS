import { PlaceholderPanel } from "@/components/shell/placeholder-panel";

type PageProps = {
  params: Promise<{ clientId: string }>;
};

export default async function ClientDetailPage({ params }: PageProps) {
  const { clientId } = await params;
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <PlaceholderPanel
        title={`Client: ${clientId}`}
        description="Landing route for a single client. Persistent client memory and intake separation are enforced in later schema and workflows — this page is UI-only."
      />
    </main>
  );
}
