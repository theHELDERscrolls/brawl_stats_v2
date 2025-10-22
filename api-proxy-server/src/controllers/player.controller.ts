import { AxiosError } from "axios";
import { brawlApi } from "../services/index.js";
import { PlayerBattlelogSchema, PlayerInfoSchema, type ClientError, type PlayerBattlelog, type PlayerInfo } from "../types/index.js";
import { type Request, type Response } from "express";

export const getPlayerInfo = async (req: Request<{ tag: string }>, res: Response) => {
  try {
    const { tag } = req.params;
    const encodeTag = encodeURIComponent(`#${tag}`);
    const response = await brawlApi.get<PlayerInfo>(`/players/${encodeTag}`);

    if (!response) {
      return res.status(404).json({ message: "Player doesn't found", status: 404 });
    }

    const playerInfo = PlayerInfoSchema.parse(response.data);

    return res.status(200).json(playerInfo);
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ClientError>;

    if (axiosError.response?.data) {
      return res.status(axiosError.response.status ?? 400).json(axiosError.response.data);
    }

    return res.status(500).json(error);
  }
};

export const getPlayerBattlelog = async (req: Request<{ tag: string }>, res: Response) => {
  try {
    const { tag } = req.params;
    const encodeTag = encodeURIComponent(`#${tag}`);
    const response = await brawlApi.get<PlayerBattlelog>(`/players/${encodeTag}/battlelog`);

    if (!response) {
      return res.status(404).json({ message: "Player doesn't found", status: 404 });
    }

    const playerBattlelog = PlayerBattlelogSchema.parse(response.data);

    return res.status(200).json(playerBattlelog);
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ClientError>;

    if (axiosError.response?.data) {
      return res.status(axiosError.response.status ?? 400).json(axiosError.response.data);
    }

    return res.status(500).json(error);
  }
};
