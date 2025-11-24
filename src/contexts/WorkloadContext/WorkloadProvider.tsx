'use client';
import React, { useState, useMemo } from 'react';
import { WorkloadContext } from './WorkloadContext';
import { BaseTeacher } from '@/lib/types/teachers';

interface WorkloadProviderProps {
  children: React.ReactNode;
}

export const WorkloadProvider: React.FC<WorkloadProviderProps> = ({ children }) => {
  const [changedTeachers, setChangedTeachers] = useState<BaseTeacher[]>([]);

  const addChangedTeacher = (teacher: BaseTeacher) => {
    setChangedTeachers(prev => {
      // Удаляем старую версию если есть, добавляем новую
      const filtered = prev.filter(t => t.id !== teacher.id);
      return [...filtered, teacher];
    });
  };

  const removeChangedTeacher = (teacherId: string) => {
    setChangedTeachers(prev => prev.filter(t => t.id !== teacherId));
  };

  const clearChangedTeachers = () => {
    setChangedTeachers([]);
  };

  const updateTeacherHours = (teacherId: string, subjectId: string, classId: string, hours: number) => {
    setChangedTeachers(prev => {
      // Найдем существующего учителя или создадим новый на основе оригинала
      const existingIndex = prev.findIndex(t => t.id === teacherId);

      if (existingIndex >= 0) {
        // Обновляем существующего измененного учителя
        const updatedTeachers = [...prev];
        const teacher = updatedTeachers[existingIndex];

        // Обновляем часы для конкретного предмета и класса
        const updatedClassHours = teacher.classHours ? [...teacher.classHours] : [];
        const existingHourIndex = updatedClassHours.findIndex(
          ch => ch.subject.id === subjectId && ch.class.id === classId
        );

        if (existingHourIndex >= 0) {
          updatedClassHours[existingHourIndex] = {
            ...updatedClassHours[existingHourIndex],
            hours,
          };
        } else {
          // Добавляем новую запись (нужно будет получить объекты subject и class)
          // Пока просто обновляем существующую запись
        }

        updatedTeachers[existingIndex] = {
          ...teacher,
          classHours: updatedClassHours,
        };

        return updatedTeachers;
      } else {
        // Создаем новую запись для учителя (нужен оригинальный учитель)
        // Пока просто возвращаем текущий массив
        return prev;
      }
    });
  };

  const hasChanges = useMemo(() => changedTeachers.length > 0, [changedTeachers]);

  return (
    <WorkloadContext.Provider
      value={{
        changedTeachers,
        addChangedTeacher,
        removeChangedTeacher,
        clearChangedTeachers,
        updateTeacherHours,
        hasChanges,
      }}
    >
      {children}
    </WorkloadContext.Provider>
  );
};
