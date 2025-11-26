export function formatFullName(fields: { firstName: string; lastName: string; patronymic?: string | null }): string {
  const { firstName, lastName, patronymic } = fields;

  // Фильтруем пустые значения
  const fullNameParts = [lastName, firstName, patronymic].filter(part => part && part.trim() !== '');

  // Если все части пустые, возвращаем заглушку
  if (fullNameParts.length === 0) {
    return '(Без имени)';
  }

  return fullNameParts.join(' ').trim();
}
