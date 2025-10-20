import type { AxiosInstance } from "axios";
import axios from "axios";

export const BASE_URL = "http://localhost:3000";

export class BrawlStarsAxiosInterceptor {
  private axiosInstace: AxiosInstance;

  constructor() {
    this.axiosInstace = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public get instance(): AxiosInstance {
    return this.axiosInstace;
  }
}
