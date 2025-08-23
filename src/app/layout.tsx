"use client";

import { ReactNode } from "react";
import { AppProviders } from "@/components/AppProviders";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import ClientInitializer from "@/components/ClientInitializer";

import "./globals.css";
import "../styles/index.css";
import EnhancedNavbar from "@/components/EnhancedNavbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <CookieConsentBanner />
          <ScrollToTop />
          <ClientInitializer />
          <EnhancedNavbar />
          {children}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
