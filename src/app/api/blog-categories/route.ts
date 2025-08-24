import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.STRAPI_URL || !process.env.STRAPI_API_TOKEN) {
      console.error("Strapi URL or API Token missing in environment variables");
      return NextResponse.json(
        { error: "Server misconfiguration: Strapi credentials missing" },
        { status: 500 }
      );
    }

    const strapiUrl = `${process.env.STRAPI_URL}/blog-categories?populate=*&sort=name:asc`;
    
    console.log("Fetching blog categories");

    const res = await fetch(strapiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Blog categories API error:", res.status, text);
      throw new Error(`Failed to fetch blog categories: ${res.status}`);
    }

    const data = await res.json();
    console.log("Blog categories fetched:", data?.data?.length || 0, "categories");

    return NextResponse.json(data);
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    console.error("Error fetching blog categories:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch blog categories" },
      { status: 500 }
    );
  }
}
