'use client';

import { useGetClassesQuery } from '@/api/queiries/classes';
import { useGetTeachersQuery } from '@/api/queiries/teachers';
import { useGetClassRoomsQuery } from '@/api/queiries/classrooms';
import { useGetScheduleQuery, useSaveSchedule, useGenerateSchedule } from '@/api/queiries/schedule';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/shadcn/table';
import { formatFullName } from '@/lib';
import { ScheduleSlot, ScheduleLesson } from '@/lib/types/schedule';
import { WeekDaysCode, WEEK_DAYS_TITLES } from '@/lib/data';
import { useRef, useState, useMemo, useEffect } from 'react';
import { ScheduleSaveButton } from './components/ScheduleSaveButton';
import { ScheduleTableRow } from './components/ScheduleTableRow';
import { ScheduleExportButton } from './components/ScheduleExportButton';
import { ScheduleGenerateButton } from './components/ScheduleGenerateButton';
import { ScheduleClearButton } from './components/ScheduleClearButton';

const LESSON_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8]; // Максимум 8 уроков в день

export function ScheduleFrame() {
  const { data: classes = [] } = useGetClassesQuery();
  const { data: teachers = [] } = useGetTeachersQuery();
  const { data: classrooms = [] } = useGetClassRoomsQuery();
  const { data: loadedSchedule, isLoading: isLoadingSchedule } = useGetScheduleQuery();
  const { mutate: saveSchedule, isPending: isSaving } = useSaveSchedule();
  const { mutate: generateSchedule, isPending: isGenerating } = useGenerateSchedule();
  const tableRef = useRef<HTMLDivElement>(null);

  // Локальное состояние расписания
  const [schedule, setSchedule] = useState<ScheduleSlot[]>(() => {
    // Инициализируем пустое расписание для всех дней недели и уроков
    const initialSchedule: ScheduleSlot[] = [];
    Object.entries(WEEK_DAYS_TITLES).forEach(([key, _]) => {
      LESSON_NUMBERS.forEach(lessonNumber => {
        initialSchedule.push({
          dayOfWeek: key as WeekDaysCode,
          lessonNumber,
          lessons: [],
        });
      });
    });
    return initialSchedule;
  });

  // Синхронизация загруженного расписания с локальным состоянием
  useEffect(() => {
    console.log('[ScheduleFrame] loadedSchedule:', loadedSchedule);
    if (loadedSchedule && loadedSchedule.length > 0) {
      console.log('[ScheduleFrame] Setting schedule with', loadedSchedule.length, 'slots');
      console.log('[ScheduleFrame] First slot:', loadedSchedule[0]);
      
      // Создаем полное расписание со всеми слотами
      const fullSchedule: ScheduleSlot[] = [];
      Object.entries(WEEK_DAYS_TITLES).forEach(([key, _]) => {
        LESSON_NUMBERS.forEach(lessonNumber => {
          // Ищем данные для этого слота в загруженном расписании
          const loadedSlot = loadedSchedule.find(
            slot => slot.dayOfWeek === key && slot.lessonNumber === lessonNumber
          );
          
          fullSchedule.push({
            dayOfWeek: key as WeekDaysCode,
            lessonNumber,
            lessons: loadedSlot?.lessons || [],
          });
        });
      });
      
      console.log('[ScheduleFrame] Full schedule created with', fullSchedule.length, 'slots');
      setSchedule(fullSchedule);
    }
  }, [loadedSchedule]);

  const getScheduleItem = (dayOfWeek: WeekDaysCode, lessonNumber: number): ScheduleSlot | undefined => {
    const item = schedule.find(item => item.dayOfWeek === dayOfWeek && item.lessonNumber === lessonNumber);
    if (!item) {
      console.log('[ScheduleFrame] getScheduleItem: NOT FOUND for', dayOfWeek, lessonNumber);
    }
    return item;
  };

  const addLesson = (dayOfWeek: WeekDaysCode, lessonNumber: number, lesson: Omit<ScheduleLesson, 'id'>) => {
    // Генерируем ID на основе участников урока
    const participantsId = lesson.participants.map(p => p.class.id).join('-');
    const newLesson: ScheduleLesson = {
      ...lesson,
      id: `${dayOfWeek}-${lessonNumber}-${participantsId}-${lesson.subject.id}-${Date.now()}`,
    };

    console.log('[ScheduleFrame] Adding lesson:', newLesson);
    console.log('[ScheduleFrame] To day:', dayOfWeek, 'lesson:', lessonNumber);
    console.log('[ScheduleFrame] Current schedule length:', schedule.length);

    setSchedule(prev => {
      console.log('[ScheduleFrame] prev schedule length:', prev.length);
      const updated = prev.map(item => {
        if (item.dayOfWeek === dayOfWeek && item.lessonNumber === lessonNumber) {
          console.log('[ScheduleFrame] Found matching slot, current lessons:', item.lessons.length);
          const updatedSlot = {
            ...item,
            lessons: [...item.lessons, newLesson],
          };
          console.log('[ScheduleFrame] Updated slot lessons:', updatedSlot.lessons.length);
          return updatedSlot;
        }
        return item;
      });
      console.log('[ScheduleFrame] Updated schedule length:', updated.length);
      const matchingSlot = updated.find(s => s.dayOfWeek === dayOfWeek && s.lessonNumber === lessonNumber);
      console.log('[ScheduleFrame] Matching slot after update:', matchingSlot);
      return updated;
    });
  };

  const removeLesson = (dayOfWeek: WeekDaysCode, lessonNumber: number, lessonIndex: string) => {
    const index = parseInt(lessonIndex);
    setSchedule(prev =>
      prev.map(item => {
        if (item.dayOfWeek === dayOfWeek && item.lessonNumber === lessonNumber) {
          return {
            ...item,
            lessons: item.lessons.filter((_, i) => i !== index),
          };
        }
        return item;
      })
    );
  };

  // Проверка, есть ли хотя бы один урок в расписании
  const hasManualLessons = useMemo(() => {
    return schedule.some(slot => slot.lessons.length > 0);
  }, [schedule]);

  // Сохранить расписание
  const handleSave = () => {
    saveSchedule(schedule);
  };

  // Автоматическая генерация расписания
  const handleGenerate = () => {
    generateSchedule(undefined, {
      onSuccess: generatedSchedule => {
        // Заменяем локальное расписание на сгенерированное
        setSchedule(generatedSchedule);
      },
    });
  };

  // Очистить расписание
  const handleClear = () => {
    setSchedule(prev =>
      prev.map(slot => ({
        ...slot,
        lessons: [],
      }))
    );
  };

  if (isLoadingSchedule) {
    return <div className='flex items-center justify-center p-8'>Загрузка расписания...</div>;
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <ScheduleClearButton
          onClear={handleClear}
          hasLessons={hasManualLessons}
        />
        <div className='flex gap-2'>
          <ScheduleGenerateButton
            onGenerate={handleGenerate}
            isDisabled={hasManualLessons}
            isGenerating={isGenerating}
          />
          <ScheduleExportButton tableRef={tableRef} />
          <ScheduleSaveButton
            handleSave={handleSave}
            isDisabled={isSaving}
          />
        </div>
      </div>

      <div
        className='overflow-x-auto'
        ref={tableRef}
      >
        <Table>
          <TableHeader>
            <TableRow>
              {/* Колонка для дней недели */}
              <TableHead className='w-12'></TableHead>
              <TableHead className='w-16'>№ урока</TableHead>
              {classes.map(classItem => (
                <TableHead
                  key={classItem.id}
                  className='min-w-48'
                >
                  <div className='flex gap-2 items-center'>
                    <div className='font-medium'>{classItem.name}</div>
                    {classItem.classTeacher && (
                      <div className='text-xs text-muted-foreground'>{formatFullName(classItem.classTeacher)}</div>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(WEEK_DAYS_TITLES).map(([key, label]) =>
              LESSON_NUMBERS.map((lessonNumber, lessonIndex) => (
                <ScheduleTableRow
                  key={`${key}-${lessonNumber}`}
                  dayOfWeek={key as WeekDaysCode}
                  dayLabel={label}
                  lessonNumber={lessonNumber}
                  scheduleItem={getScheduleItem(key as WeekDaysCode, lessonNumber)}
                  classes={classes}
                  allTeachers={teachers}
                  allRooms={classrooms}
                  allSchedule={schedule}
                  onAddLesson={addLesson}
                  onRemoveLesson={removeLesson}
                  isFirstRow={lessonIndex === 0}
                  isLastRow={lessonIndex === LESSON_NUMBERS.length - 1}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
