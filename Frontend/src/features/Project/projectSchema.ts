import { z } from 'zod';

export const projectSchema = z.object({
  project_name: z.string().min(1, { message: "Project name is required" }),
  description: z.string().min(1, { message: "Project description is required" }),
  start_date: z.date({ required_error: "Start date is required" }),
  deadline: z.date({ required_error: "Deadline is required" })
    .refine(date => date > new Date(), { message: "Deadline must be in the future" }),
  status: z.string().min(1, { message: "Status is required" }),
  project_manager_id: z.string().min(1, { message: "Project manager is required" }),
  organization_id: z.string().min(1, { message: "Organization is required" }),
  authorized_Users: z.array(
    z.object({
      _id: z.string().optional(),
      email: z.string().email({ message: "Invalid email address" }),
      user_name: z.string().min(1, { message: "Username is required" }),
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
