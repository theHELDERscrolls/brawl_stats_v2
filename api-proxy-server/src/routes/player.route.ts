import express from "express";
import { getPlayerBattlelog, getPlayerInfo } from "../controllers/index.js";

export const playersRouter = express.Router();

playersRouter.get("/:tag", getPlayerInfo);
playersRouter.get("/:tag/battlelog", getPlayerBattlelog);
