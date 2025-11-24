import { ScheduleService } from '@/api/services';
import { ScheduleSlot } from '@/lib/types/schedule';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Получить расписание
export const useGetScheduleQuery = () => {
  return useQuery({
    queryKey: [ScheduleService.CACHE_TAGS.Schedule],
    queryFn: () => ScheduleService.getSchedule(),
  });
};

// Сохранить расписание
export const useSaveSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slots: ScheduleSlot[]) => ScheduleService.saveSchedule(slots),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ScheduleService.CACHE_TAGS.Schedule] });
    },
  });
};
