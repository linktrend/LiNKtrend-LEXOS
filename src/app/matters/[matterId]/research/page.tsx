import { PlaceholderPanel } from "@/components/shell/placeholder-panel";

type PageProps = { params: Promise<{ matterId: string }> };

export default async function MatterResearchPage({ params }: PageProps) {
  const { matterId } = await params;
  return (
    <PlaceholderPanel
      title="Research"
      description={`Matter ${matterId}: W7 research workspace — internal drafts only until review workflows exist.`}
    />
  );
}
