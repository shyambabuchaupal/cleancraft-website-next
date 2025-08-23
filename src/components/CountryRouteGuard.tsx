"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useCountry } from "@/contexts/CountryContext";
import { isPageEnabled } from "@/hooks/use-pages-config";

interface Props {
  pagePath: string;
  children: React.ReactNode;
  allowEmptyContent?: boolean;
}

const CountryRouteGuard: React.FC<Props> = ({
  pagePath,
  children,
  allowEmptyContent = false,
}) => {
  // debugger;
  const router = useRouter();
  const { currentCountry, isLoading: isCountriesLoading } = useCountry();

  // Loading state
  if (isCountriesLoading || !currentCountry) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Check if page is enabled
  if (!isPageEnabled(currentCountry, pagePath) && !allowEmptyContent) {
    // Redirect to not-found page for that country
    if (typeof window !== "undefined") {
      router.replace(`/${currentCountry}/not-found`);
    }
    return "abcd efgh "; // temporary render nothing while redirecting
  }

  return <>{children}</>;
};

export default CountryRouteGuard;
