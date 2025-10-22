import type { Request, Response } from "express";
import { ClubSchema, type ClientError, type Club } from "../types/index.js";
import { brawlApi } from "../services/index.js";
import type { AxiosError } from "axios";

export const getClubInfo = async (req: Request<{ tag: string }>, res: Response) => {
  try {
    const { tag } = req.params;
    const encodeTag = encodeURIComponent(`#${tag}`);
    const response = await brawlApi.get<Club>(`/clubs/${encodeTag}`);

    if (!response) {
      return res.status(404).json({ message: "Club doesn't found", status: 404 });
    }

    const PlayerBattlelog = ClubSchema.parse(response.data);

    return res.status(200).json(PlayerBattlelog);
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ClientError>;

    if (axiosError.response?.data) {
      return res.status(axiosError.response.status ?? 400).json(axiosError.response.data);
    }

    return res.status(500).json(error);
  }
};
