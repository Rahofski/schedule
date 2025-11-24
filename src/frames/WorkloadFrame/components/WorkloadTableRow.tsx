'use client';

import { TableRow, TableCell } from '@/components/ui/shadcn/table';
import { Input } from '@/components/ui/shadcn/input';
import { useState, useEffect } from 'react';
import { BaseTeacher } from '@/lib/types/teachers';
import { AppClass } from '@/lib/types/classes';
// AppSubject импорт не нужен напрямую в этом файле
import { formatFullName } from '@/lib';
import {
  hasSubjectInClass,
  getAvailableHours,
  getHoursForSubjectClass,
  calculateCurrentWorkload,
  validateClassHours,
  buildSubjectGroups,
} from '@/frames/WorkloadFrame/lib/calculations';

interface WorkloadTableRowProps {
  teacher: BaseTeacher;
  classes: AppClass[];
  allTeachers: BaseTeacher[]; // Добавляем список всех учителей
  onChange: (teacherId: string, subjectId: string, classId: string, hours: number) => void;
  onWorkloadChange: (teacherId: string, workload: number) => void;
  onValidationChange: (teacherId: string, isValid: boolean) => void;
}

export const WorkloadTableRow = ({
  teacher,
  classes,
  allTeachers,
  onChange,
  onWorkloadChange,
  onValidationChange,
}: WorkloadTableRowProps) => {
  const [localHours, setLocalHours] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    teacher.classHours?.forEach(item => {
      const key = `${item.subject.id}-${item.class.id}`;
      initial[key] = item.hours;
    });
    return initial;
  });

  const [localWorkload, setLocalWorkload] = useState(teacher.workloadHoursPerWeek || 25);

  const handleWorkloadChange = (value: string) => {
    const workload = parseInt(value) || 0;
    setLocalWorkload(workload);
    onWorkloadChange(teacher.id, workload);
  };

  const handleHoursChange = (subjectId: string, classId: string, value: string) => {
    const hours = parseInt(value) || 0;
    const key = `${subjectId}-${classId}`;

    setLocalHours(prev => ({ ...prev, [key]: hours }));
    onChange(teacher.id, subjectId, classId, hours);
  };

  // Логика вычислений вынесена в src/frames/WorkloadFrame/lib/calculations.ts

  const subjectEntries = buildSubjectGroups(teacher);
  const currentWorkload = calculateCurrentWorkload(localHours);
  const isWorkloadExceeded = currentWorkload > localWorkload;

  // Уведомляем родительский компонент об изменении валидности
  useEffect(() => {
    // Проверяем общую валидность данных учителя
    const allClassesValid = classes.every(classItem => {
      const totalHoursForClass = Object.keys(localHours)
        .filter(key => key.endsWith(`-${classItem.id}`))
        .reduce((sum, key) => sum + localHours[key], 0);
      return totalHoursForClass <= 40; // Максимум часов для класса
    });

    const workloadValid = currentWorkload <= localWorkload;
    const isValid = allClassesValid && workloadValid;

    onValidationChange(teacher.id, isValid);
  }, [localHours, localWorkload, teacher.id, onValidationChange, classes, currentWorkload]);

  return (
    <>
      {subjectEntries.map((group, index) => (
        <TableRow key={`${teacher.id}-${group.subject.id}`}>
          {/* Имя преподавателя - только в первой строке */}
          {index === 0 && (
            <TableCell
              rowSpan={subjectEntries.length}
              className='font-medium border-r'
            >
              {formatFullName(teacher)}
            </TableCell>
          )}

          {/* Общая нагрузка - только в первой строке */}
          {index === 0 && (
            <TableCell
              rowSpan={subjectEntries.length}
              className='border-r p-1'
            >
              <Input
                type='number'
                min='1'
                max='40'
                value={localWorkload || ''}
                onChange={e => handleWorkloadChange(e.target.value)}
                className={`w-20 text-center ${isWorkloadExceeded ? 'border-red-500 bg-red-50' : ''}`}
                placeholder='25'
              />
            </TableCell>
          )}

          {/* Текущая нагрузка по предмету - только в первой строке */}
          {index === 0 && (
            <TableCell
              rowSpan={subjectEntries.length}
              className='text-center border-r'
            >
              {currentWorkload}
            </TableCell>
          )}

          {/* Предмет */}
          <TableCell className='border-r'>{group.subject.name}</TableCell>

          {/* Предметная нагрузка */}
          <TableCell className='text-center border-r'>
            {teacher.classHours
              ?.filter(item => item.subject.id === group.subject.id)
              .reduce((sum, item) => sum + item.hours, 0) || 0}
          </TableCell>

          {/* Часы по классам */}
          {classes.map(classItem => {
            const hours = getHoursForSubjectClass(group.subject.id, classItem.id, localHours);
            const isClassOverloaded = !validateClassHours(classItem.id, localHours);
            const hasSubject = hasSubjectInClass(group.subject.id, classItem.id, classes);

            // Вычисляем доступное количество часов с учетом распределения между учителями
            const availableHours = getAvailableHours(group.subject.id, classItem.id, classes, allTeachers, teacher.id);
            const isFullyDistributed = availableHours === 0 && hours === 0;

            return (
              <TableCell
                key={classItem.id}
                className='p-1'
              >
                {hasSubject ? (
                  isFullyDistributed ? (
                    <div className='w-16 h-9 bg-yellow-100 border border-yellow-300 rounded flex items-center justify-center text-yellow-600 text-sm'>
                      Full
                    </div>
                  ) : (
                    <Input
                      type='number'
                      min='0'
                      max={Math.max(hours, availableHours).toString()}
                      value={hours || ''}
                      onChange={e => handleHoursChange(group.subject.id, classItem.id, e.target.value)}
                      className={`w-16 text-center ${isClassOverloaded ? 'border-red-500 bg-red-50' : ''}`}
                      placeholder='0'
                    />
                  )
                ) : (
                  <div className='w-16 h-9 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-gray-400 text-sm'>
                    —
                  </div>
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </>
  );
};
