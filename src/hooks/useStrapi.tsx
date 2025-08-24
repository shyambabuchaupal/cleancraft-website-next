import { useQuery } from "@tanstack/react-query";
import { useCountry } from "@/contexts/CountryContext";
import { useStrapiConnection } from "@/contexts/StrapiConnectionContext";
import { StrapiPolicy } from "@/types/strapi";
import { useMemo } from "react";

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

/**
 * Fetch Page Content
 */
export function useStrapiPage(slug: string) {
  const { currentCountry } = useCountry();
  const { isConnected, isInitializing } = useStrapiConnection();
  const countryCode = currentCountry?.toLowerCase() || "in";

  return useQuery({
    queryKey: ["page", slug, countryCode],
    queryFn: async () => {
      const res = await fetch(`/api/pages?slug=${slug}&country=${countryCode}`);
      if (!res.ok) {
        const text = await res.text();
        console.error("Page API error:", res.status, text);
        return null;
      }
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!currentCountry && isConnected && !isInitializing,
  });
}

/**
 * Fetch Page SEO
 */
export function useStrapiPageSEO(slug: string) {
  const { currentCountry } = useCountry();
  const { isConnected, isInitializing } = useStrapiConnection();
  const countryCode = currentCountry?.toLowerCase() || "in";

  return useQuery({
    queryKey: ["pageSEO", slug, countryCode],
    queryFn: async () => {
      const res = await fetch(
        `/api/pages/seo?slug=${slug}&country=${countryCode}`
      );
      if (!res.ok) {
        const text = await res.text();
        console.error("Page SEO API error:", res.status, text);
        return null;
      }
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!currentCountry && isConnected && !isInitializing,
  });
}

/**
 * Fetch Services
 */
export function useStrapiServices() {
  const { currentCountry } = useCountry();
  const { isConnected, isInitializing } = useStrapiConnection();
  const countryCode = currentCountry?.toLowerCase() || "in";

  return useQuery({
    queryKey: ["services", countryCode],
    queryFn: async () => {
      const res = await fetch(`/api/services?country=${countryCode}`);
      if (!res.ok) {
        const text = await res.text();
        console.error("Services API error:", res.status, text);
        return [];
      }
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!currentCountry && isConnected && !isInitializing,
  });
}

/**
 * Fetch Testimonials
 */
export function useStrapiTestimonials() {
  const { currentCountry } = useCountry();
  const countryCode = currentCountry?.toLowerCase() || "in";

  return useQuery({
    queryKey: ["testimonials", countryCode],
    queryFn: async () => {
      const res = await fetch(`/api/testimonials?country=${countryCode}`);
      if (!res.ok) {
        const text = await res.text();
        console.error("Testimonials API error:", res.status, text);
        return {
          data: [],
          meta: {
            pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 },
          },
        };
      }
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!currentCountry,
  });
}

/**
 * Fetch FAQs
 */
export function useStrapiFAQs(options?: {
  category?: string;
  sortBy?: "order";
  sortOrder?: "asc" | "desc";
}) {
  const { currentCountry } = useCountry();
  const { isConnected, isInitializing } = useStrapiConnection();
  const countryCode = currentCountry?.toLowerCase() || "in";

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.set("country", countryCode);
    if (options?.category) params.set("category", options.category);
    if (options?.sortBy) params.set("sortBy", options.sortBy);
    if (options?.sortOrder) params.set("sortOrder", options.sortOrder);
    return params.toString();
  }, [countryCode, options]);

  return useQuery<StrapiResponse<any>>({
    queryKey: ["faqs", countryCode, queryString],
    queryFn: async () => {
      const res = await fetch(`/api/faqs?${queryString}`);
      if (!res.ok) {
        const text = await res.text();
        console.error("FAQs API error:", res.status, text);
        return {
          data: [],
          meta: {
            pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 },
          },
        };
      }
      const data = await res.json();
      return (
        data || {
          data: [],
          meta: {
            pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 },
          },
        }
      );
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!currentCountry && isConnected && !isInitializing,
  });
}

/**
 * Fetch Policies
 */
export function useStrapiPolicies() {
  const { currentCountry } = useCountry();
  const { isConnected, isInitializing } = useStrapiConnection();
  const countryCode = currentCountry?.toLowerCase() || "in";

  return useQuery({
    queryKey: ["policies", countryCode],
    queryFn: async () => {
      console.log(`🔍 Fetching policies for country: ${countryCode}`);
      const res = await fetch(`/api/policies?country=${countryCode}`);

      console.log(`📊 API response status: ${res.status}`);

      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Policies API error:", res.status, text);
        return [];
      }

      const data = await res.json();
      const policies = data?.data || [];

      console.log(`✅ Policies received for ${countryCode}:`, policies.length);
      console.log(
        "📋 Policy slugs:",
        policies.map((p: StrapiPolicy) => p.slug)
      );

      return policies.map((policy: StrapiPolicy) => ({
        ...policy,
        country: policy.country,
      }));
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!currentCountry && isConnected && !isInitializing,
  });
}
