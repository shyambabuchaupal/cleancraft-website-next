"use client";

import { useCountry } from "@/contexts/CountryContext";
import { countryConfig } from "@/hooks/use-country-config";
import Layout from "@/components/home/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessStepsSection from "@/components/home/ProcessStepsSection";
import YourFirstPickupEssentials from "@/components/home/YourFirstPickupEssentials";
import LaundryServiceFeatures from "@/components/home/LaundryServiceFeatures";
import GuaranteeSection from "@/components/home/GuaranteeSection";
import FaqSection from "@/components/home/FAQSection";
import { EnhancedSEO } from "@/components/EnhancedSEO";
import { cn } from "@/lib/utils";
import { useStrapiFAQs, useStrapiTestimonials } from "@/hooks/useStrapi";
import TestimonialSection from "@/components/home/TestimonialSection";
import Offers from "@/components/home/Offers";
import React from "react";
import { useRouter } from "next/navigation";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className,
  noPadding,
}) => {
  return (
    <section
      className={cn("w-full", !noPadding && "py-16 md:py-24", className)}
    >
      {children}
    </section>
  );
};

export default function Page() {
  const router = useRouter();
  const { currentCountry } = useCountry();
  const { getCountryByCode } = countryConfig;

  React.useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(
          "https://api.ipdata.co/?api-key=6aee2f02cd09fb288e6b7e1f824c5f60debac930d5f68326041a1777"
        );
        const data = await res.json();
        if (data.country_code) {
          router.replace(`/${data.country_code?.toLowerCase()}`);
        }
      } catch (err) {
        console.error("IPData fetch error:", err);
      }
    };
    fetchCountry();
  }, [router]);

  // Get country name from config
  const countryData = currentCountry ? getCountryByCode(currentCountry) : null;
  const countryName = countryData?.name || "";

  // Fetch FAQs and testimonials
  const {
    data: faqs,
    isLoading: faqsLoading,
    error: faqsError,
  } = useStrapiFAQs({
    category: "home",
    sortBy: "order",
    sortOrder: "asc",
  });

  const {
    data: testimonials,
    isLoading: testimonialsLoading,
    error: testimonialsError,
  } = useStrapiTestimonials({
    category: "home",
    sortBy: "rating",
    sortOrder: "desc",
  });

  // Debug logs
  if (faqsError) console.error("FAQs fetch error:", faqsError);
  if (testimonialsError)
    console.error("Testimonials fetch error:", testimonialsError);

  const hasTestimonials =
    testimonials?.data?.length && testimonials?.data?.length > 0;

  return (
    <>
      <EnhancedSEO
        slug="/"
        pageType="LocalBusiness"
        defaultTitle={`CleanCraft - Professional Dry Cleaning and Laundry Services${
          countryName ? ` in ${countryName}` : ""
        }`}
        defaultDescription={`Experience premium dry cleaning and laundry services with CleanCraft${
          countryName ? ` in ${countryName}` : ""
        }. Professional cleaning, expert care, and convenient solutions for all your laundry and dry cleaning needs.`}
        customKeywords={[
          "professional laundry services",
          "dry cleaning near me",
          "wet cleaning solutions",
        ]}
      />

      {/* <Layout></Layout> */}
    </>
  );
}
