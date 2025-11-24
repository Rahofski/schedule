'use client';

import { useContext } from 'react';

import { StudyPlanContext } from './StudyPlanContext';

export const useStudyPlanContext = () => {
  return useContext(StudyPlanContext);
};
