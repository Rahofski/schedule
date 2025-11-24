import { TeachersService } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Создать
export const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: {
      firstName: string;
      lastName: string;
      patronymic: string | null;
      email: string;
      phone: string;
    }) => TeachersService.createTeacher(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TeachersService.CACHE_TAGS.Teachers] });
    },
  });
};

// Удалить
export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => TeachersService.deleteTeacher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TeachersService.CACHE_TAGS.Teachers] });
    },
  });
};
