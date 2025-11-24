import z from 'zod';

// Employee ID: простая непустая строка (UUID/cuid/произвольный id)
export const employeeIdSchema = z.string().min(1, 'Идентификатор не может быть пустым');

export type EmployeeId = z.infer<typeof employeeIdSchema>;
