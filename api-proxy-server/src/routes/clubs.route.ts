import express from "express";
import { getClubInfo } from "../controllers/index.js";

export const clubsRouter = express.Router();

clubsRouter.get("/:tag", getClubInfo);
