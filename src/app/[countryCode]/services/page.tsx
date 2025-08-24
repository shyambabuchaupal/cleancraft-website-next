// services/page.tsx
import React from "react";
import EnhancedNavbar from "@/components/EnhancedNavbar";
import { EnhancedSEO } from "@/components/EnhancedSEO";

interface Service {
  id: string | number;
  name: string;
  description: string;
  price_from: number;
  price_type: string;
}

async function fetchServices() {
  try {
    const res = await fetch(`${process.env.STRAPI_URL}/services?populate=*`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ countryCode: string }>;
}) {
  const { countryCode } = await params;
  console.log("Country code is ", countryCode);
  const services = await fetchServices();

  console.log("services is ", services);

  const fallbackServices = [
    {
      id: "wash-dry-fold",
      name: "Wash, Dry & Fold",
      description: "Perfect for everyday clothes, bedding, and towels.",
      price_from: 6.5,
      price_type: "kg",
      slug: "wash-dry-fold",
    },
    {
      id: "wash-iron",
      name: "Wash & Iron",
      description: "For everyday laundry that requires ironing.",
      price_from: 7.5,
      price_type: "kg",
      slug: "wash-iron",
    },
    // ... add the rest
  ];

  const displayServices =
    services && services.length > 0 ? services : fallbackServices;

  return (
    <div>
      <EnhancedSEO
        slug="/services"
        pageType="LocalBusiness"
        defaultTitle="Professional Dry Cleaning & Wet Cleaning Services | CleanCraft"
        defaultDescription="Comprehensive dry cleaning, wet cleaning, and garment care services."
      />
      <EnhancedNavbar />
      <main className="py-16 px-2 md:px-4">
        {displayServices.map((service: Service) => (
          <div key={service.id} className="bg-white p-4 mb-4 shadow rounded">
            <h3 className="text-lg font-semibold">{service.name}</h3>
            <p>{service.description}</p>
            <p>
              From {service.price_from}/{service.price_type}
            </p>
          </div>
        ))}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
