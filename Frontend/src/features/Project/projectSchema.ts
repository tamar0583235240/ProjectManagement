import { z } from 'zod';

export const projectSchema = z.object({
  project_name: z.string().min(1, { message: "שם הפרויקט הוא שדה חובה" }),
  description: z.string().min(1, { message: "תיאור הפרויקט הוא שדה חובה" }),
  start_date: z.date({ required_error: "תאריך התחלה הוא שדה חובה" }),
  deadline: z.date({ required_error: "תאריך יעד הוא שדה חובה" })
  .refine(date => date > new Date(), { message: "תאריך היעד חייב להיות בעתיד" }),
  status: z.string().min(1, { message: "סטטוס הוא שדה חובה" }),
  project_manager_id: z.string().min(1, { message: "מנהל פרויקט הוא שדה חובה" }),
  organization_id: z.string().min(1, { message: "ארגון הוא שדה חובה" }),
  authorized_Users: z.array(
    z.object({
      _id: z.string().optional(),
      email: z.string().email({ message: "כתובת אימייל לא תקינה" }),
      user_name: z.string().min(1, { message: "שם משתמש הוא שדה חובה" }),
    })
  ).default([]),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

export const authorizedUserSchema = z.object({
  id: z.string().uuid(),
  user_name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

export type AuthorizedUserFormData = z.infer<typeof authorizedUserSchema>;

export const addProjectSchema = z.object({
  project_name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  project_manager_id: z.string().min(1, "Project manager is required"),
  organization_id: z.string().min(1, "Organization ID is required"),
  start_date: z.string().min(1, "Start date is required"),
  deadline: z.string().min(1, "Deadline is required"),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
  authorized_Users: z.array(authorizedUserSchema),
});

export type AddProjectFormData = z.infer<typeof addProjectSchema>;
