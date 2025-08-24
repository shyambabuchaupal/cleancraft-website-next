import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Fetching cities from franchises...");

    let allCities: string[] = [];
    let page = 1;
    let pageCount = 1;

    while (page <= pageCount) {
      const res = await fetch(
        `${process.env.STRAPI_URL}/franchises?sort=city:asc&pagination[page]=${page}&pagination[pageSize]=50`,
        {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
        }
      );

      if (!res.ok) {
        console.error("Failed to fetch franchises:", res.status);
        break;
      }

      const result = await res.json();

      if (!result || !Array.isArray(result.data)) {
        console.warn("Invalid franchise data format");
        break;
      }

      const citiesOnPage = result.data
        .map((item: any) => item.city)
        .filter((city: string) => city && city.trim() !== "")
        .map((city: string) => city.trim());

      allCities = allCities.concat(citiesOnPage);

      pageCount = result.meta?.pagination?.pageCount || 1;
      page++;
    }

    const uniqueCities = Array.from(new Set(allCities));
    console.log("Cities fetched:", uniqueCities.length);

    return NextResponse.json(uniqueCities);
  } catch (error: any) {
    console.error("Error fetching cities:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch cities" },
      { status: 500 }
    );
  }
}
