import type { AxiosInstance } from "axios";
import axios from "axios";

// Base URL for Brawlify API
export const BRAWLAPI_BASE_URL = "https://api.brawlify.com/v1";

// Axios interceptor for Brawl Stars API
export class BrawlApiAxiosInterceptor {
  private axiosInstance: AxiosInstance;

  constructor() {
    // Create axios instance with base configuration
    this.axiosInstance = axios.create({
      baseURL: BRAWLAPI_BASE_URL,
      timeout: 10000, // 10 second timeout
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Getter for the axios instance
  public get instance(): AxiosInstance {
    return this.axiosInstance;
  }
}
