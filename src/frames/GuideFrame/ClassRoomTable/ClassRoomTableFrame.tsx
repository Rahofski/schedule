'use client';

import { useDeleteClassRoom, useGetClassRoomsQuery } from '@/api/queiries/classrooms';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/shadcn/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { ClassRoomAddButton } from './components/ClassRoomAddButton';
import { useState } from 'react';
import { ClassRoomCreateDialog } from './components/ClassRoomCreateDialog';
import { ClassRoomDeletionDialog } from './components/ClassRoomDeletionDialog';
import { ClassRoomTableRow } from './components/ClassRoomTableRow';
import { Button } from '@/components/ui/shadcn/button';
import { Checkbox } from '@/components/ui/shadcn/checkbox';

export function ClassRoomTableFrame() {
  const { data: apiData } = useGetClassRoomsQuery();
  const deleteClassRoom = useDeleteClassRoom();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [classRoomToDelete, setClassRoomToDelete] = useState<string | null>(null);
  const [selectedClassRooms, setSelectedClassRooms] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const data = apiData && apiData.length > 0 ? apiData : [];
  const displayedClassRooms = showAll ? data : data.slice(0, 5);
  const hasMoreClassRooms = data.length > 5;

  const handleDeleteConfirm = () => {
    if (classRoomToDelete) {
      if (selectedClassRooms.length > 0) {
        // Добавить classRoomToDelete к selectedClassRooms, если не включен
        const allToDelete = selectedClassRooms.includes(classRoomToDelete)
          ? selectedClassRooms
          : [...selectedClassRooms, classRoomToDelete];
        allToDelete.forEach(id => deleteClassRoom.mutate(id));
        setSelectedClassRooms([]);
      } else {
        deleteClassRoom.mutate(classRoomToDelete);
      }
      setClassRoomToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleToggleSelect = (classRoomId: string) => {
    setSelectedClassRooms(prev =>
      prev.includes(classRoomId) ? prev.filter(id => id !== classRoomId) : [...prev, classRoomId]
    );
  };

  const handleSelectAll = () => {
    const currentDisplayed = displayedClassRooms;
    const displayedIds = currentDisplayed.map(c => c.id);

    if (
      selectedClassRooms.length === currentDisplayed.length &&
      currentDisplayed.every(c => selectedClassRooms.includes(c.id))
    ) {
      // Если выбраны все показанные, снимаем выбор
      setSelectedClassRooms([]);
    } else {
      // Выбираем всех показанных
      setSelectedClassRooms(displayedIds);
    }
  };

  const handleBulkDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCancelSelection = () => {
    setSelectedClassRooms([]);
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Кабинеты</CardTitle>
        {selectedClassRooms.length > 0 ? (
          <div className='flex gap-2'>
            <Button
              onClick={handleBulkDelete}
              variant='destructive'
            >
              Удалить
            </Button>
            <Button
              onClick={handleCancelSelection}
              variant='outline'
            >
              Отменить
            </Button>
          </div>
        ) : (
          <ClassRoomAddButton onAdd={() => setIsCreateDialogOpen(true)} />
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={
                    displayedClassRooms &&
                    displayedClassRooms.length > 0 &&
                    displayedClassRooms.every(c => selectedClassRooms.includes(c.id))
                  }
                  onCheckedChange={handleSelectAll}
                  className={
                    displayedClassRooms &&
                    displayedClassRooms.length > 0 &&
                    displayedClassRooms.every(c => selectedClassRooms.includes(c.id)) &&
                    !showAll
                      ? 'bg-blue-100 border-blue-300'
                      : ''
                  }
                />
              </TableHead>
              <TableHead>Название</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedClassRooms.map((classRoom, index) => (
              <ClassRoomTableRow
                key={classRoom.id}
                classRoom={classRoom}
                isSelected={selectedClassRooms.includes(classRoom.id)}
                onToggleSelect={() => handleToggleSelect(classRoom.id)}
                onDelete={() => {
                  setClassRoomToDelete(classRoom.id);
                  setIsDeleteDialogOpen(true);
                }}
                isEven={index % 2 === 0}
              />
            ))}
          </TableBody>
        </Table>
        {hasMoreClassRooms && !showAll && (
          <div className='mt-4 text-center'>
            <Button
              onClick={() => setShowAll(true)}
              variant='outline'
            >
              Показать всех ({data.length})
            </Button>
          </div>
        )}
      </CardContent>
      <ClassRoomCreateDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
      <ClassRoomDeletionDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        onDelete={handleDeleteConfirm}
        count={
          classRoomToDelete
            ? selectedClassRooms.length > 0
              ? selectedClassRooms.includes(classRoomToDelete)
                ? selectedClassRooms.length
                : selectedClassRooms.length + 1
              : 1
            : selectedClassRooms.length
        }
      />
    </Card>
  );
}
