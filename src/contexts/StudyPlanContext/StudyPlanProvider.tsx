'use client';
import React, { useState, useMemo } from 'react';
import { StudyPlanContext } from './StudyPlanContext';
import { AppClass } from '@/lib/types/classes';

interface StudyPlanProviderProps {
  children: React.ReactNode;
}

export const StudyPlanProvider: React.FC<StudyPlanProviderProps> = ({ children }) => {
  const [changedClasses, setChangedClasses] = useState<AppClass[]>([]);

  const addChangedClass = (classItem: AppClass) => {
    setChangedClasses(prev => {
      // Удаляем старую версию если есть, добавляем новую
      const filtered = prev.filter(c => c.id !== classItem.id);
      return [...filtered, classItem];
    });
  };

  const removeChangedClass = (classId: string) => {
    setChangedClasses(prev => prev.filter(c => c.id !== classId));
  };

  const clearChangedClasses = () => {
    setChangedClasses([]);
  };

  const hasChanges = useMemo(() => changedClasses.length > 0, [changedClasses]);

  return (
    <StudyPlanContext.Provider
      value={{
        changedClasses,
        addChangedClass,
        removeChangedClass,
        clearChangedClasses,
        hasChanges,
      }}
    >
      {children}
    </StudyPlanContext.Provider>
  );
};
