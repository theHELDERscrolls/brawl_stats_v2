import * as z from "zod";

export const GameDetailSchema = z.object({
  id: z.number().optional(),
  scId: z.number(),
  name: z.string(),
  hash: z.string(),
  scHash: z.string(),
  disabled: z.boolean(),
  color: z.string(),
  bgColor: z.string(),
  version: z.number(),
  title: z.string(),
  tutorial: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  sort1: z.number(),
  sort2: z.number(),
  link: z.string(),
  imageUrl: z.string(),
  imageUrl2: z.string(),
  lastActive: z.null(),
  TID: z.string(),
});
export type GameDetail = z.infer<typeof GameDetailSchema>;

export const GameModesSchema = z.object({
  list: z.array(GameDetailSchema),
});
export type GameModes = z.infer<typeof GameModesSchema>;
