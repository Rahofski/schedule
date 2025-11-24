'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/shadcn/dialog';
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { useForm } from 'react-hook-form';
import { useCreateTeacher } from '@/api';

interface TeacherCreateDialogProps {
  open: boolean;
  onClose: () => void;
}

type CreateTeacherDto = {
  firstName: string;
  lastName: string;
  patronymic: string | null;
  email: string;
  phone: string;
};

export function TeacherCreateDialog({ open, onClose }: TeacherCreateDialogProps) {
  const { register, handleSubmit, reset } = useForm<CreateTeacherDto>();
  const createTeacher = useCreateTeacher();

  const onSubmit = (data: CreateTeacherDto) => {
    createTeacher.mutate(data, {
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
          <DialogTitle>Добавить преподавателя</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <Input
            placeholder='Фамилия'
            {...register('lastName', { required: true })}
          />
          <Input
            placeholder='Имя'
            {...register('firstName', { required: true })}
          />
          <Input
            placeholder='Отчество (опционально)'
            {...register('patronymic')}
          />

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
            >
              Отмена
            </Button>
            <Button
              type='submit'
              disabled={createTeacher.isPending}
            >
              {createTeacher.isPending ? 'Сохраняем...' : 'Сохранить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
