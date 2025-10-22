import { AxiosError } from "axios";
import { BRAWLAPI_BASE_URL, BrawlApiAxiosInterceptor } from "../client";
import { EventsSchema, type BrawlApiError, type Events } from "../types";

const EVENTS_ENDPOINT = "/events";

export class EventService {
  private static api = new BrawlApiAxiosInterceptor().instance;

  static async getEvents(): Promise<Events | undefined> {
    try {
      const response = await this.api.get<Events>(`${BRAWLAPI_BASE_URL}${EVENTS_ENDPOINT}`);
      
      const parsedData = EventsSchema.parse(response.data);
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
