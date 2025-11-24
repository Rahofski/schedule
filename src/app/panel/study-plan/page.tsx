'use client';

import { StudyPlanProvider } from '@/contexts/StudyPlanContext';
import { StudyPlanFrame } from '@/frames/StudyPlanFrame';

export default function StudyPlanPage() {
  return (
    <StudyPlanProvider>
      <div className='container mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-6'>Учебный план</h1>
        <StudyPlanFrame />
      </div>
    </StudyPlanProvider>
  );
}
