'use client';

import { useDeleteClass, useGetClassesQuery } from '@/api/queiries/classes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/shadcn/table';
import { useState } from 'react';
import { ClassAddButton } from './components/ClassAddButton';
import { ClassCreateDialog } from './components/ClassCreateDialog';
import { ClassDeletionDialog } from './components/ClassDeletionDialog';
import { ClassTableRow } from './components/ClassTableRow';
import { Button } from '@/components/ui/shadcn/button';
import { Checkbox } from '@/components/ui/shadcn/checkbox';

export function ClassTableFrame() {
  const { data: apiData } = useGetClassesQuery();
  const deleteClass = useDeleteClass();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<string | null>(null);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const displayedClasses = showAll ? apiData : apiData?.slice(0, 10);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedClasses(displayedClasses?.map(c => c.id) || []);
    } else {
      setSelectedClasses([]);
    }
  };

  const handleBulkDelete = () => {
    selectedClasses.forEach(id => deleteClass.mutate(id));
    setSelectedClasses([]);
    setIsDeleteDialogOpen(false);
  };

  // Моки — используются если с API ничего не пришло

  const handleDeleteConfirm = () => {
    if (selectedClasses.length > 0) {
      handleBulkDelete();
    } else if (classToDelete) {
      deleteClass.mutate(classToDelete);
      setClassToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Классы</CardTitle>
        <div className='flex items-center gap-2'>
          {selectedClasses.length > 0 && (
            <Button
              variant='destructive'
              size='sm'
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Удалить выбранные ({selectedClasses.length})
            </Button>
          )}
          <ClassAddButton onAdd={() => setIsCreateDialogOpen(true)} />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-12'>
                <Checkbox
                  checked={
                    displayedClasses &&
                    displayedClasses.length > 0 &&
                    selectedClasses.length === displayedClasses.length
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Кл. рук.</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedClasses?.map((classItem, index) => (
              <ClassTableRow
                key={classItem.id}
                classItem={classItem}
                isSelected={selectedClasses.includes(classItem.id)}
                onToggleSelect={(id: string) => {
                  setSelectedClasses(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
                }}
                onDelete={() => {
                  setClassToDelete(classItem.id);
                  setIsDeleteDialogOpen(true);
                }}
                isEven={index % 2 === 0}
              />
            ))}
          </TableBody>
        </Table>
        {apiData && apiData.length > 10 && (
          <div className='mt-4 flex justify-center'>
            <Button
              variant='outline'
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Показать первые 10' : 'Показать все'}
            </Button>
          </div>
        )}
      </CardContent>
      <ClassCreateDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
      <ClassDeletionDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        onDelete={handleDeleteConfirm}
        count={selectedClasses.length > 0 ? selectedClasses.length : undefined}
      />
    </Card>
  );
}
