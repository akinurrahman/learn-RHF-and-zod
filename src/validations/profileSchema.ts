import { z } from "zod";
import { emailSchema, phoneSchema } from "./commonSchemas";

export const profileSchema = z.object({
  profileImg: z.union([z.string().url(), z.any()]).optional(),
  fullName: z.string().min(1, "Full name is required"),
  email: emailSchema,
  phone: phoneSchema,
  address: z.string().min(5, "Address is required"),
  bio: z.string().max(500, "Bio must not exceed 500 characters").optional(),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
