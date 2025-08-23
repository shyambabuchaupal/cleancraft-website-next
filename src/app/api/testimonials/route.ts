import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const country = request.headers.get("country") || "in";

    const res = await fetch(
      `${process.env.STRAPI_URL}/testimonials?filters[country][code][$eq]=${country}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    console.log("Fetching testimonials from Strapi:", res);

    if (!res.ok) {
      const text = await res.text();
      console.error("Testimonials API error:", res.status, text);
      throw new Error(`Failed to fetch testimonials: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Error fetching testimonials:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
