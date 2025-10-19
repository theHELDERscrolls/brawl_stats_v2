import { z } from "zod";

const tagRegex = /^[A-Z0-9]{5,10}$/i;

export const playerTagSchema = z.object({
  playerTag: z
    .string()
    .trim()
    .toUpperCase()
    .min(7, "Player tag must have min 7 characters")
    .regex(tagRegex, "Invalid format. Example: AB1CD2E"),
});

export type PlayerTag = z.infer<typeof playerTagSchema>;

export const clubTagSchema = z.object({
  clubTag: z
    .string()
    .trim()
    .toUpperCase()
    .min(7, "Club tag must have min 7 characters")
    .regex(tagRegex, "Invalid format. Example: AB1CD2E"),
});

export type ClubTag = z.infer<typeof clubTagSchema>;
