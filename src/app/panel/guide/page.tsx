'use client';

import { ClassRoomTableFrame } from '@/frames/GuideFrame/ClassRoomTable/ClassRoomTableFrame';
import { ClassTableFrame } from '@/frames/GuideFrame/ClassTable/ClassTableFrame';
import { SubjectTableFrame } from '@/frames/GuideFrame/SubjectTable/SubjectTableFrame';
import { TeachersTableFrame } from '@/frames/GuideFrame/TeachersTable/TeachersFrame';

export default function GuidePage() {
  return (
    <div className='space-y-6 p-6'>
      <div className='container mx-auto p-6 flex flex-col gap-10'>
        <h1 className='text-2xl font-bold mb-6'>Справочники</h1>
        <SubjectTableFrame></SubjectTableFrame>

        {/* Учителя */}
        <TeachersTableFrame />

        {/* Классы */}
        <ClassTableFrame></ClassTableFrame>

        {/* Кабинеты */}
        <ClassRoomTableFrame></ClassRoomTableFrame>
      </div>
      {/* Предметы */}
    </div>
  );
}
