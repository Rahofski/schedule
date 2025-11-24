import z from 'zod';

export const firstNameSchema = z.string().trim().min(1, 'Имя обязательно').max(50, 'Имя слишком длинное');

export type FirstName = z.infer<typeof firstNameSchema>;
