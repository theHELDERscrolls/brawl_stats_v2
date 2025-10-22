import * as z from "zod";

export const BaseEnvironmentSchema = z.object({
  id: z.number(),
  scId: z.number(),
  name: z.string(), 
  hash: z.string(), 
  path: z.string(), 
  version: z.number(),
  imageUrl: z.string(),
});
export type BaseEnvironment = z.infer<typeof BaseEnvironmentSchema>;

export const BaseGameModeSchema = z.object({
  id: z.number().optional(),
  scId: z.number(),
  name: z.string(),
  hash: z.string(),
  version: z.number(),
  color: z.string(), 
  bgColor: z.string(), 
  link: z.string(),
  imageUrl: z.string(),
});
export type BaseGameMode = z.infer<typeof BaseGameModeSchema>;