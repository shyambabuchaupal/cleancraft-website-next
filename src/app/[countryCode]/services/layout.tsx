import type { Metadata } from "next";
import { ReactNode } from "react";
import { generateDynamicMetadata } from "@/utils/generateMetadata";

// Generate metadata for services page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ countryCode: string }>;
}): Promise<Metadata> {
  const { countryCode } = await params;
  return await generateDynamicMetadata("/services", countryCode);
}

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
