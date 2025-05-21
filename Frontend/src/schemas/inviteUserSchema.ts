// // src/features/users/schemas/inviteUserSchema.ts
// import { z } from 'zod';

// export const inviteUserSchema = z.object({
//   fullName: z.string().optional(), // למילוי אחרי במייל
//   email: z.string().email(),
//   role: z.enum(['team_lead', 'employee']),
//   teamLeadId: z.string().optional(), // חובה אם זה עובד
// });
import { z } from "zod";

export const inviteUserSchema = z.object({
  email: z.string().email({ message: "כתובת אימייל לא תקינה" }),
  role: z.enum(["team_lead", "employee"]),
  teamLeadId: z.string().optional(),
}).refine((data) => {
  // אם התפקיד הוא עובד, חייב לבחור ראש צוות
  if (data.role === "employee") {
    return !!data.teamLeadId;
  }
  return true;
}, {
  message: "יש לבחור ראש צוות עבור עובד",
  path: ["teamLeadId"],
});
