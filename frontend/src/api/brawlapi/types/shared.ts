import * as z from "zod";

// Schema base para Environment (sin los enums específicos)
export const BaseEnvironmentSchema = z.object({
  id: z.number(),
  scId: z.number(),
  name: z.string(), // Este será reemplazado por enums específicos
  hash: z.string(), // Este será reemplazado por enums específicos
  path: z.string(), // Este será reemplazado por enums específicos
  version: z.number(),
  imageUrl: z.string(),
});
export type BaseEnvironment = z.infer<typeof BaseEnvironmentSchema>;

// Schema base para GameMode (sin los enums específicos)
export const BaseGameModeSchema = z.object({
  id: z.number().optional(),
  scId: z.number(),
  name: z.string(),
  hash: z.string(),
  version: z.number(),
  color: z.string(), // Este será reemplazado por enums específicos
  bgColor: z.string(), // Este será reemplazado por enums específicos
  link: z.string(),
  imageUrl: z.string(),
});
export type BaseGameMode = z.infer<typeof BaseGameModeSchema>;