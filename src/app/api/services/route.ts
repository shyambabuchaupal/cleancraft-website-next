import { NextResponse } from "next/server";

export async function GET(Request: NextResponse) {
  try {
    const country = Request.headers.get("country") || "in";
 
    debugger;

    const res = await fetch(`${process.env.STRAPI_URL}/services?country=${country}`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });
    console.log("Fetching services from Strapi:", res.status);

    if (!res.ok) throw new Error(`Strapi status: ${res.status}`);

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Error fetching services:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch services" },
      { status: 500 }
    );
  }
}
