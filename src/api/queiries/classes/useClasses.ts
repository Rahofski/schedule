import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ClassesService } from '@/api';
import { AppClass } from '@/lib/types/classes';

// Получить список классов
export const useGetClassesQuery = () => {
  // eslint-disable-next-line no-console
  console.log('[useGetClassesQuery] Hook called');

  return useQuery({
    queryKey: [ClassesService.CACHE_TAGS.Classes],
    queryFn: async () => {
      // eslint-disable-next-line no-console
      console.log('[useGetClassesQuery] Fetching classes...');
      const result = await ClassesService.getClasses();
      // eslint-disable-next-line no-console
      console.log('[useGetClassesQuery] Fetched classes:', result);
      return result;
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
};

// Создать класс
export const useCreateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: { name: string }) => ClassesService.createClass(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ClassesService.CACHE_TAGS.Classes] });
      await queryClient.refetchQueries({ queryKey: [ClassesService.CACHE_TAGS.Classes] });
    },
  });
};

// Удалить класс
export const useDeleteClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ClassesService.deleteClass(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ClassesService.CACHE_TAGS.Classes] });
      await queryClient.refetchQueries({ queryKey: [ClassesService.CACHE_TAGS.Classes] });
    },
  });
};

// Массовое обновление классов
export const useBulkUpdateClasses = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (classes: AppClass[]) => ClassesService.bulkUpdateClasses(classes),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ClassesService.CACHE_TAGS.Classes] });
      await queryClient.refetchQueries({ queryKey: [ClassesService.CACHE_TAGS.Classes] });
    },
  });
};
