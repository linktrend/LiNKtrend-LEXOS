import { MatterNav } from "@/components/layout/matter-nav";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ matterId: string }>;
};

export default async function MatterSectionLayout({ children, params }: LayoutProps) {
  const { matterId } = await params;
  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
        Matter{" "}
        <span className="font-mono text-zinc-700 dark:text-zinc-300">{matterId}</span>
        <span className="text-zinc-400"> — route shell only</span>
      </p>
      <MatterNav matterId={matterId} />
      {children}
    </div>
  );
}
