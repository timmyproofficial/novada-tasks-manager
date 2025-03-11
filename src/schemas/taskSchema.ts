import { z } from 'zod';
import { TaskPriority, TaskStatus, TaskType } from '../context/TaskContext';

// Define the schema for person/assignee
const personSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string(),
});

export const taskFormSchema = z.object({
  name: z.string().min(1, { message: 'Task name is required' }),
  description: z.string().optional().default(''),
  startDate: z.date(),
  dueDate: z.date(),
  type: z.enum(['Dashboard', 'Mobile App'] as const),
  priority: z.enum(['Low', 'Medium', 'High'] as const),
  assignees: z.array(personSchema),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
