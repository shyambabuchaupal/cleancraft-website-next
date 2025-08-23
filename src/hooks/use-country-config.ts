import pagesConfig from '@/config/pages.json';

export interface CountryConfig {
  code: string;
  name: string;
  flag_emoji: string;
  region: string;
}

interface CountryJsonData {
  name: string;
  flag_emoji: string;
  region: string;
}

interface PagesJsonConfig {
  countries: {
    [key: string]: CountryJsonData;
  };
}

// Build array of countries from JSON
const countries: CountryConfig[] = Object.entries((pagesConfig as PagesJsonConfig).countries || {}).map(
  ([code, data]): CountryConfig => ({
    code,
    name: data.name,
    flag_emoji: data.flag_emoji,
    region: data.region,
  })
);

function isSupportedCountry(code: string): boolean {
  return countries.some((c) => c.code.toLowerCase() === code.toLowerCase());
}

function getCountryByCode(code: string): CountryConfig | undefined {
  return countries.find((c) => c.code.toLowerCase() === code.toLowerCase());
}

function getCountryRegion(code: string): string {
  const country = getCountryByCode(code);
  return country?.region || 'OTHER REGIONS';
}

export const countryConfig = {
  countries,
  isSupportedCountry,
  getCountryByCode,
  getCountryRegion,
};
