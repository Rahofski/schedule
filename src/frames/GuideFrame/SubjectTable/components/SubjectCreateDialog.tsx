'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/shadcn/dialog';
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { useForm } from 'react-hook-form';
import { useCreateSubject } from '@/api/queiries/subjects';

interface SubjectCreateDialogProps {
  open: boolean;
  onClose: () => void;
}

type CreateSubjectDto = {
  name: string;
};

export function SubjectCreateDialog({ open, onClose }: SubjectCreateDialogProps) {
  const { register, handleSubmit, reset } = useForm<CreateSubjectDto>();
  const createSubject = useCreateSubject();

  const onSubmit = (data: CreateSubjectDto) => {
    createSubject.mutate(data, {
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
          <DialogTitle>Добавить предмет</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <Input
            placeholder='Название предмета'
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
