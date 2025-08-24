import { Metadata } from "next";
import { EnhancedSEO } from "@/components/EnhancedSEO";
import EnhancedNavbar from "@/components/EnhancedNavbar";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Store, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Laundry Franchise Opportunity | Clean Craft",
  description:
    "Join India's most trusted laundry franchise. Get assured break-even in 7 months or 100% royalty free for life. Premium territories available.",
};

// Services data
const services = [
  {
    icon: GraduationCap,
    title: "COACHING",
    description:
      "Professional training and mentorship for laundry and dry cleaning excellence.",
  },
  {
    icon: Store,
    title: "FRANCHISE",
    description:
      "Proven business model and ongoing support for your entrepreneurial journey.",
  },
  {
    icon: Package,
    title: "PRODUCTS",
    description:
      "Premium cleaning solutions and equipment for superior garment care.",
  },
];

// Mission points
const missionPoints = [
  "Delivering pristine, professionally cleaned garments that enhance personal image and confidence.",
  "Providing accessible, reliable, and eco-conscious laundry solutions that make self-care effortless.",
  "Empowering individuals to build strong, respectable businesses through our trusted franchise model.",
];

// Core values
const coreValues = [
  {
    title: "1. Spotless Excellence",
    description:
      "We deliver nothing but perfection—because we understand the value of a flawless first impression.",
  },
  {
    title: "2. Dignity Through Cleanliness",
    description:
      "We believe that cleanliness uplifts, empowers, and dignifies people from all walks of life.",
  },
  {
    title: "3. Commitment Without Compromise",
    description:
      "We go the extra mile—whatever it takes—to ensure quality, customer satisfaction, and long-term trust.",
  },
  {
    title: "4. Empowerment Through Opportunity",
    description:
      "We enable aspiring entrepreneurs to create successful futures with a scalable, profitable business.",
  },
  {
    title: "5. Sustainable Impact",
    description:
      "We serve not just individuals but the planet—by using eco-friendly processes and responsible practices.",
  },
];

export default function DiscoverCleanCraft() {
  return (
    <>
      <EnhancedSEO
        slug="/discover-cleancraft"
        pageType="Organization"
        defaultTitle="Laundry Franchise Opportunity | Clean Craft"
        defaultDescription="Join India's most trusted laundry franchise. Get assured break-even in 7 months or 100% royalty free for life. Premium territories available."
        customKeywords={[
          "dry cleaning franchise",
          "wet cleaning business opportunity",
          "profitable laundry franchise",
        ]}
      />

      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display-lg md:text-display-md font-black mb-6 text-gray-900">
              Discover Clean Craft
            </h1>
            <p className="text-heading-sm md:text-heading-md font-semibold text-brand-blue mb-8">
              India&apos;s Fastest Growing and most preferred Laundry & Dry
              Cleaning Franchise Brand
            </p>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-body-lg md:text-body-lg leading-relaxed">
                Welcome to Clean Craft, where technology meets trust in the
                world of laundry and dry cleaning. Whether you&apos;re a
                customer looking for premium garment care or a business
                enthusiast dreaming of starting your own successful franchise,
                Clean Craft is built to serve you.
              </p>
              <p className="text-body-lg md:text-body-lg leading-relaxed mt-6">
                With a commitment to quality, consistency, and customer
                satisfaction, we&apos;re transforming how India experiences
                laundry—one spotless garment at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-lg md:text-heading-md font-black mb-4 text-gray-900">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={index}
                className="text-center p-8 hover:shadow-lg transition-shadow"
              >
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-brand-blue" />
                  </div>
                  <h3 className="text-title-lg font-bold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-body-md text-gray-600">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-heading-lg md:text-heading-md font-black mb-8 text-gray-900">
              Our Vision
            </h2>
            <p className="text-title-lg font-semibold text-brand-blue mb-8">
              We want to make this world a better place—whatever it takes.
            </p>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-body-lg leading-relaxed">
                At Clean Craft, we believe that everyone deserves the confidence
                of a spotless personality. A clean appearance has the power to
                shape perceptions, boost self-esteem, and open doors. Our vision
                is to be the driving force behind this transformation—one
                pristine garment and one confident individual at a time.
              </p>
              <p className="text-title-lg font-semibold text-gray-900 mt-8">
                We honour spotless personalities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading-lg md:text-heading-md font-black mb-8 text-center text-gray-900">
              Our Mission
            </h2>
            <p className="text-body-lg text-center text-gray-700 mb-12">
              To transform lives through the power of cleanliness and
              presentation by:
            </p>

            <div className="space-y-8">
              {missionPoints.map((text, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <p className="text-body-lg text-gray-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-heading-lg md:text-heading-md font-black mb-12 text-center text-gray-900">
              Our Core Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((value, index) => (
                <Card key={index} className="p-6 bg-white">
                  <CardContent className="space-y-4">
                    <h3 className="text-title-md font-bold text-gray-900">
                      {value.title}
                    </h3>
                    <p className="text-body-md text-gray-700">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
