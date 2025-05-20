import { z } from "zod";
import { Role } from "../enums/role.enum";

export const addUserSchema = z.object({
  email: z.string().email("אימייל לא תקין"),
  role: z.nativeEnum(Role), 
  team_leader_id: z.string().optional(),
});

export type AddUserFormData = z.infer<typeof addUserSchema>;
