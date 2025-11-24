'use client';
import React from 'react';
import { BaseTeacher } from '@/lib/types/teachers';

export interface ITeacherInfoContext {
  changedTeachers: BaseTeacher[];
  addChangedTeacher: (teacher: BaseTeacher) => void;
  removeChangedTeacher: (teacherId: string) => void;
  clearChangedTeachers: () => void;
  hasChanges: boolean;
}

export const TeacherInfoContext = React.createContext<ITeacherInfoContext>({
  changedTeachers: [],
  addChangedTeacher: () => {},
  removeChangedTeacher: () => {},
  clearChangedTeachers: () => {},
  hasChanges: false,
});
