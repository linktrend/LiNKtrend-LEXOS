import { PlaceholderPanel } from "@/components/shell/placeholder-panel";

type PageProps = { params: Promise<{ matterId: string }> };

export default async function MatterStoryPage({ params }: PageProps) {
  const { matterId } = await params;
  return (
    <PlaceholderPanel
      title="Case story"
      description={`Matter ${matterId}: structured narrative spine — wired in later phases; not a free-form chat transcript.`}
    />
  );
}
