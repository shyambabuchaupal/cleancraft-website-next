"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import ProgressiveStepper, {
  Step,
} from "@/components/franchise/ProgressiveStepper";
import EnhancedNavbar from "@/components/EnhancedNavbar";
import Footer from "@/components/Footer";

export default function ThankYouPage() {
  const router = useRouter();
  const pathname = usePathname(); // e.g., "/au/thank-you"
  const searchParams = useSearchParams();

  // Current country code from path
  const countryCode = pathname.split("/")[1] || "in"; // fallback to 'in'

  // Detect if it's course or franchise
  const sourceCta = searchParams.get("sourceCta");
  const isCourse = sourceCta === "course";

  // Franchise steps
  const franchiseSteps: Step[] = [
    {
      id: 1,
      title: "Information Submitted",
      description: "Your details are now in our system",
      icon: <CheckCircle2 className="h-6 w-6" />,
    },
    {
      id: 2,
      title: "Discovery Call Scheduled",
      description:
        "Within 24 hours - Our franchise consultant will contact you",
      icon: <CheckCircle2 className="h-6 w-6" />,
    },
    {
      id: 3,
      title: "Franchise Up & Running",
      description: "~₹1 lakh Rs monthly earning potential",
      icon: <CheckCircle2 className="h-6 w-6" />,
    },
  ];

  // Course steps
  const courseSteps: Step[] = [
    {
      id: 1,
      title: "Course Registration Done",
      description: "You’ve successfully registered for the course",
      icon: <CheckCircle2 className="h-6 w-6" />,
    },
    {
      id: 2,
      title: "Details Shared",
      description: "We’ve emailed you the course instructions",
      icon: <CheckCircle2 className="h-6 w-6" />,
    },
    {
      id: 3,
      title: "Course WhatsApp group",
      description:
        "A group with all the students will be created 2 days before the course date.",
      icon: <CheckCircle2 className="h-6 w-6" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">
      <EnhancedNavbar />

      <main className="flex-grow flex justify-center items-center px-4 py-16 relative z-10">
        <div className="bg-white shadow-2xl border border-green-100 rounded-3xl p-10 max-w-md w-full text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle2 className="text-green-600 w-16 h-16" />
          </div>

          <h1 className="text-3xl font-bold text-green-700 mb-4">Thank You!</h1>

          <div className="mb-6">
            <ProgressiveStepper
              steps={isCourse ? courseSteps : franchiseSteps}
            />
          </div>

          <Button
            onClick={() => router.push(`/${countryCode.toLowerCase()}`)}
            className="bg-green-600 hover:bg-green-700 text-white mt-4"
          >
            Go Back Home
          </Button>
        </div>
      </main>
    </div>
  );
}
