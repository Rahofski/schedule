'use client';
import React, { useState, useMemo } from 'react';
import { TeacherInfoContext } from './TeacherInfoContext';
import { BaseTeacher } from '@/lib/types/teachers';

interface TeacherInfoProviderProps {
  children: React.ReactNode;
}

export const TeacherInfoProvider: React.FC<TeacherInfoProviderProps> = ({ children }) => {
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

  const hasChanges = useMemo(() => changedTeachers.length > 0, [changedTeachers]);

  return (
    <TeacherInfoContext.Provider
      value={{
        changedTeachers,
        addChangedTeacher,
        removeChangedTeacher,
        clearChangedTeachers,
        hasChanges,
      }}
    >
      {children}
    </TeacherInfoContext.Provider>
  );
};
