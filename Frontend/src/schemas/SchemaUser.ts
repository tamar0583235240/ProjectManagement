import { z } from "zod";

export const AddEmployeeSchema = z.object({
  fullName: z.string().min(2, "Please enter full name"),
  email: z.string().email({ message: "The email address is invalid." }),
  role: z.enum(["team_leader", "employee"], {
    required_error: "An employee must be selected"
  }),
});

export type AddEmployeeInput = z.infer<typeof AddEmployeeSchema>;
