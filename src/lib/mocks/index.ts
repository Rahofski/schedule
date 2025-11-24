import { AppSubject } from '../types/subjects';
import { AppClass } from '../types/classes';
import { AppClassRoom } from '../types/classrooms';
import { BaseTeacher, AppLightTeacher } from '../types/teachers';
import { ScheduleSlot } from '../types/schedule';
import { WeekDaysCode } from '../data';

// Моки предметов
export const mockSubjects: AppSubject[] = [
  { id: '1', name: 'Математика' },
  { id: '2', name: 'Русский язык' },
  { id: '3', name: 'Литература' },
  { id: '4', name: 'История' },
  { id: '5', name: 'Обществознание' },
  { id: '6', name: 'География' },
  { id: '7', name: 'Биология' },
  { id: '8', name: 'Химия' },
  { id: '9', name: 'Физика' },
  { id: '10', name: 'Информатика' },
  { id: '11', name: 'Английский язык' },
  { id: '12', name: 'Физическая культура' },
  { id: '13', name: 'ОБЖ' },
  { id: '14', name: 'Музыка' },
  { id: '15', name: 'ИЗО' },
  { id: '16', name: 'Технология' },
];

// Моки легких учителей (без кабинета, класса, нагрузки и часов по классам)
export const mockLightTeachers: AppLightTeacher[] = [
  {
    id: '1',
    firstName: 'Анна',
    lastName: 'Иванова',
    patronymic: 'Петровна',
  },
  {
    id: '2',
    firstName: 'Мария',
    lastName: 'Петрова',
    patronymic: 'Александровна',
  },
  {
    id: '3',
    firstName: 'Сергей',
    lastName: 'Смирнов',
    patronymic: 'Викторович',
  },
  {
    id: '4',
    firstName: 'Елена',
    lastName: 'Козлова',
    patronymic: 'Дмитриевна',
  },
  {
    id: '5',
    firstName: 'Дмитрий',
    lastName: 'Волков',
    patronymic: 'Андреевич',
  },
  {
    id: '6',
    firstName: 'Ольга',
    lastName: 'Новикова',
    patronymic: 'Сергеевна',
  },
  {
    id: '7',
    firstName: 'Максим',
    lastName: 'Кузнецов',
    patronymic: 'Игоревич',
  },
];

// Моки классов
export const mockClasses: AppClass[] = [
  {
    id: '1',
    name: '5А',
    subjects: [
      { subject: mockSubjects[0], hoursPerWeek: 5 }, // Математика
      { subject: mockSubjects[1], hoursPerWeek: 5 }, // Русский язык
      { subject: mockSubjects[2], hoursPerWeek: 3 }, // Литература
      { subject: mockSubjects[3], hoursPerWeek: 2 }, // История
      {
        subject: mockSubjects[10],
        hoursPerWeek: 3,
        split: { groupsCount: 2 }, // Английский язык делится на 2 группы
      },
    ],
    classTeacher: mockLightTeachers[0], // Анна Иванова
    groups: [
      { id: 'g1', name: 'Группа 1', size: 12 },
      { id: 'g2', name: 'Группа 2', size: 13 },
    ],
  },
  {
    id: '2',
    name: '5Б',
    subjects: [
      { subject: mockSubjects[0], hoursPerWeek: 5 }, // Математика
      { subject: mockSubjects[1], hoursPerWeek: 4 }, // Русский язык
      { subject: mockSubjects[2], hoursPerWeek: 3 }, // Литература
      { subject: mockSubjects[3], hoursPerWeek: 2 }, // История
      { subject: mockSubjects[10], hoursPerWeek: 3 }, // Английский язык
    ],
    classTeacher: mockLightTeachers[1], // Мария Петрова
  },
  {
    id: '3',
    name: '6А',
    subjects: [
      { subject: mockSubjects[0], hoursPerWeek: 5 }, // Математика
      { subject: mockSubjects[1], hoursPerWeek: 4 }, // Русский язык
      { subject: mockSubjects[2], hoursPerWeek: 2 }, // Литература
      { subject: mockSubjects[3], hoursPerWeek: 2 }, // История
      { subject: mockSubjects[6], hoursPerWeek: 2 }, // Биология
      { subject: mockSubjects[10], hoursPerWeek: 3 }, // Английский язык
    ],
    classTeacher: mockLightTeachers[2], // Сергей Смирнов
  },
  {
    id: '4',
    name: '6Б',
    subjects: [
      { subject: mockSubjects[0], hoursPerWeek: 5 }, // Математика
      { subject: mockSubjects[1], hoursPerWeek: 4 }, // Русский язык
      { subject: mockSubjects[2], hoursPerWeek: 2 }, // Литература
      { subject: mockSubjects[3], hoursPerWeek: 2 }, // История
      { subject: mockSubjects[6], hoursPerWeek: 2 }, // Биология
      { subject: mockSubjects[10], hoursPerWeek: 3 }, // Английский язык
    ],
    classTeacher: mockLightTeachers[3], // Елена Козлова
  },
  {
    id: '5',
    name: '7А',
    subjects: [
      { subject: mockSubjects[0], hoursPerWeek: 4 }, // Математика
      { subject: mockSubjects[1], hoursPerWeek: 4 }, // Русский язык
      { subject: mockSubjects[2], hoursPerWeek: 2 }, // Литература
      { subject: mockSubjects[3], hoursPerWeek: 2 }, // История
      { subject: mockSubjects[6], hoursPerWeek: 2 }, // Биология
      { subject: mockSubjects[8], hoursPerWeek: 2 }, // Физика
      { subject: mockSubjects[10], hoursPerWeek: 3 }, // Английский язык
    ],
    classTeacher: mockLightTeachers[4], // Дмитрий Волков
  },
  {
    id: '6',
    name: '7Б',
    subjects: [
      { subject: mockSubjects[0], hoursPerWeek: 4 }, // Математика
      { subject: mockSubjects[1], hoursPerWeek: 4 }, // Русский язык
      { subject: mockSubjects[2], hoursPerWeek: 2 }, // Литература
      { subject: mockSubjects[3], hoursPerWeek: 2 }, // История
      { subject: mockSubjects[6], hoursPerWeek: 2 }, // Биология
      { subject: mockSubjects[8], hoursPerWeek: 2 }, // Физика
      { subject: mockSubjects[10], hoursPerWeek: 3 }, // Английский язык
    ],
    classTeacher: mockLightTeachers[5], // Ольга Новикова
  },
  {
    id: '7',
    name: '8А',
    subjects: [
      { subject: mockSubjects[0], hoursPerWeek: 4 }, // Математика
      { subject: mockSubjects[1], hoursPerWeek: 3 }, // Русский язык
      { subject: mockSubjects[2], hoursPerWeek: 2 }, // Литература
      { subject: mockSubjects[3], hoursPerWeek: 2 }, // История
      { subject: mockSubjects[7], hoursPerWeek: 2 }, // Химия
      { subject: mockSubjects[8], hoursPerWeek: 2 }, // Физика
      { subject: mockSubjects[10], hoursPerWeek: 3 }, // Английский язык
    ],
    classTeacher: mockLightTeachers[0], // Анна Иванова (может быть классным руководителем нескольких классов)
  },
  {
    id: '8',
    name: '8Б',
    subjects: [
      { subject: mockSubjects[0], hoursPerWeek: 4 }, // Математика
      { subject: mockSubjects[1], hoursPerWeek: 3 }, // Русский язык
      { subject: mockSubjects[2], hoursPerWeek: 2 }, // Литература
      { subject: mockSubjects[3], hoursPerWeek: 2 }, // История
      { subject: mockSubjects[7], hoursPerWeek: 2 }, // Химия
      { subject: mockSubjects[8], hoursPerWeek: 2 }, // Физика
      { subject: mockSubjects[10], hoursPerWeek: 3 }, // Английский язык
    ],
    classTeacher: mockLightTeachers[1], // Мария Петрова
  },
  {
    id: '9',
    name: '9А',
    subjects: [
      { subject: mockSubjects[0], hoursPerWeek: 4 }, // Математика
      { subject: mockSubjects[1], hoursPerWeek: 3 }, // Русский язык
      { subject: mockSubjects[2], hoursPerWeek: 3 }, // Литература
      { subject: mockSubjects[3], hoursPerWeek: 3 }, // История
      { subject: mockSubjects[7], hoursPerWeek: 2 }, // Химия
      { subject: mockSubjects[8], hoursPerWeek: 3 }, // Физика
      { subject: mockSubjects[10], hoursPerWeek: 3 }, // Английский язык
    ],
    classTeacher: mockLightTeachers[2], // Сергей Смирнов
  },
  {
    id: '10',
    name: '9Б',
    subjects: [
      { subject: mockSubjects[0], hoursPerWeek: 4 }, // Математика
      { subject: mockSubjects[1], hoursPerWeek: 3 }, // Русский язык
      { subject: mockSubjects[2], hoursPerWeek: 3 }, // Литература
      { subject: mockSubjects[3], hoursPerWeek: 3 }, // История
      { subject: mockSubjects[7], hoursPerWeek: 2 }, // Химия
      { subject: mockSubjects[8], hoursPerWeek: 3 }, // Физика
      { subject: mockSubjects[10], hoursPerWeek: 3 }, // Английский язык
    ],
    classTeacher: mockLightTeachers[3], // Елена Козлова
  },
  {
    id: '11',
    name: '10А',
    subjects: [
      { subject: mockSubjects[0], hoursPerWeek: 4 }, // Математика
      { subject: mockSubjects[1], hoursPerWeek: 3 }, // Русский язык
      { subject: mockSubjects[2], hoursPerWeek: 3 }, // Литература
      { subject: mockSubjects[3], hoursPerWeek: 2 }, // История
      {
        subject: mockSubjects[6],
        hoursPerWeek: 2,
        split: { groupsCount: 2, crossClassAllowed: true }, // Биология с возможностью скрещивания классов
      },
      {
        subject: mockSubjects[9],
        hoursPerWeek: 2,
        split: { groupsCount: 2, crossClassAllowed: true }, // Информатика с возможностью скрещивания классов
      },
      { subject: mockSubjects[8], hoursPerWeek: 2 }, // Физика
      { subject: mockSubjects[10], hoursPerWeek: 3 }, // Английский язык
    ],
    classTeacher: mockLightTeachers[4], // Дмитрий Волков
    groups: [
      { id: 'g10a1', name: 'Группа А', size: 14 },
      { id: 'g10a2', name: 'Группа Б', size: 14 },
    ],
  },
  {
    id: '12',
    name: '10Б',
    subjects: [
      { subject: mockSubjects[0], hoursPerWeek: 4 }, // Математика
      { subject: mockSubjects[1], hoursPerWeek: 3 }, // Русский язык
      { subject: mockSubjects[2], hoursPerWeek: 3 }, // Литература
      { subject: mockSubjects[3], hoursPerWeek: 2 }, // История
      {
        subject: mockSubjects[6],
        hoursPerWeek: 2,
        split: { groupsCount: 2, crossClassAllowed: true }, // Биология с возможностью скрещивания классов
      },
      {
        subject: mockSubjects[9],
        hoursPerWeek: 2,
        split: { groupsCount: 2, crossClassAllowed: true }, // Информатика с возможностью скрещивания классов
      },
      { subject: mockSubjects[8], hoursPerWeek: 2 }, // Физика
      { subject: mockSubjects[10], hoursPerWeek: 3 }, // Английский язык
    ],
    classTeacher: mockLightTeachers[5], // Ольга Новикова
    groups: [
      { id: 'g10b1', name: 'Группа А', size: 13 },
      { id: 'g10b2', name: 'Группа Б', size: 15 },
    ],
  },
  {
    id: '13',
    name: '11А',
    subjects: [
      { subject: mockSubjects[0], hoursPerWeek: 4 }, // Математика
      { subject: mockSubjects[1], hoursPerWeek: 3 }, // Русский язык
      { subject: mockSubjects[2], hoursPerWeek: 3 }, // Литература
      { subject: mockSubjects[3], hoursPerWeek: 2 }, // История
      { subject: mockSubjects[8], hoursPerWeek: 2 }, // Физика
      { subject: mockSubjects[10], hoursPerWeek: 3 }, // Английский язык
    ],
    classTeacher: null, // Без классного руководителя
  },
  {
    id: '14',
    name: '11Б',
    subjects: [
      { subject: mockSubjects[0], hoursPerWeek: 4 }, // Математика
      { subject: mockSubjects[1], hoursPerWeek: 3 }, // Русский язык
      { subject: mockSubjects[2], hoursPerWeek: 3 }, // Литература
      { subject: mockSubjects[3], hoursPerWeek: 2 }, // История
      { subject: mockSubjects[8], hoursPerWeek: 2 }, // Физика
      { subject: mockSubjects[10], hoursPerWeek: 3 }, // Английский язык
    ],
    classTeacher: mockLightTeachers[6], // Максим Кузнецов
  },
];

// Моки кабинетов
export const mockClassrooms: AppClassRoom[] = [
  { id: '1', name: '101' },
  { id: '2', name: '102' },
  { id: '3', name: '103' },
  { id: '4', name: '104' },
  { id: '5', name: '105' },
  { id: '6', name: '201' },
  { id: '7', name: '202' },
  { id: '8', name: '203' },
  { id: '9', name: '204' },
  { id: '10', name: '205' },
  { id: '11', name: 'Спортзал' },
  { id: '12', name: 'Актовый зал' },
  { id: '13', name: 'Библиотека' },
  { id: '14', name: 'Компьютерный класс' },
  { id: '15', name: 'Лаборатория химии' },
  { id: '16', name: 'Лаборатория физики' },
];

// Моки учителей
export const mockTeachers: BaseTeacher[] = [
  {
    id: '1',
    firstName: 'Анна',
    lastName: 'Иванова',
    patronymic: 'Петровна',
    workloadHoursPerWeek: 30,
    subjects: [
      { subject: mockSubjects[0], hoursPerWeek: 20 }, // Математика - 20 часов всего
      { subject: mockSubjects[9], hoursPerWeek: 10 }, // Информатика - 10 часов всего
    ],
    class: mockClasses[0], // 5А
    classRoom: mockClassrooms[0], // 101
    classHours: [
      // Математика
      { class: mockClasses[0], subject: mockSubjects[0], hours: 5 }, // 5А - 5 часов
      { class: mockClasses[1], subject: mockSubjects[0], hours: 5 }, // 5Б - 5 часов
      { class: mockClasses[2], subject: mockSubjects[0], hours: 5 }, // 6А - 5 часов
      { class: mockClasses[3], subject: mockSubjects[0], hours: 5 }, // 6Б - 5 часов
      // Информатика
      { class: mockClasses[6], subject: mockSubjects[9], hours: 5 }, // 8А - 5 часов
      { class: mockClasses[7], subject: mockSubjects[9], hours: 5 }, // 8Б - 5 часов
    ],
  },
  {
    id: '2',
    firstName: 'Мария',
    lastName: 'Петрова',
    patronymic: 'Александровна',
    workloadHoursPerWeek: 25,
    subjects: [
      { subject: mockSubjects[1], hoursPerWeek: 15 }, // Русский язык - 15 часов всего
      { subject: mockSubjects[2], hoursPerWeek: 10 }, // Литература - 10 часов всего
    ],
    class: mockClasses[1], // 5Б
    classRoom: mockClassrooms[1], // 102
    classHours: [
      // Русский язык
      { class: mockClasses[0], subject: mockSubjects[1], hours: 4 }, // 5А - 4 часа
      { class: mockClasses[1], subject: mockSubjects[1], hours: 4 }, // 5Б - 4 часа
      { class: mockClasses[2], subject: mockSubjects[1], hours: 4 }, // 6А - 4 часа
      { class: mockClasses[3], subject: mockSubjects[1], hours: 3 }, // 6Б - 3 часа
      // Литература
      { class: mockClasses[0], subject: mockSubjects[2], hours: 3 }, // 5А - 3 часа
      { class: mockClasses[1], subject: mockSubjects[2], hours: 3 }, // 5Б - 3 часа
      { class: mockClasses[2], subject: mockSubjects[2], hours: 2 }, // 6А - 2 часа
      { class: mockClasses[3], subject: mockSubjects[2], hours: 2 }, // 6Б - 2 часа
    ],
  },
  {
    id: '3',
    firstName: 'Сергей',
    lastName: 'Смирнов',
    patronymic: 'Викторович',
    workloadHoursPerWeek: 20,
    subjects: [
      { subject: mockSubjects[3], hoursPerWeek: 12 }, // История - 12 часов всего
      { subject: mockSubjects[4], hoursPerWeek: 8 }, // Обществознание - 8 часов всего
    ],
    class: mockClasses[2], // 6А
    classRoom: mockClassrooms[2], // 103
    classHours: [
      // История
      { class: mockClasses[0], subject: mockSubjects[3], hours: 2 }, // 5А - 2 часа
      { class: mockClasses[1], subject: mockSubjects[3], hours: 2 }, // 5Б - 2 часа
      { class: mockClasses[2], subject: mockSubjects[3], hours: 2 }, // 6А - 2 часа
      { class: mockClasses[3], subject: mockSubjects[3], hours: 2 }, // 6Б - 2 часа
      { class: mockClasses[4], subject: mockSubjects[3], hours: 2 }, // 7А - 2 часа
      { class: mockClasses[5], subject: mockSubjects[3], hours: 2 }, // 7Б - 2 часа
      // Обществознание
      { class: mockClasses[6], subject: mockSubjects[4], hours: 2 }, // 8А - 2 часа
      { class: mockClasses[7], subject: mockSubjects[4], hours: 2 }, // 8Б - 2 часа
      { class: mockClasses[8], subject: mockSubjects[4], hours: 2 }, // 9А - 2 часа
      { class: mockClasses[9], subject: mockSubjects[4], hours: 2 }, // 9Б - 2 часа
    ],
  },
  {
    id: '4',
    firstName: 'Елена',
    lastName: 'Козлова',
    patronymic: 'Дмитриевна',
    workloadHoursPerWeek: 24,
    subjects: [
      { subject: mockSubjects[6], hoursPerWeek: 12 }, // Биология - 12 часов всего
      { subject: mockSubjects[7], hoursPerWeek: 12 }, // Химия - 12 часов всего
    ],
    class: mockClasses[3], // 6Б
    classRoom: mockClassrooms[14], // Лаборатория химии
    classHours: [
      // Биология
      { class: mockClasses[2], subject: mockSubjects[6], hours: 2 }, // 6А - 2 часа
      { class: mockClasses[3], subject: mockSubjects[6], hours: 2 }, // 6Б - 2 часа
      { class: mockClasses[4], subject: mockSubjects[6], hours: 2 }, // 7А - 2 часа
      { class: mockClasses[5], subject: mockSubjects[6], hours: 2 }, // 7Б - 2 часа
      { class: mockClasses[8], subject: mockSubjects[6], hours: 2 }, // 9А - 2 часа
      { class: mockClasses[9], subject: mockSubjects[6], hours: 2 }, // 9Б - 2 часа
      // Химия
      { class: mockClasses[6], subject: mockSubjects[7], hours: 2 }, // 8А - 2 часа
      { class: mockClasses[7], subject: mockSubjects[7], hours: 2 }, // 8Б - 2 часа
      { class: mockClasses[8], subject: mockSubjects[7], hours: 2 }, // 9А - 2 часа
      { class: mockClasses[9], subject: mockSubjects[7], hours: 2 }, // 9Б - 2 часа
      { class: mockClasses[10], subject: mockSubjects[7], hours: 2 }, // 10А - 2 часа
      { class: mockClasses[11], subject: mockSubjects[7], hours: 2 }, // 10Б - 2 часа
    ],
  },
  {
    id: '5',
    firstName: 'Дмитрий',
    lastName: 'Волков',
    patronymic: 'Андреевич',
    workloadHoursPerWeek: 18,
    subjects: [
      { subject: mockSubjects[8], hoursPerWeek: 18 }, // Физика - 18 часов всего
    ],
    class: mockClasses[4], // 7А
    classRoom: mockClassrooms[15], // Лаборатория физики
    classHours: [
      // Физика
      { class: mockClasses[4], subject: mockSubjects[8], hours: 2 }, // 7А - 2 часа
      { class: mockClasses[5], subject: mockSubjects[8], hours: 2 }, // 7Б - 2 часа
      { class: mockClasses[6], subject: mockSubjects[8], hours: 2 }, // 8А - 2 часа
      { class: mockClasses[7], subject: mockSubjects[8], hours: 2 }, // 8Б - 2 часа
      { class: mockClasses[8], subject: mockSubjects[8], hours: 3 }, // 9А - 3 часа
      { class: mockClasses[9], subject: mockSubjects[8], hours: 3 }, // 9Б - 3 часа
      { class: mockClasses[10], subject: mockSubjects[8], hours: 2 }, // 10А - 2 часа
      { class: mockClasses[11], subject: mockSubjects[8], hours: 2 }, // 10Б - 2 часа
    ],
  },
  {
    id: '6',
    firstName: 'Ольга',
    lastName: 'Новикова',
    patronymic: 'Сергеевна',
    workloadHoursPerWeek: 21,
    subjects: [
      { subject: mockSubjects[10], hoursPerWeek: 21 }, // Английский язык - 21 час всего
    ],
    class: mockClasses[5], // 7Б
    classRoom: mockClassrooms[3], // 104
    classHours: [
      // Английский язык
      { class: mockClasses[0], subject: mockSubjects[10], hours: 3 }, // 5А - 3 часа
      { class: mockClasses[1], subject: mockSubjects[10], hours: 3 }, // 5Б - 3 часа
      { class: mockClasses[2], subject: mockSubjects[10], hours: 3 }, // 6А - 3 часа
      { class: mockClasses[3], subject: mockSubjects[10], hours: 3 }, // 6Б - 3 часа
      { class: mockClasses[4], subject: mockSubjects[10], hours: 3 }, // 7А - 3 часа
      { class: mockClasses[5], subject: mockSubjects[10], hours: 3 }, // 7Б - 3 часа
      { class: mockClasses[6], subject: mockSubjects[10], hours: 3 }, // 8А - 3 часа
    ],
  },
  {
    id: '7',
    firstName: 'Максим',
    lastName: 'Кузнецов',
    patronymic: 'Игоревич',
    workloadHoursPerWeek: 21,
    subjects: [
      { subject: mockSubjects[1], hoursPerWeek: 20 }, // Русский язык - 20 часов всего
    ],
    class: mockClasses[5], // 7Б
    classRoom: mockClassrooms[3], // 104
    classHours: [
      // Русский язык
      { class: mockClasses[0], subject: mockSubjects[1], hours: 0 }, // 5А - 0 часов
    ],
  },
];

// Моки расписания

export const mockSchedule: ScheduleSlot[] = [
  // Понедельник
  {
    dayOfWeek: WeekDaysCode.MONDAY,
    lessonNumber: 1,
    lessons: [
      {
        id: '1',
        subject: mockSubjects[0], // Математика
        teachers: [mockLightTeachers[0]], // Анна Иванова
        rooms: [mockClassrooms[0]], // 101
        participants: [{ class: mockClasses[0] }], // 5А
      },
      {
        id: '2',
        subject: mockSubjects[1], // Русский язык
        teachers: [mockLightTeachers[1]], // Мария Петрова
        rooms: [mockClassrooms[1]], // 102
        participants: [{ class: mockClasses[1] }], // 5Б
      },
    ],
  },
  {
    dayOfWeek: WeekDaysCode.MONDAY,
    lessonNumber: 2,
    lessons: [
      {
        id: '3',
        subject: mockSubjects[1], // Русский язык
        teachers: [mockLightTeachers[1]], // Мария Петрова
        rooms: [mockClassrooms[1]], // 102
        participants: [{ class: mockClasses[0] }], // 5А
      },
      // Пример деления на группы для английского языка
      {
        id: '4',
        subject: mockSubjects[10], // Английский язык
        teachers: [mockLightTeachers[2]], // Сергей Смирнов
        rooms: [mockClassrooms[2]], // 103
        participants: [{ class: mockClasses[0], groupIds: ['g1'] }], // 5А, Группа 1
      },
      {
        id: '5',
        subject: mockSubjects[10], // Английский язык
        teachers: [mockLightTeachers[3]], // Елена Козлова
        rooms: [mockClassrooms[3]], // 104
        participants: [{ class: mockClasses[0], groupIds: ['g2'] }], // 5А, Группа 2
      },
    ],
  },
  // Вторник
  {
    dayOfWeek: WeekDaysCode.TUESDAY,
    lessonNumber: 1,
    lessons: [
      {
        id: '6',
        subject: mockSubjects[0], // Математика
        teachers: [mockLightTeachers[0]], // Анна Иванова
        rooms: [mockClassrooms[0]], // 101
        participants: [{ class: mockClasses[1] }], // 5Б
      },
    ],
  },
  // Среда - пример перекрёстного обучения для 10А и 10Б
  {
    dayOfWeek: WeekDaysCode.WEDNESDAY,
    lessonNumber: 3,
    lessons: [
      // Биология: Группа А из 10А + Группа А из 10Б
      {
        id: '7',
        subject: mockSubjects[6], // Биология
        teachers: [mockLightTeachers[4]], // Дмитрий Волков
        rooms: [mockClassrooms[5]], // 106
        participants: [
          { class: mockClasses[10], groupIds: ['g10a1'] }, // 10А, Группа А
          { class: mockClasses[11], groupIds: ['g10b1'] }, // 10Б, Группа А
        ],
      },
      // Информатика: Группа Б из 10А + Группа Б из 10Б
      {
        id: '8',
        subject: mockSubjects[9], // Информатика
        teachers: [mockLightTeachers[5]], // Ольга Новикова
        rooms: [mockClassrooms[6]], // 107 (Компьютерный класс)
        participants: [
          { class: mockClasses[10], groupIds: ['g10a2'] }, // 10А, Группа Б
          { class: mockClasses[11], groupIds: ['g10b2'] }, // 10Б, Группа Б
        ],
      },
    ],
  },
  {
    dayOfWeek: WeekDaysCode.WEDNESDAY,
    lessonNumber: 4,
    lessons: [
      // Вторая пара перекрёстного обучения - группы меняются местами
      {
        id: '9',
        subject: mockSubjects[9], // Информатика
        teachers: [mockLightTeachers[5]], // Ольга Новикова
        rooms: [mockClassrooms[6]], // 107 (Компьютерный класс)
        participants: [
          { class: mockClasses[10], groupIds: ['g10a1'] }, // 10А, Группа А
          { class: mockClasses[11], groupIds: ['g10b1'] }, // 10Б, Группа А
        ],
      },
      {
        id: '10',
        subject: mockSubjects[6], // Биология
        teachers: [mockLightTeachers[4]], // Дмитрий Волков
        rooms: [mockClassrooms[5]], // 106
        participants: [
          { class: mockClasses[10], groupIds: ['g10a2'] }, // 10А, Группа Б
          { class: mockClasses[11], groupIds: ['g10b2'] }, // 10Б, Группа Б
        ],
      },
    ],
  },
];

// Мок автоматически сгенерированного расписания
export const mockGeneratedSchedule: ScheduleSlot[] = [
  // ПОНЕДЕЛЬНИК
  {
    dayOfWeek: WeekDaysCode.MONDAY,
    lessonNumber: 1,
    lessons: [
      {
        id: 'gen-mon-1-1',
        subject: mockSubjects[0], // Математика
        teachers: [mockLightTeachers[0]], // Анна Иванова
        rooms: [mockClassrooms[0]], // 101
        participants: [{ class: mockClasses[0] }], // 5А
      },
      {
        id: 'gen-mon-1-2',
        subject: mockSubjects[1], // Русский язык
        teachers: [mockLightTeachers[1]], // Мария Петрова
        rooms: [mockClassrooms[1]], // 102
        participants: [{ class: mockClasses[1] }], // 5Б
      },
      {
        id: 'gen-mon-1-3',
        subject: mockSubjects[3], // История
        teachers: [mockLightTeachers[2]], // Сергей Смирнов
        rooms: [mockClassrooms[2]], // 103
        participants: [{ class: mockClasses[2] }], // 6А
      },
    ],
  },
  {
    dayOfWeek: WeekDaysCode.MONDAY,
    lessonNumber: 2,
    lessons: [
      {
        id: 'gen-mon-2-1',
        subject: mockSubjects[1], // Русский язык
        teachers: [mockLightTeachers[1]], // Мария Петрова
        rooms: [mockClassrooms[1]], // 102
        participants: [{ class: mockClasses[0] }], // 5А
      },
      {
        id: 'gen-mon-2-2',
        subject: mockSubjects[0], // Математика
        teachers: [mockLightTeachers[0]], // Анна Иванова
        rooms: [mockClassrooms[0]], // 101
        participants: [{ class: mockClasses[1] }], // 5Б
      },
      {
        id: 'gen-mon-2-3',
        subject: mockSubjects[6], // Биология
        teachers: [mockLightTeachers[3]], // Елена Козлова
        rooms: [mockClassrooms[3]], // 104
        participants: [{ class: mockClasses[2] }], // 6А
      },
    ],
  },
  {
    dayOfWeek: WeekDaysCode.MONDAY,
    lessonNumber: 3,
    lessons: [
      {
        id: 'gen-mon-3-1',
        subject: mockSubjects[10], // Английский язык - с делением на группы
        teachers: [mockLightTeachers[4]], // Дмитрий Волков
        rooms: [mockClassrooms[4]], // 105
        participants: [{ class: mockClasses[0], groupIds: ['g1'] }], // 5А, Группа 1
      },
      {
        id: 'gen-mon-3-2',
        subject: mockSubjects[10], // Английский язык - группа 2
        teachers: [mockLightTeachers[5]], // Ольга Новикова
        rooms: [mockClassrooms[5]], // 106
        participants: [{ class: mockClasses[0], groupIds: ['g2'] }], // 5А, Группа 2
      },
      {
        id: 'gen-mon-3-3',
        subject: mockSubjects[2], // Литература
        teachers: [mockLightTeachers[1]], // Мария Петрова
        rooms: [mockClassrooms[1]], // 102
        participants: [{ class: mockClasses[1] }], // 5Б
      },
    ],
  },
  {
    dayOfWeek: WeekDaysCode.MONDAY,
    lessonNumber: 4,
    lessons: [
      {
        id: 'gen-mon-4-1',
        subject: mockSubjects[2], // Литература
        teachers: [mockLightTeachers[1]], // Мария Петрова
        rooms: [mockClassrooms[1]], // 102
        participants: [{ class: mockClasses[0] }], // 5А
      },
      {
        id: 'gen-mon-4-2',
        subject: mockSubjects[3], // История
        teachers: [mockLightTeachers[2]], // Сергей Смирнов
        rooms: [mockClassrooms[2]], // 103
        participants: [{ class: mockClasses[1] }], // 5Б
      },
      {
        id: 'gen-mon-4-3',
        subject: mockSubjects[0], // Математика
        teachers: [mockLightTeachers[0]], // Анна Иванова
        rooms: [mockClassrooms[0]], // 101
        participants: [{ class: mockClasses[2] }], // 6А
      },
    ],
  },
  {
    dayOfWeek: WeekDaysCode.MONDAY,
    lessonNumber: 5,
    lessons: [
      {
        id: 'gen-mon-5-1',
        subject: mockSubjects[12], // Физкультура
        teachers: [mockLightTeachers[6]], // Максим Кузнецов
        rooms: [mockClassrooms[10]], // Спортзал
        participants: [{ class: mockClasses[0] }], // 5А
      },
      {
        id: 'gen-mon-5-2',
        subject: mockSubjects[10], // Английский язык
        teachers: [mockLightTeachers[4]], // Дмитрий Волков
        rooms: [mockClassrooms[4]], // 105
        participants: [{ class: mockClasses[1] }], // 5Б
      },
    ],
  },

  // ВТОРНИК
  {
    dayOfWeek: WeekDaysCode.TUESDAY,
    lessonNumber: 1,
    lessons: [
      {
        id: 'gen-tue-1-1',
        subject: mockSubjects[0], // Математика
        teachers: [mockLightTeachers[0]], // Анна Иванова
        rooms: [mockClassrooms[0]], // 101
        participants: [{ class: mockClasses[0] }], // 5А
      },
      {
        id: 'gen-tue-1-2',
        subject: mockSubjects[1], // Русский язык
        teachers: [mockLightTeachers[1]], // Мария Петрова
        rooms: [mockClassrooms[1]], // 102
        participants: [{ class: mockClasses[1] }], // 5Б
      },
      {
        id: 'gen-tue-1-3',
        subject: mockSubjects[10], // Английский язык
        teachers: [mockLightTeachers[4]], // Дмитрий Волков
        rooms: [mockClassrooms[4]], // 105
        participants: [{ class: mockClasses[2] }], // 6А
      },
    ],
  },
  {
    dayOfWeek: WeekDaysCode.TUESDAY,
    lessonNumber: 2,
    lessons: [
      {
        id: 'gen-tue-2-1',
        subject: mockSubjects[1], // Русский язык
        teachers: [mockLightTeachers[1]], // Мария Петрова
        rooms: [mockClassrooms[1]], // 102
        participants: [{ class: mockClasses[0] }], // 5А
      },
      {
        id: 'gen-tue-2-2',
        subject: mockSubjects[0], // Математика
        teachers: [mockLightTeachers[0]], // Анна Иванова
        rooms: [mockClassrooms[0]], // 101
        participants: [{ class: mockClasses[1] }], // 5Б
      },
      {
        id: 'gen-tue-2-3',
        subject: mockSubjects[1], // Русский язык
        teachers: [mockLightTeachers[1]], // Мария Петрова - ведет параллельно
        rooms: [mockClassrooms[6]], // 202
        participants: [{ class: mockClasses[2] }], // 6А
      },
    ],
  },
  {
    dayOfWeek: WeekDaysCode.TUESDAY,
    lessonNumber: 3,
    lessons: [
      {
        id: 'gen-tue-3-1',
        subject: mockSubjects[3], // История
        teachers: [mockLightTeachers[2]], // Сергей Смирнов
        rooms: [mockClassrooms[2]], // 103
        participants: [{ class: mockClasses[0] }], // 5А
      },
      {
        id: 'gen-tue-3-2',
        subject: mockSubjects[2], // Литература
        teachers: [mockLightTeachers[1]], // Мария Петрова
        rooms: [mockClassrooms[1]], // 102
        participants: [{ class: mockClasses[1] }], // 5Б
      },
      {
        id: 'gen-tue-3-3',
        subject: mockSubjects[0], // Математика
        teachers: [mockLightTeachers[0]], // Анна Иванова
        rooms: [mockClassrooms[0]], // 101
        participants: [{ class: mockClasses[2] }], // 6А
      },
    ],
  },

  // СРЕДА
  {
    dayOfWeek: WeekDaysCode.WEDNESDAY,
    lessonNumber: 1,
    lessons: [
      {
        id: 'gen-wed-1-1',
        subject: mockSubjects[0], // Математика
        teachers: [mockLightTeachers[0]], // Анна Иванова
        rooms: [mockClassrooms[0]], // 101
        participants: [{ class: mockClasses[0] }], // 5А
      },
      {
        id: 'gen-wed-1-2',
        subject: mockSubjects[0], // Математика
        teachers: [mockLightTeachers[0]], // Анна Иванова - может вести параллельно два класса
        rooms: [mockClassrooms[6]], // 202
        participants: [{ class: mockClasses[1] }], // 5Б
      },
      {
        id: 'gen-wed-1-3',
        subject: mockSubjects[2], // Литература
        teachers: [mockLightTeachers[1]], // Мария Петрова
        rooms: [mockClassrooms[1]], // 102
        participants: [{ class: mockClasses[2] }], // 6А
      },
    ],
  },
  {
    dayOfWeek: WeekDaysCode.WEDNESDAY,
    lessonNumber: 2,
    lessons: [
      {
        id: 'gen-wed-2-1',
        subject: mockSubjects[1], // Русский язык
        teachers: [mockLightTeachers[1]], // Мария Петрова
        rooms: [mockClassrooms[1]], // 102
        participants: [{ class: mockClasses[0] }], // 5А
      },
      {
        id: 'gen-wed-2-2',
        subject: mockSubjects[1], // Русский язык
        teachers: [mockLightTeachers[1]], // Мария Петрова - параллельно
        rooms: [mockClassrooms[6]], // 202
        participants: [{ class: mockClasses[1] }], // 5Б
      },
      {
        id: 'gen-wed-2-3',
        subject: mockSubjects[3], // История
        teachers: [mockLightTeachers[2]], // Сергей Смирнов
        rooms: [mockClassrooms[2]], // 103
        participants: [{ class: mockClasses[2] }], // 6А
      },
    ],
  },

  // ЧЕТВЕРГ
  {
    dayOfWeek: WeekDaysCode.THURSDAY,
    lessonNumber: 1,
    lessons: [
      {
        id: 'gen-thu-1-1',
        subject: mockSubjects[10], // Английский язык - группа 1
        teachers: [mockLightTeachers[4]], // Дмитрий Волков
        rooms: [mockClassrooms[4]], // 105
        participants: [{ class: mockClasses[0], groupIds: ['g1'] }], // 5А, Группа 1
      },
      {
        id: 'gen-thu-1-2',
        subject: mockSubjects[10], // Английский язык - группа 2
        teachers: [mockLightTeachers[5]], // Ольга Новикова
        rooms: [mockClassrooms[5]], // 106
        participants: [{ class: mockClasses[0], groupIds: ['g2'] }], // 5А, Группа 2
      },
      {
        id: 'gen-thu-1-3',
        subject: mockSubjects[0], // Математика
        teachers: [mockLightTeachers[0]], // Анна Иванова
        rooms: [mockClassrooms[0]], // 101
        participants: [{ class: mockClasses[1] }], // 5Б
      },
    ],
  },
  {
    dayOfWeek: WeekDaysCode.THURSDAY,
    lessonNumber: 2,
    lessons: [
      {
        id: 'gen-thu-2-1',
        subject: mockSubjects[0], // Математика
        teachers: [mockLightTeachers[0]], // Анна Иванова
        rooms: [mockClassrooms[0]], // 101
        participants: [{ class: mockClasses[0] }], // 5А
      },
      {
        id: 'gen-thu-2-2',
        subject: mockSubjects[10], // Английский язык
        teachers: [mockLightTeachers[4]], // Дмитрий Волков
        rooms: [mockClassrooms[4]], // 105
        participants: [{ class: mockClasses[1] }], // 5Б
      },
      {
        id: 'gen-thu-2-3',
        subject: mockSubjects[0], // Математика
        teachers: [mockLightTeachers[0]], // Анна Иванова - параллельно
        rooms: [mockClassrooms[6]], // 202
        participants: [{ class: mockClasses[2] }], // 6А
      },
    ],
  },

  // ПЯТНИЦА
  {
    dayOfWeek: WeekDaysCode.FRIDAY,
    lessonNumber: 1,
    lessons: [
      {
        id: 'gen-fri-1-1',
        subject: mockSubjects[2], // Литература
        teachers: [mockLightTeachers[1]], // Мария Петрова
        rooms: [mockClassrooms[1]], // 102
        participants: [{ class: mockClasses[0] }], // 5А
      },
      {
        id: 'gen-fri-1-2',
        subject: mockSubjects[1], // Русский язык
        teachers: [mockLightTeachers[1]], // Мария Петрова - параллельно
        rooms: [mockClassrooms[6]], // 202
        participants: [{ class: mockClasses[1] }], // 5Б
      },
      {
        id: 'gen-fri-1-3',
        subject: mockSubjects[10], // Английский язык
        teachers: [mockLightTeachers[4]], // Дмитрий Волков
        rooms: [mockClassrooms[4]], // 105
        participants: [{ class: mockClasses[2] }], // 6А
      },
    ],
  },
  {
    dayOfWeek: WeekDaysCode.FRIDAY,
    lessonNumber: 2,
    lessons: [
      {
        id: 'gen-fri-2-1',
        subject: mockSubjects[12], // Физкультура
        teachers: [mockLightTeachers[6]], // Максим Кузнецов
        rooms: [mockClassrooms[10]], // Спортзал
        participants: [{ class: mockClasses[0] }], // 5А
      },
      {
        id: 'gen-fri-2-2',
        subject: mockSubjects[12], // Физкультура - параллельно в зале
        teachers: [mockLightTeachers[6]], // Максим Кузнецов
        rooms: [mockClassrooms[10]], // Спортзал
        participants: [{ class: mockClasses[1] }], // 5Б
      },
      {
        id: 'gen-fri-2-3',
        subject: mockSubjects[1], // Русский язык
        teachers: [mockLightTeachers[1]], // Мария Петрова
        rooms: [mockClassrooms[1]], // 102
        participants: [{ class: mockClasses[2] }], // 6А
      },
    ],
  },
  {
    dayOfWeek: WeekDaysCode.FRIDAY,
    lessonNumber: 3,
    lessons: [
      {
        id: 'gen-fri-3-1',
        subject: mockSubjects[10], // Английский язык - последний урок группы 1
        teachers: [mockLightTeachers[4]], // Дмитрий Волков
        rooms: [mockClassrooms[4]], // 105
        participants: [{ class: mockClasses[0], groupIds: ['g1'] }], // 5А, Группа 1
      },
      {
        id: 'gen-fri-3-2',
        subject: mockSubjects[10], // Английский язык - последний урок группы 2
        teachers: [mockLightTeachers[5]], // Ольга Новикова
        rooms: [mockClassrooms[5]], // 106
        participants: [{ class: mockClasses[0], groupIds: ['g2'] }], // 5А, Группа 2
      },
      {
        id: 'gen-fri-3-3',
        subject: mockSubjects[10], // Английский язык
        teachers: [mockLightTeachers[4]], // Дмитрий Волков - ведет еще один класс
        rooms: [mockClassrooms[7]], // 203
        participants: [{ class: mockClasses[1] }], // 5Б
      },
    ],
  },

  // Остальные слоты пустые
  { dayOfWeek: WeekDaysCode.MONDAY, lessonNumber: 6, lessons: [] },
  { dayOfWeek: WeekDaysCode.MONDAY, lessonNumber: 7, lessons: [] },
  { dayOfWeek: WeekDaysCode.MONDAY, lessonNumber: 8, lessons: [] },
  { dayOfWeek: WeekDaysCode.TUESDAY, lessonNumber: 4, lessons: [] },
  { dayOfWeek: WeekDaysCode.TUESDAY, lessonNumber: 5, lessons: [] },
  { dayOfWeek: WeekDaysCode.TUESDAY, lessonNumber: 6, lessons: [] },
  { dayOfWeek: WeekDaysCode.TUESDAY, lessonNumber: 7, lessons: [] },
  { dayOfWeek: WeekDaysCode.TUESDAY, lessonNumber: 8, lessons: [] },
  { dayOfWeek: WeekDaysCode.WEDNESDAY, lessonNumber: 3, lessons: [] },
  { dayOfWeek: WeekDaysCode.WEDNESDAY, lessonNumber: 4, lessons: [] },
  { dayOfWeek: WeekDaysCode.WEDNESDAY, lessonNumber: 5, lessons: [] },
  { dayOfWeek: WeekDaysCode.WEDNESDAY, lessonNumber: 6, lessons: [] },
  { dayOfWeek: WeekDaysCode.WEDNESDAY, lessonNumber: 7, lessons: [] },
  { dayOfWeek: WeekDaysCode.WEDNESDAY, lessonNumber: 8, lessons: [] },
  { dayOfWeek: WeekDaysCode.THURSDAY, lessonNumber: 3, lessons: [] },
  { dayOfWeek: WeekDaysCode.THURSDAY, lessonNumber: 4, lessons: [] },
  { dayOfWeek: WeekDaysCode.THURSDAY, lessonNumber: 5, lessons: [] },
  { dayOfWeek: WeekDaysCode.THURSDAY, lessonNumber: 6, lessons: [] },
  { dayOfWeek: WeekDaysCode.THURSDAY, lessonNumber: 7, lessons: [] },
  { dayOfWeek: WeekDaysCode.THURSDAY, lessonNumber: 8, lessons: [] },
  { dayOfWeek: WeekDaysCode.FRIDAY, lessonNumber: 4, lessons: [] },
  { dayOfWeek: WeekDaysCode.FRIDAY, lessonNumber: 5, lessons: [] },
  { dayOfWeek: WeekDaysCode.FRIDAY, lessonNumber: 6, lessons: [] },
  { dayOfWeek: WeekDaysCode.FRIDAY, lessonNumber: 7, lessons: [] },
  { dayOfWeek: WeekDaysCode.FRIDAY, lessonNumber: 8, lessons: [] },
];
