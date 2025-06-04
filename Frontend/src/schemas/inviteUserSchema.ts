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
