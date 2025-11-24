'use client';

import { useDeleteTeacher, useGetLightTeachersQuery } from '@/api';
import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { Checkbox } from '@/components/ui/shadcn/checkbox';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/shadcn/table';
import clsx from 'clsx';
import { useState } from 'react';
import { TeacherAddButton } from './components/TeacherAddButton';
import { TeacherCreateDialog } from './components/TeacherCreateDialog';
import { TeacherDeletionDialog } from './components/TeacherDeletionDialog';
import { TeacherTableRow } from './components/TeacherTableRow';

export function TeachersTableFrame() {
  const { data: apiData } = useGetLightTeachersQuery();
  const deleteTeacher = useDeleteTeacher();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState<string | null>(null);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const displayedTeachers = showAll ? apiData : apiData?.slice(0, 5);
  const hasMoreTeachers = (apiData?.length || 0) > 5;

  const handleDeleteConfirm = () => {
    if (teacherToDelete) {
      if (selectedTeachers.length > 0) {
        // Добавить teacherToDelete к selectedTeachers, если не включен
        const allToDelete = selectedTeachers.includes(teacherToDelete)
          ? selectedTeachers
          : [...selectedTeachers, teacherToDelete];
        allToDelete.forEach(id => deleteTeacher.mutate(id));
        setSelectedTeachers([]);
      } else {
        deleteTeacher.mutate(teacherToDelete);
      }
      setTeacherToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleToggleSelect = (teacherId: string) => {
    setSelectedTeachers(prev =>
      prev.includes(teacherId) ? prev.filter(id => id !== teacherId) : [...prev, teacherId]
    );
  };

  const handleSelectAll = () => {
    const currentDisplayed = displayedTeachers || [];
    const displayedIds = currentDisplayed.map(t => t.id);

    if (
      selectedTeachers.length === currentDisplayed.length &&
      currentDisplayed.every(t => selectedTeachers.includes(t.id))
    ) {
      // Если выбраны все показанные, снимаем выбор
      setSelectedTeachers([]);
    } else {
      // Выбираем всех показанных
      setSelectedTeachers(displayedIds);
    }
  };

  const handleBulkDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCancelSelection = () => {
    setSelectedTeachers([]);
  };

  return (
    <div>
      <TeacherCreateDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
      <TeacherDeletionDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        onDelete={handleDeleteConfirm}
        count={
          teacherToDelete
            ? selectedTeachers.length > 0
              ? selectedTeachers.includes(teacherToDelete)
                ? selectedTeachers.length
                : selectedTeachers.length + 1
              : 1
            : selectedTeachers.length
        }
      />

      <div className={clsx('overflow-x-auto')}>
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle>Учителя</CardTitle>
              {selectedTeachers.length > 0 ? (
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
                <TeacherAddButton onAdd={() => setIsCreateDialogOpen(true)} />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Checkbox
                      checked={
                        displayedTeachers &&
                        displayedTeachers.length > 0 &&
                        displayedTeachers.every(t => selectedTeachers.includes(t.id))
                      }
                      onCheckedChange={handleSelectAll}
                      className={
                        displayedTeachers &&
                        displayedTeachers.length > 0 &&
                        displayedTeachers.every(t => selectedTeachers.includes(t.id)) &&
                        !showAll
                          ? 'bg-blue-100 border-blue-300'
                          : ''
                      }
                    />
                  </TableHead>
                  <TableHead>ФИО</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {displayedTeachers?.map((teacher, index) => (
                  <TeacherTableRow
                    key={teacher.id}
                    teacher={teacher}
                    isSelected={selectedTeachers.includes(teacher.id)}
                    onToggleSelect={() => handleToggleSelect(teacher.id)}
                    onDelete={() => {
                      setTeacherToDelete(teacher.id);
                      setIsDeleteDialogOpen(true);
                    }}
                    isEven={index % 2 === 0}
                  />
                ))}
              </TableBody>
            </Table>
            {hasMoreTeachers && !showAll && (
              <div className='mt-4 text-center'>
                <Button
                  onClick={() => setShowAll(true)}
                  variant='outline'
                >
                  Показать всех ({apiData?.length})
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
