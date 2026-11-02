import type { Metadata } from "next";
import { WaliAccessGate } from "@/components/wali/WaliAccessGate";

type PageProps = {
  params: Promise<{ token: string }>;
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Wali Chaperone — Ghazl",
  robots: { index: false, follow: false },
};

export default async function WaliChaperonePage({ params }: PageProps) {
  const { token } = await params;
  return <WaliAccessGate token={token} />;
}
