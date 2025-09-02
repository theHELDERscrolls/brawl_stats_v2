import * as z from "zod";

export const ClassNameSchema = z.enum([
  "Artillery",
  "Assassin",
  "Controller",
  "Damage Dealer",
  "Marksman",
  "Support",
  "Tank",
  "Unknown",
]);
export type ClassName = z.infer<typeof ClassNameSchema>;

export const BrawlerColorSchema = z.enum([
  "#b9eaff",
  "#d850ff",
  "#e1fb2a",
  "#fe5e72",
  "#fff11e",
  "#5ab3ff",
  "#68fd58",
]);
export type BrawlerColor = z.infer<typeof BrawlerColorSchema>;

export const RarityNameSchema = z.enum([
  "Common",
  "Epic",
  "Legendary",
  "Mythic",
  "Rare",
  "Super Rare",
  "Ultra Legendary",
]);
export type RarityName = z.infer<typeof RarityNameSchema>;

export const ClassClassSchema = z.object({
  id: z.number(),
  name: ClassNameSchema,
});
export type ClassClass = z.infer<typeof ClassClassSchema>;

export const GadgetAndPowerSchema = z.object({
  id: z.number(),
  name: z.string(),
  path: z.string(),
  version: z.number(),
  description: z.string(),
  descriptionHtml: z.string(),
  imageUrl: z.string(),
  released: z.boolean(),
});
export type GadgetAndPower = z.infer<typeof GadgetAndPowerSchema>;

export const RaritySchema = z.object({
  id: z.number(),
  name: RarityNameSchema,
  color: BrawlerColorSchema,
});
export type Rarity = z.infer<typeof RaritySchema>;

export const BrawlerDetailSchema = z.object({
  id: z.number(),
  avatarId: z.number(),
  name: z.string(),
  hash: z.string(),
  path: z.string(),
  fankit: z.string(),
  released: z.boolean(),
  version: z.number(),
  link: z.string(),
  imageUrl: z.string(),
  imageUrl2: z.string(),
  imageUrl3: z.string(),
  class: ClassClassSchema,
  rarity: RaritySchema,
  unlock: z.null(),
  description: z.string(),
  descriptionHtml: z.string(),
  starPowers: z.array(GadgetAndPowerSchema),
  gadgets: z.array(GadgetAndPowerSchema),
  videos: z.array(z.unknown()),
});
export type BrawlerDetail = z.infer<typeof BrawlerDetailSchema>;

export const BrawlersSchema = z.object({
  list: z.array(BrawlerDetailSchema),
});
export type Brawlers = z.infer<typeof BrawlersSchema>;
