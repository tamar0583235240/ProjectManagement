
import * as z from "zod";

export const addUserSchema = z.object({
  email: z.string().email("כתובת אימייל לא תקינה"),
  role: z.enum(["team_leader", "employee"]),
  teamLeaderId: z.string().optional(),
});
