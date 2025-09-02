import { AxiosError } from "axios";
import { BASE_URL, BrawlApiAxiosInterceptor } from "../client";
import { IconsSchema, type BrawlApiError, type Icons } from "../types";

const ICONS_ENDPOINT = "/icons";

export class IconService {
  private static api = new BrawlApiAxiosInterceptor().instance;

  static async getIcons(): Promise<Icons | undefined> {
    try {
      const response = await this.api.get<Icons>(`${BASE_URL}${ICONS_ENDPOINT}`);

      if (!response.data) {
        return undefined;
      }

      if (response.status === 403) {
        throw new Error("Forbidden - check API permissions or URL parameters");
      }

      if (response.status === 404) {
        throw new Error("Not found - endpoint may not exist");
      }

      const parsedData = IconsSchema.parse(response.data);

      return parsedData;
    } catch (error) {
      const axiosError = error as AxiosError<BrawlApiError>;

      if (axiosError.response?.data) {
        throw axiosError.response.data;
      }

      if (axiosError.code === "NETWORK_ERROR") {
        throw new Error("Network error");
      }

      throw error;
    }
  }
}
