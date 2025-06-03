// schemas/SchemaResetPassword.ts
import { z } from "zod";

export const SchemaResetPassword = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
});

export type ResetPasswordFormData = z.infer<typeof SchemaResetPassword>;

export const passwordMatchRefinement = SchemaResetPassword.refine(
  (data) => data.password === data.confirmPassword,
  { message: "Passwords do not match", path: ["confirmPassword"] }
);
