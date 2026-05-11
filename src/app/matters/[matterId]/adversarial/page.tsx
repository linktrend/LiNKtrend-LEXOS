import { PlaceholderPanel } from "@/components/shell/placeholder-panel";

type PageProps = { params: Promise<{ matterId: string }> };

export default async function MatterAdversarialPage({ params }: PageProps) {
  const { matterId } = await params;
  return (
    <PlaceholderPanel
      title="Adversarial review (W9)"
      description={`Matter ${matterId}: W9 adversarial critique is mandatory in the MVP spine — automation arrives in later work packets.`}
    />
  );
}
