import { WeekDaysCode } from '../data';
import { AppClass } from './classes';
import { AppSubject } from './subjects';
import { AppLightTeacher } from './teachers';
import { AppClassRoom } from './classrooms';

export interface BaseSchedule {
  id: string;
}

export interface AppSchedule extends BaseSchedule {
  scheduleSlots: ScheduleSlot[];
  name: string;
}

// Участник урока: одна или несколько подгрупп конкретного класса
export interface ScheduleLessonParticipant {
  class: AppClass;
  groupIds?: string[]; // если не указано — участвует весь класс
}

export interface ScheduleLesson {
  id?: string; // Опциональный для создания
  subject: AppSubject;
  // Поддержка нескольких учителей и кабинетов
  teachers: AppLightTeacher[];
  rooms: AppClassRoom[];
  // Участники урока
  participants: ScheduleLessonParticipant[];
}

export interface ScheduleSlot {
  dayOfWeek: WeekDaysCode;
  lessonNumber: number;
  lessons: ScheduleLesson[];
}
