import type { AxiosInstance } from "axios";
import axios from "axios";

export const BRAWLAPI_BASE_URL = "https://api.brawlify.com/v1";

export class BrawlApiAxiosInterceptor {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BRAWLAPI_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public get instance(): AxiosInstance {
    return this.axiosInstance;
  }
}
