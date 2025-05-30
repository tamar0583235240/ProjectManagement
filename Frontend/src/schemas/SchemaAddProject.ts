// import { z } from "zod"
// export const addProjectSchema = z.object({
//   projectName: z.string().min(1, "Project name is required"),
//   description: z.string().optional(),
//   manager: z.string().min(1, "Please select a manager"),
//   startDate: z.string().min(1, "Start date is required"),
//   deadline: z.string().min(1, "Deadline is required"),
//   authorizedUsers: z.array(
//     z.object({
//       id: z.string(),
//       name: z.string().min(1, "User name is required"),
//       email: z.string().email("Invalid email address"),
//     })
//   ).default([]),
// })

// export type AddProjectFormData = z.infer<typeof addProjectSchema>

// export type AuthorizedUser = {
//   id: string;
//   name: string;
//   email: string;
// }


// src/schemas/ProjectSchemas.ts
import { z } from 'zod';
import { Status } from '../types/Status';

// Schema for authorized user in form
export const authorizedUserSchema = z.object({
  id: z.string().optional(), // Temporary form ID
  user_name: z.string().min(1, { message: "שם משתמש הוא שדה חובה" }),
  email: z.string().email({ message: "כתובת אימייל לא תקינה" }),
  _id: z.string().optional(), // Actual database ID
});

// Schema for adding a new project
export const addProjectSchema = z.object({
  project_name: z.string().min(1, { message: "שם הפרויקט הוא שדה חובה" }),
  description: z.string().min(1, { message: "תיאור הפרויקט הוא שדה חובה" }),
  start_date: z.string().min(1, { message: "תאריך התחלה הוא שדה חובה" }),
  deadline: z.string().min(1, { message: "תאריך יעד הוא שדה חובה" })
    .refine((date) => {
      const deadlineDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return deadlineDate >= today;
    }, { message: "תאריך היעד חייב להיות היום או בעתיד" }),
  project_manager_id: z.string().min(1, { message: "מנהל פרויקט הוא שדה חובה" }),
  organization_id: z.string().min(1, { message: "ארגון הוא שדה חובה" }),
  authorized_Users: z.array(authorizedUserSchema).default([]),
});

// Schema for editing a project
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

// Schema for user validation
export const userValidationSchema = z.object({
  user_name: z.string().min(1, "שם משתמש נדרש"),
  email: z.string().email("כתובת אימייל לא תקינה"),
});

export type AddProjectFormData = z.infer<typeof addProjectSchema>;
export type EditProjectFormData = z.infer<typeof editProjectSchema>;
export type AuthorizedUserFormData = z.infer<typeof authorizedUserSchema>;
export type UserValidationData = z.infer<typeof userValidationSchema>;