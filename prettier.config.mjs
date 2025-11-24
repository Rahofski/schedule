const prettierConfig = {
  // Основные настройки форматирования
  printWidth: 120, // Максимальная длина строки 120 символов
  tabWidth: 2, // Отступ 2 пробела
  useTabs: false, // Используем пробелы, не табы
  semi: true, // Точка с запятой всегда
  singleQuote: true, // Одинарные кавычки для строк
  jsxSingleQuote: true, // Одинарные кавычки в JSX

  // Запятые и скобки
  trailingComma: 'es5', // Запятые в конце только где поддерживается ES5
  bracketSpacing: true, // Пробелы в объектах: { a: 1, b: 2 }
  bracketSameLine: false, // Закрывающая скобка JSX на новой строке

  // Перенос строк и форматирование
  endOfLine: 'lf', // Перевод строки LF
  insertFinalNewline: true, // Обязательный перевод строки в конце файла

  // JSX и HTML
  singleAttributePerLine: true, // Каждый атрибут на новой строке
  htmlWhitespaceSensitivity: 'css',

  // Стрелочные функции
  arrowParens: 'avoid', // Скобки только когда необходимо: x => x

  // Кавычки в объектах
  quoteProps: 'as-needed', // Кавычки только когда необходимо
};

export default prettierConfig;
