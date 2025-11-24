import { Button } from '@/components/ui/shadcn/button';
import { Plus } from 'lucide-react';

export interface ClassAddButtonProps {
  onAdd: () => void;
}

export function ClassAddButton({ onAdd }: ClassAddButtonProps) {
  return (
    <Button
      variant='default'
      className='cursor-pointer'
      size='icon'
      title='Добавить класс'
      onClick={onAdd}
      data-test-id='add-Class'
    >
      <Plus />
    </Button>
  );
}
