import { Button } from '@/components/ui/shadcn/button';
import { Plus } from 'lucide-react';

export interface SubjectAddButtonProps {
  onAdd: () => void;
}

export function SubjectAddButton({ onAdd }: SubjectAddButtonProps) {
  return (
    <Button
      variant='default'
      className='cursor-pointer'
      size='icon'
      title='Добавить предмет'
      onClick={onAdd}
      data-test-id='add-Subject'
    >
      <Plus />
    </Button>
  );
}
