import { employeeIdSchema } from '@/lib/schemas/employees/employees-id.schema';
import { firstNameSchema } from '@/lib/schemas/users/first-name.schema';
import { lastNameSchema } from '@/lib/schemas/users/last-name.schema';
import { patronymicSchema } from '@/lib/schemas/users/patronymic.schema';
import z from 'zod';

export const baseTeacherSchema = z.object({
  id: employeeIdSchema,

  firstName: firstNameSchema,
  lastName: lastNameSchema,
  patronymic: patronymicSchema,
});
export type BaseEmployeeDto = z.infer<typeof baseTeacherSchema>;
