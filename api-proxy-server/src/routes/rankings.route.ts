import express from "express";
import { getRankingBrawlers, getRankingClubs, getRankingPlayers } from "../controllers/index.js";

export const rankingsRouter = express.Router();

rankingsRouter.get("/global/clubs", getRankingClubs);
rankingsRouter.get("/global/brawlers/:brawlerId", getRankingBrawlers);
rankingsRouter.get("/global/players", getRankingPlayers);
