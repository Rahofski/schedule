'use client';
import React from 'react';
import { BaseTeacher } from '@/lib/types/teachers';

export interface IWorkloadContext {
  changedTeachers: BaseTeacher[];
  addChangedTeacher: (teacher: BaseTeacher) => void;
  removeChangedTeacher: (teacherId: string) => void;
  clearChangedTeachers: () => void;
  updateTeacherHours: (teacherId: string, subjectId: string, classId: string, hours: number) => void;
  hasChanges: boolean;
}

export const WorkloadContext = React.createContext<IWorkloadContext>({
  changedTeachers: [],
  addChangedTeacher: () => {},
  removeChangedTeacher: () => {},
  clearChangedTeachers: () => {},
  updateTeacherHours: () => {},
  hasChanges: false,
});
