import { PlaceholderPanel } from "@/components/shell/placeholder-panel";

type PageProps = { params: Promise<{ matterId: string }> };

export default async function MatterAssertionsPage({ params }: PageProps) {
  const { matterId } = await params;
  return (
    <PlaceholderPanel
      title="Assertions"
      description={`Matter ${matterId}: assertion objects and support mapping — schema and W5 in later packets.`}
    />
  );
}
