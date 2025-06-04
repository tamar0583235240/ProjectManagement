import { z } from 'zod';

export const TaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof TaskSchema>;