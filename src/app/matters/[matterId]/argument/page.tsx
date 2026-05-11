import { PlaceholderPanel } from "@/components/shell/placeholder-panel";

type PageProps = { params: Promise<{ matterId: string }> };

export default async function MatterArgumentPage({ params }: PageProps) {
  const { matterId } = await params;
  return (
    <PlaceholderPanel
      title="Argument draft"
      description={`Matter ${matterId}: W8 argument drafts are internal work product — not implied as externally approved or filing-ready.`}
    />
  );
}
