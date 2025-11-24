'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/shadcn/dialog';
import { Trash2 } from 'lucide-react';

interface ScheduleClearButtonProps {
  onClear: () => void;
  hasLessons: boolean;
}

export function ScheduleClearButton({ onClear, hasLessons }: ScheduleClearButtonProps) {
  const [open, setOpen] = useState(false);

  if (!hasLessons) {
    return null;
  }

  const handleConfirm = () => {
    onClear();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='gap-2'
        >
          <Trash2 className='h-4 w-4' />
          Очистить расписание
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Очистить расписание?</DialogTitle>
          <DialogDescription>
            Это действие удалит все уроки из расписания. Отменить это действие будет невозможно.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => setOpen(false)}
          >
            Отмена
          </Button>
          <Button
            variant='destructive'
            onClick={handleConfirm}
          >
            Очистить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
