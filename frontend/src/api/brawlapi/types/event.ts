import * as z from "zod";
import { BaseEnvironmentSchema, BaseGameModeSchema } from "./shared";

export const EventEnvironmentSchema = BaseEnvironmentSchema;
export type EventEnvironment = z.infer<typeof EventEnvironmentSchema>;

export const EventGameModeSchema = BaseGameModeSchema;
export type EventGameMode = z.infer<typeof EventGameModeSchema>;

export const StatSchema = z.object({
  brawler: z.number(),
  winRate: z.number(),
  useRate: z.number(),
});
export type Stat = z.infer<typeof StatSchema>;

export const SlotSchema = z.object({
  id: z.number(),
  name: z.string(),
  emoji: z.string(),
  hash: z.string(),
  listAlone: z.boolean(),
  hideable: z.boolean(),
  hideForSlot: z.union([z.number(), z.null()]),
  background: z.null(),
});
export type Slot = z.infer<typeof SlotSchema>;

export const MapSchema = z.object({
  id: z.number(),
  new: z.boolean(),
  disabled: z.boolean(),
  name: z.string(),
  hash: z.string(),
  version: z.number(),
  link: z.string(),
  imageUrl: z.string(),
  credit: z.union([z.null(), z.string()]),
  environment: EventEnvironmentSchema,
  gameMode: EventGameModeSchema,
  lastActive: z.number(),
  dataUpdated: z.number(),
  stats: z.array(StatSchema),
  teamStats: z.array(z.any()),
});
export type Map = z.infer<typeof MapSchema>;

export const EventDetailsSchema = z.object({
  slot: SlotSchema,
  predicted: z.boolean(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  reward: z.number(),
  map: MapSchema,
  modifier: z.null(),
});
export type EventDetails = z.infer<typeof EventDetailsSchema>;

export const EventsSchema = z.object({
  active: z.array(EventDetailsSchema),
  upcoming: z.array(EventDetailsSchema),
});
export type Events = z.infer<typeof EventsSchema>;
