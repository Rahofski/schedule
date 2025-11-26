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
export const useGetTeachersQuery = () => {
  // eslint-disable-next-line no-console
  console.log('[useGetTeachersQuery] Hook called');

  return useQuery({
    queryKey: [TeachersService.CACHE_TAGS.Teachers],
    queryFn: async () => {
      // eslint-disable-next-line no-console
      console.log('[useGetTeachersQuery] Fetching teachers...');
      const result = await TeachersService.getTeachers();
      // eslint-disable-next-line no-console
      console.log('[useGetTeachersQuery] Fetched teachers:', result);
      return result;
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
};

export const useGetLightTeachersQuery = () =>
  useQuery({
    queryKey: [TeachersService.CACHE_TAGS.LightTeachers],
    queryFn: TeachersService.getTeachers,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
