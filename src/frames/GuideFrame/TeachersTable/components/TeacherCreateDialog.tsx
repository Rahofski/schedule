'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/shadcn/dialog';
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { useForm } from 'react-hook-form';
import { useCreateTeacher } from '@/api';
import { CreateTeacherDto } from '@/lib/dtos/teachers';

interface TeacherCreateDialogProps {
  open: boolean;
  onClose: () => void;
}

export function TeacherCreateDialog({ open, onClose }: TeacherCreateDialogProps) {
  const { register, handleSubmit, reset } = useForm<CreateTeacherDto>({
    defaultValues: {
      firstName: '',
      lastName: '',
      patronymic: null,
    },
  });
  const createTeacher = useCreateTeacher();

  const onSubmit = (data: CreateTeacherDto) => {
    const payload: CreateTeacherDto = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      patronymic: data.patronymic?.trim() ? data.patronymic.trim() : null,
    };

    createTeacher.mutate(payload, {
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
          <DialogDescription className='sr-only'>Форма создания преподавателя</DialogDescription>
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
