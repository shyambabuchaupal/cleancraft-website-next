import type { Metadata } from "next";
import { ReactNode } from "react";

// Test with hardcoded metadata for blog page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ countryCode: string }>;
}): Promise<Metadata> {
  const { countryCode } = await params;

  const titles = {
    in: "Clean Craft Blog - How to start best Laundry business in India | CleanCraft",
    au: "Dry Cleaning & Wet Cleaning Blog Australia | CleanCraft",
  };

  const descriptions = {
    in: "Stay updated with the Clean Craft Blog! Discover expert laundry tips, fabric care hacks, cleaning trends, and insights to keep your wardrobe fresh and well-maintained.",
    au: "Expert tips and insights on professional dry cleaning, wet cleaning, and garment care in Australia.",
  };

  return {
    title: titles[countryCode as keyof typeof titles] || titles.in,
    description:
      descriptions[countryCode as keyof typeof descriptions] || descriptions.in,
  };
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
