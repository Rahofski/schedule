import z from 'zod';

export const lastNameSchema = z.string().trim().min(1, 'Фамилия обязательна').max(50, 'Фамилия слишком длинная');

export type LastName = z.infer<typeof lastNameSchema>;
