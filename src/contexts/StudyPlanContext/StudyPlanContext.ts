'use client';

import { createContext } from 'react';
import { AppClass } from '@/lib/types/classes';

export interface StudyPlanContextType {
  changedClasses: AppClass[];
  addChangedClass: (classItem: AppClass) => void;
  removeChangedClass: (classId: string) => void;
  clearChangedClasses: () => void;
  hasChanges: boolean;
}

export const StudyPlanContext = createContext<StudyPlanContextType>({
  changedClasses: [],
  addChangedClass: () => {},
  removeChangedClass: () => {},
  clearChangedClasses: () => {},
  hasChanges: false,
});
