<<<<<<< HEAD
import { z } from "zod";
import { Role } from "../enums/role.enum";

export const addUserSchema = z.object({
  email: z.string().email("אימייל לא תקין"),
  role: z.nativeEnum(Role), 
  team_leader_id: z.string().optional(),
=======

import * as z from "zod";

export const addUserSchema = z.object({
  email: z.string().email("כתובת אימייל לא תקינה"),
  role: z.enum(["team_leader", "employee"]),
  teamLeaderId: z.string().optional(),
>>>>>>> e1279ad04300b99e5bf619a26308f9d34fbdb02c
});
