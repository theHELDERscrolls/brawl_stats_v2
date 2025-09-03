import * as z from "zod";

export const IconClubSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
});
export type IconClub = z.infer<typeof IconClubSchema>;

export const IconPlayerSchema = z.object({
  id: z.number(),
  name: z.string(),
  name2: z.string(),
  imageUrl: z.string(),
  imageUrl2: z.string(),
  brawler: z.union([z.number(), z.null()]),
  requiredTotalTrophies: z.number(),
  sortOrder: z.number(),
  isReward: z.boolean(),
  isAvailableForOffers: z.boolean(),
});
export type IconPlayer = z.infer<typeof IconPlayerSchema>;

export const IconsSchema = z.object({
  player: z.record(z.string(), IconPlayerSchema),
  club: z.record(z.string(), IconClubSchema),
});
export type Icons = z.infer<typeof IconsSchema>;
