import { NextResponse } from "next/server";

interface ConnectionStatus {
  isConnected: boolean;
  lastChecked: number;
  retryCount: number;
  error?: string;
}

class ConnectionService {
  private static instance: ConnectionService;
  private status: ConnectionStatus = {
    isConnected: false,
    lastChecked: 0,
    retryCount: 0,
  };

  private readonly STRAPI_URL =
    process.env.STRAPI_URL || "http://localhost:1337/api";
  private readonly STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
  private readonly CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
  private readonly INITIAL_TIMEOUT = 30000; // 30s for initial
  private readonly NORMAL_TIMEOUT = 10000; // 10s for subsequent checks
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 2000; // 2s between retries
  private readonly COOLDOWN_PERIOD = 30000; // 30s cooldown after max retries

  private isChecking = false;

  private constructor() {}

  public static getInstance(): ConnectionService {
    if (!ConnectionService.instance) {
      ConnectionService.instance = new ConnectionService();
    }
    return ConnectionService.instance;
  }

  private async attemptConnection(timeout: number): Promise<boolean> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.STRAPI_URL}/services?pagination[limit]=1`,
        {
          method: "HEAD",
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${this.STRAPI_TOKEN}`,
          },
        }
      );

      clearTimeout(timeoutId);
      return response.ok;
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        console.warn("⏱️ Connection attempt timed out");
      } else {
        console.error("❌ Connection attempt failed:", error);
      }
      return false;
    }
  }

  async checkConnection(isInitial: boolean = false): Promise<boolean> {
    const now = Date.now();

    if (this.isChecking) {
      console.log("🔄 Connection check already in progress, returning cached result");
      return this.status.isConnected;
    }

    if (
      !isInitial &&
      this.status.isConnected &&
      now - this.status.lastChecked < this.CHECK_INTERVAL
    ) {
      return true;
    }

    if (
      this.status.retryCount >= this.MAX_RETRIES &&
      now - this.status.lastChecked < this.COOLDOWN_PERIOD
    ) {
      console.log("🔒 Connection in cooldown period, skipping check");
      return this.status.isConnected;
    }

    this.isChecking = true;
    const timeout = isInitial ? this.INITIAL_TIMEOUT : this.NORMAL_TIMEOUT;
    let success = false;

    try {
      const maxAttempts =
        this.status.retryCount >= this.MAX_RETRIES ? 1 : this.MAX_RETRIES;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        console.log(`🔄 Checking Strapi connection (Attempt ${attempt}/${maxAttempts})...`);
        success = await this.attemptConnection(timeout);

        if (success) break;

        if (attempt < maxAttempts) {
          console.log(`⏳ Waiting ${this.RETRY_DELAY}ms before retry...`);
          await new Promise((resolve) =>
            setTimeout(resolve, this.RETRY_DELAY)
          );
        }
      }

      this.status.isConnected = success;
      this.status.lastChecked = now;
      this.status.retryCount = success ? 0 : this.status.retryCount + 1;
      this.status.error = success
        ? undefined
        : "Connection failed after multiple attempts";

      console.log(
        success
          ? "✅ Strapi connection successful"
          : "❌ Strapi connection failed"
      );
    } finally {
      this.isChecking = false;
    }

    return success;
  }

  async warmupConnection(): Promise<boolean> {
    console.log("🔥 Warming up Strapi connection...");
    return this.checkConnection(true);
  }

  getStatus(): ConnectionStatus {
    return { ...this.status };
  }

  isHealthy(): boolean {
    return this.status.isConnected && this.status.retryCount < this.MAX_RETRIES;
  }
}

// Singleton instance
const connectionService = ConnectionService.getInstance();

// API route: GET /api/connection
export async function GET() {
  await connectionService.checkConnection();
  const status = connectionService.getStatus();
  
  return NextResponse.json({
    isConnected: status.isConnected,
    error: status.error,
    lastChecked: status.lastChecked,
    retryCount: status.retryCount,
  });
}
