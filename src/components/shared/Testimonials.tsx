"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { StrapiTestimonial } from "@/types/strapi";
import TestimonialDisplay from "./TestimonialDisplay";

interface TestimonialsProps {
  category: "home" | "courses" | "book";
}

interface TestimonialResponse {
  data: StrapiTestimonial[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const Testimonials: React.FC<TestimonialsProps> = ({ category }) => {
  const params = useParams();
  const countryCode = (params?.countryCode as string) || "in";

  const { data, isLoading, error } = useQuery<TestimonialResponse>({
    queryKey: ["testimonials", category, countryCode],
    queryFn: async () => {
      const res = await fetch(
        `/api/testimonials?country=${countryCode.toLowerCase()}&category=${category}`
      );
      if (!res.ok) throw new Error("Failed to fetch testimonials");
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
    console.error("Error fetching testimonials:", error);
    return null;
  }

  if (!data?.data?.length) {
    return null;
  }

  return <TestimonialDisplay testimonials={data.data} variant={category} />;
};

export default Testimonials;
