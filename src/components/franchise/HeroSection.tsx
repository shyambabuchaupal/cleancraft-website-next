import { useState } from "react";
import { Button } from "@/components/ui/button";
import FranchiseFormModal from "./FranchiseFormModal";

const HeroSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleRequestInfo = () => {
    setIsFormOpen(true);
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-cleancraft-light via-white to-white pt-4 pb-4"
      aria-label="Top Laundry Franchise Opportunity in India"
    >
      <div className="container mx-auto px-2">
        <div className="relative max-w-7xl mx-auto px-2">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left Content */}
            <div className="flex-1 lg:pr-10 text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 bg-orange-50 rounded-full text-orange-600 text-sm font-medium mb-2">
                #No. 1 Laundry Franchise opportunity in India
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-light text-gray-900 leading-tight mb-4 tracking-tight">
                Start Profitable
                <br />
                <span style={{ color: "#2779E1" }}>Laundry and Dry</span>
                <br />
                <span style={{ color: "#2779E1" }}>Cleaning</span> Store with
                <br />
                Clean Craft Guarantee
              </h1>

              <p className="text-lg text-gray-600 mb-6 max-w-xl leading-relaxed mx-auto lg:mx-0">
                Join India's most trusted laundry franchise. Get assured
                break-even in 7 months or 100% royalty free for life. Premium
                territories available with low investment, high returns, and
                comprehensive training support.
              </p>

              {/* CTA Button */}
              <div className="flex justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={handleRequestInfo}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-base font-medium shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  Apply for Franchise
                </Button>
              </div>

              {/* Industry Growth */}
              <div className="mt-6 text-center lg:text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Be a Part of the ₹7,000 Cr Fastest-Growing Industry!
                </h3>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 lg:pl-8 mt-8 lg:mt-0">
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/lovable-uploads/FranchisHero.webp"
                    alt="Clean Craft Store"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Floating Card */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl py-2 px-3 shadow-lg border border-gray-100 max-w-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        Zero Risk Guarantees
                      </h3>
                      <p className="text-gray-600 text-xs mt-1">
                        Get 9 guarantees from Clean Craft to get profitable with
                        security
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorations */}
                <div className="absolute -top-3 -right-3 w-20 h-20 bg-orange-200 rounded-full opacity-50"></div>
                <div className="absolute top-1/2 -left-6 w-14 h-14 bg-blue-200 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FranchiseFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Get Your Franchise Information Package"
        sourceCta="Apply for Franchise"
      />
    </section>
  );
};

export default HeroSection;
