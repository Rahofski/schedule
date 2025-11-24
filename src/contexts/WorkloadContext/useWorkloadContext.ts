'use client';

import { useContext } from 'react';

import { WorkloadContext } from './WorkloadContext';

export const useWorkloadContext = () => {
  return useContext(WorkloadContext);
};
