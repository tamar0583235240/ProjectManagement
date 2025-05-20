import { z } from "zod";

export const addUserSchema = z.object({
  email: z.string().email("אימייל לא תקין"),
  // user_name: z.string().min(2, "שם קצר מדי"),
  role: z.enum(["team_leader", "employee"]),
  team_leader_id: z.string().optional(),
});

export type AddUserFormData = z.infer<typeof addUserSchema>;
