import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  dueDate: z.date(),
  completed: z.boolean(),
});
export const taskTypeResolver = zodResolver(taskSchema);

export type TaskType = z.infer<typeof taskSchema>;

export const taskFormSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'Task name is required',
  }),
  description: z.string().trim().min(1, {
    message: 'Task description is required',
  }),
  dueDate: z.date(),
});
export const taskFormResolver = zodResolver(taskFormSchema);
export type TaskForm = z.infer<typeof taskFormSchema>;
