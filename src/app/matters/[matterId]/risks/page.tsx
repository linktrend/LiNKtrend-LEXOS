import { PlaceholderPanel } from "@/components/shell/placeholder-panel";

type PageProps = { params: Promise<{ matterId: string }> };

export default async function MatterRisksPage({ params }: PageProps) {
  const { matterId } = await params;
  return (
    <PlaceholderPanel
      title="Risks"
      description={`Matter ${matterId}: risk records stay separate from generic workflow badges — surfaced here later.`}
    />
  );
}
