import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337/api";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

// Utility: clean query params (remove empty/null/undefined)
const clean = (o: any): any =>
  Array.isArray(o)
    ? o.map(clean)
    : o && typeof o === "object"
    ? Object.fromEntries(
        Object.entries(o)
          .filter(([, v]) => v !== undefined && v !== null && v !== "")
          .map(([k, v]) => [k, clean(v)])
      )
    : o;

// Utility: fetch from Strapi
async function getCollection<T>(
  collection: string,
  params: Record<string, any> = {}
): Promise<T> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "object") {
      query.set(key, JSON.stringify(value));
    } else {
      query.set(key, String(value));
    }
  });

  const url = `${STRAPI_URL}/${collection}?${query.toString()}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status}`);
  }

  return res.json();
}

/**
 * GET /api/content
 * Supports multiple query types:
 *   /api/content?type=blogs&country=in&category=tech
 *   /api/content?type=blogBySlug&slug=xyz&country=in
 *   /api/content?type=services&country=in
 *   /api/content?type=testimonials&country=in&category=home
 *   /api/content?type=faqs&country=in
 *   /api/content?type=policies&country=in
 *   /api/content?type=cities
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  try {
    switch (type) {
      case "blogs": {
        const country = searchParams.get("country") || "in";
        const category = searchParams.get("category") || undefined;
        const featured = searchParams.get("featured") === "true";
        const search = searchParams.get("search") || undefined;
        const page = parseInt(searchParams.get("page") || "1", 10);
        const pageSize = parseInt(searchParams.get("pageSize") || "9", 10);
        const locale = searchParams.get("locale") || undefined;
        const sortBy = searchParams.get("sortBy") || "publishedDate";
        const sortOrder = searchParams.get("sortOrder") || "desc";

        const filters: any = {
          country: { code: { $eq: country.toLowerCase() } },
        };
        if (featured) filters.is_featured = { $eq: true };
        if (category) filters.blog_categories = { slug: { $eq: category } };
        if (search) {
          filters.$or = [
            { title: { $containsi: search } },
            { content: { $containsi: search } },
            { seo_description: { $containsi: search } },
          ];
        }

        const params = clean({
          populate: "*",
          filters,
          sort: [`${sortBy}:${sortOrder}`],
          pagination: { page, pageSize },
          locale,
        });

        const blogs = await getCollection("blogs", params);
        return NextResponse.json(blogs);
      }

      case "blogBySlug": {
        const slug = searchParams.get("slug");
        const country = searchParams.get("country") || "in";
        const locale = searchParams.get("locale") || undefined;

        const params = clean({
          populate: "*",
          filters: {
            slug: { $eq: slug },
            country: { code: { $eq: country.toLowerCase() } },
          },
          locale,
        });

        const res = await getCollection("blogs", params);
        return NextResponse.json(res.data[0] ?? null);
      }

      case "blogCategories": {
        const res = await getCollection("blog-categories", {
          populate: "*",
          sort: ["name:asc"],
        });
        return NextResponse.json(res);
      }

      case "services": {
        const country = searchParams.get("country") || "in";
        const params = clean({
          populate: {
            icon: { fields: ["url", "alternativeText"] },
            country: true,
          },
          filters: { country: { code: { $eq: country.toLowerCase() } } },
          sort: ["name:asc"],
        });

        const res = await getCollection("services", params);
        return NextResponse.json(res);
      }

      case "testimonials": {
        const country = searchParams.get("country") || "in";
        const category = searchParams.get("category") || undefined;
        const platform = searchParams.get("platform") || undefined;
        const sortBy = searchParams.get("sortBy") || "rating";
        const sortOrder = searchParams.get("sortOrder") || "desc";

        const filters: any = {
          country: { code: { $eq: country.toLowerCase() } },
        };
        if (category) filters.category = { $eq: category };
        if (platform) filters.platform = { $eq: platform };

        const params = clean({
          populate: { country: true },
          filters,
          sort: [`${sortBy}:${sortOrder}`],
        });

        const res = await getCollection("testimonials", params);
        return NextResponse.json(res);
      }

      case "faqs": {
        const country = searchParams.get("country") || "in";
        const category = searchParams.get("category") || undefined;
        const sortBy = searchParams.get("sortBy") || "order";
        const sortOrder = searchParams.get("sortOrder") || "asc";

        const filters: any = {
          country: { code: { $eq: country.toLowerCase() } },
        };
        if (category) filters.category = { $eq: category };

        const params = clean({
          populate: { country: true },
          filters,
          sort: [`${sortBy}:${sortOrder}`],
        });

        const res = await getCollection("faqs", params);
        return NextResponse.json(res);
      }

      case "policies": {
        const country = searchParams.get("country") || "in";
        const params = clean({
          populate: { country: true },
          filters: { country: { code: { $eq: country.toLowerCase() } } },
          sort: ["name:asc"],
        });

        const res = await getCollection("policies", params);
        return NextResponse.json(res);
      }

      case "cities": {
        let allCities: string[] = [];
        let page = 1;
        let pageCount = 1;

        while (page <= pageCount) {
          const result: any = await getCollection("franchises", {
            sort: ["city:asc"],
            pagination: { page, pageSize: 50 },
          });

          const citiesOnPage = result.data
            .map((item: any) => item.city || item.attributes?.city)
            .filter((city: string) => city && city.trim() !== "")
            .map((city: string) => city.trim());

          allCities = allCities.concat(citiesOnPage);
          pageCount = result.meta.pagination.pageCount;
          page++;
        }

        const uniqueCities = Array.from(new Set(allCities));
        return NextResponse.json(uniqueCities);
      }

      default:
        return NextResponse.json(
          { error: "Invalid type parameter" },
          { status: 400 }
        );
    }
  } catch (err: any) {
    console.error("❌ Error in /api/content:", err);
    return NextResponse.json(
      { error: "Failed to fetch data from Strapi" },
      { status: 500 }
    );
  }
}
