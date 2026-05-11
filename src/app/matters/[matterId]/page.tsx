import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ matterId: string }>;
};

export default async function MatterLandingPage({ params }: PageProps) {
  const { matterId } = await params;
  redirect(`/matters/${matterId}/overview`);
}
