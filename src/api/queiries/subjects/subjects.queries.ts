import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SubjectsService } from '@/api';

// Получить список предметов
export const useGetSubjectsQuery = () => {
  // eslint-disable-next-line no-console
  console.log('[useGetSubjectsQuery] Hook called');

  return useQuery({
    queryKey: [SubjectsService.CACHE_TAGS.Subjects],
    queryFn: async () => {
      // eslint-disable-next-line no-console
      console.log('[useGetSubjectsQuery] Fetching subjects...');
      const result = await SubjectsService.getSubjects();
      // eslint-disable-next-line no-console
      console.log('[useGetSubjectsQuery] Fetched subjects:', result);
      return result;
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
};

// Создать предмет
export const useCreateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: { name: string }) => SubjectsService.createSubject(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SubjectsService.CACHE_TAGS.Subjects] });
      await queryClient.refetchQueries({ queryKey: [SubjectsService.CACHE_TAGS.Subjects] });
    },
  });
};

// Удалить предмет
export const useDeleteSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => SubjectsService.deleteSubject(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SubjectsService.CACHE_TAGS.Subjects] });
      await queryClient.refetchQueries({ queryKey: [SubjectsService.CACHE_TAGS.Subjects] });
    },
  });
};
