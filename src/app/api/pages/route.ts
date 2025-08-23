import { loadYamlFile } from "@/lib/yaml-loader";
import { PageConfig, PageData } from "@/types/config";

export class PageService {
  private static instance: PageService;
  private pagesConfig: PageConfig | null = null;

  private constructor() {}

  public static getInstance(): PageService {
    if (!PageService.instance) {
      PageService.instance = new PageService();
    }
    return PageService.instance;
  }

  /**
   * Ensure YAML config is loaded in memory
   */
  private async ensureConfig(): Promise<PageConfig> {
    if (!this.pagesConfig) {
      try {
        this.pagesConfig = await loadYamlFile<PageConfig>("/config/pages.yaml");
      } catch (error) {
        console.error("❌ Failed to load pages config:", error);

        // Return a minimal safe config instead of null
        return {
          countries: {},
          seo: {
            global: { defaults: { title_suffix: "", keywords_base: [], image: "" } },
            pages: {},
          },
          global: { pages: [] },
        };
      }
    }
    return this.pagesConfig;
  }

  /**
   * Find page data from YAML config
   */
  private async getPageFromConfig(slug: string, countryCode: string): Promise<PageData | null> {
    const config = await this.ensureConfig();

    const globalPages = config.global?.pages ?? [];
    const countryConfig = config[countryCode.toLowerCase()] ?? { pages: [] };
    const countryPages = countryConfig.pages ?? [];

    const allPages = [...globalPages, ...countryPages];

    // Normalize slug (remove / if present)
    const normalizedSlug = slug.replace(/^\//, "");

    // Find in root pages
    let page = allPages.find((p) => {
      const pageSlug = p.path.replace(/^\//, "");
      return pageSlug === normalizedSlug || (pageSlug === "" && normalizedSlug === "");
    });

    // If not found, search in children
    if (!page) {
      for (const parent of allPages) {
        if (parent.children) {
          const childPage = parent.children.find((c) => {
            const childSlug = c.path.replace(/^\//, "");
            return childSlug === normalizedSlug;
          });
          if (childPage) {
            page = childPage;
            break;
          }
        }
      }
    }

    return page ?? null;
  }

  /**
   * Resolve SEO config for a given page
   */
  private async getPageSEOFromConfig(slug: string, countryCode: string) {
    const config = await this.ensureConfig();
    const seoConfig = config.seo?.pages ?? {};

    const pagePath = `/${slug}`.replace("//", "/");
    const pageSEO = seoConfig[pagePath]?.[countryCode.toLowerCase()];

    if (!pageSEO) {
      console.log(`⚠️ No SEO data found for slug=${slug}, country=${countryCode}`);

      // fallback: derive SEO from page config
      const page = await this.getPageFromConfig(slug, countryCode);
      if (page) {
        return {
          title: page.title,
          seo_title: `${page.title} | CleanCraft`,
          seo_description: `${page.title} - CleanCraft Professional Dry Cleaning and Laundry Services`,
        };
      }
      return null;
    }

    return {
      title: pageSEO.title,
      seo_title: pageSEO.title,
      seo_description: pageSEO.description,
      keywords: pageSEO.keywords?.join(", "),
    };
  }

  /**
   * Get a page in Strapi-like response format
   */
  public async getPage(slug: string, countryCode: string) {
    const page = await this.getPageFromConfig(slug, countryCode);
    if (!page) {
      console.warn(`⚠️ Page not found: slug=${slug}, country=${countryCode}`);
      return null;
    }

    return {
      id: slug,
      attributes: {
        title: page.title,
        slug,
        path: page.path,
        navbar: page.navbar,
        children: page.children,
        sections: page.sections,
      },
    };
  }

  /**
   * Get SEO for a given page
   */
  public async getPageSEO(slug: string, countryCode: string) {
    const seoData = await this.getPageSEOFromConfig(slug, countryCode);
    if (!seoData) {
      console.warn(`⚠️ SEO not found: slug=${slug}, country=${countryCode}`);
      return null;
    }
    return seoData;
  }
}

export const pageService = PageService.getInstance();
