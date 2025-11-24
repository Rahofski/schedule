import { ScheduleSlot, ScheduleLesson, ScheduleLessonParticipant } from '@/lib/types/schedule';
import { AppLightTeacher } from '@/lib/types/teachers';
import { AppClassRoom } from '@/lib/types/classrooms';
import { WeekDaysCode } from '@/lib/data';

/**
 * Проверка конфликтов при добавлении урока
 */
export function checkLessonConflicts(
  dayOfWeek: WeekDaysCode,
  lessonNumber: number,
  teachers: AppLightTeacher[],
  rooms: AppClassRoom[],
  participants: ScheduleLessonParticipant[],
  allSchedule: ScheduleSlot[]
): {
  teacherConflicts: string[];
  roomConflicts: string[];
  classConflicts: string[];
} {
  const teacherConflicts: string[] = [];
  const roomConflicts: string[] = [];
  const classConflicts: string[] = [];

  // Находим слот для проверки
  const slot = allSchedule.find(s => s.dayOfWeek === dayOfWeek && s.lessonNumber === lessonNumber);

  if (!slot || !slot.lessons || slot.lessons.length === 0) {
    return { teacherConflicts, roomConflicts, classConflicts };
  }

  // Проверяем конфликты учителей
  for (const teacher of teachers) {
    const hasConflict = slot.lessons.some(lesson => lesson.teachers.some(t => t.id === teacher.id));
    if (hasConflict) {
      teacherConflicts.push(teacher.id);
    }
  }

  // Проверяем конфликты кабинетов
  for (const room of rooms) {
    const hasConflict = slot.lessons.some(lesson => lesson.rooms.some(r => r.id === room.id));
    if (hasConflict) {
      roomConflicts.push(room.id);
    }
  }

  // Проверяем конфликты классов и групп
  for (const participant of participants) {
    for (const existingLesson of slot.lessons) {
      for (const existingParticipant of existingLesson.participants) {
        // Если это тот же класс
        if (existingParticipant.class.id === participant.class.id) {
          // Проверяем пересечение групп
          const newGroups = participant.groupIds || [];
          const existingGroups = existingParticipant.groupIds || [];

          // Если обе записи без групп (весь класс) - конфликт
          if (newGroups.length === 0 && existingGroups.length === 0) {
            classConflicts.push(`Класс ${participant.class.name} уже занят в это время`);
            break;
          }

          // Если одна запись - весь класс, а другая - с группами - конфликт
          if (newGroups.length === 0 || existingGroups.length === 0) {
            classConflicts.push(`Класс ${participant.class.name} уже занят в это время`);
            break;
          }

          // Проверяем пересечение конкретных групп
          const hasGroupOverlap = newGroups.some(gid => existingGroups.includes(gid));
          if (hasGroupOverlap) {
            const overlappingGroups = newGroups.filter(gid => existingGroups.includes(gid));
            const groupNames = overlappingGroups
              .map(gid => participant.class.groups?.find(g => g.id === gid)?.name || gid)
              .join(', ');
            classConflicts.push(`Группы ${groupNames} класса ${participant.class.name} уже заняты`);
            break;
          }
        }
      }
    }
  }

  return { teacherConflicts, roomConflicts, classConflicts };
}

/**
 * Подсчёт использованных часов для предмета с учётом групп
 */
export function getUsedHoursForSubject(
  classId: string,
  subjectId: string,
  allSchedule: ScheduleSlot[],
  hasSplit: boolean,
  groups?: { id: string; name: string }[]
): number {
  if (!hasSplit || !groups || groups.length === 0) {
    // Обычный подсчёт для класса без деления
    let total = 0;
    for (const slot of allSchedule) {
      const exists = slot.lessons?.some(
        l => l.subject.id === subjectId && l.participants?.some(p => p.class.id === classId && !p.groupIds)
      );
      if (exists) {
        total += 1;
      }
    }
    return total;
  }

  // Для предметов с делением считаем по группам
  const usedByGroup = new Map<string, number>();

  for (const group of groups) {
    let groupHours = 0;
    for (const slot of allSchedule) {
      const hasGroupLesson = slot.lessons?.some(
        l =>
          l.subject.id === subjectId &&
          l.participants?.some(p => p.class.id === classId && p.groupIds && p.groupIds.includes(group.id))
      );
      if (hasGroupLesson) {
        groupHours += 1;
      }
    }
    usedByGroup.set(group.id, groupHours);
  }

  // Возвращаем максимум из всех групп (т.к. каждая группа должна иметь одинаковое количество часов)
  return Math.max(...Array.from(usedByGroup.values()), 0);
}

/**
 * Проверка, что урок удовлетворяет ограничениям учебного плана
 */
export function validateLessonAgainstStudyPlan(
  lesson: Omit<ScheduleLesson, 'id'>,
  classId: string,
  subjectId: string,
  allSchedule: ScheduleSlot[],
  maxHours: number,
  hasSplit: boolean,
  groups?: { id: string; name: string }[]
): { isValid: boolean; message?: string } {
  const usedHours = getUsedHoursForSubject(classId, subjectId, allSchedule, hasSplit, groups);

  if (usedHours >= maxHours) {
    return {
      isValid: false,
      message: `Превышен лимит часов по предмету (${usedHours}/${maxHours})`,
    };
  }

  return { isValid: true };
}
