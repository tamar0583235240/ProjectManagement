// import { z } from "zod";

// export const AddEmployeeSchema = z.object({
//   fullName: z.string().min(2, "Please enter full name"),
//   email: z.string().email({ message: "The email address is invalid." }),
//   role: z.enum(["team_leader", "employee"], {
//     required_error: "An employee must be selected"
//   }),
// });

// export type AddEmployeeInput = z.infer<typeof AddEmployeeSchema>;

import { z } from "zod";

export const AddEmployeeSchema = z.object({
  fullName: z.string().min(2, "שם חייב להכיל לפחות 2 תווים"),
  email: z.string().email("אימייל לא תקין"),
  role: z.enum(["team_leader", "employee"]),
  teamLeaderId: z.string().optional(), // חובה רק אם role === "employee"
}).refine(
  (data) => data.role !== "employee" || !!data.teamLeaderId,
  {
    message: "יש לבחור ראש צוות",
    path: ["teamLeaderId"],
  }
);

export type AddEmployeeInput = z.infer<typeof AddEmployeeSchema>;
