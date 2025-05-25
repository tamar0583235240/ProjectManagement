// import { z } from "zod"

// export const addProjectSchema = z.object({
//   projectName: z.string().min(1, "Project name is required"),
//   description: z.string().optional(),
//   manager: z.string().min(1, "Please select a manager"),
//   startDate: z.string().min(1, "Start date is required"),
//   deadline: z.string().min(1, "Deadline is required"),
// })

// export type AddProjectFormData = z.infer<typeof addProjectSchema>

import { z } from "zod"

export const addProjectSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  manager: z.string().min(1, "Please select a manager"),
  startDate: z.string().min(1, "Start date is required"),
  deadline: z.string().min(1, "Deadline is required"),
//   status: z.enum([Status]),
  authorizedUsers: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, "User name is required"),
      email: z.string().email("Invalid email address"),
    })
  ).default([]),
})

export type AddProjectFormData = z.infer<typeof addProjectSchema>

export type AuthorizedUser = {
  id: string;
  name: string;
  email: string;
}