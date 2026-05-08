import { z } from 'zod';

export const userUpdateSchema = z.object({
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional(),
  establishment: z.string().max(255).optional(),
  sector: z.string().max(255).optional(),
  studyLevel: z.string().max(255).optional(),
});

export type UserUpdate = z.infer<typeof userUpdateSchema>;
