"use client";

import CountryRouteGuard from "@/components/CountryRouteGuard";
import HomePage from "@/components/HomePage/HomePage";

export default function CountryHome() {
  return (
    <CountryRouteGuard pagePath="/">
      <HomePage />
    </CountryRouteGuard>
  );
}
