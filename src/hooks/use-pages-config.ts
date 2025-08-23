import type { PageData } from '@/types/config';
import pagesConfig from '../config/pages.json'; // JSON import

interface CountryPages {
  pages: PageData[];
}

export function getPagesConfig(currentCountry: string | null): PageData[] {
  const globalPages = (pagesConfig.global as CountryPages).pages || [];

  if (!currentCountry) {
    return globalPages;
  }

  const countryCode = currentCountry.toLowerCase();
  const countryConfig = pagesConfig[countryCode] as CountryPages;

  if (!countryConfig) {
    return globalPages;
  }

  const countryPages = countryConfig.pages || [];
  const mergedPages = [...globalPages];

  countryPages.forEach(countryPage => {
    const existingIndex = mergedPages.findIndex(p => p.path === countryPage.path);
    if (existingIndex >= 0) {
      mergedPages[existingIndex] = countryPage;
    } else {
      mergedPages.push(countryPage);
    }
  });

  return mergedPages;
}

export function isPageEnabled(currentCountry: string | null, path: string): boolean {
  const pages = getPagesConfig(currentCountry);
  const findInPages = (pagesArray: PageData[], searchPath: string): boolean => {
    for (const page of pagesArray) {
      if (page.path === searchPath) return true;
      if (page.children?.some(child => child.path === searchPath)) return true;
    }
    return false;
  };

  return findInPages(pages, path);
}

export function getNavbarItems(currentCountry: string | null): PageData[] {
  return getPagesConfig(currentCountry).filter(page => page.navbar);
}

interface FooterLink {
  title: string;
  path: string;
  enabled?: boolean;
}

export function getFooterItems(currentCountry: string | null): FooterLink[] {
  if (!currentCountry) return [];

  const countryCode = currentCountry.toLowerCase();
  const footerConfig = (pagesConfig.footer?.[countryCode]?.items || []) as FooterLink[];

  return footerConfig.filter(item => item.enabled !== false);
}
