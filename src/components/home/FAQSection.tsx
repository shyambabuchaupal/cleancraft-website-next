import React from "react";
import FAQDisplay from "../shared/FAQDisplay";
import { useStrapiFAQs } from "@/hooks/useStrapi";

const FAQSection: React.FC = () => {
  const { data: faqs, isLoading } = useStrapiFAQs();

  if (isLoading) return <p>Loading FAQs...</p>;
  if (!faqs?.data?.length) return null;

  return <FAQDisplay faqs={faqs.data} variant="home" />;
};

export default FAQSection;
