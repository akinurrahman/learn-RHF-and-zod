import { z } from "zod";
import { emailSchema, passwordSchema, usernameSchema } from "./commonSchemas";

// Login Schema with a single input field for username or email
export const loginSchema = z.object({
  identifier: z.string().refine(
    (value) => {
      // Check if it's a valid email or a valid username
      return (
        emailSchema.safeParse(value).success ||
        usernameSchema.safeParse(value).success
      );
    },
    {
      message: "Please provide a valid username or email",
    }
  ),
  password: passwordSchema,
});

export const signupSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type SignupSchemaType = z.infer<typeof signupSchema>;

