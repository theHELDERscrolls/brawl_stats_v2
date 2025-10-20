import * as z from "zod";
import { BasicRankingItemSchema, PagingSchema } from "./shared.js";

export const GlobalClubSchema = BasicRankingItemSchema.extend({
  badgeId: z.number(),
  memberCount: z.number(),
});
export type GlobalClub = z.infer<typeof GlobalClubSchema>;

export const RankingGlobalClubsSchema = z.object({
  items: z.array(GlobalClubSchema),
  paging: PagingSchema,
});
export type RankingGlobalClubs = z.infer<typeof RankingGlobalClubsSchema>;
