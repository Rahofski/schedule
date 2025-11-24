'use client';

import { useState, useCallback } from 'react';
import { TableCell, TableRow } from '@/components/ui/shadcn/table';
import { Button } from '@/components/ui/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/shadcn/dropdown-menu';
import { Plus, X } from 'lucide-react';
import { ScheduleSlot, ScheduleLesson } from '@/lib/types/schedule';
import { WeekDaysCode } from '@/lib/data';
import { AppClass } from '@/lib/types/classes';
import { AppSubject } from '@/lib/types/subjects';
import { BaseTeacher } from '@/lib/types/teachers';
import { AppClassRoom } from '@/lib/types/classrooms';
import { cn } from '@/lib/utils';
import { AddLessonDialog } from './AddLessonDialog';
import { checkLessonConflicts, getUsedHoursForSubject } from '../lib/schedule-validation';

interface ScheduleTableRowProps {
  dayOfWeek: WeekDaysCode;
  dayLabel: string;
  lessonNumber: number;
  scheduleItem?: ScheduleSlot;
  classes: AppClass[];
  allTeachers: BaseTeacher[];
  allRooms: AppClassRoom[];
  allSchedule: ScheduleSlot[];
  onAddLesson: (dayOfWeek: WeekDaysCode, lessonNumber: number, lesson: Omit<ScheduleLesson, 'id'>) => void;
  onRemoveLesson: (dayOfWeek: WeekDaysCode, lessonNumber: number, lessonId: string) => void;
  isFirstRow: boolean;
  isLastRow?: boolean;
}

export function ScheduleTableRow({
  dayOfWeek,
  dayLabel,
  lessonNumber,
  scheduleItem,
  classes,
  allTeachers,
  allRooms,
  allSchedule,
  onAddLesson,
  onRemoveLesson,
  isFirstRow,
}: ScheduleTableRowProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<AppClass | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<AppSubject | null>(null);
  const [selectedSubjectConfig, setSelectedSubjectConfig] = useState<AppClass['subjects'][0] | null>(null);

  // Получить информацию о предметах с учетом использованных часов
  const getSubjectInfo = (classItem: AppClass) => {
    return classItem.subjects.map(subjectInfo => {
      const hasSplit = Boolean(subjectInfo.split);
      const usedHours = getUsedHoursForSubject(
        classItem.id,
        subjectInfo.subject.id,
        allSchedule,
        hasSplit,
        classItem.groups
      );
      const isDisabled = usedHours >= subjectInfo.hoursPerWeek;

      return {
        subject: subjectInfo.subject,
        usedHours,
        totalHours: subjectInfo.hoursPerWeek,
        isDisabled,
        split: subjectInfo.split,
      };
    });
  };

  // Открыть диалог для добавления урока
  const handleOpenDialog = (classObj: AppClass, subjectObj: AppSubject, config: AppClass['subjects'][0]) => {
    setSelectedClass(classObj);
    setSelectedSubject(subjectObj);
    setSelectedSubjectConfig(config);
    setDialogOpen(true);
  };

  // Обработка подтверждения из диалога
  const handleConfirmLesson = (lesson: Omit<ScheduleLesson, 'id'>) => {
    onAddLesson(dayOfWeek, lessonNumber, lesson);
  };

  // Функция проверки конфликтов для диалога
  const getConflicts = useCallback(
    (teachers: BaseTeacher[], rooms: AppClassRoom[], participants: ScheduleLesson['participants']) => {
      return checkLessonConflicts(dayOfWeek, lessonNumber, teachers, rooms, participants, allSchedule);
    },
    [dayOfWeek, lessonNumber, allSchedule]
  );

  // Удалить урок
  const handleRemoveLesson = (lessonIndex: number) => {
    onRemoveLesson(dayOfWeek, lessonNumber, lessonIndex.toString());
  };

  // Найти уроки для конкретного класса
  const getLessonsForClass = (classId: string) => {
    return scheduleItem?.lessons?.filter(lesson => lesson.participants?.some(p => p.class.id === classId)) || [];
  };

  return (
    <>
      <TableRow
        className={cn(isFirstRow && 'border-t-2 border-t-primary/30', 'hover:bg-muted/20', 'transition-colors')}
      >
        {' '}
        {/* День недели - отображается вертикально и объединен для всех уроков дня */}
        {isFirstRow && (
          <TableCell
            className='font-medium p-0 relative border-r-2 border-r-primary/20 align-middle bg-muted/10'
            rowSpan={8}
          >
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='transform -rotate-90 whitespace-nowrap text-base font-semibold text-primary'>
                {dayLabel}
              </div>
            </div>
          </TableCell>
        )}
        {/* Номер урока */}
        <TableCell className='text-center'>
          <div className='font-medium text-lg bg-muted/15 rounded-full w-8 h-8 flex items-center justify-center mx-auto'>
            {lessonNumber}
          </div>
        </TableCell>
        {/* Ячейки для каждого класса */}
        {classes.map(classItem => {
          const lessonsForClass = getLessonsForClass(classItem.id);
          const subjectsInfo = getSubjectInfo(classItem);

          return (
            <TableCell
              key={classItem.id}
              className='p-2'
            >
              {lessonsForClass.length > 0 ? (
                // Отображение существующих уроков (каждый урок на отдельной строке)
                <div className='flex flex-col gap-2'>
                  {lessonsForClass.map((lesson, lessonIdx) => (
                    <div
                      key={`${lesson.id}-${lessonIdx}`}
                      className='flex items-center gap-2'
                    >
                      <div className='flex-1 px-3 py-2 text-sm bg-transparent transition-colors hover:bg-muted/10 cursor-pointer rounded border border-muted'>
                        <div className='font-medium'>{lesson.subject.name}</div>

                        {/* Показываем подгруппы */}
                        {lesson.participants[0].groupIds && lesson.participants[0].groupIds.length > 0 && (
                          <div className='text-xs text-muted-foreground mt-0.5'>
                            {lesson.participants[0].groupIds
                              .map(gid => classItem.groups?.find(g => g.id === gid)?.name)
                              .filter(Boolean)
                              .join(', ')}
                          </div>
                        )}

                        {/* Показываем перекрёстное обучение */}
                        {lesson.participants.length > 1 && (
                          <div className='text-xs text-primary mt-0.5'>
                            {' '}
                            {lesson.participants
                              .slice(1)
                              .map(p => {
                                const groupNames = p.groupIds
                                  ? p.groupIds
                                      .map(gid => p.class.groups?.find(g => g.id === gid)?.name)
                                      .filter(Boolean)
                                      .join(', ')
                                  : '';
                                return `${p.class.name}${groupNames ? ` (${groupNames})` : ''}`;
                              })
                              .join(', ')}
                          </div>
                        )}

                        {/* Показываем учителей */}
                        {lesson.teachers.length > 0 && (
                          <div className='text-xs text-muted-foreground mt-1'>
                            {lesson.teachers.map(t => `${t.lastName} ${t.firstName[0]}.`).join(', ')}
                          </div>
                        )}

                        {/* Показываем кабинеты */}
                        {lesson.rooms.length > 0 && (
                          <div className='text-xs text-muted-foreground mt-0.5'>
                            {lesson.rooms.map(r => r.name).join(', ')}
                          </div>
                        )}
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='h-6 w-6 rounded-full hover:bg-destructive/10 p-0'
                        onClick={() => handleRemoveLesson(scheduleItem?.lessons?.indexOf(lesson) || 0)}
                        data-html2canvas-ignore='true'
                      >
                        <X className='h-3.5 w-3.5' />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                // Кнопка добавления урока
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='outline'
                      size='sm'
                      className='h-8 w-8 p-0 rounded-full border-dashed border-primary/30 hover:border-primary/60'
                      data-html2canvas-ignore='true'
                    >
                      <Plus className='h-4 w-4 text-primary/70' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {subjectsInfo.length > 0 ? (
                      subjectsInfo.map(({ subject, usedHours, totalHours, isDisabled, split }) => {
                        const config = classItem.subjects.find(s => s.subject.id === subject.id)!;
                        return (
                          <DropdownMenuItem
                            key={subject.id}
                            onClick={isDisabled ? undefined : () => handleOpenDialog(classItem, subject, config)}
                            className={isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                            disabled={isDisabled}
                          >
                            <div className='flex justify-between items-center w-full'>
                              <div className='flex-1'>
                                <div>{subject.name}</div>
                                {split && classItem.groups && classItem.groups.length > 0 && (
                                  <div className='text-xs text-muted-foreground'>
                                    Можно разделить на {split.groupsCount} групп
                                    {split.crossClassAllowed ? ' (с другими классами)' : ''}
                                  </div>
                                )}
                              </div>
                              <span className={`ml-2 text-xs ${isDisabled ? 'text-red-500' : 'text-muted-foreground'}`}>
                                {usedHours}/{totalHours}
                              </span>
                            </div>
                          </DropdownMenuItem>
                        );
                      })
                    ) : (
                      <DropdownMenuItem disabled>Нет доступных предметов</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </TableCell>
          );
        })}
      </TableRow>

      {/* Диалог добавления урока */}
      {selectedClass && selectedSubject && selectedSubjectConfig && (
        <AddLessonDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          classItem={selectedClass}
          subject={selectedSubject}
          subjectConfig={selectedSubjectConfig}
          allClasses={classes}
          allTeachers={allTeachers}
          allRooms={allRooms}
          onConfirm={handleConfirmLesson}
          getConflicts={getConflicts}
        />
      )}
    </>
  );
}
