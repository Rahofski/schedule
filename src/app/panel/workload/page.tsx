import { WorkloadProvider } from '@/contexts/WorkloadContext/WorkloadProvider';
import { WorkloadFrame } from '@/frames/WorkloadFrame';

export default function WorkloadPage() {
  return (
    <WorkloadProvider>
      <div className='container mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-6'>Учебная нагрузка</h1>
        <WorkloadFrame />
      </div>
    </WorkloadProvider>
  );
}
