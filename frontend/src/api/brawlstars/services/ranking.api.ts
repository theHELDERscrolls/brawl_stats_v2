import { BASE_URL, BrawlStarsAxiosInterceptor } from "../client";
import {
  RankingGlobalBrawlersSchema,
  RankingGlobalClubsSchema,
  RankingGlobalPlayersSchema,
  type ClientError,
  type RankingGlobalBrawlers,
  type RankingGlobalClubs,
  type RankingGlobalPlayers,
} from "../types";
import type { AxiosError } from "axios";

const RANKING_ENDPOINT = "/rankings/global";

export class RankingService {
  private static api = new BrawlStarsAxiosInterceptor().instance;

  static async getRankingClubs(): Promise<RankingGlobalClubs | undefined> {
    try {
      const response = await this.api.get<RankingGlobalClubs>(
        `${BASE_URL}${RANKING_ENDPOINT}/clubs`
      );
      if (!response.data) {
        return undefined;
      }

      if (response.status === 403) {
        throw new Error("Forbidden - check API permissions or URL parameters");
      }

      if (response.status === 404) {
        throw new Error("Not found - endpoint may not exist");
      }

      const parsedData = RankingGlobalClubsSchema.parse(response.data);

      return parsedData;
    } catch (error) {
      const axiosError = error as AxiosError<ClientError>;

      if (axiosError.response?.data) {
        throw axiosError.response.data;
      }

      if (axiosError.code === "NETWORK_ERROR") {
        throw new Error("Network error");
      }

      throw error;
    }
  }

  static async getRankingBrawlers(brawlerId: number): Promise<RankingGlobalBrawlers | undefined> {
    try {
      const response = await this.api.get<RankingGlobalBrawlers>(
        `${BASE_URL}${RANKING_ENDPOINT}/brawlers/${brawlerId}`
      );
      if (!response.data) {
        return undefined;
      }

      if (response.status === 403) {
        throw new Error("Forbidden - check API permissions or URL parameters");
      }

      if (response.status === 404) {
        throw new Error("Not found - endpoint may not exist");
      }

      const parsedData = RankingGlobalBrawlersSchema.parse(response.data);

      return parsedData;
    } catch (error) {
      const axiosError = error as AxiosError<ClientError>;

      if (axiosError.response?.data) {
        throw axiosError.response.data;
      }

      if (axiosError.code === "NETWORK_ERROR") {
        throw new Error("Network error");
      }

      throw error;
    }
  }

  static async getRankingPlayers(): Promise<RankingGlobalPlayers | undefined> {
    try {
      const response = await this.api.get<RankingGlobalPlayers>(
        `${BASE_URL}${RANKING_ENDPOINT}/players`
      );
      if (!response.data) {
        return undefined;
      }

      if (response.status === 403) {
        throw new Error("Forbidden - check API permissions or URL parameters");
      }

      if (response.status === 404) {
        throw new Error("Not found - endpoint may not exist");
      }

      const parsedData = RankingGlobalPlayersSchema.parse(response.data);

      return parsedData;
    } catch (error) {
      const axiosError = error as AxiosError<ClientError>;

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
