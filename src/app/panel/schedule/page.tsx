import { ScheduleFrame } from '@/frames/ScheduleFrame';

export default function SchedulePage() {
  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Расписание уроков</h1>
      <ScheduleFrame />
    </div>
  );
}
