import { z } from "zod";
import { Role } from "../types/Role";

export const inviteUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address"}),
  role: z.enum([Role.TEAMLEADER, Role.EMPLOYEE]),
  teamLeadId: z.string().optional(),
}).refine((data) => {
  if (data.role === Role.EMPLOYEE) {
    return !!data.teamLeadId;  
  }
  return true;  
}, {
  message: "A team leader must be chosen for an employee",
  path: ["teamLeadId"],
});

export type InviteUserInput = z.infer<typeof inviteUserSchema>;
