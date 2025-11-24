import z from 'zod';

// Отчество может быть null в типах, поэтому допускаем пустую строку как null через transform
export const patronymicSchema = z.string().trim().max(50, 'Отчество слишком длинное').nullable();

export type Patronymic = z.infer<typeof patronymicSchema>;
