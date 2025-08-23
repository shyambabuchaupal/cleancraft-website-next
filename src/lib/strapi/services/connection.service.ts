// src/lib/strapi/services/connection.service.ts

interface ConnectionStatus {
  isConnected: boolean;
  lastChecked: number;
  retryCount: number;
  error?: string;
}

export class ConnectionService {
  private static instance: ConnectionService;

  private status: ConnectionStatus = {
    isConnected: false,
    lastChecked: 0,
    retryCount: 0,
  };

  // ✅ Server-side environment variables
  private readonly STRAPI_URL: string = process.env.STRAPI_URL || "http://localhost:1337/api";
  private readonly STRAPI_TOKEN: string = process.env.STRAPI_API_TOKEN || "";

  // 🔧 Config values
  private readonly CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
  private readonly INITIAL_TIMEOUT = 30000;       // 30 sec
  private readonly NORMAL_TIMEOUT = 10000;        // 10 sec
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 2000;            // 2 sec
  private readonly COOLDOWN_PERIOD = 30000;       // 30 sec

  private isChecking = false;

  private constructor() {}

  public static getInstance(): ConnectionService {
    if (!ConnectionService.instance) {
      ConnectionService.instance = new ConnectionService();
    }
    return ConnectionService.instance;
  }

  /**
   * Try connecting to Strapi with timeout
   */
  private async attemptConnection(timeout: number): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${this.STRAPI_URL}/services?pagination[limit]=1`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.STRAPI_TOKEN}`,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.warn("⏱️ Connection attempt timed out");
      } else {
        console.error("❌ Connection attempt failed:", error);
      }
      return false;
    }
  }

  /**
   * Check Strapi connection with retries
   */
  public async checkConnection(isInitial: boolean = false): Promise<boolean> {
    const now = Date.now();
    if (this.isChecking) return this.status.isConnected;

    // Skip check if already connected recently
    if (!isInitial && this.status.isConnected && now - this.status.lastChecked < this.CHECK_INTERVAL) {
      return true;
    }

    // Skip check if in cooldown period
    if (this.status.retryCount >= this.MAX_RETRIES && now - this.status.lastChecked < this.COOLDOWN_PERIOD) {
      return this.status.isConnected;
    }

    this.isChecking = true;
    const timeout = isInitial ? this.INITIAL_TIMEOUT : this.NORMAL_TIMEOUT;
    let success = false;

    try {
      const maxAttempts = this.status.retryCount >= this.MAX_RETRIES ? 1 : this.MAX_RETRIES;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        console.log(`🔄 Checking Strapi connection (Attempt ${attempt}/${maxAttempts})...`);
        success = await this.attemptConnection(timeout);
        if (success) break;

        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY));
        }
      }

      this.status.isConnected = success;
      this.status.lastChecked = now;
      this.status.retryCount = success ? 0 : this.status.retryCount + 1;
      this.status.error = success ? undefined : "Connection failed after multiple attempts";

      console.log(success ? "✅ Strapi connection successful" : "❌ Strapi connection failed");
    } finally {
      this.isChecking = false;
    }

    return success;
  }

  /**
   * First-time warmup (longer timeout)
   */
  public async warmupConnection(): Promise<boolean> {
    return this.checkConnection(true);
  }

  /**
   * Get latest connection status
   */
  public getStatus(): ConnectionStatus {
    return { ...this.status };
  }

  /**
   * Is Strapi connection healthy?
   */
  public isHealthy(): boolean {
    return this.status.isConnected && this.status.retryCount < this.MAX_RETRIES;
  }
}

// ✅ Singleton instance
export const connectionService = ConnectionService.getInstance();
