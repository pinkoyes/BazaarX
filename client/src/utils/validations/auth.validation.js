import { z } from "zod";

const phoneRegex = /^[0-9]{10,15}$/;

export const registerSchema = z.object({
  fullName: z.string().min(3, "Please enter your full name"),
  contact: z
    .string()
    .min(3, "Email or Phone number is required")
    .refine(
      (val) => z.email().safeParse(val).success || phoneRegex.test(val),
      "Invalid email or phone number"
    )
    .transform((val) => {
      const isEmail = z.email().safeParse(val).success;
      return isEmail
        ? { type: "email", value: val }
        : { type: "phone", value: val };
    }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  contact: z
    .string()
    .min(1, "Email or Phone number is required")
    .refine(
      (val) => z.email().safeParse(val).success || phoneRegex.test(val),
      "Invalid email or phone number"
    )
    .transform((val) => {
      const isEmail = z.email().safeParse(val).success;
      return isEmail
        ? { type: "email", value: val }
        : { type: "phoneNumber", value: val };
    }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
