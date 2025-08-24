"use client";

import React, { useEffect, useState } from "react";
import { useStrapiServices } from "@/hooks/useStrapi";
import { useCountry } from "@/contexts/CountryContext";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

import { BookingSteps } from "@/components/booking/BookingSteps";
import { CitySelection } from "@/components/booking/CitySelection";
import { ServiceSelection } from "@/components/booking/ServiceSelection";
import { ContactForm, ContactFormData } from "@/components/booking/ContactForm";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [contactData, setContactData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    customCity: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { currentCountry } = useCountry();
  const { data: strapiServices, isLoading, error } = useStrapiServices();
  const router = useRouter();
  const isMobile = useIsMobile();

  const totalSteps = 4;

  // Restore saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem("bookingProgress");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.step && data.step < 4) {
        setCurrentStep(data.step);
        setSelectedCity(data.selectedCity || "");
        setCustomCity(data.customCity || "");
        setSelectedServices(data.selectedServices || []);
        setContactData(
          data.contactData || { name: "", email: "", phone: "", customCity: "" }
        );
      } else {
        localStorage.removeItem("bookingProgress");
      }
    }
  }, []);

  // Save progress whenever key state changes
  useEffect(() => {
    const bookingData = {
      step: currentStep,
      selectedCity,
      customCity,
      selectedServices,
      contactData,
    };
    localStorage.setItem("bookingProgress", JSON.stringify(bookingData));
  }, [currentStep, selectedCity, customCity, selectedServices, contactData]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("/api/cities");
        if (!res.ok) {
          throw new Error(`Failed to fetch cities: ${res.status}`);
        }
        const cityList = await res.json();
        const uniqueCities = Array.from(
          new Set(cityList.map((city: string) => city.toUpperCase()))
        ) as string[];
        setCities(uniqueCities);
        console.log("Cities loaded:", uniqueCities.length);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
        toast.error("Failed to load cities. Please refresh the page.");
      }
    };
    fetchCities();
  }, []);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setCustomCity("");
    setContactData((prev) => ({ ...prev, customCity: "" }));
  };

  const handleCustomCityChange = (val: string) => {
    setCustomCity(val);
    if (val.trim()) {
      setSelectedCity("");
      setContactData((prev) => ({ ...prev, customCity: val }));
    } else {
      setContactData((prev) => ({ ...prev, customCity: "" }));
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleContactSubmit = (data: ContactFormData) => {
    setContactData(data);
    setCurrentStep(4);
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (customCity.trim()) {
        setCurrentStep(3);
        return;
      }
      if (selectedCity) {
        setCurrentStep(2);
        return;
      }
      return toast.error("Please select a city or enter your city");
    }

    if (currentStep === 2) {
      if (selectedServices.length === 0) {
        return toast.error("Please select at least one service");
      }
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);

    const payload = customCity.trim()
      ? {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          manual_city: contactData.customCity,
          services: selectedServices.join(", "),
        }
      : {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          city: selectedCity,
          services: selectedServices.join(", "),
        };

    try {
      console.log("Submitting booking with payload:", payload);

      // Try React.js style direct call first (this should work like React.js project)
      const res = await fetch("/api/booking-react-style", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit booking");
      }

      const result = await res.json();
      console.log("Booking submitted successfully:", result);

      toast.success("Booking submitted successfully! We'll contact you soon.");
      localStorage.removeItem("bookingProgress");

      // Reset form
      setCurrentStep(1);
      setSelectedCity("");
      setCustomCity("");
      setSelectedServices([]);
      setContactData({ name: "", email: "", phone: "", customCity: "" });

      setTimeout(() => {
        router.push(`/${currentCountry || "in"}`);
      }, 2000);
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error(
        `Failed to submit booking: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayServices = (strapiServices || []).map((service: any) => {
    let priceType = service.price_type?.trim();
    const slug = service.slug?.toLowerCase() || "";
    if (!priceType) {
      priceType =
        slug.includes("wash") || slug.includes("laundry") ? "kg" : "item";
    }
    return { ...service, price_type: priceType };
  });

  const selectedServiceObjects = displayServices.filter((s: any) =>
    selectedServices.includes(s.id)
  );

  const canProceedFromStep = (step: number) => {
    switch (step) {
      case 1:
        return Boolean(selectedCity) || Boolean(customCity.trim());
      case 2:
        return selectedServices.length > 0;
      case 3:
        return contactData.name && contactData.email && contactData.phone;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/${currentCountry || "in"}`}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="/lovable-uploads/cleancraft-icon.png"
                alt="CleanCraft"
                className="w-10 h-10"
              />
              <span className="text-xl font-semibold text-foreground">
                CleanCraft
              </span>
            </Link>
            {!isMobile && currentStep > 1 && (
              <Button
                variant="ghost"
                onClick={() => router.push(`/${currentCountry || "in"}`)}
                className="text-muted-foreground"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BookingSteps currentStep={currentStep} totalSteps={totalSteps} />

        <Card className="p-6 md:p-8">
          {currentStep === 1 && (
            <CitySelection
              cities={cities}
              selectedCity={selectedCity}
              customCity={customCity}
              onCitySelect={handleCitySelect}
              onCustomCityChange={handleCustomCityChange}
            />
          )}

          {currentStep === 2 && (
            <ServiceSelection
              services={displayServices}
              selectedServices={selectedServices}
              onServiceToggle={handleServiceToggle}
              isLoading={isLoading}
            />
          )}

          {currentStep === 3 && (
            <ContactForm
              defaultValues={contactData}
              onSubmit={handleContactSubmit}
              showCustomCity={Boolean(customCity.trim())}
              selectedCity={selectedCity || customCity}
              isSubmitting={isSubmitting}
            />
          )}

          {currentStep === 4 && (
            <BookingConfirmation
              contactData={contactData}
              selectedCity={selectedCity || customCity}
              selectedServices={selectedServiceObjects}
              showCustomCity={Boolean(customCity.trim())}
            />
          )}

          {error && currentStep === 2 && (
            <div className="text-center py-8">
              <p className="text-destructive mb-4">Failed to load services</p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={handleNextStep}
              disabled={!canProceedFromStep(currentStep)}
              className="flex items-center space-x-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : currentStep === 3 ? null : (
            <Button
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </div>

        {isMobile && (
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              onClick={() => router.push(`/${currentCountry || "in"}`)}
              className="text-muted-foreground"
            >
              Cancel Booking
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
