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
      queryClient.invalidateQueries({ queryKey: [TeachersService.CACHE_TAGS.LightTeachers] });
    },
  });
};

// Удалить
export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // eslint-disable-next-line no-console
      console.log('[useDeleteTeacher] Deleting teacher:', id);
      await TeachersService.deleteTeacher(id);
    },
    onSuccess: async () => {
      // eslint-disable-next-line no-console
      console.log('[useDeleteTeacher] Success, refetching...');
      await queryClient.invalidateQueries({ queryKey: [TeachersService.CACHE_TAGS.Teachers] });
      await queryClient.invalidateQueries({ queryKey: [TeachersService.CACHE_TAGS.LightTeachers] });
      await queryClient.refetchQueries({ queryKey: [TeachersService.CACHE_TAGS.Teachers] });
      await queryClient.refetchQueries({ queryKey: [TeachersService.CACHE_TAGS.LightTeachers] });
    },
  });
};
