import { ClassesService } from '@/api/services';
import { AppClass } from '@/lib/types/classes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Получить учебный план
export const useGetStudyPlanQuery = () => {
  return useQuery({
    queryKey: ['study-plan'],
    queryFn: () => ClassesService.getClasses(),
  });
};

// Массовое обновление учебного плана
export const useBulkUpdateStudyPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (classes: AppClass[]) => ClassesService.bulkUpdateClasses(classes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study-plan'] });
    },
  });
};
