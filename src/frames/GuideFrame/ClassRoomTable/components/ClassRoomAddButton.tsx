import { Button } from '@/components/ui/shadcn/button';
import { Plus } from 'lucide-react';

export interface ClassRoomAddButtonProps {
  onAdd: () => void;
}

export function ClassRoomAddButton({ onAdd }: ClassRoomAddButtonProps) {
  return (
    <Button
      variant='default'
      className='cursor-pointer'
      size='icon'
      title='Добавить кабинет'
      onClick={onAdd}
      data-test-id='add-ClassRoom'
    >
      <Plus />
    </Button>
  );
}
