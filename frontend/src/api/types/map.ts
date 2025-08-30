import * as z from "zod";
import { BaseEnvironmentSchema, BaseGameModeSchema } from "./shared";

export const HashSchema = z.enum([
  "event_airhockey_banner",
  "event_arcade_banner",
  "event_basketball_banner",
  "event_bazaar_banner",
  "event_beach_banner",
  "event_brawlball_arena_banner",
  "event_brawlball_banner",
  "event_canyon_banner",
  "event_enchanted_banner",
  "event_gemmine_banner",
  "event_hub_banner",
  "event_katanakingdom_banner",
  "event_mortuary_banner",
  "event_piggy_banner",
  "event_robowars_banner",
  "event_stormvalley_banner",
  "event_stuntshow_banner",
  "event_swamp_banner",
  "event_tropical_banner",
]);
export type Hash = z.infer<typeof HashSchema>;

export const NameSchema = z.enum([
  "Airhockey",
  "Arcadeshowdown",
  "Bazaarislandshowdown",
  "Bbarena",
  "Coinfactory",
  "Coinfactorybb",
  "Default",
  "Defaultshowdown",
  "Enchantedforest",
  "Grassfield",
  "Grassfieldbeachball",
  "Hockeyislandshowdownbb",
  "Hub",
  "Islandshowdown",
  "Katanakingdom",
  "Katanakingdomislandshowdown",
  "Katanakingdomshowdown",
  "Loveswamp",
  "Mine",
  "Minetraintracks",
  "Mortuaryvolley",
  "Rooftop",
  "Scrapyard",
  "Stuntshow",
  "Stuntshowbb",
  "Stuntshowvolley",
  "Tropicalislandshowdown",
  "Tropicalislandshowdownbb",
]);
export type Name = z.infer<typeof NameSchema>;

export const MapBgColorSchema = z.enum([
  "#b606b0",
  "#b8fb26",
  "#d65cd3",
  "#dc2423",
  "#e337c1",
  "#e33b50",
  "#f05031",
  "#f7831c",
  "#00cfff",
  "#00da48",
  "#2fc4f9",
  "#56cdea",
  "#81d621",
  "#8ca0e0",
  "#9a3df3",
]);
export type MapBgColor = z.infer<typeof MapBgColorSchema>;

export const MapColorSchema = z.enum([
  "#c2ed00",
  "#d852ff",
  "#e24e5a",
  "#fd9b0e",
  "#ff4343",
  "#ff6847",
  "#24d6ff",
  "#2ef3e0",
  "#2fc4f9",
  "#3891ff",
  "#91e136",
  "#9ab1fd",
]);
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
