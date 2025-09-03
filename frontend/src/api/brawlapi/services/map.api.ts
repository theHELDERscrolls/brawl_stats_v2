import { AxiosError } from "axios";
import { BRAWLAPI_BASE_URL, BrawlApiAxiosInterceptor } from "../client";
import {
  MapDetailSchema,
  MapsSchema,
  type BrawlApiError,
  type MapDetail,
  type Maps,
} from "../types";

const MAPS_ENDPOINT = "/maps";

export class MapService {
  private static api = new BrawlApiAxiosInterceptor().instance;

  static async getAllMaps(): Promise<Maps | undefined> {
    try {
      const response = await this.api.get<Maps>(`${BRAWLAPI_BASE_URL}${MAPS_ENDPOINT}`);

      if (!response.data) {
        return undefined;
      }

      if (response.status === 403) {
        throw new Error("Forbidden - check API permissions or URL parameters");
      }

      if (response.status === 404) {
        throw new Error("Not found - endpoint may not exist");
      }

      const parsedData = MapsSchema.parse(response.data);

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

  static async getMapById(id: number): Promise<MapDetail | undefined> {
    try {
      const response = await this.api.get<MapDetail>(`${BRAWLAPI_BASE_URL}${MAPS_ENDPOINT}/${id}`);
      if (!response.data) {
        return undefined;
      }

      if (response.status === 403) {
        throw new Error("Forbidden - check API permissions or URL parameters");
      }

      if (response.status === 404) {
        throw new Error("Not found - endpoint may not exist");
      }

      const parsedData = MapDetailSchema.parse(response.data);

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
