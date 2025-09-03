import * as z from "zod";
import {
  BasicClubSchema,
  BasicRankingItemSchema,
  IconSchema,
  NameColorSchema,
  PagingSchema,
} from "./shared.js";

export const ItemSchema = BasicRankingItemSchema.extend({
  nameColor: NameColorSchema,
  icon: IconSchema,
  club: BasicClubSchema.optional(),
});
export type Item = z.infer<typeof ItemSchema>;

export const RankingGlobalPlayersSchema = z.object({
  items: z.array(ItemSchema),
  paging: PagingSchema,
});
export type RankingGlobalPlayers = z.infer<typeof RankingGlobalPlayersSchema>;
