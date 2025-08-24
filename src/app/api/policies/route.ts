import { NextResponse } from "next/server";
import { StrapiPolicy } from "@/types/strapi";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country") || "in";

    if (!process.env.STRAPI_URL || !process.env.STRAPI_API_TOKEN) {
      console.error("Strapi URL or API Token missing in environment variables");
      return NextResponse.json(
        { error: "Server misconfiguration: Strapi credentials missing" },
        { status: 500 }
      );
    }

    const res = await fetch(
      `${process.env.STRAPI_URL}/policies?filters[country][code][$eq]=${country}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Policies API error:", res.status, text);
      throw new Error(`Failed to fetch policies: ${res.status}`);
    }

    const data: { data: StrapiPolicy[] } = await res.json();

    console.log("Policies data fetched:", JSON.stringify(data, null, 2));

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
