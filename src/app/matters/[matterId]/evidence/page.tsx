import { PlaceholderPanel } from "@/components/shell/placeholder-panel";

type PageProps = { params: Promise<{ matterId: string }> };

export default async function MatterEvidencePage({ params }: PageProps) {
  const { matterId } = await params;
  return (
    <PlaceholderPanel
      title="Evidence"
      description={`Matter ${matterId}: evidence objects and originals — W4-lite ingestion attaches here later. Originals are never replaced by extractions.`}
    />
  );
}
