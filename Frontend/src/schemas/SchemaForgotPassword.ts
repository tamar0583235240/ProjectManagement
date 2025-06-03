import { z } from "zod";

export const SchemaForgotPassword = z.object({
  email: z.string().email({ message: "Email address is invalid." }),
});

export type ForgotPasswordFormData = z.infer<typeof SchemaForgotPassword>;
