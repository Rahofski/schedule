'use client';

import { useContext } from 'react';

import { TeacherInfoContext } from './TeacherInfoContext';

export const useTeacherInfoContext = () => {
  return useContext(TeacherInfoContext);
};
