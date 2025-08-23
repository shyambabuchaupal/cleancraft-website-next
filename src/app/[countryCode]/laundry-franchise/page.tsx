// src/app/franchise/page.tsx
"use client";

import HeroSection from "@/components/franchise/HeroSection";
import IdealCustomerSection from "@/components/franchise/IdealCustomerSection";
import ComparisonSection from "@/components/franchise/ComparisonSection";
import FeaturesSection from "@/components/franchise/FeaturesSection";
import GuaranteeSection from "@/components/franchise/GuaranteeSection";
import ProcessSection from "@/components/franchise/ProcessSection";
import TestimonialsSection from "@/components/franchise/TestimonialsSection";
import FaqSection from "@/components/franchise/FaqSection";
import CareSection from "@/components/franchise/CareSection";
import { EnhancedSEO } from "@/components/EnhancedSEO";
import AsFeaturedOn from "@/components/franchise/AsFeaturedOn";
import SuccessStories from "@/components/franchise/SuccessStories";

import WhyCleancraft from "@/components/franchise/WhyCleancraft";
import InTheHeadlines from "@/components/franchise/InTheHeadlines";
import StickyBottomCTA from "@/components/franchise/StickyBottomCTA";
// CSS import

export default function FranchisePage() {
  return (
    <>
      <EnhancedSEO
        slug="/laundry-franchise"
        pageType="Organization"
        defaultTitle="Laundry Franchise Opportunity | Clean Craft"
        defaultDescription="Join India's most trusted laundry franchise. Get assured break-even in 7 months or 100% royalty free for life. Premium territories available."
        customKeywords={[
          "dry cleaning franchise",
          "wet cleaning business opportunity",
          "profitable laundry franchise",
        ]}
      />

      <main className="franchise-page">
        <HeroSection />
        <InTheHeadlines />
        <WhyCleancraft />
        <IdealCustomerSection />
        <ComparisonSection />
        <FeaturesSection />
        <GuaranteeSection />
        <ProcessSection />
        <AsFeaturedOn />
        <TestimonialsSection />
        <CareSection />
        <SuccessStories />

        <FaqSection />
        <StickyBottomCTA />
      </main>
    </>
  );
}
