import { registerSchema, loginSchema } from "../validations/auth.validation";

export const validateRegisterField = (name, value) => {
  const fieldSchema = registerSchema.shape[name];
  if (!fieldSchema) return "";

  if (!value) return "";

  const result = fieldSchema.safeParse(value);
  if (!result.success) {
    return result.error.issues[0].message;
  }

  return "";
};

export const validateLoginField = (name, value) => {
  const fieldSchema = loginSchema.shape[name];
  if (!fieldSchema) return "";

  if (!value) return "";

  const result = fieldSchema.safeParse(value);
  if (!result.success) {
    return result.error.issues[0].message;
  }

  return "";
};
