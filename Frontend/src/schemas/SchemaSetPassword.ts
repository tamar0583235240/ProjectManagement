import { z } from "zod";

export const setPasswordSchema = z.object({
  password: z.string().min(6, "הסיסמה חייבת לכלול לפחות 6 תווים"),
  user_name: z.string().min(2, "שם המשתמש חייב להיות לפחות 2 תווים"),
});

export type setPasswordSchema = z.infer<typeof setPasswordSchema>
