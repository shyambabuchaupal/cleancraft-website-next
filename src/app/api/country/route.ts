import { getCollection } from "@/lib/strapi/client";

interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Country {
  id: number;
  code: string;
  name: string;
  flag_emoji: string;
  is_active: boolean;
}

export class CountryService {
  private static instance: CountryService;
  private countries: Country[] | null = null;

  private constructor() {}

  public static getInstance(): CountryService {
    if (!CountryService.instance) {
      CountryService.instance = new CountryService();
    }
    return CountryService.instance;
  }

  /**
   * Fetch active countries from Strapi
   */
  public async getCountries(): Promise<Country[]> {
    if (this.countries) {
      return this.countries;
    }

    try {
      const response = await getCollection<Country>("countries", {
        filters: {
          is_active: { $eq: true },
        },
        sort: ["name:asc"], // sorted for consistency
      });

      const countries = response?.data ?? [];
      this.countries = countries;
      return countries;
    } catch (error) {
      console.error("❌ Error fetching countries:", error);
      return [];
    }
  }

  /**
   * Clear cached countries (force refetch on next call)
   */
  public clearCache(): void {
    this.countries = null;
  }

  /**
   * Get country by code (case-insensitive)
   */
  public async getCountryByCode(code: string): Promise<Country | null> {
    try {
      const response = await getCollection<Country>("countries", {
        filters: {
          code: { $eqi: code }, // case-insensitive eq
        },
      });

      return response.data?.[0] ?? null;
    } catch (error) {
      console.error(`❌ Error fetching country by code (${code}):`, error);
      return null;
    }
  }
}

export const countryService = CountryService.getInstance();
