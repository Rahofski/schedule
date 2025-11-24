import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SubjectsService } from '@/api';

// Получить список предметов
export const useGetSubjectsQuery = () =>
  useQuery({
    queryKey: [SubjectsService.CACHE_TAGS.Subjects],
    queryFn: SubjectsService.getSubjects,
  });

// Создать предмет
export const useCreateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: { name: string }) => SubjectsService.createSubject(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SubjectsService.CACHE_TAGS.Subjects] });
    },
  });
};

// Удалить предмет
export const useDeleteSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => SubjectsService.deleteSubject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SubjectsService.CACHE_TAGS.Subjects] });
    },
  });
};
