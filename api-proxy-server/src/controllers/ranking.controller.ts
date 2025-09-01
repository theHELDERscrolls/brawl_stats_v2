import { brawlApi } from "../services/index.js";
import {
  RankingGlobalBrawlersSchema,
  RankingGlobalClubsSchema,
  RankingGlobalPlayersSchema,
  type ClientError,
  type RankingGlobalBrawlers,
  type RankingGlobalClubs,
  type RankingGlobalPlayers,
} from "../types/index.js";
import type { AxiosError } from "axios";
import type { Request, Response } from "express";

export const getRankingClubs = async (_req: Request, res: Response) => {
  try {
    const response = await brawlApi.get<RankingGlobalClubs>(`/rankings/global/clubs`);

    if (!response) {
      return res.status(404).json({ message: "Ranking doesn't found", status: 404 });
    }

    const rankingClubs = RankingGlobalClubsSchema.parse(response.data);

    return res.status(200).json(rankingClubs);
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ClientError>;

    if (axiosError.response?.data) {
      return res.status(axiosError.response.status ?? 400).json(axiosError.response.data);
    }

    return res.status(500).json(error);
  }
};

export const getRankingBrawlers = async (req: Request<{ brawlerId: string }>, res: Response) => {
  try {
    const { brawlerId } = req.params;
    const response = await brawlApi.get<RankingGlobalBrawlers>(
      `/rankings/global/brawlers/${brawlerId}`
    );

    if (!response) {
      return res.status(404).json({ message: "Ranking doesn't found", status: 404 });
    }

    const rankingClubs = RankingGlobalBrawlersSchema.parse(response.data);

    return res.status(200).json(rankingClubs);
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ClientError>;

    if (axiosError.response?.data) {
      return res.status(axiosError.response.status ?? 400).json(axiosError.response.data);
    }

    return res.status(500).json(error);
  }
};

export const getRankingPlayers = async (_req: Request, res: Response) => {
  try {
    const response = await brawlApi.get<RankingGlobalPlayers>(`/rankings/global/players`);

    if (!response) {
      return res.status(404).json({ message: "Ranking doesn't found", status: 404 });
    }

    const rankingClubs = RankingGlobalPlayersSchema.parse(response.data);

    return res.status(200).json(rankingClubs);
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ClientError>;

    if (axiosError.response?.data) {
      return res.status(axiosError.response.status ?? 400).json(axiosError.response.data);
    }

    return res.status(500).json(error);
  }
};
