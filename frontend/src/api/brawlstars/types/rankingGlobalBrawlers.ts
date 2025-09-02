import * as z from "zod";
import {
  BasicClubSchema,
  BasicRankingItemSchema,
  IconSchema,
  NameColorSchema,
  PagingSchema,
} from "./shared.js";

export const BrawlersItemSchema = BasicRankingItemSchema.extend({
  nameColor: NameColorSchema,
  icon: IconSchema,
  club: BasicClubSchema.optional(),
});
export type BrawlerItem = z.infer<typeof BrawlersItemSchema>;

export const RankingGlobalBrawlersSchema = z.object({
  items: z.array(BrawlersItemSchema),
  paging: PagingSchema,
});
export type RankingGlobalBrawlers = z.infer<typeof RankingGlobalBrawlersSchema>;
