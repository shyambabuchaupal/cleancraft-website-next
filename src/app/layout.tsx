import type { Metadata } from "next";
import type { ReactNode } from "react";

// Providers and Global Components
import { AppProviders } from "@/components/AppProviders";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import ClientInitializer from "@/components/ClientInitializer";

// Layout Components
import EnhancedNavbar from "@/components/EnhancedNavbar";
import Footer from "@/components/Footer";

// Global Styles
import "./globals.css";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "Clean Craft App - India's Leading Laundry & Dry Cleaning Franchise",
  description:
    "Join India's most trusted laundry franchise. Professional garment care, proven business model, and comprehensive support for entrepreneurs.",
  keywords: [
    "laundry franchise",
    "dry cleaning business",
    "cleancraft",
    "garment care",
    "franchise opportunity india",
  ],
  authors: [{ name: "Clean Craft" }],
  creator: "Clean Craft",
  publisher: "Clean Craft",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/cleancraft-icon.png", sizes: "32x32", type: "image/png" },
      { url: "/cleancraft-icon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/cleancraft-icon.png",
    apple: "/cleancraft-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://cleancraftapp.com",
    siteName: "Clean Craft",
    title: "Clean Craft App - India's Leading Laundry & Dry Cleaning Franchise",
    description:
      "Join India's most trusted laundry franchise. Professional garment care, proven business model, and comprehensive support for entrepreneurs.",
    images: [
      {
        url: "/cleancraft-logo.svg",
        width: 1200,
        height: 630,
        alt: "Clean Craft Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clean Craft - India's Leading Laundry & Dry Cleaning Franchise",
    description:
      "Join India's most trusted laundry franchise. Professional garment care, proven business model, and comprehensive support for entrepreneurs.",
    images: ["/cleancraft-logo.svg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AppProviders>
          {/* Global UI Components */}
          <CookieConsentBanner />
          <ScrollToTop />
          <ClientInitializer />

          {/* Layout Structure */}
          <div className="relative flex min-h-screen flex-col">
            <EnhancedNavbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
