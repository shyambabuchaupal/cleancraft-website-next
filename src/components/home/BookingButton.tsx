"use client"; // 👈 since this uses hooks and client-side interaction

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useCountry } from "@/contexts/CountryContext"; // Optional, if you are doing country-based routing

interface BookingButtonProps {
  onClick?: () => void;
}

const BookingButton: React.FC<BookingButtonProps> = ({ onClick }) => {
  const router = useRouter();
  const { currentCountry } = useCountry(); // Optional

  // Helper to create country-based link
  const createLink = (path: string) =>
    currentCountry ? `/${currentCountry.toLowerCase()}${path}` : path;

  const handleClick = () => {
    if (onClick) onClick();

    if (currentCountry?.toLowerCase() === "au") {
      window.open("https://cleancloudapp.com/s3/27145", "_blank");
    } else {
      router.push(createLink("/book")); // ✅ Next.js routing
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex overflow-hidden flex-col justify-center items-center p-4 mt-10 w-full text-base font-medium text-white bg-blue-700 rounded-lg max-w-[381px] hover:bg-blue-800 transition-colors"
    >
      <div className="flex gap-2 items-center">
        <span className="gap-2 self-stretch my-auto text-white">
          Book For Today
        </span>
        <ArrowRight className="w-5 h-5" />
      </div>
    </button>
  );
};

export default BookingButton;
