import * as z from "zod";
import { IconSchema } from "./shared.js";

export const RoleSchema = z.enum(["member", "president", "senior"]);
export type Role = z.infer<typeof RoleSchema>;

export const MemberSchema = z.object({
  tag: z.string(),
  name: z.string(),
  nameColor: z.string(),
  role: RoleSchema,
  trophies: z.number(),
  icon: IconSchema,
});
export type Member = z.infer<typeof MemberSchema>;

export const ClubSchema = z.object({
  tag: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  badgeId: z.number(),
  requiredTrophies: z.number(),
  trophies: z.number(),
  members: z.array(MemberSchema),
});
export type Club = z.infer<typeof ClubSchema>;
