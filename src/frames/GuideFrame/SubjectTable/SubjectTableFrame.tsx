'use client';

import { useDeleteSubject, useGetSubjectsQuery } from '@/api/queiries/subjects';
import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { Checkbox } from '@/components/ui/shadcn/checkbox';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/shadcn/table';
import { useState } from 'react';
import { SubjectAddButton } from './components/SubjectAddButton';
import { SubjectCreateDialog } from './components/SubjectCreateDialog';
import { SubjectDeletionDialog } from './components/SubjectDeletionDialog';
import { SubjectTableRow } from './components/SubjectTableRow';

export function SubjectTableFrame() {
  const { data: apiData } = useGetSubjectsQuery();
  const deleteSubject = useDeleteSubject();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const data = apiData || [];
  const displayedSubjects = showAll ? data : data.slice(0, 5);
  const hasMoreSubjects = data.length > 5;

  const handleDeleteConfirm = () => {
    if (subjectToDelete) {
      if (selectedSubjects.length > 0) {
        // Добавить subjectToDelete к selectedSubjects, если не включен
        const allToDelete = selectedSubjects.includes(subjectToDelete)
          ? selectedSubjects
          : [...selectedSubjects, subjectToDelete];
        allToDelete.forEach(id => deleteSubject.mutate(id));
        setSelectedSubjects([]);
      } else {
        deleteSubject.mutate(subjectToDelete);
      }
      setSubjectToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleToggleSelect = (subjectId: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subjectId) ? prev.filter(id => id !== subjectId) : [...prev, subjectId]
    );
  };

  const handleSelectAll = () => {
    const currentDisplayed = displayedSubjects;
    const displayedIds = currentDisplayed.map(s => s.id);

    if (
      selectedSubjects.length === currentDisplayed.length &&
      currentDisplayed.every(s => selectedSubjects.includes(s.id))
    ) {
      // Если выбраны все показанные, снимаем выбор
      setSelectedSubjects([]);
    } else {
      // Выбираем всех показанных
      setSelectedSubjects(displayedIds);
    }
  };

  const handleBulkDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCancelSelection = () => {
    setSelectedSubjects([]);
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Предметы</CardTitle>
        {selectedSubjects.length > 0 ? (
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
          <SubjectAddButton onAdd={() => setIsCreateDialogOpen(true)} />
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={
                    displayedSubjects &&
                    displayedSubjects.length > 0 &&
                    displayedSubjects.every(s => selectedSubjects.includes(s.id))
                  }
                  onCheckedChange={handleSelectAll}
                  className={
                    displayedSubjects &&
                    displayedSubjects.length > 0 &&
                    displayedSubjects.every(s => selectedSubjects.includes(s.id)) &&
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
            {displayedSubjects.map((subject, index) => (
              <SubjectTableRow
                key={subject.id}
                subject={subject}
                isSelected={selectedSubjects.includes(subject.id)}
                onToggleSelect={() => handleToggleSelect(subject.id)}
                onDelete={() => {
                  setSubjectToDelete(subject.id);
                  setIsDeleteDialogOpen(true);
                }}
                isEven={index % 2 === 0}
              />
            ))}
          </TableBody>
        </Table>
        {hasMoreSubjects && !showAll && (
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
      <SubjectCreateDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
      <SubjectDeletionDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        onDelete={handleDeleteConfirm}
        count={
          subjectToDelete
            ? selectedSubjects.length > 0
              ? selectedSubjects.includes(subjectToDelete)
                ? selectedSubjects.length
                : selectedSubjects.length + 1
              : 1
            : selectedSubjects.length
        }
      />
    </Card>
  );
}
