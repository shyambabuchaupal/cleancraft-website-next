// components/ClientInitializer.tsx
"use client";

import { useEffect } from "react";
import { initializePerformanceOptimizations } from "@/utils/performance-setup";

export default function ClientInitializer() {
  useEffect(() => {
    initializePerformanceOptimizations();
    console.log("🔥 Ye log sirf development me dikhna chahiye");
  }, []);

  return null;
}
