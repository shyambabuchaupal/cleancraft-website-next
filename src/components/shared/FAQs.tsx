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
      const res = await fetch(
        `/api/content/faqs?country=${countryCode}&category=${category}`
      );
      if (!res.ok) throw new Error("Failed to fetch FAQs");
      return res.json();
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
    return null;
  }

  // ✅ Null answers filter only in production
  const validFaqs =
    process.env.NODE_ENV === "production"
      ? data?.data?.filter((faq) => faq.answer !== null)
      : data?.data;

  if (!validFaqs?.length) {
    return null;
  }

  return <FAQDisplay faqs={validFaqs} variant={category} />;
};

export default FAQs;
