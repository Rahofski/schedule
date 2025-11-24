import { Button } from '@/components/ui/shadcn/button';
import { UserPlus } from 'lucide-react';

export interface TeacherAddButtonProps {
  onAdd: () => void;
}

export function TeacherAddButton({ onAdd }: TeacherAddButtonProps) {
  return (
    <Button
      variant='default'
      className='cursor-pointer'
      size='icon'
      title='Добавить учителя'
      onClick={onAdd}
      data-test-id='add-Teacher'
    >
      <UserPlus />
    </Button>
  );
}
