import { LocationData } from "@/types/location";

/**
 * Fetch user's location data from our internal API
 * @returns Promise with location data including country_code
 */
export const fetchUserCountry = async (): Promise<LocationData> => {
  const response = await fetch("/api/location", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch country data: ${response.status}`);
  }

  return response.json();
};

/**
 * Get user's country code only (simplified version)
 * @returns Promise with country code string
 */
export const getUserCountryCode = async (): Promise<string> => {
  const data = await fetchUserCountry();
  return data.country_code;
};
