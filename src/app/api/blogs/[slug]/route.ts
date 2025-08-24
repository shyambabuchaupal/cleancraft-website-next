import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country") || "in";
    const { slug } = await params;

    if (!process.env.STRAPI_URL || !process.env.STRAPI_API_TOKEN) {
      console.error("Strapi URL or API Token missing in environment variables");
      return NextResponse.json(
        { error: "Server misconfiguration: Strapi credentials missing" },
        { status: 500 }
      );
    }

    const strapiUrl = `${process.env.STRAPI_URL}/blogs?filters[slug][$eq]=${slug}&filters[country][code][$eq]=${country}&populate=*`;
    
    console.log("Fetching blog by slug:", slug, "country:", country);

    const res = await fetch(strapiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Blog by slug API error:", res.status, text);
      if (res.status === 404) {
        return NextResponse.json(null, { status: 404 });
      }
      throw new Error(`Failed to fetch blog: ${res.status}`);
    }

    const data = await res.json();
    const blog = data?.data?.[0] || null;
    
    console.log("Blog by slug fetched:", blog ? "found" : "not found");

    return NextResponse.json(blog);
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error('Unknown error');
    console.error("Error fetching blog by slug:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
