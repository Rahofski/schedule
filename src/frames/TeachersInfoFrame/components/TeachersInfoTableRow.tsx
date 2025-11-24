'use client';

import { TableRow, TableCell } from '@/components/ui/shadcn/table';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/shadcn/select';
import { Button } from '@/components/ui/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@/components/ui/shadcn/dropdown-menu';
import { useEffect, useState } from 'react';
import { AppSubject } from '@/lib/types/subjects';
import { AppClass } from '@/lib/types/classes';
import { AppClassRoom } from '@/lib/types/classrooms';
import { BaseTeacher } from '@/lib/types/teachers';

interface TeachersInfoTableRowProps {
  teacher: BaseTeacher;
  subjects: AppSubject[];
  classes: AppClass[];
  classrooms: AppClassRoom[];
  onChange: (row: {
    teacherId: string;
    subjects: string[];
    classId: string | null;
    classroomId: string | null;
  }) => void;
  isEven?: boolean;
}

export function TeachersInfoTableRow({
  teacher,
  subjects,
  classes,
  classrooms,
  isEven,
  onChange,
}: TeachersInfoTableRowProps) {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(teacher.subjects?.map(s => s.subject.id) ?? []);
  const [selectedClass, setSelectedClass] = useState<string | null>(teacher.class?.id ?? null);
  const [selectedClassroom, setSelectedClassroom] = useState<string | null>(teacher.classRoom?.id ?? null);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleChange = () => {
    // Вызываем onChange только после инициализации
    if (isInitialized) {
      onChange({
        teacherId: teacher.id,
        subjects: selectedSubjects,
        classId: selectedClass,
        classroomId: selectedClassroom,
      });
    }
  };

  // useEffect для отслеживания изменений
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      return;
    }
    handleChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubjects, selectedClass, selectedClassroom]);

  return (
    <TableRow className={isEven ? 'bg-muted/50' : ''}>
      <TableCell>{`${teacher.lastName} ${teacher.firstName} ${teacher.patronymic ?? ''}`}</TableCell>

      {/* MultiSelect для предметов */}
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='w-full justify-start'
            >
              {selectedSubjects.length
                ? subjects
                    .filter(s => selectedSubjects.includes(s.id))
                    .map(s => s.name)
                    .join(', ')
                : 'Выберите предметы'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {subjects.map(subject => (
              <DropdownMenuCheckboxItem
                key={subject.id}
                checked={selectedSubjects.includes(subject.id)}
                onCheckedChange={checked => {
                  setSelectedSubjects(prev => (checked ? [...prev, subject.id] : prev.filter(id => id !== subject.id)));
                }}
              >
                {subject.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>

      {/* Классное руководство */}
      <TableCell>
        <Select
          value={selectedClass ?? 'none'}
          onValueChange={value => setSelectedClass(value === 'none' ? null : value)}
        >
          <SelectTrigger>
            {selectedClass ? classes.find(r => r.id === selectedClass)?.name || 'Класс' : 'Класс'}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='none'>—</SelectItem>
            {classes.map(c => (
              <SelectItem
                key={c.id}
                value={c.id}
              >
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>

      {/* Кабинет */}
      <TableCell className='w-32'>
        <Select
          value={selectedClassroom ?? 'none'}
          onValueChange={value => setSelectedClassroom(value === 'none' ? null : value)}
        >
          <SelectTrigger className='w-full'>
            <span className='truncate'>
              {selectedClassroom ? classrooms.find(r => r.id === selectedClassroom)?.name || 'Кабинет' : 'Кабинет'}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='none'>—</SelectItem>
            {classrooms.map(r => (
              <SelectItem
                key={r.id}
                value={r.id}
              >
                {r.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
    </TableRow>
  );
}
