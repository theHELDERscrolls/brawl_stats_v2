import * as z from "zod";
import { IconSchema } from "./shared.js";

export const GadgetSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Gadget = z.infer<typeof GadgetSchema>;

export const GearSchema = z.object({
  id: z.number(),
  name: z.string(),
  level: z.number(),
});
export type Gear = z.infer<typeof GearSchema>;

export const PlayerClubSchema = z.object({
  tag: z.string().optional(),
  name: z.string().optional(),
});
export type PlayerClub = z.infer<typeof PlayerClubSchema>;

export const BrawlerSchema = z.object({
  id: z.number(),
  name: z.string(),
  power: z.number(),
  rank: z.number(),
  trophies: z.number(),
  highestTrophies: z.number(),
  gears: z.array(GearSchema),
  starPowers: z.array(GadgetSchema),
  gadgets: z.array(GadgetSchema),
});
export type Brawler = z.infer<typeof BrawlerSchema>;

export const PlayerInfoSchema = z.object({
  tag: z.string(),
  name: z.string(),
  nameColor: z.string().optional(),
  icon: IconSchema,
  trophies: z.number(),
  highestTrophies: z.number(),
  expLevel: z.number(),
  expPoints: z.number(),
  isQualifiedFromChampionshipChallenge: z.boolean(),
  "3vs3Victories": z.number(),
  soloVictories: z.number(),
  duoVictories: z.number(),
  bestRoboRumbleTime: z.number(),
  bestTimeAsBigBrawler: z.number(),
  club: PlayerClubSchema.optional().nullable(),
  brawlers: z.array(BrawlerSchema),
});
export type PlayerInfo = z.infer<typeof PlayerInfoSchema>;
