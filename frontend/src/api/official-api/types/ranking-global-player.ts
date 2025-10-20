import * as z from "zod";
import {
  BasicClubSchema,
  BasicRankingItemSchema,
  IconSchema,
  NameColorSchema,
  PagingSchema,
} from "./shared.js";

export const GlobalPlayerSchema = BasicRankingItemSchema.extend({
  nameColor: NameColorSchema,
  icon: IconSchema,
  club: BasicClubSchema.optional(),
});
export type GlobalPlayer = z.infer<typeof GlobalPlayerSchema>;

export const RankingGlobalPlayersSchema = z.object({
  items: z.array(GlobalPlayerSchema),
  paging: PagingSchema,
});
export type RankingGlobalPlayers = z.infer<typeof RankingGlobalPlayersSchema>;
