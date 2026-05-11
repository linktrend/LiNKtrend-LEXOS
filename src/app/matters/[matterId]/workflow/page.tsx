import { PlaceholderPanel } from "@/components/shell/placeholder-panel";

type PageProps = { params: Promise<{ matterId: string }> };

export default async function MatterWorkflowPage({ params }: PageProps) {
  const { matterId } = await params;
  return (
    <PlaceholderPanel
      title="Workflow"
      description={`Matter ${matterId}: workflow state for the legal cognition spine — data layer in WP-02+.`}
    />
  );
}
