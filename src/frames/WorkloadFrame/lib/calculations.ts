import { AppClass } from '@/lib/types/classes';
import { AppSubject } from '@/lib/types/subjects';
import { BaseTeacher } from '@/lib/types/teachers';

type LocalHours = Record<string, number>;

export function makeKey(subjectId: string, classId: string) {
  return `${subjectId}-${classId}`;
}

export function hasSubjectInClass(subjectId: string, classId: string, classes: AppClass[]) {
  const cls = classes.find(c => c.id === classId);
  if (!cls) {
    return false;
  }

  return cls.subjects.some(s => s.subject.id === subjectId);
}

export function getHoursForSubjectClass(subjectId: string, classId: string, localHours: LocalHours) {
  const key = makeKey(subjectId, classId);
  return localHours[key] ?? 0;
}

export function getAvailableHours(
  subjectId: string,
  classId: string,
  classes: AppClass[],
  allTeachers: BaseTeacher[],
  currentTeacherId: string
) {
  const cls = classes.find(c => c.id === classId);
  if (!cls) {
    return 0;
  }

  const subject = cls.subjects.find(s => s.subject.id === subjectId);
  if (!subject) {
    return 0;
  }

  const capacity = subject.hoursPerWeek;

  // Sum hours already assigned to other teachers for this subject+class
  const used = allTeachers
    .filter(t => t.id !== currentTeacherId)
    .flatMap(t => t.classHours || [])
    .filter(ch => ch.class.id === classId && ch.subject.id === subjectId)
    .reduce((sum, ch) => sum + (ch.hours || 0), 0);

  const remaining = Math.max(0, capacity - used);
  return remaining;
}

export function calculateCurrentWorkload(localHours: LocalHours) {
  return Object.values(localHours).reduce((s, v) => s + (v || 0), 0);
}

export function validateClassHours(classId: string, localHours: LocalHours, maxTotal = 40) {
  // Sum hours across localHours that belong to this classId
  const total = Object.entries(localHours)
    .filter(([k]) => k.endsWith(`-${classId}`))
    .reduce((s, [, v]) => s + (v || 0), 0);
  return total <= maxTotal;
}

export function buildSubjectGroups(teacher: BaseTeacher) {
  const subjectGroups =
    teacher.subjects?.reduce(
      (groups, subjectInfo) => {
        const subjectId = subjectInfo.subject.id;
        if (!groups[subjectId]) {
          groups[subjectId] = {
            subject: subjectInfo.subject,
            classes: [] as AppClass[],
          };
        }

        return groups;
      },
      {} as Record<string, { subject: AppSubject; classes: AppClass[] }>
    ) || {};

  teacher.classHours?.forEach(item => {
    const subjectId = item.subject.id;
    if (subjectGroups[subjectId]) {
      const existingClass = subjectGroups[subjectId].classes.find(c => c.id === item.class.id);
      if (!existingClass) {
        subjectGroups[subjectId].classes.push(item.class);
      }
    }
  });

  return Object.values(subjectGroups);
}
