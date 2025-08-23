"use client";

import React from "react";
import ScrollToTop from "./ScrollToTop";

interface CountryLayoutProps {
  children: React.ReactNode;
}

const CountryLayout: React.FC<CountryLayoutProps> = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
};

export default CountryLayout;
