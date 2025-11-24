import { TeacherInfoProvider } from '@/contexts/TeacherInfoContext/TeacherInfoProvider';
import { TeachersInfoFrame } from '@/frames/TeachersInfoFrame';

export default function TeachersInfoPage() {
  return (
    <TeacherInfoProvider>
      <div className='container mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-6'>Преподаватели</h1>
        <TeachersInfoFrame />
      </div>
    </TeacherInfoProvider>
  );
}
