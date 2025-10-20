import * as z from "zod";
import { BasicRankingItemSchema, PagingSchema } from "./shared.js";

export const ClubItemSchema = BasicRankingItemSchema.extend({
  badgeId: z.number(),
  memberCount: z.number(),
});
export type ClubItem = z.infer<typeof ClubItemSchema>;

export const RankingGlobalClubsSchema = z.object({
  items: z.array(ClubItemSchema),
  paging: PagingSchema,
});
export type RankingGlobalClubs = z.infer<typeof RankingGlobalClubsSchema>;
