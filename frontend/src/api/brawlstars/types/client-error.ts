import * as z from "zod";

export const DetailsSchema = z.object({});
export type Details = z.infer<typeof DetailsSchema>;

export const ClientErrorSchema = z.object({
  reason: z.string(),
  message: z.string(),
  type: z.string(),
  details: DetailsSchema,
});
export type ClientError = z.infer<typeof ClientErrorSchema>;
