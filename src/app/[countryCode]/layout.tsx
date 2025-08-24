import type { Metadata } from "next";
import { ReactNode } from "react";
import CountryLayout from "@/components/CountryLayout";
import { generateDynamicMetadata } from "@/utils/generateMetadata";

// Generate metadata based on country code and pages.json
export async function generateMetadata({
  params,
}: {
  params: Promise<{ countryCode: string }>;
}): Promise<Metadata> {
  const { countryCode } = await params;
  return await generateDynamicMetadata("/", countryCode);
}

export default function CountryCodeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <CountryLayout>{children}</CountryLayout>;
}
