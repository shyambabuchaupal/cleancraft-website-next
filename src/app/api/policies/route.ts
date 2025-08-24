import { NextResponse } from "next/server";
import { StrapiPolicy } from "@/types/strapi";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country") || "in";

    console.log(`🔍 Fetching policies for country: ${country}`);

    if (!process.env.STRAPI_URL || !process.env.STRAPI_API_TOKEN) {
      console.error("Strapi URL or API Token missing in environment variables");
      return NextResponse.json(
        { error: "Server misconfiguration: Strapi credentials missing" },
        { status: 500 }
      );
    }

    const strapiUrl = `${process.env.STRAPI_URL}/policies?filters[country][code][$eq]=${country}&populate=*`;
    console.log(`📡 Strapi URL: ${strapiUrl}`);

    const res = await fetch(strapiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    console.log(`📊 Strapi response status: ${res.status}`);

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Strapi policies API error:", res.status, text);
      throw new Error(`Failed to fetch policies: ${res.status}`);
    }

    const data: { data: StrapiPolicy[] } = await res.json();

    console.log(`✅ Policies found for ${country}:`, data.data?.length || 0);
    console.log("📋 Policies data:", JSON.stringify(data.data?.map(p => ({ 
      name: p.name, 
      slug: p.slug,
      country: p.country 
    })), null, 2));

    return NextResponse.json(data);
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    console.error("Error fetching policies:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch policies" },
      { status: 500 }
    );
  }
}
