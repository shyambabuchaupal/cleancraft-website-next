"use client";

import { useCountry } from "@/contexts/CountryContext";
import GuaranteeSection from "../home/GuaranteeSection";
import HeroSection from "../home/HeroSection";
import LaundryServiceFeatures from "../home/LaundryServiceFeatures";
import Offers from "../home/Offers";
import ProcessStepsSection from "../home/ProcessStepsSection";
import ServicesSection from "../home/ServicesSection";
import TestimonialSection from "../home/TestimonialSection";
import FaqSection from "../home/FAQSection";
import YourFirstPickupEssentials from "../home/YourFirstPickupEssentials";
import { countryConfig } from "@/hooks/use-country-config";
import { cn } from "@/lib/utils";
import { useStrapiFAQs } from "@/hooks/useStrapi";
import { LoadingSpinner } from "../ui/loading-spinner";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className,
  noPadding,
}) => (
  <section className={cn("w-full", !noPadding && "py-16 md:py-24", className)}>
    {children}
  </section>
);

const HomePage: React.FC = () => {
  const { currentCountry } = useCountry();
  const { getCountryByCode } = countryConfig;

  const countryData = currentCountry ? getCountryByCode(currentCountry) : null;

  // Fetch FAQs
  const { data: faqs, isLoading: faqsLoading } = useStrapiFAQs({
    category: "home",
  });

  return (
    <div className="flex flex-col w-full">
      {currentCountry === "in" && <Offers />}

      <SectionWrapper noPadding>
        <HeroSection />
      </SectionWrapper>

      <SectionWrapper className="bg-[#1E3A8A]">
        <ServicesSection />
      </SectionWrapper>

      <SectionWrapper className="bg-[#E8F1FD]">
        <ProcessStepsSection />
      </SectionWrapper>

      <SectionWrapper className="bg-white">
        <YourFirstPickupEssentials />
      </SectionWrapper>

      <SectionWrapper className="bg-[#F8FAFC]">
        <LaundryServiceFeatures />
      </SectionWrapper>

      <SectionWrapper className="bg-white">
        <GuaranteeSection />
      </SectionWrapper>

      <SectionWrapper className="bg-[#F8FAFC]">
        <TestimonialSection />
      </SectionWrapper>

      {!faqsLoading && faqs?.data && faqs.data.length > 0 && (
        <SectionWrapper className="bg-white">
          <FaqSection />
        </SectionWrapper>
      )}
    </div>
  );
};

export default HomePage;
