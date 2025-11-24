export function formatFullName(fields: { firstName: string; lastName: string; patronymic?: string | null }): string {
  const { firstName, lastName, patronymic } = fields;

  if (!firstName && !lastName) {
    return '';
  }

  const fullNameParts = [firstName, patronymic, lastName].filter(Boolean);
  return fullNameParts.join(' ').trim();
}
