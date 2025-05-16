// src/features/auth/schemas/setPasswordSchema.ts
import { z } from "zod";

export const setPasswordSchema = z.object({
  user_name: z.string().min(2, "יש להזין שם משתמש"),
  password: z.string().min(6, "הסיסמה חייבת להכיל לפחות 6 תווים"),
});
