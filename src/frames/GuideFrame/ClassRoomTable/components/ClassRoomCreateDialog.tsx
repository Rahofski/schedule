'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/shadcn/dialog';
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { useForm } from 'react-hook-form';
import { useCreateClassRoom } from '@/api/queiries/classrooms';

interface ClassRoomCreateDialogProps {
  open: boolean;
  onClose: () => void;
}

type CreateClassRoomDto = {
  name: string;
};

export function ClassRoomCreateDialog({ open, onClose }: ClassRoomCreateDialogProps) {
  const { register, handleSubmit, reset } = useForm<CreateClassRoomDto>();
  const createClassRoom = useCreateClassRoom();

  const onSubmit = (data: CreateClassRoomDto) => {
    createClassRoom.mutate(data, {
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
          <DialogTitle>Добавить кабинет</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <Input
            placeholder='Название кабинета'
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
