'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/shadcn/dialog';
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { useForm } from 'react-hook-form';
import { useCreateClass } from '@/api/queiries/classes';

interface ClassCreateDialogProps {
  open: boolean;
  onClose: () => void;
}

type CreateClassDto = {
  name: string;
};

export function ClassCreateDialog({ open, onClose }: ClassCreateDialogProps) {
  const { register, handleSubmit, reset } = useForm<CreateClassDto>();
  const createClass = useCreateClass();

  const onSubmit = (data: CreateClassDto) => {
    createClass.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить класс</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <Input
            placeholder='Название класса'
            {...register('name', { required: true })}
          />
          <DialogFooter>
            <Button
              type='submit'
              variant='default'
            >
              Добавить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
