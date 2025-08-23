"use client";

import CountryRouteGuard from "@/components/CountryRouteGuard";
import Layout from "./layout";
import HomePage from "@/components/HomePage/HomePage";

export default function CountryHome() {
  return (
    <CountryRouteGuard pagePath="/">
      {/* <Layout> */}
      <HomePage />
      {/* </Layout> */}
    </CountryRouteGuard>
  );
}
