"use client";

import { ReactNode } from "react";
import CountryLayout from "@/components/CountryLayout";

export default function CountryCodeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <CountryLayout>{children}</CountryLayout>;
}
