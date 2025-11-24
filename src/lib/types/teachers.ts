import { AppClass } from './classes';
import { AppClassRoom } from './classrooms';
import { AppSubject } from './subjects';

export interface BaseUser {
  id: string;
}

// Интерфейс для пользователя приложения (кнопка "Я" и "Выйти" в приложении)
export interface AppUser extends BaseUser {
  firstName: string;
  lastName: string;
  patronymic: string | null;

  email: string;
  phone: string;
}

export interface BaseTeacher extends Omit<AppUser, 'email' | 'phone'> {
  subjects: {
    subject: AppSubject;
    hoursPerWeek: number | null;
  }[];
  classRoom: AppClassRoom;
  class: AppClass;
  workloadHoursPerWeek: number;
  classHours: {
    class: AppClass;
    subject: AppSubject;
    // если учитель закреплён за конкретной подгруппой
    groupId?: string;
    hours: number;
  }[];
}

export interface AppLightTeacher
  extends Omit<BaseTeacher, 'classRoom' | 'class' | 'workloadHoursPerWeek' | 'classHours' | 'subjects'> {}
