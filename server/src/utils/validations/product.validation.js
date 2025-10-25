import { z } from "zod";
import mongoose from "mongoose";

const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ownerId",
  });

export const createProductSchema = z.object({
  ownerId: objectId,
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional(),
  category: z.string().min(1, "Category is required"),
  price: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Price must be a positive number",
    }),
  media: z
    .array(
      z.object({
        url: z.string().url("Media must be a valid URL"),
        type: z.enum(["image", "video"]),
      })
    )
    .optional(),
  available: z
    .union([z.string(), z.boolean()])
    .transform((val) => {
      if (typeof val === "boolean") return val;
      if (val === "true") return true;
      if (val === "false") return false;
      return Boolean(val);
    })
    .optional()
    .default(true),
  location: z.string().min(1, "Location is required"),
});

export const updateProductSchema = z.object({
  title: z.string().min(3).max(50).optional(),
  description: z.string().max(500).optional(),
  category: z.string().min(1).optional(),
  price: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Price must be a positive number",
    })
    .optional(),
  media: z
    .array(
      z.object({
        url: z.string().url(),
        type: z.enum(["image", "video"]),
      })
    )
    .optional(),
  available: z
    .union([z.string(), z.boolean()])
    .transform((val) => {
      if (typeof val === "boolean") return val;
      if (val === "true") return true;
      if (val === "false") return false;
      return Boolean(val);
    })
    .optional(),
  location: z.string().min(1).optional(),
});
