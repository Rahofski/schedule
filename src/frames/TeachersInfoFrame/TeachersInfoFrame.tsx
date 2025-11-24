'use client';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/shadcn/table';
import { TeachersInfoTableRow } from './components/TeachersInfoTableRow';
import { useGetTeachersQuery, useBulkUpdateTeachers } from '@/api/queiries/teachers';
import { useGetSubjectsQuery } from '@/api/queiries/subjects';
import { useGetClassesQuery } from '@/api/queiries/classes';
import { useGetClassRoomsQuery } from '@/api/queiries/classrooms';
import { Button } from '@/components/ui/shadcn/button';
import { useTeacherInfoContext } from '../../contexts/TeacherInfoContext/useTeacherInfoContext';
import { BaseTeacher } from '@/lib/types/teachers';

export function TeachersInfoFrame() {
  const { data: teachers = [] } = useGetTeachersQuery();
  const { data: subjects = [] } = useGetSubjectsQuery();
  const { data: classes = [] } = useGetClassesQuery();
  const { data: classrooms = [] } = useGetClassRoomsQuery();

  const { changedTeachers, clearChangedTeachers, hasChanges, addChangedTeacher } = useTeacherInfoContext();
  const bulkUpdateTeachers = useBulkUpdateTeachers();

  // Сохранить все изменения
  const handleSaveAll = async () => {
    try {
      await bulkUpdateTeachers.mutateAsync(changedTeachers);
      clearChangedTeachers();
    } catch {
      // Ошибка при сохранении обрабатывается в мутации
    }
  };

  // Обработка изменений в строке таблицы
  const handleRowChange = (row: {
    teacherId: string;
    subjects: string[];
    classId: string | null;
    classroomId: string | null;
  }) => {
    const teacher = teachers.find(t => t.id === row.teacherId);
    if (!teacher) {
      return;
    }

    const updatedTeacher: BaseTeacher = {
      ...teacher,
      subjects: subjects
        .filter(s => row.subjects.includes(s.id))
        .map(subject => ({
          subject,
          hoursPerWeek: null,
        })),
      class: row.classId ? classes.find(c => c.id === row.classId)! : teacher.class,
      classRoom: row.classroomId ? classrooms.find(cr => cr.id === row.classroomId)! : teacher.classRoom,
    };

    addChangedTeacher(updatedTeacher);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-end'>
        <Button
          onClick={handleSaveAll}
          disabled={!hasChanges || bulkUpdateTeachers.isPending}
        >
          {bulkUpdateTeachers.isPending ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ФИО</TableHead>
            <TableHead>Предметы</TableHead>
            <TableHead>Кл. рук.</TableHead>
            <TableHead>Кабинет</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((teacher, index) => (
            <TeachersInfoTableRow
              key={teacher.id}
              teacher={teacher}
              subjects={subjects}
              classes={classes}
              classrooms={classrooms}
              onChange={handleRowChange}
              isEven={index % 2 === 0}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
