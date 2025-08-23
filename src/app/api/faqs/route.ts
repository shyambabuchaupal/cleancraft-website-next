import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const countryCode = searchParams.get("country") || "in";
    const category = searchParams.get("category") || "home";

    const res = await fetch(
      `${process.env.STRAPI_URL}/faqs?filters[country][code][$eq]=${countryCode}&filters[category][$eq]=${category}&sort=order:asc&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Strapi FAQs API error:", res.status, text);
      throw new Error(`Failed to fetch FAQs: ${res.status}`);
    }

    const data = await res.json();

    // अगर Strapi से data नहीं मिला तो empty array return करो
    return NextResponse.json(data || { data: [], meta: { pagination: {} } });
  } catch (err: any) {
    console.error("❌ FAQs API failed:", err);
    return NextResponse.json(
      { data: [], meta: { pagination: {} }, error: err.message || "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}
