import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .trim(),
    email: z.email("Invalid email").optional().nullable(),
    phoneNumber: z
      .string()
      .regex(/^(?:\+91[\-\s]?|0)?[6-9]\d{9}$/, "Invalid Indian phone number")
      .optional()
      .nullable(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    authProvider: z.enum(["local", "google"]).default("local"),
  })
  .superRefine((data, ctx) => {
    // Either email or phoneNumber must be provided
    if (!data.email && !data.phoneNumber) {
      ctx.addIssue({
        path: ["email"],
        message: "Either email or phone number must be provided",
        code: "invalid_type",
      });
    }

    // If authProvider is 'local', password is required
    if (data.authProvider === "local" && !data.password) {
      ctx.addIssue({
        path: ["password"],
        message: "Password is required for local registration",
        code: "invalid_type",
      });
    }

    // Normalize missing fields to null
    if (!data.email) data.email = null;
    if (!data.phoneNumber) data.phoneNumber = null;
  });

export const loginSchema = z
  .object({
    email: z.email("Invalid email").optional().nullable(),
    phoneNumber: z
      .string()
      .regex(/^(?:\+91[\-\s]?|0)?[6-9]\d{9}$/, "Invalid Indian phone number")
      .optional()
      .nullable(),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .superRefine((data, ctx) => {
    // Either email or phoneNumber must be provided
    if (!data.email && !data.phoneNumber) {
      ctx.addIssue({
        path: ["email"],
        message: "Either email or phone number must be provided",
        code: "invalid_type",
      });
    }

    // Normalize missing fields to null
    if (!data.email) data.email = null;
    if (!data.phoneNumber) data.phoneNumber = null;
  });
