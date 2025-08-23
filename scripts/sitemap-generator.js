// This file will be moved to the scripts directory.

import fs from "fs";
import path from "path";
import { sitemapConfig, generateSitemapUrls } from "./sitemap.js";

// Import pages from JSON instead of YAML
import pages from "../config/pages.json";

export async function generateSitemapFiles() {
  const urls = generateSitemapUrls();

  // Determine if we're in production based on environment
  const isProduction =
    process.env.NODE_ENV === "production" ||
    process.env.VITE_ENVIRONMENT === "production" ||
    process.argv.includes("--production");

  // Use JSON pages object instead of loading YAML
  const pagesConfig = pages;

  // Determine base URL from pages JSON if available
  let baseUrl;
  if (pagesConfig?.site) {
    baseUrl = isProduction
      ? pagesConfig.site.production_url || "https://cleancraftapp.com"
      : pagesConfig.site.development_url || "http://localhost:8080";
  } else {
    baseUrl = isProduction
      ? "https://cleancraftapp.com"
      : "http://localhost:8080";
  }

  // Generate single sitemap.xml
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  urls.forEach((url) => {
    xml += "  <url>\n";
    xml += `    <loc>${url.url}</loc>\n`;
    if (url.lastmod) xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    if (url.changefreq)
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    if (url.priority !== undefined)
      xml += `    <priority>${Number(url.priority).toFixed(1)}</priority>\n`;
    xml += "  </url>\n";
  });

  xml += "</urlset>";

  // Determine the correct output directory
  const outputDir = isProduction
    ? path.join(process.cwd(), "dist")
    : path.join(process.cwd(), "public");

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write sitemap.xml
  fs.writeFileSync(path.join(outputDir, "sitemap.xml"), xml);

  // Generate robots.txt for the environment
  const robotsTxt = generateRobotsTxtContent(isProduction, pagesConfig);
  fs.writeFileSync(path.join(outputDir, "robots.txt"), robotsTxt);

  console.log(`✅ Generated sitemap.xml and robots.txt in ${outputDir}`);
  console.log(`📄 Sitemap contains ${urls.length} URLs`);
  console.log(`🌍 Environment: ${isProduction ? "Production" : "Development"}`);
  console.log(`🔗 Base URL: ${baseUrl}`);
}

function generateRobotsTxtContent(isProduction = true, pagesConfig = null) {
  let baseUrl;

  if (pagesConfig?.site) {
    baseUrl = isProduction
      ? pagesConfig.site.production_url || "https://cleancraftapp.com"
      : pagesConfig.site.development_url || "http://localhost:8080";
  } else {
    baseUrl = isProduction
      ? "https://cleancraftapp.com"
      : "http://localhost:8080";
  }

  let robotsTxt = "";

  if (!isProduction) {
    // Development - restrict all bots
    robotsTxt += "User-agent: *\n";
    robotsTxt += "Disallow: /\n\n";
    robotsTxt += "# Development environment - crawling disabled\n\n";
  } else {
    // Production - optimized for search engines
    robotsTxt += "# Robots.txt for CleanCraft - Production optimized\n\n";

    // Main search engines with optimized crawl delays
    robotsTxt += "User-agent: Googlebot\n";
    robotsTxt += "Allow: /\n";
    robotsTxt += "Crawl-delay: 1\n\n";

    robotsTxt += "User-agent: Bingbot\n";
    robotsTxt += "Allow: /\n";
    robotsTxt += "Crawl-delay: 1\n\n";

    // Social media crawlers - immediate access
    robotsTxt += "User-agent: Twitterbot\n";
    robotsTxt += "Allow: /\n\n";

    robotsTxt += "User-agent: facebookexternalhit\n";
    robotsTxt += "Allow: /\n\n";

    robotsTxt += "User-agent: LinkedInBot\n";
    robotsTxt += "Allow: /\n\n";

    robotsTxt += "User-agent: WhatsApp\n";
    robotsTxt += "Allow: /\n\n";

    // Other search engines
    robotsTxt += "User-agent: DuckDuckBot\n";
    robotsTxt += "Allow: /\n";
    robotsTxt += "Crawl-delay: 2\n\n";

    robotsTxt += "User-agent: YandexBot\n";
    robotsTxt += "Allow: /\n";
    robotsTxt += "Crawl-delay: 3\n\n";

    // Default for all other bots
    robotsTxt += "User-agent: *\n";
    robotsTxt += "Allow: /\n";
    robotsTxt += "Crawl-delay: 2\n\n";

    // Disallow admin and development paths
    robotsTxt += "Disallow: /admin/\n";
    robotsTxt += "Disallow: /_dev/\n";
    robotsTxt += "Disallow: /api/\n";
    robotsTxt += "Disallow: /.well-known/\n";
    robotsTxt += "Disallow: /temp/\n";
    robotsTxt += "Disallow: /cache/\n\n";

    // Allow important static assets
    robotsTxt += "Allow: /lovable-uploads/\n";
    robotsTxt += "Allow: /assets/\n";
    robotsTxt += "Allow: /fonts/\n";
    robotsTxt += "Allow: /css/\n";
    robotsTxt += "Allow: /js/\n\n";
  }

  // Add sitemap references
  robotsTxt += `Sitemap: ${baseUrl}/sitemap.xml\n`;

  return robotsTxt;
}

// CLI function for manual generation
export async function runSitemapGeneration() {
  try {
    await generateSitemapFiles();
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runSitemapGeneration();
}
