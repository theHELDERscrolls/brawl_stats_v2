import * as z from "zod";
import { BaseEnvironmentSchema, BaseGameModeSchema } from "./shared";

export const HashSchema = z.string();
export type Hash = z.infer<typeof HashSchema>;

export const NameSchema = z.string();
export type Name = z.infer<typeof NameSchema>;

export const MapBgColorSchema = z.string();
export type MapBgColor = z.infer<typeof MapBgColorSchema>;

export const MapColorSchema = z.string();
export type MapColor = z.infer<typeof MapColorSchema>;

export const MapEnvironmentSchema = BaseEnvironmentSchema.extend({
  name: NameSchema,
  hash: HashSchema,
  path: NameSchema,
});
export type MapEnvironment = z.infer<typeof MapEnvironmentSchema>;

export const GameModeSchema = BaseGameModeSchema.extend({
  color: MapColorSchema,
  bgColor: MapBgColorSchema,
});
export type GameMode = z.infer<typeof GameModeSchema>;

export const MapDetailSchema = z.object({
  id: z.number(),
  new: z.boolean(),
  disabled: z.boolean(),
  name: z.string(),
  hash: z.string(),
  version: z.number(),
  link: z.string(),
  imageUrl: z.string(),
  credit: z.union([z.null(), z.string()]),
  environment: MapEnvironmentSchema,
  gameMode: GameModeSchema,
  lastActive: z.null(),
  dataUpdated: z.number(),
});
export type MapDetail = z.infer<typeof MapDetailSchema>;

export const MapsSchema = z.object({
  list: z.array(MapDetailSchema),
});
export type Maps = z.infer<typeof MapsSchema>;
