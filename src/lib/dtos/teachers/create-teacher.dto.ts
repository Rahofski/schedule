import z from 'zod';
import { baseTeacherSchema } from './base-teacher.dto';

export const createTeacherSchema = baseTeacherSchema.omit({
  id: true,
});
export type CreateTeacherDto = z.infer<typeof createTeacherSchema>;
