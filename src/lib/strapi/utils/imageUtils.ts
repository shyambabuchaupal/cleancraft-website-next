// Strapi Image Object Types
interface StrapiImageAttributes {
  url?: string;
  alternativeText?: string;
}

interface StrapiImageData {
  attributes?: StrapiImageAttributes;
}

interface StrapiImageObject {
  url?: string;
  alternativeText?: string;
  attributes?: StrapiImageAttributes;
  data?: StrapiImageData;
}

type StrapiImageInput = string | StrapiImageObject | StrapiImageObject[] | null | undefined;

/**
 * ✅ Get full image URL from Strapi image object
 */
export function getStrapiImageUrl(imageObj: StrapiImageInput): string | null {
  if (!imageObj) return null;

  let imageUrl: string | null = null;

  if (typeof imageObj === "string") {
    imageUrl = imageObj;
  } else if (Array.isArray(imageObj)) {
    if (imageObj.length > 0) {
      const first = imageObj[0];
      if (typeof first === "string") {
        imageUrl = first;
      } else if (first?.url) {
        imageUrl = first.url;
      } else if (first?.data?.attributes?.url) {
        imageUrl = first.data.attributes.url;
      }
    }
  } else {
    // Single object case
    if (imageObj.url) {
      imageUrl = imageObj.url;
    } else if (imageObj.data?.attributes?.url) {
      imageUrl = imageObj.data.attributes.url;
    } else if (imageObj.attributes?.url) {
      imageUrl = imageObj.attributes.url;
    }
  }

  if (!imageUrl) return null;

  // If already full URL
  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/api$/, "") ?? "";
  return `${baseUrl}${imageUrl}`;
}

/**
 * ✅ Get alt text from Strapi image object
 */
export function getStrapiImageAlt(imageObj: StrapiImageInput, fallback: string = ""): string {
  if (!imageObj || typeof imageObj === "string") return fallback;

  let targetObj: StrapiImageObject | undefined;

  if (Array.isArray(imageObj)) {
    targetObj = imageObj[0];
  } else {
    targetObj = imageObj;
  }

  return (
    targetObj?.alternativeText ||
    targetObj?.attributes?.alternativeText ||
    targetObj?.data?.attributes?.alternativeText ||
    fallback
  );
}
