import { TeachersService } from '@/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BaseTeacher } from '@/lib/types/teachers';
// Массовое обновление преподавателей
export const useBulkUpdateTeachers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: BaseTeacher[]) => TeachersService.bulkUpdateTeachers(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TeachersService.CACHE_TAGS.Teachers] });
    },
  });
};

// Получить список
export const useGetTeachersQuery = () =>
  useQuery({
    queryKey: [TeachersService.CACHE_TAGS.Teachers],
    queryFn: TeachersService.getTeachers,
  });

export const useGetLightTeachersQuery = () =>
  useQuery({
    queryKey: [TeachersService.CACHE_TAGS.LightTeachers],
    queryFn: TeachersService.getTeachers,
  });
