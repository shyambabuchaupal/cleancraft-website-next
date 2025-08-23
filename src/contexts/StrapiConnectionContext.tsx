"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

interface StrapiConnectionState {
  isConnected: boolean;
  isInitializing: boolean;
  error?: string;
  retryConnection: () => Promise<void>;
}

const StrapiConnectionContext = createContext<StrapiConnectionState | null>(
  null
);

export function useStrapiConnection() {
  const context = useContext(StrapiConnectionContext);
  if (!context) {
    throw new Error(
      "useStrapiConnection must be used within StrapiConnectionProvider"
    );
  }
  return context;
}

interface StrapiConnectionProviderProps {
  children: React.ReactNode;
}

export function StrapiConnectionProvider({
  children,
}: StrapiConnectionProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string>();

  const initializationAttempted = useRef(false);
  const isRetrying = useRef(false);

  const initializeConnection = async () => {
    if (initializationAttempted.current || isRetrying.current) {
      console.log(
        "🔄 Connection initialization already in progress, skipping..."
      );
      return;
    }

    try {
      initializationAttempted.current = true;
      setIsInitializing(true);
      setError(undefined);

      console.log("🚀 Initializing Strapi connection via API route...");

      const res = await fetch("/api/connection");
      if (!res.ok) throw new Error("Failed to reach API route");

      const data = await res.json();
      setIsConnected(data.isConnected);

      if (!data.isConnected) {
        setError(data.error || "Failed to connect to Strapi");
      }
    } catch (err) {
      console.error("❌ Failed to initialize Strapi connection:", err);
      setIsConnected(false);
      setError(
        err instanceof Error ? err.message : "Connection initialization failed"
      );
    } finally {
      setIsInitializing(false);
    }
  };

  const retryConnection = async () => {
    console.log("🔄 Retrying Strapi connection...");
    isRetrying.current = true;
    await initializeConnection();
    isRetrying.current = false;
  };

  useEffect(() => {
    if (!initializationAttempted.current) {
      initializeConnection();
    }
  }, []);

  const value: StrapiConnectionState = {
    isConnected,
    isInitializing,
    error,
    retryConnection,
  };

  return (
    <StrapiConnectionContext.Provider value={value}>
      {children}
    </StrapiConnectionContext.Provider>
  );
}
