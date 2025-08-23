"use client";

// External libraries
import React from "react";
import { useQuery } from "@tanstack/react-query";

// Next.js imports
import { useRouter } from "next/navigation";

// Internal components
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Internal services & utilities
import { fetchUserCountry } from "@/lib/LocationService/location.service";
import { TanstackQueryKey } from "@/utils/constants/tanstackQueryKey";

export default function Page() {
  const router = useRouter();

  // Use TanStack Query for API call
  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: [TanstackQueryKey.userCountry],
    queryFn: fetchUserCountry,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Handle redirect directly when query is successful
  if (isSuccess && data?.country_code) {
    router.replace(`/${data.country_code.toLowerCase()}`);
  }

  // Handle error case
  if (error) {
    console.error("Failed to fetch country:", error);
    router.replace("/in"); // Default to India
  }

  // Show loading state

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
