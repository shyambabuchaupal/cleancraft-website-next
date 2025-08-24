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

// Utils
import { generateDynamicMetadata } from "@/utils/generateMetadata";

// Global Styles
import "./globals.css";
import "../styles/index.css";

// Generate metadata from pages.json
export async function generateMetadata(): Promise<Metadata> {
  return await generateDynamicMetadata("/", "in");
}

// Remove the old static metadata object since we're using generateMetadata now
// export const metadata: Metadata = { ... }  <- This is now handled by generateMetadata

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
