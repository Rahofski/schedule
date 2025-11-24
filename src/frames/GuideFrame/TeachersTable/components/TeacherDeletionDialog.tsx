'use client';

import { Button } from '@/components/ui/shadcn/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/shadcn/dialog';

export interface TeacherDeletionDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDelete: () => void;
  count?: number;
}

export const TeacherDeletionDialog = ({ isOpen, setIsOpen, onDelete, count = 1 }: TeacherDeletionDialogProps) => {
  const isMultiple = count > 1;
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isMultiple ? `Удалить ${count} учителей?` : 'Удалить учителя?'}</DialogTitle>
          <DialogDescription>
            {isMultiple
              ? `Будет удалена вся статистика для выбранных учителей`
              : 'Будет удалена вся статистика для выбранного учителя'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Назад</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              variant='destructive'
              onClick={onDelete}
            >
              Удалить
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
