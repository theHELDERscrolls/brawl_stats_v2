import type { AxiosInstance } from "axios";
import axios from "axios";

// Base URL for local backend server
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Axios interceptor for Brawl Stars backend API
export class BrawlStarsAxiosInterceptor {
  private axiosInstace: AxiosInstance;

  constructor() {
    // Create axios instance with backend configuration
    this.axiosInstace = axios.create({
      baseURL: BASE_URL,
      timeout: 10000, // 10 second timeout
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Getter for the axios instance
  public get instance(): AxiosInstance {
    return this.axiosInstace;
  }
}
