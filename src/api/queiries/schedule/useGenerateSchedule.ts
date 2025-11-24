import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AutoGenerateScheduleService } from '@/api/services/schedule';
import { toast } from 'sonner';

export function useGenerateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AutoGenerateScheduleService.generateSchedule(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule'] });
      toast.success('Расписание успешно сгенерировано!');
    },
    onError: (error: Error) => {
      toast.error(`Ошибка генерации расписания: ${error.message}`);
    },
  });
}
