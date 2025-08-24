import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country") || "in";
    const featured = searchParams.get("featured");
    const category = searchParams.get("category");
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "9";

    if (!process.env.STRAPI_URL || !process.env.STRAPI_API_TOKEN) {
      console.error("Strapi URL or API Token missing in environment variables");
      return NextResponse.json(
        { error: "Server misconfiguration: Strapi credentials missing" },
        { status: 500 }
      );
    }

    // Build filters
    let filters = `filters[country][code][$eq]=${country}`;
    
    if (featured !== null && featured !== undefined) {
      filters += `&filters[is_featured][$eq]=${featured}`;
    }
    
    if (category) {
      filters += `&filters[blog_categories][slug][$eq]=${category}`;
    }

    // Build URL
    const strapiUrl = `${process.env.STRAPI_URL}/blogs?${filters}&populate=*&sort=publishedDate:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    
    console.log("Fetching blogs from:", strapiUrl);

    const res = await fetch(strapiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Blog API error:", res.status, text);
      throw new Error(`Failed to fetch blogs: ${res.status}`);
    }

    const data = await res.json();
    console.log("Blog data fetched successfully:", data?.data?.length || 0, "blogs");

    return NextResponse.json(data);
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
