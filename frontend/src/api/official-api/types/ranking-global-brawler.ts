import * as z from "zod";
import {
  BasicClubSchema,
  BasicRankingItemSchema,
  IconSchema,
  NameColorSchema,
  PagingSchema,
} from "./shared.js";

export const GlobalBrawlerSchema = BasicRankingItemSchema.extend({
  nameColor: NameColorSchema,
  icon: IconSchema,
  club: BasicClubSchema.optional(),
});
export type GlobalBrawler = z.infer<typeof GlobalBrawlerSchema>;

export const RankingGlobalBrawlersSchema = z.object({
  items: z.array(GlobalBrawlerSchema),
  paging: PagingSchema,
});
export type RankingGlobalBrawlers = z.infer<typeof RankingGlobalBrawlersSchema>;
