import { BASE_URL, BrawlStarsAxiosInterceptor } from "../client";
import {
  PlayerBattlelogSchema,
  PlayerInfoSchema,
  type ClientError,
  type PlayerBattlelog,
  type PlayerInfo,
} from "../types";
import type { AxiosError } from "axios";

const PLAYER_ENDPOINT = "/players";

export class PlayerService {
  private static api = new BrawlStarsAxiosInterceptor().instance;

  static async getPlayerInfo(playertag: string): Promise<PlayerInfo | undefined> {
    try {
      const response = await this.api.get<PlayerInfo>(`${BASE_URL}${PLAYER_ENDPOINT}/${playertag}`);
      if (!response.data) {
        return undefined;
      }

      if (response.status === 403) {
        throw new Error("Forbidden - check API permissions or URL parameters");
      }

      if (response.status === 404) {
        throw new Error("Not found - endpoint may not exist");
      }

      const parsedData = PlayerInfoSchema.parse(response.data);

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

  static async getPlayerBattlelog(playertag: string): Promise<PlayerBattlelog | undefined> {
    try {
      const response = await this.api.get<PlayerBattlelog>(
        `${BASE_URL}${PLAYER_ENDPOINT}/${playertag}/battlelog`
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

      const parsedData = PlayerBattlelogSchema.parse(response.data);

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
