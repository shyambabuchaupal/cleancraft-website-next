// scripts/sitemap-generator.ts

import fs from "fs";
import path from "path";
import pages from "../src/config/pages.json"; // JSON import instead of YAML

export const sitemapConfig = {
  baseUrl: "https://cleancraftapp.com",
  countries: ["in", "au"],
  defaultPriority: 0.7,
  defaultChangefreq: "weekly",
};

// Load JSON pages config
export function loadPagesConfig() {
  if (!pages) {
    console.error("pages.json not found!");
    return null;
  }

  // Update base URL from JSON
  if (pages.site?.production_url) {
    sitemapConfig.baseUrl = pages.site.production_url;
    console.log("Using base URL from pages.json:", sitemapConfig.baseUrl);
  }

  return pages;
}

function processNavigationPages(pagesArray: any[], baseUrl: string, now: string, urls: Set<string>, country = "") {
  if (!Array.isArray(pagesArray)) return;

  pagesArray.forEach((page) => {
    const urlPath = country ? `/${country}${page.path}` : page.path;
    let priority = sitemapConfig.defaultPriority;

    if (page.path === "/") priority = 1.0;
    else if (page.order <= 3) priority = 0.8;
    else if (page.navbar) priority = 0.7;
    else priority = 0.6;

    urls.add(
      JSON.stringify({
        url: `${baseUrl}${urlPath}`,
        lastmod: now,
        changefreq: sitemapConfig.defaultChangefreq,
        priority,
      })
    );

    if (page.children) processNavigationPages(page.children, baseUrl, now, urls, country);
  });
}

function processSEOPages(seoPages: Record<string, any>, baseUrl: string, now: string, urls: Set<string>) {
  Object.keys(seoPages).forEach((pagePath) => {
    const pageConfig = seoPages[pagePath];
    const priority = pageConfig.priority || sitemapConfig.defaultPriority;
    const changefreq = pageConfig.changefreq || sitemapConfig.defaultChangefreq;

    Object.keys(pageConfig).forEach((country) => {
      if (["priority", "changefreq", "lastmod"].includes(country)) return;
      const urlPath = `/${country}${pagePath}`;
      urls.add(
        JSON.stringify({
          url: `${baseUrl}${urlPath}`,
          lastmod: now,
          changefreq,
          priority,
        })
      );
    });
  });
}

export function generateSitemapUrls() {
  const pagesConfig = loadPagesConfig();
  if (!pagesConfig) return [];

  const urls = new Set<string>();
  const now = new Date().toISOString().split("T")[0];

  if (pagesConfig.global?.pages) processNavigationPages(pagesConfig.global.pages, sitemapConfig.baseUrl, now, urls);

  sitemapConfig.countries.forEach((country) => {
    if (pagesConfig[country]?.pages) processNavigationPages(pagesConfig[country].pages, sitemapConfig.baseUrl, now, urls, country);
  });

  if (pagesConfig.seo?.pages) processSEOPages(pagesConfig.seo.pages, sitemapConfig.baseUrl, now, urls);

  return Array.from(urls).map((str) => JSON.parse(str));
}

export async function generateSitemapXML() {
  const urls = generateSitemapUrls();
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  urls.forEach((url) => {
    xml += `  <url>\n    <loc>${url.url}</loc>\n`;
    if (url.lastmod) xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    if (url.changefreq) xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    if (url.priority !== undefined) xml += `    <priority>${Number(url.priority).toFixed(1)}</priority>\n`;
    xml += "  </url>\n";
  });

  xml += "</urlset>";
  return xml;
}

export function generateRobotsTxt(isDevelopment = false, pagesConfig: any = null) {
  let baseUrl = isDevelopment ? "http://localhost:8080" : sitemapConfig.baseUrl;
  if (pagesConfig?.site) baseUrl = isDevelopment ? pagesConfig.site.development_url || baseUrl : pagesConfig.site.production_url || baseUrl;

  return isDevelopment
    ? "User-agent: *\nDisallow: /\n\n# Development environment - crawling disabled\n\n"
    : `# Robots.txt for CleanCraft - Production optimized\n
User-agent: *\nAllow: /\n
Disallow: /admin/\nDisallow: /_dev/\nDisallow: /api/\nDisallow: /.well-known/\nDisallow: /temp/\nDisallow: /cache/\n
Allow: /assets/\nAllow: /fonts/\nAllow: /css/\nAllow: /js/\n
Sitemap: ${baseUrl}/sitemap.xml\n`;
}
