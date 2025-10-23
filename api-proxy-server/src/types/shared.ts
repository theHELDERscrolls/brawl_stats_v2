import * as z from "zod";

export const IconSchema = z.object({
  id: z.number(),
});
export type Icon = z.infer<typeof IconSchema>;

export const BasicClubSchema = z.object({
  name: z.string(),
});
export type BasicClub = z.infer<typeof BasicClubSchema>;

export const CursorsSchema = z.object({});
export type Cursors = z.infer<typeof CursorsSchema>;

export const PagingSchema = z.object({
  cursors: CursorsSchema,
});
export type Paging = z.infer<typeof PagingSchema>;

export const NameColorSchema = z.string();
export type NameColor = z.infer<typeof NameColorSchema>;

export const BasicRankingItemSchema = z.object({
  tag: z.string(),
  name: z.string(),
  trophies: z.number(),
  rank: z.number().optional(),
});
export type BasicRankingItem = z.infer<typeof BasicRankingItemSchema>;
