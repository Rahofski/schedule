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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ClassesService.CACHE_TAGS.Classes] });
    },
  });
};

// Удалить класс
export const useDeleteClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // eslint-disable-next-line no-console
      console.log('[useDeleteClass] Deleting class:', id);
      await ClassesService.deleteClass(id);
    },
    onSuccess: async () => {
      // eslint-disable-next-line no-console
      console.log('[useDeleteClass] Success, refetching...');
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ClassesService.CACHE_TAGS.Classes] });
    },
  });
};
