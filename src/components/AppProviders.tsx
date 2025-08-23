"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { CookieConsentProvider } from "../contexts/CookieConsentContext";
import { CountryProvider } from "../contexts/CountryContext";
import { StrapiConnectionProvider } from "../contexts/StrapiConnectionContext";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  // ✅ QueryClient ab sirf client side pe create hoga
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <StrapiConnectionProvider>
        <Toaster />
        <Sonner />
        <CookieConsentProvider>
          <CountryProvider>{children}</CountryProvider>
        </CookieConsentProvider>
      </StrapiConnectionProvider>
    </QueryClientProvider>
  );
}
