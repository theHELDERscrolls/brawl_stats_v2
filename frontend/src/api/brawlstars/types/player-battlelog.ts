import * as z from "zod";
import { PagingSchema } from "./shared.js";

export const ModeSchema = z.string().optional();
export type Mode = z.infer<typeof ModeSchema>;

export const ResultSchema = z.string().optional();
export type Result = z.infer<typeof ResultSchema>;

export const TypeSchema = z.string().optional();
export type Type = z.infer<typeof TypeSchema>;

export const BattlelogMapSchema = z.string().nullable();
export type BattlelogMap = z.infer<typeof BattlelogMapSchema>;

export const PlayerBrawlerSchema = z.object({
  id: z.number(),
  name: z.string(),
  power: z.number(),
  trophies: z.number(),
  trophyChange: z.number().optional(),
});
export type PlayerBrawler = z.infer<typeof PlayerBrawlerSchema>;

export const TeamPlayerSchema = z.object({
  tag: z.string(),
  name: z.string(),
  brawler: PlayerBrawlerSchema,
});
export type TeamPlayer = z.infer<typeof TeamPlayerSchema>;

export const StarPlayerSchema = z.object({
  tag: z.string(),
  name: z.string(),
  brawler: PlayerBrawlerSchema,
});
export type StarPlayer = z.infer<typeof StarPlayerSchema>;

export const EventSchema = z.object({
  id: z.number(),
  mode: ModeSchema,
  map: BattlelogMapSchema,
});
export type Event = z.infer<typeof EventSchema>;

export const PlayerSchema = z.object({
  tag: z.string(),
  name: z.string(),
  brawler: PlayerBrawlerSchema.optional(),
});
export type Player = z.infer<typeof PlayerSchema>;

export const BattleSchema = z.object({
  mode: ModeSchema,
  type: TypeSchema,
  result: ResultSchema,
  duration: z.number().optional(),
  trophyChange: z.number().optional(),
  starPlayer: StarPlayerSchema.nullable().optional(),
  teams: z.array(z.array(TeamPlayerSchema)).optional(),
  players: z.array(PlayerSchema).optional(),
});
export type Battle = z.infer<typeof BattleSchema>;

export const PlayerItemBattlelogSchema = z.object({
  battleTime: z.string(),
  event: EventSchema,
  battle: BattleSchema,
});
export type PlayerItemBattlelog = z.infer<typeof PlayerItemBattlelogSchema>;

export const PlayerBattlelogSchema = z.object({
  items: z.array(PlayerItemBattlelogSchema),
  paging: PagingSchema,
});
export type PlayerBattlelog = z.infer<typeof PlayerBattlelogSchema>;
