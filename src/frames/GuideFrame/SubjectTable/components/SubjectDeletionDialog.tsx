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

export interface SubjectDeletionDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDelete: () => void;
  count?: number;
}

export const SubjectDeletionDialog = ({ isOpen, setIsOpen, onDelete, count = 1 }: SubjectDeletionDialogProps) => {
  const isMultiple = count > 1;
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isMultiple ? `Удалить ${count} предметов?` : 'Удалить предмет?'}</DialogTitle>
          <DialogDescription>
            {isMultiple ? `Будут удалены выбранные предметы` : 'Будет удалён выбранный предмет'}
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
