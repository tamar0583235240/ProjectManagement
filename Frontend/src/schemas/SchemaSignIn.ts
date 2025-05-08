import { z } from "zod"
export const SchemaSignIn = z.object({
  username: z.string().min(2, { message: "Username must contain at least 2 characters." }),
  password: z.string().min(6, { message: "A password must contain at least 6 characters." }),
})

export type SignInFormData = z.infer<typeof SchemaSignIn>