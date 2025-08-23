export async function fetchTestimonials(serviceType?: string, countryCode?: string) {
  try {
    const res = await fetch(`/api/testimonials`);
    if (!res.ok) throw new Error("Failed to fetch testimonials");
    const data = await res.json();
    return data.data || []; // Strapi response me usually data array hota hai
  } catch (err) {
    console.error("fetchTestimonials error:", err);
    return [];
  }
}
