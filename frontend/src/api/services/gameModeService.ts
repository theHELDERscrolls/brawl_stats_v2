import { AxiosError } from "axios";
import { BASE_URL, BrawlApiAxiosInterceptor } from "../client";
import {
  GameModeSchema,
  GameModesSchema,
  type BrawlApiError,
  type GameMode,
  type GameModes,
} from "../types";

const GAMEMODES_ENDPOINT = "/gamemodes";

export class GameModeService {
  private static api = new BrawlApiAxiosInterceptor().instance;

  static async getAllGameModes(): Promise<GameModes | undefined> {
    try {
      const response = await this.api.get<GameModes>(`${BASE_URL}${GAMEMODES_ENDPOINT}`);

      if (!response.data) {
        return undefined;
      }

      if (response.status === 403) {
        throw new Error("Forbidden - check API permissions or URL parameters");
      }

      if (response.status === 404) {
        throw new Error("Not found - endpoint may not exist");
      }

      const parsedData = GameModesSchema.parse(response.data);

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

  static async getGameModeById(id: number): Promise<GameMode | undefined> {
    try {
      const response = await this.api.get<GameMode>(`${BASE_URL}${GAMEMODES_ENDPOINT}/${id}`);
      if (!response.data) {
        return undefined;
      }

      if (response.status === 403) {
        throw new Error("Forbidden - check API permissions or URL parameters");
      }

      if (response.status === 404) {
        throw new Error("Not found - endpoint may not exist");
      }

      const parsedData = GameModeSchema.parse(response.data);

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
