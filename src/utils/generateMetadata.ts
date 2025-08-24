import type { Metadata } from "next";

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
}

interface PagesSEOData {
  seo: {
    global: {
      defaults: {
        title_suffix: string;
        keywords_base: string[];
        description?: string;
        image: string;
      };
    };
    pages: {
      [path: string]: {
        [country: string]: SEOConfig;
      };
    };
  };
}

let pagesData: PagesSEOData | null = null;

async function loadPagesConfig(): Promise<PagesSEOData> {
  if (pagesData) return pagesData;

  try {
    // ✅ Try different approaches for loading pages.json
    let response;
    
    // Method 1: Direct fetch from public folder
    try {
      response = await fetch("/pages.json");
      if (response.ok) {
        const json = await response.json();
        if (json?.seo) {
          pagesData = json as PagesSEOData;
          console.log("✅ Loaded pages.json from public folder");
          return pagesData;
        }
      }
    } catch (e) {
      console.log("❌ Public folder fetch failed:", e);
    }
    
    // Method 2: Import from config (fallback)
    console.log("🔄 Trying config import fallback...");
    const configModule = await import("../config/pages.json");
    if (configModule.default?.seo) {
      pagesData = configModule.default as PagesSEOData;
      console.log("✅ Loaded pages.json from config import");
      return pagesData;
    }
    
    throw new Error("No valid pages.json found");
  } catch (error) {
    console.error("❌ Failed to load pages.json:", error);
    // Fallback to default config
    return {
      seo: {
        global: {
          defaults: {
            title_suffix: " | CleanCraft",
            keywords_base: ["professional cleaning", "garment care"],
            description: "Best laundry and dry cleaning service in your city.",
            image: "https://cleancraftapp.com/lovable-uploads/cleancraft-full-logo.png",
          },
        },
        pages: {},
      },
    };
  }
}

export async function generateDynamicMetadata(
  slug: string = "/",
  countryCode: string = "in"
): Promise<Metadata> {
  console.log(`🔍 Generating metadata for slug: ${slug}, country: ${countryCode}`);
  
  const data = await loadPagesConfig();
  const normalizedSlug = slug.replace(/^\/[a-z]{2}\//, "/");
  const globalDefaults = data.seo?.global?.defaults;
  
  console.log(`📄 Normalized slug: ${normalizedSlug}`);
  console.log(`🌍 Global defaults:`, globalDefaults);

  // Get page specific SEO with fallback
  const pageSEO =
    data.seo?.pages?.[normalizedSlug]?.[countryCode] ||
    data.seo?.pages?.[normalizedSlug]?.["in"] ||
    null;
    
  console.log(`📋 Page SEO data:`, pageSEO);

  const title =
    (pageSEO?.title || "CleanCraft") +
    (globalDefaults?.title_suffix || "");
    
  console.log(`🏷️ Final title: ${title}`);

  const description =
    pageSEO?.description?.trim() ||
    globalDefaults?.description ||
    "CleanCraft provides premium laundry services near you.";

  const keywords = [
    ...(pageSEO?.keywords || []),
    ...(globalDefaults?.keywords_base || []),
  ];

  const image = pageSEO?.image || globalDefaults?.image || "";

  const baseUrl = "https://cleancraftapp.com";
  const canonicalUrl = `${baseUrl}/${countryCode}${normalizedSlug === "/" ? "" : normalizedSlug}`;

  return {
    title,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Clean Craft" }],
    creator: "Clean Craft",
    publisher: "Clean Craft",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/cleancraft-icon.png", sizes: "32x32", type: "image/png" },
        { url: "/cleancraft-icon.png", sizes: "16x16", type: "image/png" },
      ],
      shortcut: "/cleancraft-icon.png",
      apple: "/cleancraft-icon.png",
    },
    manifest: "/manifest.json",
    openGraph: {
      type: "website",
      locale: countryCode === "in" ? "en_IN" : "en_AU",
      url: canonicalUrl,
      siteName: "Clean Craft",
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Clean Craft Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-IN": `${baseUrl}/in${normalizedSlug === "/" ? "" : normalizedSlug}`,
        "en-AU": `${baseUrl}/au${normalizedSlug === "/" ? "" : normalizedSlug}`,
        "x-default": baseUrl,
      },
    },
  };
}
