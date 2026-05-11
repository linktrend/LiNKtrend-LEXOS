import { PlaceholderPanel } from "@/components/shell/placeholder-panel";

type PageProps = { params: Promise<{ matterId: string }> };

export default async function MatterOverviewPage({ params }: PageProps) {
  const { matterId } = await params;
  return (
    <PlaceholderPanel
      title="Overview"
      description={`Matter ${matterId}: high-level status and links will live here after schema and workflow data exist.`}
    />
  );
}
