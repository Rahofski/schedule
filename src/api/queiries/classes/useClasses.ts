import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ClassesService } from '@/api';
import { AppClass } from '@/lib/types/classes';

// Получить список классов
export const useGetClassesQuery = () =>
  useQuery({
    queryKey: [ClassesService.CACHE_TAGS.Classes],
    queryFn: ClassesService.getClasses,
  });

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
    mutationFn: (id: string) => ClassesService.deleteClass(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ClassesService.CACHE_TAGS.Classes] });
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
