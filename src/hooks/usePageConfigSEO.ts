import { useState, useEffect } from "react";
import { useCountry } from "@/contexts/CountryContext";

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
    let response = await fetch("/pages.json"); // ✅ sirf JSON
    if (!response.ok) throw new Error("pages.json not found");

    const json = await response.json();
    if (!json?.seo) throw new Error("Invalid SEO structure");

    pagesData = json as PagesSEOData;
    return pagesData;
  } catch (error) {
    console.error("❌ Failed to load pages.json:", error);
    return {
      seo: {
        global: {
          defaults: {
            title_suffix: " | CleanCraft",
            keywords_base: ["professional cleaning", "garment care"],
            description: "Best laundry and dry cleaning service in your city.",
            image:
              "https://cleancraft.com/lovable-uploads/cleancraft-full-logo.png",
          },
        },
        pages: {},
      },
    };
  }
}

export function usePageConfigSEO(slug: string) {
  const { currentCountry } = useCountry();
  const [seoData, setSeoData] = useState<{
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    seo_image: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSEOData() {
      setIsLoading(true);
      try {
        const data = await loadPagesConfig();
        const countryCode = currentCountry?.toLowerCase() || "in";
        const normalizedSlug = slug.replace(/^\/[a-z]{2}\//, "/");
        const globalDefaults = data.seo?.global?.defaults;

        // ✅ Page specific SEO with fallback
        const pageSEO =
          data.seo?.pages?.[normalizedSlug]?.[countryCode] ||
          data.seo?.pages?.[normalizedSlug]?.["in"] ||
          null;

        const title =
          (pageSEO?.title || "CleanCraft") +
          (globalDefaults?.title_suffix || "");

        const description =
          pageSEO?.description?.trim() ||
          globalDefaults?.description ||
          "CleanCraft provides premium laundry services near you.";

        const keywords = [
          ...(pageSEO?.keywords || []),
          ...(globalDefaults?.keywords_base || []),
        ];

        const image = pageSEO?.image || globalDefaults?.image || "";

        setSeoData({
          seo_title: title,
          seo_description: description,
          seo_keywords: keywords.join(", "),
          seo_image: image,
        });
      } catch (error) {
        console.error("❌ SEO load error:", error);
        setSeoData(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadSEOData();
  }, [slug, currentCountry]);

  return {
    data: seoData,
    isLoading,
  };
}
