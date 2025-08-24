"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { StrapiFAQ } from "@/types/strapi";
import FAQDisplay from "./FAQDisplay";

interface FAQsProps {
  category: "home" | "courses" | "book";
}

interface FAQResponse {
  data: StrapiFAQ[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const FAQs: React.FC<FAQsProps> = ({ category }) => {
  const params = useParams();
  const countryCode = (params?.countryCode as string) || "in";

  const { data, isLoading, error } = useQuery<FAQResponse>({
    queryKey: ["faqs", category, countryCode],
    queryFn: async () => {
      console.log(
        `Fetching FAQs: /api/faqs?country=${countryCode}&category=${category}`
      );
      const res = await fetch(
        `/api/faqs?country=${countryCode}&category=${category}`
      );
      console.log("FAQ API Response status:", res.status);
      if (!res.ok) throw new Error("Failed to fetch FAQs");
      const result = await res.json();
      console.log("FAQ API Response data:", result);
      return result;
    },
    enabled: !!countryCode,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    console.error("Error fetching FAQs:", error);
    return (
      <div className="py-4 px-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600">Failed to load FAQs: {error.message}</p>
      </div>
    );
  }

  console.log("FAQ Data received:", data);
  console.log("Valid FAQs count:", data?.data?.length);

  // ✅ Null answers filter only in production
  const validFaqs =
    process.env.NODE_ENV === "production"
      ? data?.data?.filter((faq) => faq.answer !== null)
      : data?.data;

  console.log("Valid FAQs after filtering:", validFaqs?.length);

  if (!validFaqs?.length) {
    return (
      <div className="py-4 px-4 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-yellow-600">
          No FAQs found for category: {category}
        </p>
      </div>
    );
  }

  return <FAQDisplay faqs={validFaqs} variant={category} />;
};

export default FAQs;
