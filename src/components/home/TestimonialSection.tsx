import React from "react";
// import { StrapiTestimonial } from "@/types/strapi";
import TestimonialDisplay from "../shared/TestimonialDisplay";
import { useStrapiTestimonials } from "@/hooks/useStrapi";

const TestimonialSection: React.FC = () => {
  const { data: testimonials, isLoading } = useStrapiTestimonials();

  if (isLoading) return <p>Loading testimonials...</p>;
  if (!testimonials?.data?.length) return null;

  return <TestimonialDisplay testimonials={testimonials.data} variant="home" />;
};

export default TestimonialSection;
