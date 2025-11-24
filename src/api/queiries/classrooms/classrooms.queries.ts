import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ClassRoomsService } from '@/api';

// Получить список кабинетов
export const useGetClassRoomsQuery = () =>
  useQuery({
    queryKey: [ClassRoomsService.CACHE_TAGS.ClassRooms],
    queryFn: ClassRoomsService.getClassRooms,
  });

// Создать кабинет
export const useCreateClassRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: { name: string }) => ClassRoomsService.createClassRoom(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ClassRoomsService.CACHE_TAGS.ClassRooms] });
    },
  });
};

// Удалить кабинет
export const useDeleteClassRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ClassRoomsService.deleteClassRoom(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ClassRoomsService.CACHE_TAGS.ClassRooms] });
    },
  });
};
