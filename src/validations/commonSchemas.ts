import { z } from "zod";
import { isValidNumber, parsePhoneNumber } from "libphonenumber-js";

// Email validation schema
export const emailSchema = z
  .string()
  .email({ message: "Invalid email address" });

// Username validation schema
export const usernameSchema = z
  .string()
  .min(3, { message: "Username must be at least 3 characters long" })
  .max(10, { message: "Username must not exceed 10 characters" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  });

// Password validation schema
export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/\d/, { message: "Password must contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Password must contain at least one special character",
  });

// Phone number validation schema using libphonenumber-js
export const phoneSchema = z.string().refine(
  (value) => {
    try {
      const phoneNumber = parsePhoneNumber(value);
      return isValidNumber(phoneNumber?.number);
    } catch {
      return false; 
    }
  },
  {
    message: "Invalid phone number format.",
  }
);

// Infer the types from Zod schemas
export type EmailType = z.infer<typeof emailSchema>;
export type PasswordType = z.infer<typeof passwordSchema>;
export type UsernameType = z.infer<typeof usernameSchema>;
export type PhoneType = z.infer<typeof phoneSchema>;
