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

export interface ClassDeletionDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDelete: () => void;
  count?: number;
}

export const ClassDeletionDialog = ({ isOpen, setIsOpen, onDelete, count }: ClassDeletionDialogProps) => {
  const isMultiple = count && count > 1;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isMultiple ? 'Удалить классы?' : 'Удалить класс?'}</DialogTitle>
          <DialogDescription>
            {isMultiple ? `Будут удалены ${count} выбранных классов` : 'Будет удалён выбранный класс'}
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
