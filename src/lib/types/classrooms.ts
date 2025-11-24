export interface BaseClassRoom {
  id: string;
}

// Интерфейс для пользователя приложения (кнопка "Я" и "Выйти" в приложении)
export interface AppClassRoom extends BaseClassRoom {
  name: string;
}
