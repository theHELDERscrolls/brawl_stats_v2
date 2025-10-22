import { BASE_URL, BrawlStarsAxiosInterceptor } from "../client";
import { ClubSchema, type ClientError, type Club } from "../types";
import type { AxiosError } from "axios";

const CLUB_ENDPOINT = "/clubs";

export class ClubService {
  private static api = new BrawlStarsAxiosInterceptor().instance;

  static async getClubInfo(clubTag: string): Promise<Club | undefined> {
    try {
      const response = await this.api.get<Club>(`${BASE_URL}${CLUB_ENDPOINT}/${clubTag}`);
      
      const parsedData = ClubSchema.parse(response.data);
      return parsedData;
    } catch (error) {
      const axiosError = error as AxiosError<ClientError>;

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
