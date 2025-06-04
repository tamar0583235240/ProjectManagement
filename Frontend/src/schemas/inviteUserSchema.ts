// // src/features/users/schemas/inviteUserSchema.ts
// import { z } from 'zod';

// export const inviteUserSchema = z.object({
//   fullName: z.string().optional(), // למילוי אחרי במייל
//   email: z.string().email(),
//   role: z.enum(['team_lead', 'employee']),
//   teamLeadId: z.string().optional(), // חובה אם זה עובד
// });
// import { z } from "zod";
// import { Role } from "../enums/role.enum";

// export const inviteUserSchema = z.object({
//   email: z.string().email({ message: "כתובת אימייל לא תקינה" }),
//   role: z.enum([Role.EMPLOYEE, Role.TEAM_LEADER]),
//   teamLeadId: z.string().optional(),
// }).refine((data) => {
//   // אם התפקיד הוא עובד, חייב לבחור ראש צוות
//   if (data.role === Role.EMPLOYEE) {
//     return !!data.teamLeadId;
//   }
//   return true;
// }, {
//   message: "יש לבחור ראש צוות עבור עובד",
//   path: ["teamLeadId"],
// });
import { z } from "zod";
import { Role } from "../types/Role";

export const inviteUserSchema = z.object({
  email: z.string().email({ message: "כתובת אימייל לא תקינה" }),
  role: z.enum([Role.TEAMLEADER, Role.EMPLOYEE]),
  teamLeadId: z.string().optional(),
}).refine((data) => {
  if (data.role === Role.EMPLOYEE) {
    return !!data.teamLeadId;  // עובד חייב לבחור ראש צוות
  }
  return true;  // ראש צוות לא חייב
}, {
  message: "יש לבחור ראש צוות עבור עובד",
  path: ["teamLeadId"],
});

export type InviteUserInput = z.infer<typeof inviteUserSchema>;
