import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ClassRoomsService } from '@/api';

// Получить список кабинетов
export const useGetClassRoomsQuery = () => {
  // eslint-disable-next-line no-console
  console.log('[useGetClassRoomsQuery] Hook called');

  return useQuery({
    queryKey: [ClassRoomsService.CACHE_TAGS.ClassRooms],
    queryFn: async () => {
      // eslint-disable-next-line no-console
      console.log('[useGetClassRoomsQuery] Fetching classrooms...');
      const result = await ClassRoomsService.getClassRooms();
      // eslint-disable-next-line no-console
      console.log('[useGetClassRoomsQuery] Fetched classrooms:', result);
      return result;
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
};

// Создать кабинет
export const useCreateClassRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: { name: string }) => ClassRoomsService.createClassRoom(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ClassRoomsService.CACHE_TAGS.ClassRooms] });
      await queryClient.refetchQueries({ queryKey: [ClassRoomsService.CACHE_TAGS.ClassRooms] });
    },
  });
};

// Удалить кабинет
export const useDeleteClassRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ClassRoomsService.deleteClassRoom(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [ClassRoomsService.CACHE_TAGS.ClassRooms] });
      await queryClient.refetchQueries({ queryKey: [ClassRoomsService.CACHE_TAGS.ClassRooms] });
    },
  });
};
