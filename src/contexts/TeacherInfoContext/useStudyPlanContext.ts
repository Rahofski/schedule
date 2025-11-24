'use client';

import { useContext } from 'react';
import { StudyPlanContext } from '../StudyPlanContext/StudyPlanContext';

export const useStudyPlanContext = () => {
  return useContext(StudyPlanContext);
};
