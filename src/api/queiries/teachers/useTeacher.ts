import { TeachersService } from '@/api';
import { CreateTeacherDto } from '@/lib/dtos/teachers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Создать
export const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateTeacherDto) => TeachersService.createTeacher(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TeachersService.CACHE_TAGS.Teachers] });
      await queryClient.invalidateQueries({ queryKey: [TeachersService.CACHE_TAGS.LightTeachers] });
      await queryClient.refetchQueries({ queryKey: [TeachersService.CACHE_TAGS.Teachers] });
      await queryClient.refetchQueries({ queryKey: [TeachersService.CACHE_TAGS.LightTeachers] });
    },
  });
};

// Удалить
export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => TeachersService.deleteTeacher(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TeachersService.CACHE_TAGS.Teachers] });
      await queryClient.invalidateQueries({ queryKey: [TeachersService.CACHE_TAGS.LightTeachers] });
      await queryClient.refetchQueries({ queryKey: [TeachersService.CACHE_TAGS.Teachers] });
      await queryClient.refetchQueries({ queryKey: [TeachersService.CACHE_TAGS.LightTeachers] });
    },
  });
};
