import { z } from 'zod';
import { Status } from '../types/Status';

export const authorizedUserSchema = z.object({
  id: z.string().optional(), // Temporary form ID
  user_name: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  _id: z.string().optional(), // Actual database ID
});

// export type AuthorizedUserFormData = z.infer<typeof authorizedUserSchema>;

export const editProjectSchema = z.object({
  project_name: z.string().min(1, { message: "שם הפרויקט הוא שדה חובה" }),
  description: z.string().min(1, { message: "תיאור הפרויקט הוא שדה חובה" }),
  status: z.nativeEnum(Status, { 
    required_error: "סטטוס הוא שדה חובה",
    invalid_type_error: "סטטוס לא תקין"
  }),
  deadline: z.string().min(1, { message: "תאריך יעד הוא שדה חובה" })
    .refine((date) => {
      const deadlineDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return deadlineDate >= today;
    }, { message: "תאריך היעד חייב להיות היום או בעתיד" }),
});

export const userValidationSchema = z.object({
  user_name: z.string().min(1, "שם משתמש נדרש"),
  email: z.string().email("כתובת אימייל לא תקינה"),
});

export const addProjectSchema = z.object({
    project_name: z.string().min(1, "Project name is required"),
    description: z.string().optional(),
    project_manager_id: z.string().optional(),
    organization_id: z.string().min(1, "Organization is required"),
    start_date: z.string().min(1, "Start date is required"),
    deadline: z.string().min(1, "Deadline is required"),
    authorized_Users: z.array(
      z.string().regex(/^[0-9a-fA-F]{24}$/, {
        message: "Invalid MongoDB ObjectId",
      })
    ),
    status: z.literal("NOT_STARTED"),
  })
  .refine((data) => {
    const now = new Date();
    const start = new Date(data.start_date);
    return start >= now;
  }, {
    path: ["start_date"],
    message: "Start date must be in the future",
  })
  .refine((data) => {
    const start = new Date(data.start_date);
    const end = new Date(data.deadline);
    return end >= start;
  }, {
    path: ["deadline"],
    message: "Deadline must be after start date",
  });

export type AddProjectFormData = z.infer<typeof addProjectSchema>;
export type AuthorizedUserFormData = AddProjectFormData["authorized_Users"][number];
export type EditProjectFormData = z.infer<typeof editProjectSchema>;
export type UserValidationData = z.infer<typeof userValidationSchema>;