import { z } from "zod"
export const SchemaSignIn = z.object({
  email: z.string().email({ message: "The email address is invalid." }),
  password: z.string().min(6, { message: "A password must contain at least 6 characters." }),
})

export type SignInFormData = z.infer<typeof SchemaSignIn>