import { PlaceholderPanel } from "@/components/shell/placeholder-panel";

type PageProps = { params: Promise<{ matterId: string }> };

export default async function MatterOutputPage({ params }: PageProps) {
  const { matterId } = await params;
  return (
    <PlaceholderPanel
      title="Revised output (W11)"
      description={`Matter ${matterId}: revised artifacts after review — distinct from unfinalized drafts.`}
    />
  );
}
