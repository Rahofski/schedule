'use client';

import { useState } from 'react';
import { useGetClassesQuery } from '@/api/queiries/classes';
import { useGetTeachersQuery, useBulkUpdateTeachers } from '@/api/queiries/teachers';
import { Button } from '@/components/ui/shadcn/button';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/shadcn/table';
import { useWorkloadContext } from '../../contexts/WorkloadContext/useWorkloadContext';
import { WorkloadTableRow } from './components/WorkloadTableRow';
import { BaseTeacher } from '@/lib/types/teachers';

export function WorkloadFrame() {
  const { data: teachers = [] } = useGetTeachersQuery();
  const { data: classes = [] } = useGetClassesQuery();

  const { changedTeachers, clearChangedTeachers, hasChanges, addChangedTeacher } = useWorkloadContext();
  const bulkUpdateTeachers = useBulkUpdateTeachers();

  // Состояние для отслеживания валидности каждого учителя
  const [teacherValidations, setTeacherValidations] = useState<Record<string, boolean>>({});

  // Обработка изменения валидности учителя
  const handleValidationChange = (teacherId: string, isValid: boolean) => {
    setTeacherValidations(prev => ({ ...prev, [teacherId]: isValid }));
  };

  // Проверяем, все ли учителя валидны
  const allTeachersValid = Object.values(teacherValidations).every(isValid => isValid);

  // Обработка изменений часов
  const handleHoursChange = (teacherId: string, subjectId: string, classId: string, hours: number) => {
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) {
      return;
    }

    // Обновляем часы в classHours массиве
    const updatedClassHours = teacher.classHours ? [...teacher.classHours] : [];
    const existingIndex = updatedClassHours.findIndex(ch => ch.subject.id === subjectId && ch.class.id === classId);

    if (existingIndex >= 0) {
      updatedClassHours[existingIndex] = {
        ...updatedClassHours[existingIndex],
        hours,
      };
    } else {
      // Если запись не найдена, нужно добавить новую
      // Но нам нужны объекты subject и class
      const subject = teacher.subjects?.find(s => s.subject.id === subjectId)?.subject;
      const classData = classes.find(c => c.id === classId);

      if (subject && classData) {
        updatedClassHours.push({
          subject,
          class: classData,
          hours,
        });
      }
    }

    const updatedTeacher: BaseTeacher = {
      ...teacher,
      classHours: updatedClassHours,
    };

    addChangedTeacher(updatedTeacher);
  };

  // Обработка изменений нагрузки учителя
  const handleWorkloadChange = (teacherId: string, workload: number) => {
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) {
      return;
    }

    const updatedTeacher: BaseTeacher = {
      ...teacher,
      workloadHoursPerWeek: workload,
    };

    addChangedTeacher(updatedTeacher);
  };

  // Сохранить все изменения
  const handleSaveAll = async () => {
    try {
      await bulkUpdateTeachers.mutateAsync(changedTeachers);
      clearChangedTeachers();
    } catch {
      // Ошибка при сохранении обрабатывается в мутации
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-end'>
        <Button
          onClick={handleSaveAll}
          disabled={!hasChanges || bulkUpdateTeachers.isPending || !allTeachersValid}
        >
          {bulkUpdateTeachers.isPending ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Преподаватель</TableHead>
            <TableHead>Нагрузка</TableHead>
            <TableHead>Тек.</TableHead>
            <TableHead>Предмет</TableHead>
            <TableHead>Пред. нагр.</TableHead>
            {classes.map(classItem => (
              <TableHead key={classItem.id}>{classItem.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map(teacher => (
            <WorkloadTableRow
              key={teacher.id}
              teacher={teacher}
              classes={classes}
              allTeachers={teachers}
              onChange={handleHoursChange}
              onWorkloadChange={handleWorkloadChange}
              onValidationChange={handleValidationChange}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
