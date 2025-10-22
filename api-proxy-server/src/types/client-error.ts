import * as z from "zod";

export const DetailsSchema = z.object({});
export type Details = z.infer<typeof DetailsSchema>;

export const ClientErrorSchema = z.object({
  reason: z.string().optional(),
  message: z.string().optional(),
  type: z.string().optional(),
  details: DetailsSchema.optional(),
});
export type ClientError = z.infer<typeof ClientErrorSchema>;
