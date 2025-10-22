import { AxiosError } from "axios";
import { BRAWLAPI_BASE_URL, BrawlApiAxiosInterceptor } from "../client";
import {
  BrawlerDetailSchema,
  BrawlersSchema,
  type BrawlApiError,
  type BrawlerDetail,
  type Brawlers,
} from "../types";

const BRAWLERS_ENDPOINT = "/brawlers";

export class BrawlerService {
  private static api = new BrawlApiAxiosInterceptor().instance;

  static async getAllBrawlers(): Promise<Brawlers | undefined> {
    try {
      const response = await this.api.get<Brawlers>(`${BRAWLAPI_BASE_URL}${BRAWLERS_ENDPOINT}`);

      const parsedData = BrawlersSchema.parse(response.data);
      return parsedData;
    } catch (error) {
      const axiosError = error as AxiosError<BrawlApiError>;

      if (axiosError.response) {
        const status = axiosError.response.status;

        if (status === 403) {
          throw new Error("Forbidden - check API permissions or URL parameters");
        }

        if (status === 404) {
          throw new Error("Not found - endpoint may not exist");
        }

        if (axiosError.response.data) {
          throw axiosError.response.data;
        }
      }

      if (axiosError.code === "NETWORK_ERROR") {
        throw new Error("Network error");
      }

      throw error;
    }
  }

  static async getBrawlerById(id: number): Promise<BrawlerDetail | undefined> {
    try {
      const response = await this.api.get<BrawlerDetail>(
        `${BRAWLAPI_BASE_URL}${BRAWLERS_ENDPOINT}/${id}`
      );

      const parsedData = BrawlerDetailSchema.parse(response.data);
      return parsedData;
    } catch (error) {
      const axiosError = error as AxiosError<BrawlApiError>;

      if (axiosError.response) {
        const status = axiosError.response.status;

        if (status === 403) {
          throw new Error("Forbidden - check API permissions or URL parameters");
        }

        if (status === 404) {
          throw new Error("Not found - endpoint may not exist");
        }

        if (axiosError.response.data) {
          throw axiosError.response.data;
        }
      }

      if (axiosError.code === "NETWORK_ERROR") {
        throw new Error("Network error");
      }

      throw error;
    }
  }
}
