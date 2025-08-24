import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country") || "in";

    console.log("Fetching services for country:", country);

    const res = await fetch(`${process.env.STRAPI_URL}/services?filters[country][code][$eq]=${country}&populate=*`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });
    
    console.log("Strapi services response status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Strapi error:", errorText);
      throw new Error(`Strapi status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Services data received:", data?.data?.length || 0, "services");
    
    return NextResponse.json(data?.data || []);
  } catch (err: any) {
    console.error("Error fetching services:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch services" },
      { status: 500 }
    );
  }
}
