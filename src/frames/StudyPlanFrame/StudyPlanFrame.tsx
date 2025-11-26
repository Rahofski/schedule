'use client';

import { useGetSubjectsQuery } from '@/api/queiries/subjects';
import { useGetStudyPlanQuery, useBulkUpdateStudyPlan } from '@/api/queiries/study-plan';
import { Button } from '@/components/ui/shadcn/button';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/shadcn/table';
import { StudyPlanTableRow } from './components/StudyPlanTableRow';
import { useStudyPlanContext } from '../../contexts/TeacherInfoContext/useStudyPlanContext';
import { AppClass } from '@/lib/types/classes';

export function StudyPlanFrame() {
  const { data: subjects = [] } = useGetSubjectsQuery();
  const { data: classes = [] } = useGetStudyPlanQuery();

  const { changedClasses, clearChangedClasses, hasChanges, addChangedClass } = useStudyPlanContext();
  const bulkUpdateStudyPlan = useBulkUpdateStudyPlan();

  // Сохранить все изменения
  const handleSaveAll = async () => {
    try {
      await bulkUpdateStudyPlan.mutateAsync(changedClasses);
      clearChangedClasses();
    } catch {
      // Ошибка при сохранении обрабатывается в мутации
    }
  };

  // Обработка изменений в строке таблицы
  const handleRowChange = (subjectId: string, classId: string, hoursPerWeek: number | null) => {
    const classItem = classes.find(c => c.id === classId);
    if (!classItem) {
      return;
    }

    const updatedClass: AppClass = {
      ...classItem,
      subjects: (classItem.subjects || []).map(s =>
        s.subject.id === subjectId ? { ...s, hoursPerWeek: hoursPerWeek || 0 } : s
      ),
    };

    // Если предмета нет в списке, добавляем его
    if (!(classItem.subjects || []).some(s => s.subject.id === subjectId)) {
      const subject = subjects.find(s => s.id === subjectId);
      if (subject && hoursPerWeek !== null) {
        updatedClass.subjects.push({
          subject,
          hoursPerWeek,
        });
      }
    }

    addChangedClass(updatedClass);
  };

  // Обработка изменений разделения на группы
  const handleSplitChange = (subjectId: string, classId: string, split: boolean, crossClassAllowed: boolean) => {
    const classItem = classes.find(c => c.id === classId);
    if (!classItem) {
      return;
    }

    const updatedClass: AppClass = {
      ...classItem,
      subjects: (classItem.subjects || []).map(s => {
        if (s.subject.id === subjectId) {
          if (split) {
            return {
              ...s,
              split: {
                groupsCount: 2,
                crossClassAllowed,
              },
            };
          } else {
            // Убираем split если снят чекбокс
            const { split: _, ...rest } = s;
            return rest;
          }
        }
        return s;
      }),
    };

    addChangedClass(updatedClass);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-end'>
        <Button
          onClick={handleSaveAll}
          disabled={!hasChanges || bulkUpdateStudyPlan.isPending}
        >
          {bulkUpdateStudyPlan.isPending ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Предмет</TableHead>
            {classes.map(classItem => (
              <TableHead key={classItem.id}>{classItem.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject, index) => (
            <StudyPlanTableRow
              key={subject.id}
              subject={subject}
              classes={classes}
              onChange={handleRowChange}
              onSplitChange={handleSplitChange}
              isEven={index % 2 === 0}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
