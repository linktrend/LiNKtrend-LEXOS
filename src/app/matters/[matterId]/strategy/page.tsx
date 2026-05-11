import { PlaceholderPanel } from "@/components/shell/placeholder-panel";

type PageProps = { params: Promise<{ matterId: string }> };

export default async function MatterStrategyPage({ params }: PageProps) {
  const { matterId } = await params;
  return (
    <PlaceholderPanel
      title="Strategy"
      description={`Matter ${matterId}: W6 strategy memos and planning — placeholder only in WP-01.`}
    />
  );
}
