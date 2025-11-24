import { AppSubject } from './subjects';
import { AppLightTeacher } from './teachers';

export interface BaseClass {
  id: string;
}

// Подгруппа класса (для предметов с делением)
export interface AppClassGroup {
  id: string;
  name: string; // например: "Группа 1", "Группа 2"
  size?: number; // необязательное поле, количество учащихся
}

// Интерфейс для пользователя приложения (кнопка "Я" и "Выйти" в приложении)
export interface AppClass extends BaseClass {
  name: string;
  subjects: {
    subject: AppSubject;
    hoursPerWeek: number;
    // Политика деления по предмету (если требуется)
    split?: {
      groupsCount: number; // например, 2 для английского языка
      crossClassAllowed?: boolean; // можно ли смешивать группы с другими классами
    };
  }[];
  classTeacher: AppLightTeacher | null;
  // Набор подгрупп, общих для класса (могут использоваться в разных предметах)
  groups?: AppClassGroup[];
}
