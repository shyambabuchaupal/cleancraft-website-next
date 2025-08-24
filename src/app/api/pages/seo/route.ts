import { NextResponse } from "next/server";
import { pageService } from "../route";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug") || "";
    const country = searchParams.get("country") || "in";

    console.log("Fetching SEO for slug:", slug, "country:", country);

    const seoData = await pageService.getPageSEO(slug, country);
    
    if (!seoData) {
      console.warn(`⚠️ SEO not found for slug: ${slug}, country: ${country}`);
      return NextResponse.json(null);
    }

    console.log("✅ SEO data found:", seoData);
    return NextResponse.json(seoData);
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    console.error("Error fetching page SEO:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch page SEO" },
      { status: 500 }
    );
  }
}
