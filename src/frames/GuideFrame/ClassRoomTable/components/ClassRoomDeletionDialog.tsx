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

export interface ClassRoomDeletionDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDelete: () => void;
  count?: number;
}

export const ClassRoomDeletionDialog = ({ isOpen, setIsOpen, onDelete, count = 1 }: ClassRoomDeletionDialogProps) => {
  const isMultiple = count > 1;
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isMultiple ? `Удалить ${count} кабинетов?` : 'Удалить кабинет?'}</DialogTitle>
          <DialogDescription>
            {isMultiple ? `Будут удалены выбранные кабинеты` : 'Будет удалён выбранный кабинет'}
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
